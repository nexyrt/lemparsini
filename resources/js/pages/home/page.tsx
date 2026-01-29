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
  StarIcon
} from "@heroicons/react/24/outline"

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

export default function Home({ categories }: HomeProps) {
  return (
    <>
      <Head title="VEAST - Undangan Digital Modern & Elegan" />

      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        {/* Background with Video */}
        <div className="absolute inset-0 z-0">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              // Hide video element if it fails to load and show gradient instead
              e.currentTarget.style.display = 'none'
            }}
          >
            <source src="/videos/8776896-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>

          {/* Overlay for better text readability - less opacity so video is visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/70 dark:from-background/85 dark:via-background/70 dark:to-background/85" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm shadow-lg">
              <SparklesIcon className="size-4 text-primary" />
              <span className="font-medium">Platform Undangan Digital Terpercaya</span>
            </div>

            <h1 className="mb-6 font-bold text-4xl text-fg leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Buat Undangan Digital yang
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Berkesan & Mudah Dibagikan
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-fg sm:text-xl">
              Undangan digital modern dengan personalisasi link untuk setiap tamu. Praktis, elegan, dan ramah lingkungan.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">
                  Mulai Buat Undangan
                </Link>
              </Button>
              <Button size="lg" intent="outline" asChild>
                <Link href="#categories">
                  Lihat Template
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-3 rounded-lg bg-background/50 p-3 backdrop-blur-sm">
                <CheckCircleIcon className="size-5 text-primary" />
                <span className="text-sm text-muted-fg">Link Personal untuk Tamu</span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-lg bg-background/50 p-3 backdrop-blur-sm">
                <CheckCircleIcon className="size-5 text-primary" />
                <span className="text-sm text-muted-fg">RSVP Otomatis</span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-lg bg-background/50 p-3 backdrop-blur-sm">
                <ClockIcon className="size-5 text-primary" />
                <span className="text-sm text-muted-fg">Siap dalam Hitungan Menit</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Cara Kerja Platform Kami
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Hanya 3 langkah mudah untuk membuat undangan digital yang sempurna
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-2xl">1</span>
              </div>
              <h3 className="mb-2 font-semibold text-xl">Pilih Template</h3>
              <p className="text-muted-fg">
                Pilih dari berbagai template undangan yang elegan dan modern sesuai dengan tema acara Anda
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-2xl">2</span>
              </div>
              <h3 className="mb-2 font-semibold text-xl">Kustomisasi Undangan</h3>
              <p className="text-muted-fg">
                Isi detail acara Anda dan personalisasi link untuk setiap tamu undangan dengan mudah
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-2xl">3</span>
              </div>
              <h3 className="mb-2 font-semibold text-xl">Bagikan & Kelola</h3>
              <p className="text-muted-fg">
                Bagikan link personal ke tamu dan pantau konfirmasi kehadiran secara real-time
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Pilih Kategori Acara Anda
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Template undangan untuk berbagai jenis acara, dari pernikahan hingga corporate event
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/templates/${category.slug}`}>
                <Card className="group h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                        {category.icon}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button intent="ghost" size="sm" className="group-hover:bg-primary/10">
                      Lihat Template →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Template Gallery with Skeleton */}
      <section id="templates" className="py-20 bg-muted/30">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Template Undangan Terpopuler
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Desain undangan digital yang elegan dan mudah dikustomisasi
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Card key={item} className="group overflow-hidden transition-all hover:shadow-lg">
                {/* Skeleton Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 via-muted to-primary/10 animate-pulse" />
                <CardContent className="p-4">
                  {/* Skeleton Title */}
                  <div className="mb-2 h-5 w-3/4 rounded bg-muted animate-pulse" />
                  {/* Skeleton Description */}
                  <div className="mb-3 h-4 w-full rounded bg-muted/70 animate-pulse" />
                  <div className="mb-4 h-4 w-2/3 rounded bg-muted/70 animate-pulse" />
                  {/* Skeleton Badge */}
                  <div className="inline-flex h-6 w-16 rounded-full bg-primary/10 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" intent="outline" asChild>
              <Link href="/templates">
                Lihat Semua Template
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Fitur Unggulan VEAST
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Platform lengkap dengan berbagai fitur untuk membuat acara Anda lebih berkesan
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <LinkIcon className="size-6 text-primary" />
                </div>
                <CardTitle>Link Personal untuk Tamu</CardTitle>
                <CardDescription>
                  Setiap tamu mendapatkan link undangan personal dengan nama mereka. Lebih eksklusif dan berkesan.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <UserGroupIcon className="size-6 text-primary" />
                </div>
                <CardTitle>Manajemen Tamu</CardTitle>
                <CardDescription>
                  Kelola daftar tamu dengan mudah. Import dari Excel, edit, dan kirim undangan secara massal.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <ChartBarIcon className="size-6 text-primary" />
                </div>
                <CardTitle>RSVP & Analytics</CardTitle>
                <CardDescription>
                  Lacak konfirmasi kehadiran tamu secara real-time dengan dashboard analytics yang informatif.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <DevicePhoneMobileIcon className="size-6 text-primary" />
                </div>
                <CardTitle>Responsif & Mobile-First</CardTitle>
                <CardDescription>
                  Undangan tampil sempurna di semua perangkat. Pengalaman optimal untuk mobile dan desktop.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <PaintBrushIcon className="size-6 text-primary" />
                </div>
                <CardTitle>Kustomisasi Mudah</CardTitle>
                <CardDescription>
                  Editor drag-and-drop yang intuitif. Ubah warna, font, gambar, dan konten tanpa perlu coding.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <BellAlertIcon className="size-6 text-primary" />
                </div>
                <CardTitle>Notifikasi Real-time</CardTitle>
                <CardDescription>
                  Dapatkan notifikasi instant setiap ada tamu yang mengkonfirmasi kehadiran atau membuka undangan.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Paket Harga yang Fleksibel
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Pilih paket yang sesuai dengan kebutuhan acara Anda
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Gratis</CardTitle>
                <div className="mt-4">
                  <span className="font-bold text-4xl">Rp 0</span>
                  <span className="text-muted-fg">/selamanya</span>
                </div>
                <CardDescription className="mt-4">
                  Cocok untuk acara kecil dan mencoba platform kami
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">1 Template Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Maksimal 50 Tamu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Link Personal untuk Tamu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Fitur RSVP Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-muted mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-fg">Watermark VEAST</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" intent="outline" asChild>
                  <Link href="/register">
                    Mulai Gratis
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Basic Plan */}
            <Card className="border-2 border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 font-semibold text-primary-fg text-sm">
                  Terpopuler
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Basic</CardTitle>
                <div className="mt-4">
                  <span className="font-bold text-4xl">Rp 99.000</span>
                  <span className="text-muted-fg">/undangan</span>
                </div>
                <CardDescription className="mt-4">
                  Sempurna untuk acara menengah dengan fitur lengkap
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Akses Semua Template</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Maksimal 200 Tamu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Link Personal untuk Tamu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">RSVP & Analytics Dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Kustomisasi Penuh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Tanpa Watermark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Email Support</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" asChild>
                  <Link href="/register">
                    Pilih Basic
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="mt-4">
                  <span className="font-bold text-4xl">Rp 199.000</span>
                  <span className="text-muted-fg">/undangan</span>
                </div>
                <CardDescription className="mt-4">
                  Untuk acara besar dengan kebutuhan enterprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Semua Fitur Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Tamu Unlimited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Template Premium Eksklusif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced Analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Custom Domain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">WhatsApp Blast Integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority Support 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dedicated Account Manager</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" intent="outline" asChild>
                  <Link href="/register">
                    Pilih Premium
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Apa Kata Mereka?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Ribuan pengguna sudah mempercayai VEAST untuk acara spesial mereka
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="size-5 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed text-fg">
                  "Platform yang sangat membantu! Undangan digital kami terlihat sangat elegan dan fitur link personal untuk tamu sangat memudahkan. Terima kasih VEAST!"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    RA
                  </div>
                  <div>
                    <p className="font-semibold">Rizki & Ayu</p>
                    <p className="text-muted-fg text-sm">Pernikahan di Jakarta</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="size-5 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed text-fg">
                  "Fitur RSVP otomatis sangat membantu! Saya bisa langsung tahu siapa saja yang akan hadir tanpa harus tanya satu-satu. Dashboard analytics-nya juga sangat informatif."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    DM
                  </div>
                  <div>
                    <p className="font-semibold">Dimas Prasetyo</p>
                    <p className="text-muted-fg text-sm">Ulang Tahun Ke-30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="size-5 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed text-fg">
                  "Template untuk aqiqah sangat menarik dan Islami. Proses pembuatannya juga sangat cepat, hanya butuh beberapa menit saja. Sangat recommended!"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    SF
                  </div>
                  <div>
                    <p className="font-semibold">Siti Fatimah</p>
                    <p className="text-muted-fg text-sm">Aqiqah di Bandung</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-fg">
              Temukan jawaban untuk pertanyaan umum tentang platform kami
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bagaimana cara membuat undangan digital?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Sangat mudah! Daftar akun gratis, pilih template yang Anda suka, isi detail acara Anda, tambahkan daftar tamu, dan undangan Anda siap dibagikan!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apakah saya bisa menggunakan domain sendiri?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Ya! Fitur custom domain tersedia di paket Premium. Anda bisa menggunakan domain seperti undangan.namaanda.com untuk undangan Anda.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Berapa lama undangan bisa diakses?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Undangan Anda akan tetap aktif hingga 30 hari setelah tanggal acara. Setelah itu, Anda bisa memperpanjang atau mengunduh data tamu Anda.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apakah ada batas jumlah undangan yang bisa dibuat?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Tidak ada batasan! Anda bisa membuat undangan sebanyak yang Anda butuhkan. Setiap undangan dikenakan biaya sesuai paket yang dipilih.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Siap Membuat Undangan Digital yang Berkesan?
            </h2>
            <p className="mb-8 text-lg text-muted-fg">
              Bergabung dengan ribuan pengguna yang sudah mempercayai platform kami untuk acara spesial mereka. Mulai gratis sekarang!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">
                  Daftar Gratis Sekarang
                </Link>
              </Button>
              <Button size="lg" intent="outline" asChild>
                <Link href="/#categories">
                  Lihat Template
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-muted-fg text-sm">
              Tidak perlu kartu kredit • Gratis selamanya • Setup dalam 5 menit
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}

Home.layout = (page: any) => <PublicLayout children={page} />
