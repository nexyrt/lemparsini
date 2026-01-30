<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Categories and SubCategories
        $this->call([
            CategorySeeder::class,
        ]);

        // Seed Templates (requires categories/subcategories to exist)
        $this->call([
            TemplateSeeder::class,
        ]);

        // Create test users
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->command->info('✅ Database seeded successfully!');
        $this->command->info('📊 Categories, SubCategories, and Templates created.');
        $this->command->info('👥 10 random users + 1 test user (test@example.com) created.');
    }
}
