<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    protected $fillable = [
        'sub_category_id',
        'name',
        'slug',
        'description',
        'preview_image',
        'demo_url',
        'component_path',
        'price',
        'is_free',
        'is_premium',
        'features',
        'customizable_fields',
        'status',
        'views_count',
        'usage_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_free' => 'boolean',
        'is_premium' => 'boolean',
        'features' => 'array',
        'customizable_fields' => 'array',
    ];

    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(Invitation::class);
    }

    public function incrementViews(): void
    {
        $this->increment('views_count');
    }

    public function incrementUsage(): void
    {
        $this->increment('usage_count');
    }
}
