import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Accueil',          href: '/',         page: 'home'     },
  { label: 'Vault Académique', href: '/vault',    page: 'vault'    },
  { label: 'Aide Étudiante',   href: '/help',     page: 'help'     },
  { label: "Espace d'étude",   href: '/articles', page: 'articles' },
  { label: 'Événements',       href: '/events',   page: 'events'   },
  { label: 'Club APEX',        href: '/club',     page: 'club'     },
];

interface HeaderProps {
  activePage?: 'home' | 'vault' | 'help' | 'articles' | 'events' | 'club';
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  /* Scroll shadow & blur trigger */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile nav is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-0' 
          : 'bg-white border-b border-slate-100 py-1'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-6">

        {/* ── Left: Branding (The Anchor) ─────────────────────────── */}
        <a
          href="/"
          className="group flex items-center gap-2.5 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue rounded-lg transition-transform duration-200 active:scale-95"
          aria-label="APEX ENS Tétouan — retour à l'accueil"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-300/40 shadow-xs group-hover:shadow-sm group-hover:scale-105 transition-all bg-[#F5F0E8] flex items-center justify-center shrink-0">
            <img
              src="/apex-logo.jpg"
              alt="Logo APEX ENS"
              className="h-9 w-9 rounded-full object-cover"
              width={36}
              height={36}
            />
          </div>
          <span className="font-heading font-black text-[16px] text-slate-900 leading-none tracking-tight">
            <span className="text-apex-blue">APEX</span>{' '}
            <span className="hidden sm:inline text-slate-600 font-bold text-[14px]">ENS Tétouan</span>
          </span>
        </a>

        {/* ── Center: Desktop nav (The Map) ───────────────────────── */}
        <nav
          className="hidden lg:flex items-center gap-1.5"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => {
            const isActive = link.page === activePage;
            return (
              <a
                key={link.page}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-body text-[13.5px] px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue ${
                  isActive
                    ? 'text-apex-blue bg-apex-cream/80 font-bold shadow-sm ring-1 ring-apex-border/50'
                    : 'text-slate-500 font-semibold hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ── Right: Mobile Menu Toggle ───────────────────────────── */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue active:scale-95"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen
              ? <X    className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
              : <Menu className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile nav drawer ─────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute inset-x-0 top-[100%] bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl z-40 overflow-hidden"
          aria-label="Navigation mobile"
        >
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2 h-[calc(100vh-60px)] overflow-y-auto">
            <p className="font-body text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">
              Menu Principal
            </p>

            {navLinks.map((link) => {
              const isActive = link.page === activePage;
              return (
                <a
                  key={link.page}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-body text-[15px] font-bold px-4 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'text-apex-blue bg-apex-cream border border-apex-border/50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-apex-blue shadow-[0_0_8px_rgba(139,26,74,0.5)]" />}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
