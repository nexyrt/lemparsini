<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    /**
     * Display all templates grouped by category
     */
    public function index()
    {
        $categories = Category::query()
            ->with(['subCategories.templates' => function ($query) {
                $query->where('status', 'published')
                    ->orderByDesc('usage_count');
            }])
            ->orderBy('sort_order')
            ->get();

        $featuredTemplates = Template::query()
            ->with('subCategory.category')
            ->where('status', 'published')
            ->orderByDesc('usage_count')
            ->limit(8)
            ->get();

        return inertia('templates/index', [
            'categories' => $categories,
            'featuredTemplates' => $featuredTemplates,
        ]);
    }

    /**
     * Display templates for a specific category
     */
    public function category(string $categorySlug)
    {
        $category = Category::query()
            ->where('slug', $categorySlug)
            ->with(['subCategories' => function ($query) {
                $query->orderBy('sort_order')
                    ->with(['templates' => function ($q) {
                        $q->where('status', 'published')
                            ->orderByDesc('usage_count');
                    }]);
            }])
            ->firstOrFail();

        $allCategories = Category::query()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'icon']);

        return inertia('templates/category', [
            'category' => $category,
            'allCategories' => $allCategories,
        ]);
    }

    /**
     * Display a specific template with live preview
     */
    public function show(string $categorySlug, string $templateSlug)
    {
        $template = Template::query()
            ->with('subCategory.category')
            ->where('slug', $templateSlug)
            ->where('status', 'published')
            ->firstOrFail();

        // Verify category matches
        if ($template->subCategory->category->slug !== $categorySlug) {
            abort(404);
        }

        // Increment view count
        $template->incrementViews();

        // Get related templates from same subcategory
        $relatedTemplates = Template::query()
            ->where('sub_category_id', $template->sub_category_id)
            ->where('id', '!=', $template->id)
            ->where('status', 'published')
            ->limit(4)
            ->get();

        return inertia('templates/show', [
            'template' => $template,
            'relatedTemplates' => $relatedTemplates,
        ]);
    }

    /**
     * Preview template in iframe (for live preview)
     */
    public function preview(string $templateSlug)
    {
        $template = Template::query()
            ->with('subCategory.category')
            ->where('slug', $templateSlug)
            ->where('status', 'published')
            ->firstOrFail();

        return inertia('templates/preview', [
            'template' => $template,
        ]);
    }
}
