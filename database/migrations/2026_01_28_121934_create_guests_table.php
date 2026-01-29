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
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug'); // URL-friendly name: "john-doe"
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('guest_link')->unique(); // Full personalized link
            $table->boolean('has_viewed')->default(false);
            $table->timestamp('viewed_at')->nullable();
            $table->string('rsvp_status')->default('pending'); // pending, attending, not_attending
            $table->timestamp('rsvp_at')->nullable();
            $table->integer('plus_one_count')->default(0);
            $table->text('message')->nullable(); // Guest wishes/message
            $table->timestamps();

            $table->unique(['invitation_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
