<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Template;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $categories = Category::query()
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'description', 'icon']);

        // Get top 4 templates for showcase (most popular)
        $featuredTemplates = Template::query()
            ->where('status', 'published')
            ->orderByDesc('usage_count')
            ->limit(4)
            ->get([
                'id',
                'name',
                'slug',
                'description',
                'preview_image',
                'demo_url',
                'price',
                'is_free',
                'is_premium',
                'features',
            ]);

        return inertia('home/page', [
            'categories' => $categories,
            'featuredTemplates' => $featuredTemplates,
        ]);
    }
}
