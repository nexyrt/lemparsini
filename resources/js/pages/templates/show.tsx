import PublicLayout from "@/layouts/public-layout"
import { Head, Link } from "@inertiajs/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TemplatePreviewCard, getColorSchemeFromTemplate } from "@/components/template-preview-card"
import {
  EyeIcon,
  HeartIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"

interface Template {
  id: number
  name: string
  slug: string
  description: string
  preview_image: string
  demo_url: string
  component_path: string
  price: number
  is_free: boolean
  is_premium: boolean
  features: string[]
  customizable_fields: string[]
  views_count: number
  usage_count: number
  sub_category: {
    id: number
    name: string
    slug: string
    category: {
      id: number
      name: string
      slug: string
      icon: string
    }
  }
}

interface TemplateShowProps {
  template: Template
  relatedTemplates: Template[]
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

type PreviewDevice = 'mobile' | 'desktop'

export default function TemplateShow({ template, relatedTemplates }: TemplateShowProps) {
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('mobile')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const category = template.sub_category.category

  return (
    <>
      <Head title={`${template.name} - Template ${category.name} | lemparsini.com`} />

      {/* Breadcrumb */}
      <section className="border-b bg-muted/30">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-fg">
            <Link href="/templates" className="hover:text-primary transition-colors">
              Template
            </Link>
            <span>/</span>
            <Link href={`/templates/${category.slug}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-fg">{template.name}</span>
          </nav>
        </Container>
      </section>

      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Section */}
          <div className="flex-1">
            <div className="sticky top-4">
              {/* Device Toggle */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      previewDevice === 'mobile'
                        ? 'bg-primary text-primary-fg'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <DevicePhoneMobileIcon className="size-4" />
                    Mobile
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      previewDevice === 'desktop'
                        ? 'bg-primary text-primary-fg'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <ComputerDesktopIcon className="size-4" />
                    Desktop
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    intent="outline"
                    className="gap-2"
                    onClick={() => setIsFullscreen(true)}
                  >
                    <ArrowTopRightOnSquareIcon className="size-4" />
                    Fullscreen
                  </Button>
                </div>
              </div>

              {/* Preview Frame */}
              <div className="rounded-xl border bg-muted/30 p-4">
                <div
                  className={`mx-auto rounded-xl border-8 border-gray-800 bg-white shadow-2xl overflow-hidden transition-all duration-300 ${
                    previewDevice === 'mobile'
                      ? 'w-[375px] h-[667px]'
                      : 'w-full h-[600px]'
                  }`}
                >
                  {/* Preview iframe - Live preview of template */}
                  <iframe
                    src={`/templates/preview/${template.slug}`}
                    className="h-full w-full"
                    title={`Preview ${template.name}`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-fg">
                <span className="flex items-center gap-2">
                  <EyeIcon className="size-4" />
                  {template.views_count.toLocaleString()} kali dilihat
                </span>
                <span className="flex items-center gap-2">
                  <HeartIcon className="size-4" />
                  {template.usage_count.toLocaleString()} kali digunakan
                </span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full lg:w-96 shrink-0 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge intent="secondary">{category.name}</Badge>
                {template.is_free && (
                  <Badge className="bg-green-500 text-white">Gratis</Badge>
                )}
                {template.is_premium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    Premium
                  </Badge>
                )}
              </div>

              <h1 className="font-bold text-2xl mb-2">{template.name}</h1>
              <p className="text-muted-fg">{template.description}</p>
            </div>

            {/* Price & CTA */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-muted-fg">Harga</span>
                  <div className="font-bold text-3xl text-primary">
                    {template.is_free ? 'Gratis' : formatPrice(template.price)}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full gap-2" asChild>
                    <Link href="/register">
                      <SparklesIcon className="size-5" />
                      Gunakan Template Ini
                    </Link>
                  </Button>

                  <Button size="lg" intent="outline" className="w-full gap-2">
                    <ShareIcon className="size-5" />
                    Bagikan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fitur Template</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {template.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircleIcon className="size-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Customizable Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yang Bisa Dikustomisasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.customizable_fields?.map((field, index) => (
                    <Badge key={index} intent="secondary" className="text-xs">
                      {field.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <section className="mt-16">
            <h2 className="font-bold text-2xl mb-6">Template Serupa</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTemplates.map((related) => (
                <Link
                  key={related.id}
                  href={`/templates/${category.slug}/${related.slug}`}
                >
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {related.preview_image ? (
                        <img
                          src={related.preview_image}
                          alt={related.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <TemplatePreviewCard
                          name={related.name}
                          category={category.name}
                          colorScheme={getColorSchemeFromTemplate(related.name, category.slug)}
                          className="rounded-none border-0 shadow-none"
                        />
                      )}

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {related.is_free && (
                          <Badge className="bg-green-500 text-white">Gratis</Badge>
                        )}
                        {related.is_premium && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-sm text-primary font-bold mt-1">
                        {related.is_free ? 'Gratis' : formatPrice(related.price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <iframe
            src={`/templates/preview/${template.slug}`}
            className="w-full h-full max-w-6xl max-h-[90vh] rounded-lg"
            title={`Preview ${template.name}`}
          />
        </div>
      )}
    </>
  )
}

TemplateShow.layout = (page: React.ReactNode) => <PublicLayout children={page} />
