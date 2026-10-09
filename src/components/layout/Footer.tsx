
import type { ReactNode } from 'react';

/* ─────────────────────────────────────────────────────────────
   APEX ENS Tétouan — Footer
   Responsive layout · Tailwind CSS · No extra dependencies
───────────────────────────────────────────────────────────── */

// Social icons — inline SVGs, no extra dependencies

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="0.5"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Footer navigation

const platformLinks = [
  { label: "Vault Académique", href: "/vault" },
  { label: "Aide Étudiante", href: "/help" },
  { label: "Espace d'étude", href: "/articles" },
  { label: "Agenda & Événements", href: "/events" },
];

const resourceLinks = [
  { label: "Partager un fichier", href: "#" },
  { label: "Signaler un problème", href: "#" },
  { label: "FAQ", href: "/help" },
  { label: "Rejoindre l'équipe", href: "/club" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/apexoncampus?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==",
    icon: <IconInstagram />,
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61582914692395&mibextid=wwXIfr&rdid=Jb5Hlc43OqzrSG7W&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GXfK1qYsB%2F%3Fmibextid%3DwwXIfr%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26_rdc%3D1%26_rdr#",
    icon: <IconFacebook />,
  },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 text-sm leading-6 text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue focus-visible:ring-offset-4 focus-visible:ring-offset-[#050B18] rounded-sm"
    >
      <span>{children}</span>

      <span
        aria-hidden="true"
        className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        →
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative isolate mt-20 overflow-hidden border-t border-white/[0.08] bg-[#050B18] text-slate-400 sm:mt-24"
      aria-label="Pied de page APEX"
    >
      {/* Decorative background glows */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[8%] h-80 w-80 rounded-full bg-apex-blue/[0.08] blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-72 w-72 rounded-full bg-apex-gold/[0.06] blur-[100px]"
      />

      {/* Main footer content */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-7 lg:gap-y-16">

          {/* Brand — 4 columns */}

          <div className="sm:col-span-2 lg:col-span-4">
            <a
              href="/"
              className="group mb-6 inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue focus-visible:ring-offset-4 focus-visible:ring-offset-[#050B18]"
              aria-label="APEX — Accueil"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-300/30 bg-[#F5F0E8] shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-[1.04]">
                <img
                  src="/apex-logo.jpg"
                  alt="Logo APEX ENS"
                  className="h-full w-full rounded-full object-cover"
                  width={48}
                  height={48}
                />
              </span>

              <span className="flex flex-col">
                <span className="font-heading text-2xl font-black tracking-tight text-white">
                  APEX
                </span>

                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  ENS Tétouan
                </span>
              </span>
            </a>

            <p className="mb-6 max-w-sm text-sm leading-7 text-slate-400">
              Le moteur numérique et social des étudiants de l'ENS Tétouan.
              Centraliser le savoir, simplifier l'université et construire
              les leaders de demain.
            </p>

            {/* Platform status */}

            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.035] px-3.5 py-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300 sm:text-[11px]">
                Systèmes opérationnels
              </span>
            </div>
          </div>

          {/* Platform navigation — 2 columns */}

          <nav
            className="lg:col-span-2"
            aria-label="Navigation de la plateforme"
          >
            <h2 className="mb-5 text-sm font-bold tracking-tight text-white">
              Plateforme
            </h2>

            <ul className="space-y-3" role="list">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources — 2 columns */}

          <nav
            className="lg:col-span-2"
            aria-label="Ressources et assistance"
          >
            <h2 className="mb-5 text-sm font-bold tracking-tight text-white">
              Ressources
            </h2>

            <ul className="space-y-3" role="list">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social and contact — 4 columns */}

          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className="mb-5 text-sm font-bold tracking-tight text-white">
              Connectons-nous
            </h2>

            <p className="mb-5 max-w-sm text-sm leading-6 text-slate-400">
              Une question, une idée ou envie de rejoindre le projet ?
              Nous sommes à votre écoute.
            </p>

            {/* Social links */}

            <div className="mb-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue focus-visible:ring-offset-4 focus-visible:ring-offset-[#050B18]"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact card */}

            <div className="max-w-md rounded-2xl border border-white/[0.09] bg-white/[0.035] p-5 transition-colors duration-200 hover:border-white/[0.14]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Contact direct
              </p>

              <a
                href="mailto:contact@apex-ens.ma"
                className="break-words text-sm font-semibold text-slate-200 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:underline"
              >
                contact@apex-ens.ma
              </a>

              <div className="my-4 h-px w-full bg-white/[0.08]" />

              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <p className="text-xs leading-5 text-slate-400">
                  École Normale Supérieure
                  <br />
                  Tétouan, Maroc
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}

        <div className="mt-14 border-t border-white/[0.09] pt-6 sm:mt-16 sm:pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xs leading-6 text-slate-500 sm:text-left">
              © {new Date().getFullYear()} APEX ENS Tétouan.
              <span className="hidden sm:inline"> </span>
              <span className="sm:hidden">
                <br />
              </span>
              Construit par des étudiants.
            </p>

            <nav
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-end"
              aria-label="Informations légales"
            >
              <a
                href="/terms"
                className="text-xs text-slate-500 transition-colors duration-200 hover:text-slate-200 focus-visible:outline-none focus-visible:underline"
              >
                Conditions d'utilisation
              </a>

              <a
                href="/privacy"
                className="text-xs text-slate-500 transition-colors duration-200 hover:text-slate-200 focus-visible:outline-none focus-visible:underline"
              >
                Confidentialité
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
