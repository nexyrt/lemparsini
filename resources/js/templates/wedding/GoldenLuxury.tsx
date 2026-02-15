import { useState, useEffect, useRef } from 'react'

interface DemoData {
  bride: { name: string; fullName: string; father: string; mother: string }
  groom: { name: string; fullName: string; father: string; mother: string }
  event: {
    akadDate: string; akadTime: string
    resepsiDate: string; resepsiTime: string
    venue: string; address: string; mapUrl: string
  }
  gallery: string[]
  quranVerse: { arabic: string; translation: string; surah: string }
  guestName: string
}

interface GoldenLuxuryProps {
  data: DemoData
  isPreview?: boolean
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function useCountdown(targetDate: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setT({
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
  return t
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  )
}

const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070',
  bride: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&auto=format&fit=crop&q=80',
  groom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  couple1: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
  couple2: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
  couple3: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&auto=format&fit=crop&q=80',
}

export default function GoldenLuxury({ data, isPreview = false }: GoldenLuxuryProps) {
  const [opened, setOpened] = useState(false)
  const countdown = useCountdown(data.event.akadDate)
  const hashtag = `#${data.bride.name}And${data.groom.name}Forever`

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp 1.2s ease forwards; }
        .animate-fadeUp-delay { animation: fadeUp 1.2s ease 0.4s forwards; opacity: 0; }
        .animate-fadeUp-delay2 { animation: fadeUp 1.2s ease 0.8s forwards; opacity: 0; }
        @keyframes shimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .gold-line { background: linear-gradient(90deg, transparent, #c9a84c, transparent); height: 1px; }
        .gold-text { color: #c9a84c; }
        .gold-border { border-color: #c9a84c; }
        .gold-bg { background-color: #c9a84c; }
      `}</style>

      {/* ── COVER (kode Anda persis) ── */}
      {!opened ? (
        <section
          style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${UNSPLASH.hero}') no-repeat center center`,
            backgroundSize: 'cover',
            filter: 'grayscale(100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Names */}
          <div className="animate-fadeUp" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem', zIndex: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <h1 className="font-playfair" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 400, letterSpacing: '5px', textTransform: 'uppercase' }}>
              {data.bride.name}
            </h1>
            <span className="font-playfair animate-fadeUp-delay" style={{ fontStyle: 'italic', fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 400, margin: '0 10px' }}>
              &amp;
            </span>
            <h1 className="font-playfair" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 400, letterSpacing: '5px', textTransform: 'uppercase' }}>
              {data.groom.name}
            </h1>
          </div>

          {/* Button */}
          <button
            onClick={() => setOpened(true)}
            className="animate-fadeUp-delay2 font-montserrat"
            style={{
              padding: '12px 40px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1rem',
              letterSpacing: '2px',
              backdropFilter: 'blur(5px)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              marginTop: '80px',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)' }}
          >
            Klik Disini
          </button>

          {/* Footer info */}
          <div
            className="font-montserrat"
            style={{
              position: 'absolute', bottom: '40px', width: '90%',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontSize: '0.9rem', letterSpacing: '1px', fontWeight: 300,
            }}
          >
            <div>{formatDateShort(data.event.akadDate)}</div>
            <div>{hashtag}</div>
          </div>
        </section>
      ) : (
        <div>
          {/* ── HEADER (The Ceremony) ── */}
          <section style={{ backgroundColor: '#ebeae4', color: '#1a1a1a' }} className="py-16 px-5">
            <Reveal>
              <div style={{ maxWidth: '1000px', textAlign: 'center', margin: '0 auto' }}>
                <h1
                  className="font-playfair"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '60px', fontWeight: 400 }}
                >
                  The Ceremony
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
                  {/* Venue */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100px', height: '120px', marginBottom: '20px',
                      backgroundImage: "url('/images/icons/ballroom-hotel.png')",
                      backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                      filter: 'grayscale(1)',
                    }} />
                    <h2 className="font-playfair" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 400 }}>
                      {data.event.venue}
                    </h2>
                    <p className="font-montserrat" style={{ fontSize: '0.9rem', lineHeight: '1.6', fontWeight: 300, maxWidth: '260px' }}>
                      {data.event.address}
                    </p>
                  </div>

                  {/* Dress Code */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100px', height: '120px', marginBottom: '20px',
                      backgroundImage: "url('/images/icons/dress-code.png')",
                      backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                      filter: 'grayscale(1)',
                    }} />
                    <h2 className="font-playfair" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 400 }}>
                      Dress Code
                    </h2>
                    <p className="font-montserrat" style={{ fontSize: '0.9rem', lineHeight: '1.6', fontWeight: 300, maxWidth: '260px' }}>
                      Gunakan pakaian formal yang elegan. Disarankan menggunakan warna-warna pastel atau netral yang senada.
                    </p>
                  </div>

                  {/* Acara Setelah */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100px', height: '120px', marginBottom: '20px',
                      backgroundImage: "url('/images/icons/resepsi.png')",
                      backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                      filter: 'grayscale(1)',
                    }} />
                    <h2 className="font-playfair" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 400 }}>
                      Resepsi
                    </h2>
                    <p className="font-montserrat" style={{ fontSize: '0.9rem', lineHeight: '1.6', fontWeight: 300, maxWidth: '260px' }}>
                      Setelah akad, acara dilanjutkan dengan resepsi pernikahan. Pukul {data.event.resepsiTime} WIB di lokasi yang sama.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── SCHEDULE OF EVENTS ── */}
          <section style={{ backgroundColor: '#000', color: '#fff' }}>
            <div style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1200px',
              minHeight: '600px',
              padding: '80px 40px',
              gap: '60px',
              alignItems: 'center',
              margin: '0 auto',
              flexWrap: 'wrap',
            }}>
              {/* Left: text */}
              <Reveal direction="left" className="flex-1 min-w-70">
                <div>
                  <h1
                    className="font-playfair"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      marginBottom: '60px',
                      fontWeight: 400,
                    }}
                  >
                    Schedule<br />of Events
                  </h1>

                  {/* Timeline */}
                  <div style={{ width: '100%' }}>
                    {[
                      { time: `${data.event.akadTime} WIB`, activity: 'Kedatangan Tamu & Sambutan' },
                      { time: `${data.event.akadTime} WIB`, activity: 'Akad Nikah' },
                      { time: `${data.event.resepsiTime} WIB`, activity: 'Resepsi Pernikahan' },
                      { time: '—', activity: 'Sesi Foto Bersama' },
                    ].map(({ time, activity }, idx) => (
                      <div
                        key={idx}
                        className="font-montserrat"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '20px 0',
                          borderBottom: idx < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                          fontSize: '1rem',
                          letterSpacing: '1px',
                        }}
                      >
                        <span style={{ fontWeight: 400, width: '130px', color: '#c9a84c', flexShrink: 0 }}>
                          {time}
                        </span>
                        <span style={{ fontWeight: 300, textAlign: 'left', flex: 1, paddingLeft: '40px' }}>
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Map link */}
                  <a
                    href={data.event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-montserrat"
                    style={{
                      marginTop: '48px',
                      display: 'inline-block',
                      border: '1px solid #c9a84c',
                      padding: '12px 36px',
                      fontSize: '0.75rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#c9a84c',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#c9a84c'; (e.currentTarget as HTMLElement).style.color = 'black' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#c9a84c' }}
                  >
                    Lihat Peta
                  </a>
                </div>
              </Reveal>

              {/* Right: photo */}
              <Reveal direction="right" className="flex min-w-70 flex-1 justify-center">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000"
                  alt="Wedding"
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: '600px',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                />
              </Reveal>
            </div>
          </section>

          {/* ── GIFT REGISTRY ── */}
          <section style={{ backgroundColor: '#000', color: '#fff', fontFamily: "'Playfair Display', serif" }} className="py-20 px-5">
            <Reveal>
              <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

                {/* Decorative images — hidden on very small screens */}
                <img
                  src={UNSPLASH.couple2}
                  alt="Flower"
                  style={{
                    position: 'absolute', left: 0, top: 0,
                    width: '140px', height: '190px', objectFit: 'cover',
                    filter: 'grayscale(100%)', opacity: 0.75,
                  }}
                  className="hidden sm:block"
                />
                <img
                  src={UNSPLASH.bride}
                  alt="Couple"
                  style={{
                    position: 'absolute', right: 0, bottom: '20%',
                    width: '140px', height: '190px', objectFit: 'cover',
                    filter: 'grayscale(100%)', opacity: 0.75,
                  }}
                  className="hidden sm:block"
                />

                {/* Text content */}
                <div style={{ padding: '0 clamp(0px, 15vw, 180px)' }}>
                  <h1
                    className="font-playfair"
                    style={{ fontWeight: 400, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', lineHeight: 1.3, marginBottom: '40px' }}
                  >
                    Your presence is truly the best<br />gift we could ask for.
                  </h1>

                  <p className="font-playfair" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic', color: '#d1d5db' }}>
                    But if you feel called to give a little something, we've put together a small registry.
                    Email{' '}
                    <span style={{ fontStyle: 'normal', color: '#c9a84c' }}>{`${data.bride.name.toLowerCase()}.${data.groom.name.toLowerCase()}@mail.com`}</span>
                    {' '}with{' '}
                    <span style={{ fontStyle: 'normal', color: '#c9a84c' }}>Registry #{data.bride.name}{data.groom.name}2026</span>
                    {' '}as the subject line for our updated gift list.
                  </p>

                  <p className="font-playfair" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic', color: '#d1d5db' }}>
                    Alternatively, if you prefer to support us as we begin our married life, a contribution to our future would mean so much.
                  </p>

                  <p className="font-playfair" style={{ fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic', color: '#d1d5db' }}>
                    Thank you for being part of this milestone with us.
                  </p>
                </div>

                {/* QR + contact */}
                <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#fff', padding: '6px', display: 'inline-block' }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${data.event.mapUrl}`}
                      alt="QR Code"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="font-montserrat" style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.6 }}>
                    Scan this QR to open location map<br />
                    <span style={{ color: '#c9a84c' }}>{data.event.venue}</span>
                  </div>
                </div>

              </div>
            </Reveal>
          </section>

          {/* ── FAQ ── */}
          <section style={{ backgroundColor: '#EAE8E1', color: '#1a1a1a' }} className="py-20 px-5">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '60px',
              maxWidth: '1100px',
              margin: '0 auto',
              alignItems: 'start',
            }}>
              {/* Left: sticky title */}
              <Reveal direction="left">
                <h1
                  className="font-playfair"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    lineHeight: 1,
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    position: 'sticky',
                    top: '40px',
                  }}
                >
                  FREQUENTLY<br />ASKED<br />QUESTIONS
                </h1>
              </Reveal>

              {/* Right: FAQ list */}
              <div>
                {[
                  {
                    n: '01',
                    q: `What time should I arrive?`,
                    a: `We recommend coming by ${data.event.akadTime} WIB so you have time to settle in before the ceremony starts.`,
                  },
                  {
                    n: '02',
                    q: 'Can I bring my kids or a +1?',
                    a: 'As this is a small and intimate gathering, we kindly ask that only those listed in the invitation attend. We appreciate your understanding.',
                  },
                  {
                    n: '03',
                    q: 'Where should I park?',
                    a: `There is parking available near ${data.event.venue}. As the date approaches, we'll send the exact location and parking details. PWD-friendly parking is available.`,
                  },
                  {
                    n: '04',
                    q: 'What is the dress code?',
                    a: 'We encourage formal or semi-formal attire. Kindly avoid wearing white or ivory so the bride can stand out. Pastels and earth tones are always a lovely choice.',
                  },
                ].map(({ n, q, a }, idx) => (
                  <Reveal key={n} delay={idx * 80}>
                    <div
                      className="font-montserrat"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '50px 1fr',
                        padding: idx === 0 ? '0 0 40px 0' : '40px 0',
                        borderBottom: idx < 3 ? '1px solid #999' : 'none',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem', color: '#555', paddingTop: '4px' }}>{n}</span>
                      <div>
                        <h2
                          className="font-playfair"
                          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 500, margin: '0 0 12px 0' }}
                        >
                          {q}
                        </h2>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#333', margin: 0 }}>
                          {a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── GET IN TOUCH ── */}
          <section style={{ backgroundColor: '#000', color: '#fff' }}>
            {/* Full-width couple banner */}
            <img
              src={UNSPLASH.couple1}
              alt="Couple Banner"
              style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
            />

            {/* Contact footer grid */}
            <div style={{
              padding: '60px 10%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
              gap: '40px',
            }}>
              {/* Logo / Title */}
              <Reveal direction="left">
                <h2
                  className="font-playfair"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', textTransform: 'uppercase', lineHeight: 1, margin: 0, fontWeight: 400 }}
                >
                  GET IN<br />TOUCH
                </h2>
              </Reveal>

              {/* Contact persons */}
              <Reveal>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '30px' }}>
                  {/* Bride */}
                  <div className="font-montserrat">
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', fontWeight: 400 }}>
                      {data.bride.fullName}
                    </h3>
                    <a
                      href={`tel:${data.bride.father.replace(/\D/g, '')}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '4px', opacity: 0.8 }}
                    >
                      📞 Hubungi {data.bride.name}
                    </a>
                    <a
                      href={`mailto:${data.bride.name.toLowerCase()}@mail.com`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.8 }}
                    >
                      ✉️ {data.bride.name.toLowerCase()}@mail.com
                    </a>
                  </div>
                  {/* Groom */}
                  <div className="font-montserrat">
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', fontWeight: 400 }}>
                      {data.groom.fullName}
                    </h3>
                    <a
                      href={`tel:${data.groom.father.replace(/\D/g, '')}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '4px', opacity: 0.8 }}
                    >
                      📞 Hubungi {data.groom.name}
                    </a>
                    <a
                      href={`mailto:${data.groom.name.toLowerCase()}@mail.com`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.8 }}
                    >
                      ✉️ {data.groom.name.toLowerCase()}@mail.com
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* RSVP button */}
              <Reveal direction="right">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <a
                    href={data.event.mapUrl}
                    className="font-montserrat"
                    style={{
                      backgroundColor: '#EAE8E1',
                      color: '#1a1a1a',
                      textDecoration: 'none',
                      padding: '15px 40px',
                      textAlign: 'center',
                      fontWeight: 500,
                      letterSpacing: '1px',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      display: 'inline-block',
                      transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    RSVP
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Copyright bar */}
            <div
              className="font-montserrat"
              style={{ textAlign: 'center', padding: '24px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#555', letterSpacing: '1px' }}
            >
              {data.bride.name} &amp; {data.groom.name} · {formatDateShort(data.event.akadDate)} · Made with ♥ by lemparsini.com
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
