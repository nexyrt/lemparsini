import PublicLayout from "@/layouts/public-layout"
import { Head, Link } from "@inertiajs/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TemplatePreviewCard, getColorSchemeFromTemplate } from "@/components/template-preview-card"
import {
  EyeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"

interface SubCategory {
  id: number
  name: string
  slug: string
  templates: Template[]
}

interface Category {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  sub_categories: SubCategory[]
}

interface Template {
  id: number
  name: string
  slug: string
  description: string
  preview_image: string
  price: number
  is_free: boolean
  is_premium: boolean
  views_count: number
  usage_count: number
  sub_category?: {
    category: {
      slug: string
    }
  }
}

interface TemplatesIndexProps {
  categories: Category[]
  featuredTemplates: Template[]
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

function TemplateCard({ template, categorySlug }: { template: Template; categorySlug?: string }) {
  const slug = categorySlug || template.sub_category?.category?.slug || 'pernikahan'

  return (
    <Link href={`/templates/${slug}/${template.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary">
        {/* Preview Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {template.preview_image ? (
            <img
              src={template.preview_image}
              alt={template.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <TemplatePreviewCard
              name={template.name}
              category={template.sub_category?.category?.slug || categorySlug || 'Wedding'}
              colorScheme={getColorSchemeFromTemplate(template.name, categorySlug)}
              className="rounded-none border-0 shadow-none"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {template.is_free && (
              <Badge className="bg-green-500 text-white">Gratis</Badge>
            )}
            {template.is_premium && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">Premium</Badge>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="sm" className="gap-2">
              <EyeIcon className="size-4" />
              Lihat Detail
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-muted-fg line-clamp-2 mb-3">
            {template.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">
              {template.is_free ? 'Gratis' : formatPrice(template.price)}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-fg">
              <span className="flex items-center gap-1">
                <EyeIcon className="size-3" />
                {template.views_count}
              </span>
              <span className="flex items-center gap-1">
                <HeartIcon className="size-3" />
                {template.usage_count}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function TemplatesIndex({ categories, featuredTemplates }: TemplatesIndexProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Head title="Template Undangan Digital - lemparsini.com" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-bold text-3xl sm:text-4xl">
              Koleksi Template Undangan Digital
            </h1>
            <p className="mb-8 text-lg text-muted-fg">
              Pilih dari berbagai template undangan yang elegan dan modern untuk berbagai acara spesial Anda
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-md">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-fg" />
              <input
                type="text"
                placeholder="Cari template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border bg-background py-3 pl-12 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Templates */}
      {featuredTemplates.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-2xl">Template Terpopuler</h2>
                <p className="text-muted-fg">Template yang paling banyak digunakan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-bold text-2xl">Jelajahi Berdasarkan Kategori</h2>
            <p className="text-muted-fg">Temukan template yang cocok untuk acara Anda</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const templateCount = category.sub_categories.reduce(
                (acc, sub) => acc + sub.templates.length,
                0
              )

              return (
                <Link key={category.id} href={`/templates/${category.slug}`}>
                  <Card className="group h-full transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-3xl">
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {category.name}
                          </CardTitle>
                          <p className="text-sm text-muted-fg">
                            {templateCount} template tersedia
                          </p>
                        </div>
                      </div>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.sub_categories.slice(0, 3).map((sub) => (
                          <Badge key={sub.id} intent="secondary" className="text-xs">
                            {sub.name}
                          </Badge>
                        ))}
                        {category.sub_categories.length > 3 && (
                          <Badge intent="secondary" className="text-xs">
                            +{category.sub_categories.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* All Templates by Category */}
      {categories.map((category) => {
        const allTemplates = category.sub_categories.flatMap((sub) => sub.templates)
        if (allTemplates.length === 0) return null

        return (
          <section key={category.id} className="py-16">
            <Container>
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h2 className="font-bold text-2xl">{category.name}</h2>
                    <p className="text-muted-fg">{category.description}</p>
                  </div>
                </div>
                <Button intent="outline" asChild>
                  <Link href={`/templates/${category.slug}`}>
                    Lihat Semua
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {allTemplates.slice(0, 4).map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    categorySlug={category.slug}
                  />
                ))}
              </div>
            </Container>
          </section>
        )
      })}
    </>
  )
}

TemplatesIndex.layout = (page: React.ReactNode) => <PublicLayout children={page} />
