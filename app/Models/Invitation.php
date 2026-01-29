<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invitation extends Model
{
    protected $fillable = [
        'user_id',
        'template_id',
        'slug',
        'event_title',
        'event_date',
        'event_location',
        'event_address',
        'groom_name',
        'bride_name',
        'settings',
        'status',
        'views_count',
        'rsvp_enabled',
        'published_at',
        'expires_at',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'settings' => 'array',
        'rsvp_enabled' => 'boolean',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }

    public function incrementViews(): void
    {
        $this->increment('views_count');
    }
}
