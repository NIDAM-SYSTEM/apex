import { Upload, ArrowRight, FileUp, Sparkles, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClubSection() {
  return (
    <section
      id="club"
      className="w-full bg-[#1A0510] py-24 lg:py-32 relative overflow-hidden border-t border-slate-800"
      aria-labelledby="scroll-stopper-heading"
    >
      {/* ════════ BACKGROUND EFFECTS ════════ */}
      {/* Top Right Blue Glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(139,26,74,0.4) 0%, transparent 70%)',
          transform: 'translate(20%, -20%)'
        }}
        aria-hidden="true"
      />
      {/* Bottom Left Amber Glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
          transform: 'translate(-20%, 20%)'
        }}
        aria-hidden="true"
      />
      {/* Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 40px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

          {/* ══════════════════════════════════════════════════════
              LEFT SIDE: The Movement (Span 7 Columns)
          ══════════════════════════════════════════════════════ */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-body font-bold text-xs sm:text-sm uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>La Communauté APEX</span>
            </div>

            {/* Massive Display Headline */}
            <h2
              id="scroll-stopper-heading"
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.05] tracking-tight"
            >
              L'ENS Tétouan ne se limite pas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">aux amphis.</span>
            </h2>

            {/* Subtext */}
            <p className="font-body text-slate-300 text-base sm:text-lg lg:text-xl max-w-xl mt-6 leading-relaxed">
              APEX est construit par les étudiants, pour les étudiants. Plus de <strong className="text-white">1200 membres</strong> centralisent le savoir et font vibrer le campus. Votre place est parmi nous.
            </p>

            {/* Micro-proof points */}
            <div className="flex flex-wrap items-center gap-6 mt-8 mb-4">
              <div className="flex items-center gap-2 text-slate-400 font-body text-sm">
                <Users className="w-5 h-5 text-apex-gold" />
                <span>Réseau étudiant actif</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-body text-sm">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Impact réel sur le campus</span>
              </div>
            </div>

            {/* Massive Primary Gold Action */}
            <Link
              to="/club"
              className="group inline-flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-body font-bold text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 rounded-2xl mt-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] focus:ring-4 focus:ring-amber-400/40"
              aria-label="Postuler au Club APEX"
            >
              <span>Rejoindre l'Équipe APEX</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT SIDE: The Interactive Dropzone (Span 5 Columns)
          ══════════════════════════════════════════════════════ */}
          <div className="col-span-1 lg:col-span-5 relative lg:pl-8">
            
            {/* Glassmorphism Upload Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              
              {/* Inner Dashed Dropzone Area (Appears like a real upload zone) */}
              <div className="border-2 border-dashed border-white/20 group-hover:border-rose-400/50 rounded-[1.5rem] p-8 sm:p-10 transition-colors duration-300 bg-white/[0.02] flex flex-col items-center text-center">
                
                {/* Pulsing Upload Icon Block */}
                <div className="inline-flex items-center justify-center bg-rose-800/30 border border-apex-gold/20 w-16 h-16 rounded-2xl mb-6 shadow-inner relative">
                  <Upload className="w-8 h-8 text-apex-gold group-hover:-translate-y-1 transition-transform duration-300" strokeWidth={2} aria-hidden="true" />
                  
                  {/* Status Indicator */}
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#1A0510]" />
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-heading font-bold text-white text-2xl leading-snug">
                  Vous avez un ancien examen ?
                </h3>

                {/* Card Subtext */}
                <p className="font-body text-slate-400 text-[15px] mt-3 leading-relaxed max-w-sm">
                  Ne gardez pas vos TDs pour vous. Partagez vos documents en un clic et aidez la prochaine promotion.
                </p>

                {/* Bright White Secondary CTA */}
                <button
                  type="button"
                  className="w-full bg-white hover:bg-apex-cream text-slate-900 font-body font-bold text-[15px] px-6 py-4 rounded-xl mt-8 transition-all duration-200 flex justify-center items-center gap-2.5 shadow-lg hover:shadow-xl active:scale-[0.98] focus:ring-4 focus:ring-white/20"
                  aria-label="Uploader un document"
                >
                  <FileUp className="w-5 h-5 text-apex-blue" strokeWidth={2.2} aria-hidden="true" />
                  <span>Partager un document</span>
                </button>

                <p className="font-body text-[12px] text-slate-500 mt-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 100% Anonyme et Rapide
                </p>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}


