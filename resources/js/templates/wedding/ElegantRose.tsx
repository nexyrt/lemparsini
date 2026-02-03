import { useState, useEffect, useRef } from 'react'

interface DemoData {
  bride: {
    name: string
    fullName: string
    father: string
    mother: string
  }
  groom: {
    name: string
    fullName: string
    father: string
    mother: string
  }
  event: {
    akadDate: string
    akadTime: string
    resepsiDate: string
    resepsiTime: string
    venue: string
    address: string
    mapUrl: string
  }
  gallery: string[]
  quranVerse: {
    arabic: string
    translation: string
    surah: string
  }
  guestName: string
}

interface ElegantRoseProps {
  data: DemoData
  isPreview?: boolean
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Floating rose petals component
function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-petal"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${12 + Math.random() * 8}s`,
          }}
        >
          <svg
            className="w-6 h-6 text-rose-300/60"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: `rotate(${Math.random() * 360}deg)` }}
          >
            <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 9.5 12 12 14C14.5 12 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes float-petal {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) translateX(100px);
            opacity: 0;
          }
        }
        .animate-float-petal {
          animation: float-petal linear infinite;
        }
      `}</style>
    </div>
  )
}

// Floral ornament SVG
function FloralOrnament({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 80 Q50 20, 100 50 Q150 80, 180 20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-rose-300"
      />
      <circle cx="30" cy="70" r="8" fill="currentColor" className="text-rose-400/50" />
      <circle cx="60" cy="40" r="6" fill="currentColor" className="text-rose-300/50" />
      <circle cx="100" cy="50" r="10" fill="currentColor" className="text-rose-400/60" />
      <circle cx="140" cy="45" r="7" fill="currentColor" className="text-rose-300/50" />
      <circle cx="170" cy="30" r="9" fill="currentColor" className="text-rose-400/50" />
      {/* Leaves */}
      <ellipse cx="45" cy="55" rx="12" ry="5" fill="currentColor" className="text-green-300/40" transform="rotate(-30 45 55)" />
      <ellipse cx="80" cy="45" rx="10" ry="4" fill="currentColor" className="text-green-300/40" transform="rotate(20 80 45)" />
      <ellipse cx="120" cy="48" rx="11" ry="4" fill="currentColor" className="text-green-300/40" transform="rotate(-15 120 48)" />
      <ellipse cx="155" cy="38" rx="10" ry="4" fill="currentColor" className="text-green-300/40" transform="rotate(25 155 38)" />
    </svg>
  )
}

// Decorative frame for photos
function PhotoFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner ornaments */}
      <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-rose-300 rounded-tl-lg" />
      <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-rose-300 rounded-tr-lg" />
      <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-rose-300 rounded-bl-lg" />
      <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-rose-300 rounded-br-lg" />
      {children}
    </div>
  )
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {[
        { value: timeLeft.days, label: 'Hari' },
        { value: timeLeft.hours, label: 'Jam' },
        { value: timeLeft.minutes, label: 'Menit' },
        { value: timeLeft.seconds, label: 'Detik' },
      ].map((item, index) => (
        <div key={item.label} className="text-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 border border-white/30 shadow-lg"
            style={{
              animation: 'pulse-soft 2s ease-in-out infinite',
              animationDelay: `${index * 0.2}s`
            }}
          >
            <span className="text-2xl sm:text-3xl font-bold text-white">{String(item.value).padStart(2, '0')}</span>
          </div>
          <span className="text-xs sm:text-sm text-white/90 font-medium">{item.label}</span>
        </div>
      ))}
      <style>{`
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  )
}

// Envelope opening animation for cover
function EnvelopeCover({ onOpen, data }: { onOpen: () => void; data: DemoData }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(onOpen, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-rose-50 to-amber-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23be123c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating petals in background */}
      <FloatingPetals />

      {/* Main card */}
      <div
        className={`relative z-20 w-full max-w-md transition-all duration-700 ${isOpening ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
      >
        {/* Decorative top ornament */}
        <FloralOrnament className="w-48 mx-auto mb-4 opacity-60" />

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-rose-100">
          {/* Inner decorative border */}
          <div className="border-2 border-rose-200/50 rounded-2xl p-6 sm:p-8">

            <p className="text-rose-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-medium">
              The Wedding of
            </p>

            {/* Names with elegant styling */}
            <div className="mb-6">
              <h1
                className="font-serif text-4xl sm:text-5xl text-rose-800 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.bride.name}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-300" />
                <span className="text-2xl text-rose-400">&</span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-300" />
              </div>
              <h1
                className="font-serif text-4xl sm:text-5xl text-rose-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.groom.name}
              </h1>
            </div>

            {/* Date */}
            <p className="text-rose-600 text-sm mb-8">{formatDate(data.event.akadDate)}</p>

            {/* Guest Name Box */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-5 mb-8 border border-rose-100">
              <p className="text-xs text-rose-400 mb-1 tracking-wider uppercase">Kepada Yth.</p>
              <p className="text-lg sm:text-xl font-medium text-rose-800">{data.guestName}</p>
            </div>

            {/* Open Button with animation */}
            <button
              onClick={handleOpen}
              className="group relative bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Buka Undangan
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Decorative bottom ornament */}
        <FloralOrnament className="w-48 mx-auto mt-4 opacity-60" flip />
      </div>
    </div>
  )
}

export default function ElegantRose({ data, isPreview }: ElegantRoseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isPreview) {
      setShowContent(true)
    }
  }, [isPreview])

  const handleOpenInvitation = () => {
    setShowContent(true)
    setIsPlaying(true)
  }

  if (!showContent) {
    return <EnvelopeCover onOpen={handleOpenInvitation} data={data} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Music Player Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-110 active:scale-95"
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 py-20">
          <AnimatedSection>
            <FloralOrnament className="w-56 mx-auto mb-6 opacity-70" />
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-rose-400 text-sm tracking-[0.4em] uppercase mb-6 font-medium">
              We Are Getting Married
            </p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl text-rose-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {data.bride.name}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="flex items-center justify-center gap-6 my-6">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-rose-300" />
              <span className="text-4xl text-rose-400 font-light">&</span>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-rose-300" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={800}>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl text-rose-800 mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {data.groom.name}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={1000}>
            <p className="text-rose-600 text-xl font-medium">{formatDate(data.event.akadDate)}</p>
          </AnimatedSection>

          <AnimatedSection delay={1200}>
            <div className="mt-16 animate-bounce">
              <svg className="w-8 h-8 mx-auto text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quran Verse Section */}
      <section className="py-24 px-6 bg-white/60 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50" />

        <AnimatedSection className="max-w-2xl mx-auto text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-rose-100">
            <p
              className="text-2xl sm:text-3xl text-rose-800 leading-loose mb-6"
              dir="rtl"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {data.quranVerse.arabic}
            </p>
            <div className="w-24 h-[1px] bg-rose-200 mx-auto mb-6" />
            <p className="text-rose-600 italic text-lg mb-4">
              "{data.quranVerse.translation}"
            </p>
            <p className="text-rose-400 text-sm font-medium">{data.quranVerse.surah}</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Bride & Groom Section */}
      <section className="py-24 px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-3">Bride & Groom</p>
          <h2
            className="text-4xl text-rose-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mempelai
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Bride */}
            <AnimatedSection delay={200} className="text-center">
              <PhotoFrame className="w-52 h-52 mx-auto mb-8">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  <span className="text-7xl">👰</span>
                </div>
              </PhotoFrame>
              <h3
                className="text-2xl sm:text-3xl text-rose-800 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.bride.fullName}
              </h3>
              <p className="text-rose-400 text-sm mb-4 tracking-wider">Putri dari</p>
              <p className="text-rose-600">{data.bride.father}</p>
              <p className="text-rose-600">&</p>
              <p className="text-rose-600">{data.bride.mother}</p>
            </AnimatedSection>

            {/* Groom */}
            <AnimatedSection delay={400} className="text-center">
              <PhotoFrame className="w-52 h-52 mx-auto mb-8">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  <span className="text-7xl">🤵</span>
                </div>
              </PhotoFrame>
              <h3
                className="text-2xl sm:text-3xl text-rose-800 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.groom.fullName}
              </h3>
              <p className="text-rose-400 text-sm mb-4 tracking-wider">Putra dari</p>
              <p className="text-rose-600">{data.groom.father}</p>
              <p className="text-rose-600">&</p>
              <p className="text-rose-600">{data.groom.mother}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 relative overflow-hidden">
        {/* Decorative overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <AnimatedSection className="max-w-2xl mx-auto text-center relative z-10">
          <h2
            className="text-3xl sm:text-4xl text-white mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Menghitung Hari
          </h2>
          <CountdownTimer targetDate={data.event.akadDate} />
        </AnimatedSection>
      </section>

      {/* Event Details Section */}
      <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
        <AnimatedSection className="text-center mb-16">
          <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-3">Save The Date</p>
          <h2
            className="text-4xl text-rose-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Acara Pernikahan
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            <AnimatedSection delay={200}>
              <div className="bg-white rounded-3xl p-8 shadow-xl text-center border border-rose-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💍</span>
                </div>
                <h3
                  className="text-2xl text-rose-800 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Akad Nikah
                </h3>
                <p className="text-rose-600 font-medium mb-2">{formatDate(data.event.akadDate)}</p>
                <p className="text-rose-500 mb-6 text-lg">Pukul {data.event.akadTime} WIB</p>
                <div className="border-t border-rose-100 pt-6">
                  <p className="text-rose-700 font-medium text-lg">{data.event.venue}</p>
                  <p className="text-rose-500 text-sm mt-2">{data.event.address}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Resepsi */}
            <AnimatedSection delay={400}>
              <div className="bg-white rounded-3xl p-8 shadow-xl text-center border border-rose-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3
                  className="text-2xl text-rose-800 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Resepsi
                </h3>
                <p className="text-rose-600 font-medium mb-2">{formatDate(data.event.resepsiDate)}</p>
                <p className="text-rose-500 mb-6 text-lg">Pukul {data.event.resepsiTime} WIB - Selesai</p>
                <div className="border-t border-rose-100 pt-6">
                  <p className="text-rose-700 font-medium text-lg">{data.event.venue}</p>
                  <p className="text-rose-500 text-sm mt-2">{data.event.address}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Map Button */}
          <AnimatedSection delay={600} className="text-center mt-10">
            <a
              href={data.event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="font-medium">Lihat Lokasi di Maps</span>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-24 px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-3">RSVP</p>
          <h2
            className="text-4xl text-rose-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Konfirmasi Kehadiran
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200} className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
            <form className="space-y-5">
              <div>
                <label className="block text-rose-700 text-sm mb-2 font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-rose-700 text-sm mb-2 font-medium">Konfirmasi Kehadiran</label>
                <select className="w-full px-5 py-4 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all appearance-none bg-white">
                  <option value="">Pilih konfirmasi</option>
                  <option value="hadir">Hadir</option>
                  <option value="tidak">Tidak Hadir</option>
                  <option value="ragu">Masih Ragu-ragu</option>
                </select>
              </div>

              <div>
                <label className="block text-rose-700 text-sm mb-2 font-medium">Jumlah Tamu</label>
                <select className="w-full px-5 py-4 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all appearance-none bg-white">
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-xl hover:shadow-lg transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
              >
                Kirim Konfirmasi
              </button>
            </form>
          </div>
        </AnimatedSection>
      </section>

      {/* Wishes Section */}
      <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
        <AnimatedSection className="text-center mb-12">
          <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-3">Wishes</p>
          <h2
            className="text-4xl text-rose-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ucapan & Doa
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          <AnimatedSection delay={200}>
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-8 border border-rose-100">
              <form className="space-y-5">
                <div>
                  <label className="block text-rose-700 text-sm mb-2 font-medium">Nama</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-rose-700 text-sm mb-2 font-medium">Ucapan & Doa</label>
                  <textarea
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all resize-none"
                    placeholder="Tulis ucapan dan doa untuk kedua mempelai"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-xl hover:shadow-lg transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
                >
                  Kirim Ucapan
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* Sample wishes */}
          <div className="space-y-4">
            {[
              { name: 'Ahmad Wijaya', message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.', time: '2 jam yang lalu' },
              { name: 'Siti Nurhaliza', message: 'Barakallahu lakuma wa baraka alaikuma wa jamaaa bainakuma fi khair. Selamat ya!', time: '5 jam yang lalu' },
              { name: 'Budi Santoso', message: 'Happy wedding! Semoga langgeng sampai kakek nenek ya. Best wishes!', time: '1 hari yang lalu' },
            ].map((wish, index) => (
              <AnimatedSection key={index} delay={400 + index * 100}>
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-rose-50 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center text-rose-700 font-medium">
                      {wish.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-rose-800">{wish.name}</p>
                      <p className="text-xs text-rose-400">{wish.time}</p>
                    </div>
                  </div>
                  <p className="text-rose-600 text-sm leading-relaxed">{wish.message}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <FloralOrnament className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <p className="mb-2 text-white/90">Merupakan suatu kehormatan dan kebahagiaan bagi kami</p>
          <p className="mb-6 text-white/90">apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu</p>
          <div className="w-32 h-[1px] bg-white/30 mx-auto my-8" />
          <p
            className="text-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {data.bride.name} & {data.groom.name}
          </p>
          <p className="text-white/70 text-sm">
            Dibuat dengan <span className="text-red-300">❤</span> di lemparsini.com
          </p>
        </div>
      </section>
    </div>
  )
}
