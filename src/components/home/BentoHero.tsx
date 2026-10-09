import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const subjects = [
  "Mathématiques",
  "Physique",
  "SVT",
  "Sport",
  "Histoire",
  "Arabe",
];

const studentResources = [
  {
    title: "Cours et polycopiés",
    description: "Retrouve les supports de cours.",
    icon: BookOpen,
  },
  {
    title: "TD et exercices",
    description: "Entraîne-toi avec des séries d’exercices.",
    icon: ClipboardList,
  },
  {
    title: "Examens précédents",
    description: "Prépare tes examens avec les sujets disponibles.",
    icon: FileText,
  },
];

const highlights = [
  { label: "Cours et documents", icon: BookOpen },
  { label: "TD et examens", icon: FileText },
  { label: "Vie étudiante", icon: CalendarDays },
];

export default function StudentHero() {
  return (
    <section
      className="relative overflow-hidden bg-slate-50 pt-8 pb-10 sm:pt-12 sm:pb-14"
      aria-labelledby="student-hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#3D0821]">
          {/* Background grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-20"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, #E8D08A 0%, rgba(96,165,250,0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full opacity-10"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, #C9A84C 0%, rgba(56,189,248,0) 70%)",
            }}
          />

          <div className="relative grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
            {/* Main message */}
            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-16">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-200 backdrop-blur-sm">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-rose-400"
                    aria-hidden="true"
                  />
                  Espace étudiant
                </span>
                <span className="text-xs text-rose-200">
                  ENS · Pour tous les étudiants
                </span>
              </div>

              <h1
                id="student-hero-heading"
                className="max-w-2xl font-heading text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
              >
                Tout pour tes études.
                <br />
                <span className="text-rose-200">Au même endroit.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-rose-100/85 sm:text-base">
                Retrouve les cours, les TD, les examens et les informations
                utiles à la vie étudiante de l’ENS. Choisis ta matière et trouve
                les ressources dont tu as besoin, simplement.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/vault"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#3D0821] transition-all duration-200 hover:-translate-y-0.5 hover:bg-apex-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3D0821]"
                >
                  Trouver mes cours
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/club"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Découvrir la vie étudiante
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-0">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 text-rose-100/85 ${
                        index > 0 ? "sm:border-l sm:border-white/10 sm:pl-4" : ""
                      } ${index < highlights.length - 1 ? "sm:pr-3" : ""}`}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-rose-200"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span className="text-xs leading-5">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Universal resource preview: no math-only example or invented metrics */}
            <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden px-5 py-10 sm:px-10 lg:min-h-0 lg:justify-end lg:pr-8 lg:py-14">
              <div
                className="pointer-events-none absolute h-72 w-72 rounded-full border border-white/5 sm:h-80 sm:w-80"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute h-56 w-56 rounded-full border border-white/5 sm:h-64 sm:w-64"
                aria-hidden="true"
              />

              <div className="relative z-10 w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/20 lg:ml-auto">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#861746]">
                      Vault académique
                    </p>
                    <h2 className="mt-1 text-sm font-bold text-slate-900">
                      Qu’est-ce que tu recherches ?
                    </h2>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5EAF0]">
                    <BookOpen
                      className="h-4 w-4 text-[#3D0821]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <Search
                      className="h-4 w-4 shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-slate-500">
                      Rechercher un cours, un TD...
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {studentResources.map((resource) => {
                      const Icon = resource.icon;
                      return (
                        <div
                          key={resource.title}
                          className="flex items-start gap-3 rounded-xl border border-slate-100 p-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5EAF0]">
                            <Icon
                              className="h-4 w-4 text-[#861746]"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                              {resource.title}
                            </p>
                            <p className="mt-1 text-[11px] leading-4 text-slate-500">
                              {resource.description}
                            </p>
                          </div>
                          <ArrowRight
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400"
                            aria-hidden="true"
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Plusieurs matières
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Mathématiques · Physique · SVT · et plus
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-8 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#5C1232] px-2.5 py-2 text-[11px] font-medium text-white shadow-xl lg:flex lg:top-12">
                <FileText className="h-4 w-4 text-rose-200" aria-hidden="true" />
                Cours et documents
              </div>
              <div className="absolute bottom-8 left-0 z-20 hidden items-center gap-1.5 rounded-xl border border-white/10 bg-[#5C1232] px-2.5 py-2 text-[10px] font-medium text-white shadow-xl lg:flex lg:bottom-12">
                <Users className="h-4 w-4 text-rose-200" aria-hidden="true" />
                Pour tous les étudiants
              </div>
            </div>
          </div>

          {/* Subjects, not necessarily academic branches */}
          <div className="relative border-t border-white/10 bg-black/[0.06] px-6 py-4 sm:px-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-200">
                Matières
              </span>
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-medium text-rose-100"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
