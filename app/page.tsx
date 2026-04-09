'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setState('success');
      setEmail('');
    } else {
      setState('error');
      setErrorMsg(data.error || 'Something went wrong');
    }
  }

  return (
    <main className="min-h-[100svh] bg-black text-white flex flex-col">

      {/* Full-screen hero with backdrop image */}
      <section className="relative min-h-[100svh] flex flex-col">
        {/* Backdrop */}
        <Image
          src="/images/hero.jpg"
          alt="Runner in the city"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Nav */}
        <nav className="relative z-10 flex justify-between items-center px-5 py-5 w-full max-w-2xl mx-auto">
          <span className="text-[#DFFF00] font-black text-lg tracking-widest">PAVE</span>
          <span className="text-white/30 text-xs font-semibold tracking-[0.2em]">V.04_CPH</span>
        </nav>

        {/* Content pushed to bottom */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-5 pb-8 w-full max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/50 mb-3">
            UNCOVER THE CITY
          </p>

          <h1 className="text-5xl sm:text-7xl font-black leading-none tracking-tight mb-5">
            <span className="text-white">RUN</span>
            <br />
            <span className="text-[#DFFF00]">DIFFERENT.</span>
          </h1>

          <div className="flex mb-7">
            <div className="w-1 bg-[#DFFF00] self-stretch mr-4 flex-shrink-0" />
            <p className="text-sm font-bold text-white/70 leading-relaxed uppercase tracking-wide">
              AI-generated routes built on your criteria.<br />
              No two runs will ever be the same.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-7">
            <div>
              <p className="text-xs text-white/35 tracking-[0.15em] font-semibold mb-1">ACTIVE HUBS</p>
              <p className="text-xl font-black text-[#DFFF00] tracking-tight">42_CITIES</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-xs text-white/35 tracking-[0.15em] font-semibold mb-1">LAUNCH</p>
              <p className="text-xl font-black text-[#DFFF00] tracking-tight">2026_Q3</p>
            </div>
          </div>

          {/* Waitlist form */}
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm p-5">
            <p className="text-xs font-bold tracking-[0.2em] text-white/45 mb-1">EARLY ACCESS</p>
            <p className="text-base font-black tracking-tight mb-5">JOIN THE WAITLIST</p>

            {state === 'success' ? (
              <div className="border border-[#DFFF00]/30 bg-[#DFFF00]/5 rounded-sm p-4">
                <p className="text-[#DFFF00] font-bold text-sm tracking-wide">
                  YOU&apos;RE IN. WE&apos;LL BE IN TOUCH.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="YOUR@EMAIL.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-b border-white/20 focus:border-[#DFFF00] outline-none py-3 text-sm font-semibold tracking-widest placeholder:text-white/20 text-white transition-colors"
                  />
                  {state === 'error' && (
                    <p className="text-red-400 text-xs mt-2 tracking-wide">{errorMsg}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full bg-[#DFFF00] text-black font-black text-sm tracking-widest py-4 rounded-sm active:bg-[#c8e600] hover:bg-[#c8e600] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {state === 'loading' ? 'JOINING...' : 'JOIN →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/8 w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-white/8">
          {[
            { label: 'UNCHARTED', detail: "AI routes you've never run before" },
            { label: 'PRECISION', detail: 'Sub-meter GPS tracking accuracy' },
            { label: 'GOALS', detail: 'Distance, elevation & terrain criteria' },
          ].map((f) => (
            <div key={f.label} className="px-5 py-6">
              <p className="text-[#DFFF00] text-xs font-black tracking-[0.2em] mb-1">{f.label}</p>
              <p className="text-white/50 text-xs tracking-wide leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo grid */}
      <section className="w-full max-w-2xl mx-auto px-0 pb-0">
        <div className="grid grid-cols-2 gap-1">
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <Image
              src="/images/night.jpg"
              alt="Night trail runner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <Image
              src="/images/urban.jpg"
              alt="Urban runners"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-5 py-5 flex justify-between items-center w-full max-w-2xl mx-auto">
        <span className="text-[#DFFF00] font-black tracking-widest">PAVE</span>
        <span className="text-white/20 text-xs tracking-widest">© 2025</span>
      </footer>
    </main>
  );
}
