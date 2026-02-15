import PublicLayout from "@/layouts/public-layout"
import { Head, Link } from "@inertiajs/react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  LinkIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  BellAlertIcon,
  StarIcon,
  XMarkIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useRef, useState, useCallback } from "react"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  icon: string
}

interface HomeProps {
  categories: Category[]
}

// ── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right" | "none"
  className?: string
}) {
  const { ref, visible } = useReveal()
  const initial =
    direction === "up" ? "opacity-0 translate-y-10"
    : direction === "left" ? "opacity-0 -translate-x-10"
    : direction === "right" ? "opacity-0 translate-x-10"
    : "opacity-0"
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0 translate-y-0" : initial} ${className}`}
    >
      {children}
    </div>
  )
}

// ── Custom Cursor ───────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)

    const animate = () => {
      // dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      // ring follows with lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 size-2 rounded-full bg-primary"
        style={{ willChange: "transform" }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-9998 size-9 rounded-full border border-primary/50"
        style={{ willChange: "transform" }}
      />
    </>
  )
}

// ── Category Card with 3D tilt + spotlight ──────────────────────────────────
function CategoryCard({ category, href }: { category: { id: number; name: string; slug: string; description: string; icon: string }; href: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    const rotX = (y - 0.5) * -12
    const rotY = (x - 0.5) * 12
    setStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`,
      transition: "transform 0.1s ease",
    })
    setSpotlight({ x: x * 100, y: y * 100, opacity: 0.12 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)", transition: "transform 0.5s ease" })
    setSpotlight(s => ({ ...s, opacity: 0 }))
  }, [])

  return (
    <Link href={href}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className="group relative h-full overflow-hidden rounded-xl border bg-background shadow-sm"
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${spotlight.x}% ${spotlight.y}%, hsl(var(--primary) / ${spotlight.opacity}), transparent 70%)`,
          }}
        />
        {/* Gradient border glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-primary transition-opacity duration-300 group-hover:opacity-100" />

        <div className="p-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
              {category.icon}
              {/* shine */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div>
              <h3 className="font-bold text-lg transition-colors group-hover:text-primary">
                {category.name}
              </h3>
            </div>
          </div>

          <p className="mb-5 text-sm text-muted-fg leading-relaxed">{category.description}</p>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Lihat Template
            </span>
            <span className="translate-x-0 text-primary transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Template Preview Modal ──────────────────────────────────────────────────
const TEMPLATES = [
  {
    slug: "elegant-rose",
    name: "Elegant Rose",
    category: "Pernikahan",
    description: "Desain elegan dengan nuansa mawar soft pink. Cocok untuk pernikahan modern yang romantis.",
    accent: "from-rose-400 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    badge: "Gratis",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    slug: "golden-luxury",
    name: "Golden Luxury",
    category: "Pernikahan",
    description: "Mewah dan elegan dengan aksen emas di atas latar hitam. Untuk pasangan yang menginginkan kesan premium.",
    accent: "from-yellow-400 to-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    badge: "Premium",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    slug: "classic-white",
    name: "Classic White",
    category: "Pernikahan",
    description: "Minimalis dan timeless dengan sentuhan putih bersih. Ideal untuk pernikahan modern yang simpel namun berkesan.",
    accent: "from-slate-400 to-gray-600",
    bg: "bg-slate-50 dark:bg-slate-950/20",
    badge: "Basic",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
]

function TemplatePreviewModal({ slug, name, onClose }: { slug: string; name: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative flex h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-muted-fg text-xs">Preview Template</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/templates/preview/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted"
            >
              <ArrowTopRightOnSquareIcon className="size-3.5" />
              Buka
            </a>
            <Button size="sq-sm" intent="plain" onPress={onClose}>
              <XMarkIcon className="size-4" />
            </Button>
          </div>
        </div>
        {/* Iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={`/templates/preview/${slug}`}
            className="h-full w-full border-0"
            title={`Preview ${name}`}
          />
        </div>
      </div>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Home({ categories }: HomeProps) {
  const [previewTemplate, setPreviewTemplate] = useState<{ slug: string; name: string } | null>(null)

  return (
    <>
      <Head title="lemparsini.com - Undangan Digital Modern & Elegan">
        <style>{`body { cursor: none; } a, button { cursor: none; }`}</style>
      </Head>
      <CustomCursor />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none" }}
          >
            <source src="/videos/8776896-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-br from-background/70 via-background/50 to-background/70 dark:from-background/85 dark:via-background/70 dark:to-background/85" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm shadow-lg">
                <SparklesIcon className="size-4 text-primary" />
                <span className="text-muted-fg">Platform Undangan Digital Terpercaya</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-6 font-bold text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Buat Undangan Digital yang{" "}
                <span className="text-primary">Berkesan & Mudah Dibagikan</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-8 text-lg text-muted-fg sm:text-xl">
                Undangan digital modern dengan personalisasi link untuk setiap tamu.
                Praktis, elegan, dan ramah lingkungan.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">Mulai Buat Undangan</Link>
                </Button>
                <Button size="lg" intent="outline" asChild>
                  <Link href="#templates">Lihat Template</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-fg">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="size-5 text-primary" />
                  <span>Gratis Memulai</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="size-5 text-primary" />
                  <span>Siap dalam Hitungan Menit</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative overflow-hidden py-24 bg-muted/30">
        {/* decorative dots */}
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <Container className="relative">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Cara Kerja
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Semudah 1 – 2 – 3</h2>
              <p className="mx-auto max-w-xl text-muted-fg">
                Hanya 3 langkah mudah untuk membuat undangan digital yang sempurna
              </p>
            </div>
          </Reveal>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* connector line desktop */}
            <div className="absolute top-10 left-1/6 right-1/6 hidden h-px bg-linear-to-r from-transparent via-primary/30 to-transparent md:block" />

            {[
              { n: "01", icon: PaintBrushIcon, title: "Pilih Template", desc: "Pilih dari berbagai template undangan yang elegan dan modern sesuai tema acara Anda." },
              { n: "02", icon: SparklesIcon, title: "Kustomisasi", desc: "Isi detail acara dan personalisasi link untuk setiap tamu undangan dengan mudah." },
              { n: "03", icon: BellAlertIcon, title: "Bagikan & Kelola", desc: "Bagikan link personal ke tamu dan pantau konfirmasi kehadiran secara real-time." },
            ].map(({ n, icon: Icon, title, desc }, i) => (
              <Reveal key={n} delay={i * 120} direction="up">
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 transition-all group-hover:bg-primary group-hover:ring-primary">
                      <Icon className="size-8 text-primary transition-colors group-hover:text-primary-fg" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-fg">
                      {n}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-xl">{title}</h3>
                  <p className="text-muted-fg text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-24">
        <Container>
          <Reveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Kategori
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Pilih Kategori Acara Anda</h2>
              <p className="mx-auto max-w-2xl text-muted-fg">
                Template undangan untuk berbagai jenis acara, dari pernikahan hingga corporate event
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.id} delay={i * 80} direction="up">
                <CategoryCard category={category} href={`/templates/${category.slug}`} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TEMPLATE SHOWCASE ────────────────────────────────────────────── */}
      <section id="templates" className="relative overflow-hidden py-24 bg-muted/30">
        {/* background gradient blobs */}
        <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-20 size-96 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Template
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Template Siap Pakai</h2>
              <p className="mx-auto max-w-2xl text-muted-fg">
                Klik "Preview" untuk melihat langsung tampilan undangan sebelum memilih
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t, i) => (
              <Reveal key={t.slug} delay={i * 100} direction="up">
                <div className={`group relative overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                  {/* Gradient preview area */}
                  <div className={`relative flex h-56 items-center justify-center overflow-hidden ${t.bg}`}>
                    <div className={`absolute inset-0 bg-linear-to-br ${t.accent} opacity-10`} />
                    {/* Mock phone frame */}
                    <div className="relative z-10 h-40 w-24 overflow-hidden rounded-2xl border-4 border-white/60 bg-white shadow-2xl dark:border-white/20">
                      <div className={`h-full w-full bg-linear-to-br ${t.accent} opacity-80`} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
                        <div className="h-1.5 w-10 rounded-full bg-white/70" />
                        <div className="h-1 w-8 rounded-full bg-white/50" />
                        <div className="mt-2 h-1 w-12 rounded-full bg-white/50" />
                        <div className="h-1 w-10 rounded-full bg-white/50" />
                        <div className="mt-3 h-5 w-14 rounded-full bg-white/70" />
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                      <Button
                        className="translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                        onPress={() => setPreviewTemplate({ slug: t.slug, name: t.name })}
                      >
                        <EyeIcon className="mr-1.5 size-4" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{t.name}</h3>
                        <p className="text-muted-fg text-xs">{t.category}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${t.badgeColor}`}>
                        {t.badge}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-muted-fg leading-relaxed">{t.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        intent="outline"
                        className="flex-1"
                        onPress={() => setPreviewTemplate({ slug: t.slug, name: t.name })}
                      >
                        <EyeIcon className="mr-1.5 size-3.5" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link href="/register">Gunakan</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <Button size="lg" intent="outline" asChild>
                <Link href="/templates">Lihat Semua Template →</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="relative py-24">
        <Container>
          <Reveal>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Fitur
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Fitur Unggulan lemparsini.com</h2>
              <p className="mx-auto max-w-2xl text-muted-fg">
                Platform lengkap dengan berbagai fitur untuk membuat acara Anda lebih berkesan
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: LinkIcon, title: "Link Personal untuk Tamu", desc: "Setiap tamu mendapatkan link undangan personal dengan nama mereka. Lebih eksklusif dan berkesan.", color: "text-blue-500 bg-blue-500/10" },
              { icon: UserGroupIcon, title: "Manajemen Tamu", desc: "Kelola daftar tamu dengan mudah. Import dari Excel, edit, dan kirim undangan secara massal.", color: "text-violet-500 bg-violet-500/10" },
              { icon: ChartBarIcon, title: "Analytics Real-time", desc: "Pantau siapa yang sudah membuka undangan dan konfirmasi kehadiran secara langsung.", color: "text-emerald-500 bg-emerald-500/10" },
              { icon: DevicePhoneMobileIcon, title: "Desain Mobile-First", desc: "Tampilan optimal di semua perangkat. Undangan Anda terlihat sempurna di smartphone tamu.", color: "text-rose-500 bg-rose-500/10" },
              { icon: PaintBrushIcon, title: "Kustomisasi Penuh", desc: "Sesuaikan warna, foto, musik, dan teks undangan sesuai selera dan tema acara Anda.", color: "text-amber-500 bg-amber-500/10" },
              { icon: BellAlertIcon, title: "Notifikasi RSVP", desc: "Dapatkan notifikasi real-time setiap ada tamu yang konfirmasi kehadiran atau meninggalkan pesan.", color: "text-cyan-500 bg-cyan-500/10" },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <Reveal key={title} delay={i * 80} direction="up">
                <Card className="group h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className={`mb-4 flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${color}`}>
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative overflow-hidden py-24 bg-muted/30">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <Container>
          <Reveal>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Harga
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Paket Harga yang Fleksibel</h2>
              <p className="mx-auto max-w-2xl text-muted-fg">
                Pilih paket yang sesuai dengan kebutuhan acara Anda
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
            {/* Free */}
            <Reveal delay={0} direction="up">
              <Card className="border-2 transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Gratis</CardTitle>
                  <div className="mt-4">
                    <span className="font-bold text-4xl">Rp 0</span>
                    <span className="text-muted-fg">/selamanya</span>
                  </div>
                  <CardDescription className="mt-3">Cocok untuk acara kecil dan mencoba platform kami</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["1 Template Basic", "Maksimal 50 Tamu", "Link Personal untuk Tamu", "Fitur RSVP Basic"].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-muted" />
                      <span className="text-sm text-muted-fg">Watermark lemparsini.com</span>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" intent="outline" asChild>
                    <Link href="/register">Mulai Gratis</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>

            {/* Basic - highlighted */}
            <Reveal delay={100} direction="up">
              <div className="relative">
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-fg shadow-lg">
                    ✨ Terpopuler
                  </span>
                </div>
                <Card className="border-2 border-primary shadow-xl transition-all hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Basic</CardTitle>
                    <div className="mt-4">
                      <span className="font-bold text-4xl">Rp 99.000</span>
                      <span className="text-muted-fg">/undangan</span>
                    </div>
                    <CardDescription className="mt-3">Sempurna untuk acara menengah dengan fitur lengkap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {["Akses Semua Template", "Maksimal 200 Tamu", "Link Personal untuk Tamu", "RSVP & Analytics Dashboard", "Kustomisasi Penuh", "Tanpa Watermark", "Email Support"].map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full" asChild>
                      <Link href="/register">Pilih Basic</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </Reveal>

            {/* Premium */}
            <Reveal delay={200} direction="up">
              <Card className="border-2 transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <div className="mt-4">
                    <span className="font-bold text-4xl">Rp 199.000</span>
                    <span className="text-muted-fg">/undangan</span>
                  </div>
                  <CardDescription className="mt-3">Untuk acara besar dengan kebutuhan enterprise</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Semua Fitur Basic", "Tamu Unlimited", "Template Premium Eksklusif", "Advanced Analytics", "Custom Domain", "WhatsApp Blast Integration", "Priority Support 24/7", "Dedicated Account Manager"].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" intent="outline" asChild>
                    <Link href="/register">Pilih Premium</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24">
        <Container>
          <Reveal>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Testimoni
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Apa Kata Mereka?</h2>
              <p className="mx-auto max-w-2xl text-muted-fg">
                Ribuan pengguna sudah mempercayai lemparsini.com untuk acara spesial mereka
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { initials: "RA", name: "Rizki & Ayu", sub: "Pernikahan di Jakarta", text: "Platform yang sangat membantu! Undangan digital kami terlihat sangat elegan dan fitur link personal untuk tamu sangat memudahkan. Terima kasih lemparsini.com!" },
              { initials: "DM", name: "Dimas Prasetyo", sub: "Ulang Tahun Ke-30", text: "Fitur RSVP otomatis sangat membantu! Saya bisa langsung tahu siapa saja yang akan hadir tanpa harus tanya satu-satu. Dashboard analytics-nya juga sangat informatif." },
              { initials: "SF", name: "Siti Fatimah", sub: "Aqiqah di Bandung", text: "Template untuk aqiqah sangat menarik dan Islami. Proses pembuatannya juga sangat cepat, hanya butuh beberapa menit saja. Sangat recommended!" },
            ].map(({ initials, name, sub, text }, i) => (
              <Reveal key={name} delay={i * 100} direction="up">
                <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex-1">
                    <div className="mb-3 flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <StarIcon key={s} className="size-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <CardDescription className="text-base leading-relaxed text-fg">"{text}"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-sm text-primary">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{name}</p>
                        <p className="text-muted-fg text-xs">{sub}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/30">
        <Container>
          <Reveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                FAQ
              </span>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">Pertanyaan yang Sering Diajukan</h2>
            </div>
          </Reveal>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              { q: "Bagaimana cara membuat undangan digital?", a: "Sangat mudah! Daftar akun gratis, pilih template yang Anda suka, isi detail acara Anda, tambahkan daftar tamu, dan undangan Anda siap dibagikan!" },
              { q: "Apakah saya bisa menggunakan domain sendiri?", a: "Ya! Fitur custom domain tersedia di paket Premium. Anda bisa menggunakan domain seperti undangan.namaanda.com untuk undangan Anda." },
              { q: "Berapa lama undangan bisa diakses?", a: "Undangan Anda akan tetap aktif hingga 30 hari setelah tanggal acara. Setelah itu, Anda bisa memperpanjang atau mengunduh data tamu Anda." },
              { q: "Apakah ada batas jumlah undangan yang bisa dibuat?", a: "Tidak ada batasan! Anda bisa membuat undangan sebanyak yang Anda butuhkan. Setiap undangan dikenakan biaya sesuai paket yang dipilih." },
            ].map(({ q, a }, i) => (
              <Reveal key={q} delay={i * 60} direction="up">
                <Card className="transition-all hover:border-primary/50 hover:shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">{q}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{a}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-primary/5 to-primary/10" />
        <div className="pointer-events-none absolute left-1/4 top-0 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 size-64 rounded-full bg-primary/10 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
                Siap Membuat Undangan Digital yang Berkesan?
              </h2>
              <p className="mb-8 text-lg text-muted-fg">
                Bergabung dengan ribuan pengguna yang sudah mempercayai platform kami untuk acara spesial mereka.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">Daftar Gratis Sekarang</Link>
                </Button>
                <Button size="lg" intent="outline" asChild>
                  <Link href="#templates">Lihat Template</Link>
                </Button>
              </div>
              <p className="mt-6 text-muted-fg text-sm">
                Tidak perlu kartu kredit • Gratis selamanya • Setup dalam 5 menit
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── PREVIEW MODAL ────────────────────────────────────────────────── */}
      {previewTemplate && (
        <TemplatePreviewModal
          slug={previewTemplate.slug}
          name={previewTemplate.name}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </>
  )
}

Home.layout = (page: any) => <PublicLayout children={page} />
