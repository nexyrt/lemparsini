<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Guest extends Model
{
    protected $fillable = [
        'invitation_id',
        'name',
        'slug',
        'phone',
        'email',
        'guest_link',
        'has_viewed',
        'viewed_at',
        'rsvp_status',
        'rsvp_at',
        'plus_one_count',
        'message',
    ];

    protected $casts = [
        'has_viewed' => 'boolean',
        'viewed_at' => 'datetime',
        'rsvp_at' => 'datetime',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    public function markAsViewed(): void
    {
        $this->update([
            'has_viewed' => true,
            'viewed_at' => now(),
        ]);
    }

    public function submitRsvp(string $status, int $plusOne = 0, string $message = null): void
    {
        $this->update([
            'rsvp_status' => $status,
            'rsvp_at' => now(),
            'plus_one_count' => $plusOne,
            'message' => $message,
        ]);
    }
}
