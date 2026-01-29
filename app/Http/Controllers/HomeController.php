<?php

namespace App\Http\Controllers;

use App\Models\Category;
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

        return inertia('home/page', [
            'categories' => $categories,
        ]);
    }
}
