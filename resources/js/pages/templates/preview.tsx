import { Head } from "@inertiajs/react"
import { lazy, Suspense } from "react"
import { TemplatePreviewCard, getColorSchemeFromTemplate } from "@/components/template-preview-card"

interface Template {
  id: number
  name: string
  slug: string
  component_path: string
  sub_category?: {
    name: string
    category?: {
      name: string
    }
  }
}

interface TemplatePreviewProps {
  template: Template
}

// Dynamic template loader - only register templates that exist
const templateComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'templates/wedding/ElegantRose': lazy(() => import('@/templates/wedding/ElegantRose')),
  // Add more templates here as they are created:
  // 'templates/wedding/ClassicWhite': lazy(() => import('@/templates/wedding/ClassicWhite')),
  // 'templates/wedding/GoldenLuxury': lazy(() => import('@/templates/wedding/GoldenLuxury')),
  // 'templates/wedding/ModernFloral': lazy(() => import('@/templates/wedding/ModernFloral')),
  // 'templates/wedding/RusticCharm': lazy(() => import('@/templates/wedding/RusticCharm')),
  // 'templates/wedding/SimpleElegance': lazy(() => import('@/templates/wedding/SimpleElegance')),
}

// Demo data for preview
const demoData = {
  bride: {
    name: 'Sarah',
    fullName: 'Sarah Amelia Putri',
    father: 'Bapak Ahmad Wijaya',
    mother: 'Ibu Siti Nurhaliza',
  },
  groom: {
    name: 'Andi',
    fullName: 'Andi Prasetyo Kusuma',
    father: 'Bapak Hendra Kusuma',
    mother: 'Ibu Ratna Dewi',
  },
  event: {
    akadDate: '2026-03-15',
    akadTime: '08:00',
    resepsiDate: '2026-03-15',
    resepsiTime: '11:00',
    venue: 'Ballroom Hotel Grand Hyatt',
    address: 'Jl. M.H. Thamrin Kav. 28-30, Jakarta Pusat 10350',
    mapUrl: 'https://maps.google.com/?q=Grand+Hyatt+Jakarta',
  },
  gallery: [
    '/demo/wedding-1.jpg',
    '/demo/wedding-2.jpg',
    '/demo/wedding-3.jpg',
  ],
  quranVerse: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    translation: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.',
    surah: 'QS. Ar-Rum: 21',
  },
  guestName: 'Bapak/Ibu/Saudara/i',
}

function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50">
      <div className="text-center">
        <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-muted-fg">Memuat template...</p>
      </div>
    </div>
  )
}

function TemplatePlaceholder({ template }: { template: Template }) {
  const categoryName = template.sub_category?.category?.name || template.sub_category?.name || 'Wedding'
  const colorScheme = getColorSchemeFromTemplate(template.name, categoryName)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-50 p-8">
      <div className="w-full max-w-sm">
        <TemplatePreviewCard
          name={template.name}
          category={categoryName}
          colorScheme={colorScheme}
        />
        <p className="mt-4 text-center text-sm text-muted-fg">
          Live preview untuk template ini sedang dalam pengembangan
        </p>
      </div>
    </div>
  )
}

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  const TemplateComponent = templateComponents[template.component_path]

  return (
    <>
      <Head title={`Preview: ${template.name}`} />

      {TemplateComponent ? (
        <Suspense fallback={<LoadingSpinner />}>
          <TemplateComponent data={demoData} isPreview={true} />
        </Suspense>
      ) : (
        <TemplatePlaceholder template={template} />
      )}
    </>
  )
}

// No layout for preview - full screen template
