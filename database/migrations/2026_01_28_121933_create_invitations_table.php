<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('template_id')->constrained()->onDelete('cascade');
            $table->string('slug')->unique(); // e.g., "rizki-wedding"
            $table->string('event_title');
            $table->dateTime('event_date')->nullable();
            $table->string('event_location')->nullable();
            $table->text('event_address')->nullable();
            $table->string('groom_name')->nullable();
            $table->string('bride_name')->nullable();
            $table->json('settings')->nullable(); // Custom colors, fonts, etc
            $table->string('status')->default('draft'); // draft, published, expired
            $table->integer('views_count')->default(0);
            $table->boolean('rsvp_enabled')->default(true);
            $table->dateTime('published_at')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
