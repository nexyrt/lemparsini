import PublicLayout from "@/layouts/public-layout"
import { Head, Link } from "@inertiajs/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TemplatePreviewCard, getColorSchemeFromTemplate } from "@/components/template-preview-card"
import {
  SparklesIcon,
  EyeIcon,
  HeartIcon,
  ChevronLeftIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"

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
}

interface SubCategory {
  id: number
  name: string
  slug: string
  description: string
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

interface AllCategory {
  id: number
  name: string
  slug: string
  icon: string
}

interface TemplateCategoryProps {
  category: Category
  allCategories: AllCategory[]
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

function TemplateCard({ template, categorySlug }: { template: Template; categorySlug: string }) {
  return (
    <Link href={`/templates/${categorySlug}/${template.slug}`}>
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
              category={categorySlug}
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

export default function TemplateCategory({ category, allCategories }: TemplateCategoryProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'premium'>('all')

  // Get all templates
  const allTemplates = category.sub_categories.flatMap((sub) =>
    sub.templates.map((t) => ({ ...t, subCategorySlug: sub.slug, subCategoryName: sub.name }))
  )

  // Apply filters
  const filteredTemplates = allTemplates.filter((template) => {
    if (selectedSubCategory && template.subCategorySlug !== selectedSubCategory) return false
    if (priceFilter === 'free' && !template.is_free) return false
    if (priceFilter === 'premium' && !template.is_premium) return false
    return true
  })

  return (
    <>
      <Head title={`${category.name} - Template Undangan Digital | lemparsini.com`} />

      {/* Breadcrumb & Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1 text-sm text-muted-fg hover:text-primary transition-colors"
            >
              <ChevronLeftIcon className="size-4" />
              Kembali ke Semua Template
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-4xl">
              {category.icon}
            </div>
            <div>
              <h1 className="font-bold text-3xl">{category.name}</h1>
              <p className="text-muted-fg">{category.description}</p>
              <p className="text-sm text-muted-fg mt-1">
                {allTemplates.length} template tersedia
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-4 space-y-6">
              {/* Categories Navigation */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Kategori Lain</h3>
                  <div className="space-y-1">
                    {allCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/templates/${cat.slug}`}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          cat.slug === category.slug
                            ? 'bg-primary text-primary-fg'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sub Categories Filter */}
              {category.sub_categories.length > 1 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FunnelIcon className="size-4" />
                      Sub Kategori
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedSubCategory(null)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                          !selectedSubCategory ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                        }`}
                      >
                        Semua
                      </button>
                      {category.sub_categories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSubCategory(sub.slug)}
                          className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                            selectedSubCategory === sub.slug
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted'
                          }`}
                        >
                          {sub.name}
                          <span className="ml-1 text-muted-fg">({sub.templates.length})</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Price Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Harga</h3>
                  <div className="space-y-1">
                    {[
                      { value: 'all', label: 'Semua' },
                      { value: 'free', label: 'Gratis' },
                      { value: 'premium', label: 'Premium' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPriceFilter(option.value as typeof priceFilter)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                          priceFilter === option.value
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Templates Grid */}
          <div className="flex-1">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    categorySlug={category.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SparklesIcon className="size-16 text-muted-fg/50 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Tidak ada template ditemukan</h3>
                <p className="text-muted-fg mb-4">
                  Coba ubah filter atau pilih kategori lain
                </p>
                <Button
                  intent="outline"
                  onClick={() => {
                    setSelectedSubCategory(null)
                    setPriceFilter('all')
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

TemplateCategory.layout = (page: React.ReactNode) => <PublicLayout children={page} />
