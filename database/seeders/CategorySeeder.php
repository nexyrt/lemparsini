<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // Kategori Utama
            [
                'name' => 'Pernikahan',
                'slug' => 'pernikahan',
                'description' => 'Undangan digital untuk acara pernikahan, akad nikah, resepsi, dan pre-wedding event',
                'icon' => '💍',
                'is_featured' => true,
                'sort_order' => 1,
                'sub_categories' => [
                    ['name' => 'Akad Nikah', 'slug' => 'akad-nikah', 'description' => 'Undangan khusus acara akad nikah'],
                    ['name' => 'Resepsi', 'slug' => 'resepsi', 'description' => 'Undangan resepsi pernikahan'],
                    ['name' => 'Intimate Wedding', 'slug' => 'intimate-wedding', 'description' => 'Undangan pernikahan sederhana dan intimate'],
                    ['name' => 'Lamaran', 'slug' => 'lamaran', 'description' => 'Undangan acara lamaran'],
                    ['name' => 'Siraman', 'slug' => 'siraman', 'description' => 'Undangan acara siraman pengantin'],
                ],
            ],
            [
                'name' => 'Ulang Tahun',
                'slug' => 'ulang-tahun',
                'description' => 'Undangan digital untuk perayaan ulang tahun berbagai usia',
                'icon' => '🎂',
                'is_featured' => true,
                'sort_order' => 2,
                'sub_categories' => [
                    ['name' => 'Ulang Tahun Anak (1-5 tahun)', 'slug' => 'ulang-tahun-anak', 'description' => 'Undangan ulang tahun untuk anak-anak'],
                    ['name' => 'Sweet Seventeen', 'slug' => 'sweet-seventeen', 'description' => 'Undangan ulang tahun ke-17'],
                    ['name' => 'Milestone Birthday', 'slug' => 'milestone-birthday', 'description' => 'Undangan ulang tahun milestone (30, 40, 50 tahun)'],
                    ['name' => 'Ulang Tahun Perusahaan', 'slug' => 'ulang-tahun-perusahaan', 'description' => 'Undangan anniversary perusahaan/organisasi'],
                ],
            ],
            [
                'name' => 'Acara Keagamaan',
                'slug' => 'acara-keagamaan',
                'description' => 'Undangan untuk acara keagamaan Islam',
                'icon' => '🕌',
                'is_featured' => true,
                'sort_order' => 3,
                'sub_categories' => [
                    ['name' => 'Aqiqah', 'slug' => 'aqiqah', 'description' => 'Undangan acara aqiqah'],
                    ['name' => 'Syukuran Kelahiran', 'slug' => 'syukuran-kelahiran', 'description' => 'Undangan syukuran kelahiran bayi'],
                    ['name' => 'Khitanan', 'slug' => 'khitanan', 'description' => 'Undangan acara khitanan/sunatan'],
                    ['name' => 'Pengajian', 'slug' => 'pengajian', 'description' => 'Undangan pengajian/tahlilan'],
                    ['name' => 'Maulid Nabi', 'slug' => 'maulid-nabi', 'description' => 'Undangan perayaan Maulid Nabi Muhammad SAW'],
                    ['name' => 'Halal Bihalal', 'slug' => 'halal-bihalal', 'description' => 'Undangan halal bihalal pasca Lebaran'],
                ],
            ],

            // Kategori Sekunder
            [
                'name' => 'Corporate Events',
                'slug' => 'corporate-events',
                'description' => 'Undangan untuk acara korporat dan bisnis',
                'icon' => '💼',
                'is_featured' => false,
                'sort_order' => 4,
                'sub_categories' => [
                    ['name' => 'Seminar & Workshop', 'slug' => 'seminar-workshop', 'description' => 'Undangan seminar dan workshop'],
                    ['name' => 'Grand Opening', 'slug' => 'grand-opening', 'description' => 'Undangan grand opening usaha'],
                    ['name' => 'Meeting & Gathering', 'slug' => 'meeting-gathering', 'description' => 'Undangan meeting dan gathering perusahaan'],
                    ['name' => 'Launching Produk', 'slug' => 'launching-produk', 'description' => 'Undangan peluncuran produk baru'],
                ],
            ],
            [
                'name' => 'Acara Keluarga',
                'slug' => 'acara-keluarga',
                'description' => 'Undangan untuk acara kumpul keluarga',
                'icon' => '👨‍👩‍👧‍👦',
                'is_featured' => false,
                'sort_order' => 5,
                'sub_categories' => [
                    ['name' => 'Reuni Keluarga', 'slug' => 'reuni-keluarga', 'description' => 'Undangan reuni keluarga besar'],
                    ['name' => 'Reuni Alumni', 'slug' => 'reuni-alumni', 'description' => 'Undangan reuni alumni sekolah/kampus'],
                    ['name' => 'Arisan', 'slug' => 'arisan', 'description' => 'Undangan acara arisan'],
                    ['name' => 'Syukuran Umum', 'slug' => 'syukuran-umum', 'description' => 'Undangan syukuran (naik haji, wisuda, dll)'],
                ],
            ],
            [
                'name' => 'Event Komunitas',
                'slug' => 'event-komunitas',
                'description' => 'Undangan untuk acara komunitas dan publik',
                'icon' => '🎪',
                'is_featured' => false,
                'sort_order' => 6,
                'sub_categories' => [
                    ['name' => 'Gathering Komunitas', 'slug' => 'gathering-komunitas', 'description' => 'Undangan gathering anggota komunitas'],
                    ['name' => 'Charity Event', 'slug' => 'charity-event', 'description' => 'Undangan acara amal/charity'],
                    ['name' => 'Festival & Bazaar', 'slug' => 'festival-bazaar', 'description' => 'Undangan festival dan bazaar'],
                ],
            ],
        ];

        foreach ($categories as $categoryData) {
            $subCategories = $categoryData['sub_categories'] ?? [];
            unset($categoryData['sub_categories']);

            $category = Category::create($categoryData);

            foreach ($subCategories as $index => $subCategoryData) {
                $subCategoryData['sort_order'] = $index + 1;
                $category->subCategories()->create($subCategoryData);
            }
        }
    }
}
