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

interface ClassicWhiteProps {
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

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="h-px w-16 bg-stone-300" />
      <svg viewBox="0 0 24 24" className="size-4 text-stone-400" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
      <div className="h-px w-16 bg-stone-300" />
    </div>
  )
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex size-16 items-center justify-center border border-stone-300 bg-white text-2xl font-light text-stone-700">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-widest text-stone-400">{label}</span>
    </div>
  )
}

// Unsplash images
const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
  bride: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&auto=format&fit=crop&q=80',
  groom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  couple1: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
  couple2: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
  couple3: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&auto=format&fit=crop&q=80',
}

export default function ClassicWhite({ data, isPreview = false }: ClassicWhiteProps) {
  const [opened, setOpened] = useState(false)
  const countdown = useCountdown(data.event.akadDate)

  return (
    <div className="min-h-screen bg-white font-light" style={{ fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1.2s ease forwards; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleIn { animation: scaleIn 1s ease forwards; }
      `}</style>

      {/* ── COVER ── */}
      {!opened ? (
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          {/* Background */}
          <img
            src={UNSPLASH.hero}
            alt="Wedding"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/60" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-8 text-center animate-fadeIn">
            <p className="font-lato mb-6 text-xs uppercase tracking-[0.3em] text-stone-500">
              Undangan Pernikahan
            </p>

            <div className="mb-2 h-px w-12 bg-stone-400" />
            <h1 className="font-cormorant my-4 text-5xl font-light italic text-stone-700 sm:text-6xl">
              {data.bride.name}
            </h1>
            <div className="font-cormorant my-1 text-2xl text-stone-400">&amp;</div>
            <h1 className="font-cormorant my-4 text-5xl font-light italic text-stone-700 sm:text-6xl">
              {data.groom.name}
            </h1>
            <div className="mb-6 h-px w-12 bg-stone-400" />

            <p className="font-lato mb-8 text-xs tracking-widest text-stone-500">
              {formatDate(data.event.akadDate)}
            </p>

            <button
              onClick={() => setOpened(true)}
              className="font-lato border border-stone-400 bg-white/80 px-8 py-3 text-xs uppercase tracking-[0.25em] text-stone-600 transition-all hover:bg-stone-700 hover:text-white"
            >
              Buka Undangan
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">

          {/* ── HEADER SECTION ── */}
          <section className="relative overflow-hidden bg-stone-50 py-20 text-center">
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #78716c 0px, #78716c 1px, transparent 0px, transparent 50%)',
                backgroundSize: '20px 20px'
              }} />
            </div>
            <div className="relative z-10">
              <p className="font-lato mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
                The Wedding of
              </p>
              <h1 className="font-cormorant text-5xl font-light italic text-stone-700 sm:text-6xl md:text-7xl">
                {data.bride.name} & {data.groom.name}
              </h1>
              <Divider />
              <p className="font-lato text-sm text-stone-500 tracking-widest">
                {formatDate(data.event.akadDate)}
              </p>
            </div>
          </section>

          {/* ── CANVA EMBED ── */}
          <section className="bg-white py-16">
            <div className="mx-auto max-w-4xl px-6">
              <Reveal>
                <p className="font-lato mb-8 text-center text-xs uppercase tracking-[0.3em] text-stone-400">
                  Desain Undangan
                </p>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '56.2225%',
                  paddingBottom: 0,
                  boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                  marginTop: '1.6em',
                  marginBottom: '0.9em',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  willChange: 'transform',
                }}>
                  <iframe
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      border: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                    src="https://www.canva.com/design/DAHBZMSpnWo/86v1cXgL0N_T7LZ1vJ9vSA/view?embed"
                    allowFullScreen
                    allow="fullscreen"
                    title="Classic White Wedding Invitation"
                  />
                </div>
                <p className="font-lato text-center text-xs text-stone-400">
                  <a
                    href="https://www.canva.com/design/DAHBZMSpnWo/86v1cXgL0N_T7LZ1vJ9vSA/view?utm_content=DAHBZMSpnWo&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-stone-600"
                  >
                    Lihat di Canva
                  </a>
                  {' '}by ahmad abdillah
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── QURAN VERSE ── */}
          <section className="bg-stone-50 py-16 text-center">
            <Reveal>
              <div className="mx-auto max-w-xl px-6">
                <p className="mb-4 text-2xl leading-relaxed text-stone-600" dir="rtl">
                  {data.quranVerse.arabic}
                </p>
                <Divider />
                <p className="font-lato text-sm leading-relaxed text-stone-500 italic">
                  "{data.quranVerse.translation}"
                </p>
                <p className="font-lato mt-3 text-xs text-stone-400">{data.quranVerse.surah}</p>
              </div>
            </Reveal>
          </section>

          {/* ── COUPLE ── */}
          <section className="bg-white py-16">
            <div className="mx-auto max-w-3xl px-6">
              <Reveal>
                <p className="font-lato mb-12 text-center text-xs uppercase tracking-[0.3em] text-stone-400">
                  Mempelai
                </p>
              </Reveal>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Bride */}
                <Reveal>
                  <div className="text-center">
                    <div className="mx-auto mb-6 size-40 overflow-hidden border-4 border-stone-100 shadow-md">
                      <img src={UNSPLASH.bride} alt="Bride" className="h-full w-full object-cover" />
                    </div>
                    <p className="font-lato mb-1 text-xs uppercase tracking-widest text-stone-400">Mempelai Wanita</p>
                    <h2 className="font-cormorant mb-2 text-3xl italic text-stone-700">{data.bride.fullName}</h2>
                    <p className="font-lato text-sm text-stone-500">
                      Putri dari {data.bride.father}<br />& {data.bride.mother}
                    </p>
                  </div>
                </Reveal>
                {/* Groom */}
                <Reveal>
                  <div className="text-center">
                    <div className="mx-auto mb-6 size-40 overflow-hidden border-4 border-stone-100 shadow-md">
                      <img src={UNSPLASH.groom} alt="Groom" className="h-full w-full object-cover" />
                    </div>
                    <p className="font-lato mb-1 text-xs uppercase tracking-widest text-stone-400">Mempelai Pria</p>
                    <h2 className="font-cormorant mb-2 text-3xl italic text-stone-700">{data.groom.fullName}</h2>
                    <p className="font-lato text-sm text-stone-500">
                      Putra dari {data.groom.father}<br />& {data.groom.mother}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── COUNTDOWN ── */}
          <section className="bg-stone-700 py-16 text-center">
            <Reveal>
              <p className="font-lato mb-8 text-xs uppercase tracking-[0.3em] text-stone-300">
                Menuju Hari Bahagia
              </p>
              <div className="flex justify-center gap-4">
                <CountdownBox value={countdown.days} label="Hari" />
                <CountdownBox value={countdown.hours} label="Jam" />
                <CountdownBox value={countdown.minutes} label="Menit" />
                <CountdownBox value={countdown.seconds} label="Detik" />
              </div>
            </Reveal>
          </section>

          {/* ── EVENTS ── */}
          <section className="bg-white py-16">
            <div className="mx-auto max-w-2xl px-6">
              <Reveal>
                <p className="font-lato mb-12 text-center text-xs uppercase tracking-[0.3em] text-stone-400">
                  Detail Acara
                </p>
              </Reveal>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Reveal>
                  <div className="border border-stone-200 p-8 text-center">
                    <p className="font-lato mb-3 text-xs uppercase tracking-widest text-stone-400">Akad Nikah</p>
                    <div className="mb-4 h-px w-8 mx-auto bg-stone-300" />
                    <p className="font-cormorant text-xl text-stone-700">{formatDate(data.event.akadDate)}</p>
                    <p className="font-lato mt-1 text-sm text-stone-500">{data.event.akadTime} WIB</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-stone-200 p-8 text-center">
                    <p className="font-lato mb-3 text-xs uppercase tracking-widest text-stone-400">Resepsi</p>
                    <div className="mb-4 h-px w-8 mx-auto bg-stone-300" />
                    <p className="font-cormorant text-xl text-stone-700">{formatDate(data.event.resepsiDate)}</p>
                    <p className="font-lato mt-1 text-sm text-stone-500">{data.event.resepsiTime} WIB</p>
                  </div>
                </Reveal>
              </div>
              <Reveal>
                <div className="mt-8 border border-stone-200 p-8 text-center">
                  <p className="font-lato mb-1 text-xs uppercase tracking-widest text-stone-400">Lokasi</p>
                  <p className="font-cormorant mt-3 text-xl text-stone-700">{data.event.venue}</p>
                  <p className="font-lato mt-1 text-sm text-stone-500">{data.event.address}</p>
                  <a
                    href={data.event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-lato mt-4 inline-block border border-stone-400 px-6 py-2 text-xs uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-700 hover:text-white"
                  >
                    Lihat Peta
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── GALLERY ── */}
          <section className="bg-stone-50 py-16">
            <div className="mx-auto max-w-4xl px-6">
              <Reveal>
                <p className="font-lato mb-12 text-center text-xs uppercase tracking-[0.3em] text-stone-400">
                  Galeri
                </p>
              </Reveal>
              <div className="grid grid-cols-3 gap-2">
                {[UNSPLASH.couple1, UNSPLASH.couple2, UNSPLASH.couple3].map((src, i) => (
                  <Reveal key={i}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── RSVP ── */}
          <section className="bg-white py-16">
            <div className="mx-auto max-w-md px-6">
              <Reveal>
                <div className="text-center">
                  <p className="font-lato mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
                    Konfirmasi Kehadiran
                  </p>
                  <Divider />
                  <p className="font-lato mb-8 text-sm text-stone-500">
                    Kehadiran Anda adalah kehormatan dan kebahagiaan bagi kami
                  </p>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    defaultValue={data.guestName}
                    className="font-lato w-full border-b border-stone-300 py-3 text-sm text-stone-600 placeholder-stone-400 focus:border-stone-600 focus:outline-none"
                  />
                  <div className="flex gap-4">
                    <button className="font-lato flex-1 border border-stone-700 bg-stone-700 py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-stone-900">
                      Hadir
                    </button>
                    <button className="font-lato flex-1 border border-stone-400 py-3 text-xs uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-100">
                      Tidak Hadir
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="bg-stone-800 py-12 text-center">
            <p className="font-cormorant text-3xl italic text-stone-300">
              {data.bride.name} & {data.groom.name}
            </p>
            <div className="mx-auto mt-4 h-px w-16 bg-stone-600" />
            <p className="font-lato mt-4 text-xs tracking-widest text-stone-500">
              {formatDate(data.event.akadDate)}
            </p>
            <p className="font-lato mt-8 text-xs text-stone-600">
              Made with ♥ by lemparsini.com
            </p>
          </footer>

        </div>
      )}
    </div>
  )
}
