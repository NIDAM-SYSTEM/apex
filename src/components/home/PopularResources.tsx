import {
  ArrowRight,
  Search,
  FolderOpen,
  FileText,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Dumbbell,
  Code,
  Clock3,
  Download,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    value: "250+",
    label: "Fichiers",
    icon: FileText,
  },
  {
    value: "6",
    label: "Filières",
    icon: BookOpen,
  },
  {
    value: "100%",
    label: "Gratuit",
    icon: CheckCircle2,
  },
];

const folders = [
  {
    id: "f1",
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.8} />,
    name: "Mathématiques",
    count: "84 fichiers",
    bg: "bg-apex-cream border-apex-border-light text-[#8B1A4A]",
    dot: "bg-[#8B1A4A]",
  },
  {
    id: "f2",
    icon: <Dumbbell className="h-5 w-5" strokeWidth={1.8} />,
    name: "Sport",
    count: "42 fichiers",
    bg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    dot: "bg-emerald-500",
  },
  {
    id: "f3",
    icon: <Code className="h-5 w-5" strokeWidth={1.8} />,
    name: "Informatique",
    count: "56 fichiers",
    bg: "bg-violet-50 border-violet-100 text-violet-600",
    dot: "bg-violet-500",
  },
  {
    id: "f4",
    icon: <FileText className="h-5 w-5" strokeWidth={1.8} />,
    name: "Histoire & Géo",
    count: "38 fichiers",
    bg: "bg-amber-50 border-amber-100 text-amber-600",
    dot: "bg-amber-500",
  },
];

function VaultPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[580px]">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute -bottom-16 -left-8 h-44 w-44 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />

      {/* Main application window */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,37,96,0.14)]">

        {/* Browser / application top bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3.5">

          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>

          <div className="hidden min-w-0 flex-1 sm:block">
            <div className="mx-auto flex max-w-[300px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
              <FolderOpen className="h-3 w-3 text-slate-300" />
              <span className="truncate text-[10px] text-slate-400">
                apex.ens.ma / vault / ressources
              </span>
            </div>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[170px_1fr]">

          {/* Sidebar */}
          <aside className="hidden border-r border-slate-100 bg-slate-50/70 p-4 md:block">

            <div className="mb-6">
              <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Navigation
              </p>

              <div className="space-y-1">
                <div className="flex items-center gap-2 rounded-lg bg-[#3D0821] px-3 py-2 text-[10px] font-semibold text-white">
                  <FolderOpen className="h-3.5 w-3.5" />
                  Toutes les ressources
                </div>

                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-medium text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  Récent
                </div>

                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-medium text-slate-500">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Populaires
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Filières
              </p>

              <div className="space-y-1.5">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex items-center justify-between rounded-lg px-2 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${folder.dot}`}
                      />
                      <span className="truncate text-[10px] text-slate-600">
                        {folder.name}
                      </span>
                    </div>

                    <span className="text-[9px] text-slate-400">
                      {folder.count.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="p-5 sm:p-6">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B1A4A]">
                  Vault Académique
                </p>

                <h3 className="mt-1 text-base font-bold tracking-tight text-slate-900">
                  Ressources étudiantes
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Tout au même endroit, organisé par filière.
                </p>
              </div>

              <div className="rounded-xl bg-apex-cream px-3 py-2 text-right">
                <p className="text-[9px] font-medium text-rose-700">
                  DISPONIBLE
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#3D0821]">
                  250+ fichiers
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[10px] text-slate-400">
                Rechercher un cours, un examen, un TD...
              </span>
            </div>

            {/* Folder cards */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="group rounded-xl border border-slate-100 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${folder.bg}`}
                    >
                      {folder.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-slate-800">
                        {folder.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${folder.dot}`}
                        />
                        <span className="text-[9px] text-slate-400">
                          {folder.count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent files */}
            <div className="mt-6 border-t border-slate-100 pt-5">

              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-800">
                  Ajoutés récemment
                </p>

                <span className="text-[9px] font-semibold text-[#8B1A4A]">
                  Voir tout
                </span>
              </div>

              <div className="space-y-2.5">

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-100">
                    <FileText className="h-3.5 w-3.5 text-[#8B1A4A]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-slate-700">
                      Examen Final Analyse 3
                    </p>
                    <p className="mt-0.5 text-[9px] text-slate-400">
                      Mathématiques · S3
                    </p>
                  </div>

                  <Download className="h-3.5 w-3.5 text-slate-300" />
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-100">
                    <FileText className="h-3.5 w-3.5 text-violet-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-slate-700">
                      TD 04 — Séries Entières
                    </p>
                    <p className="mt-0.5 text-[9px] text-slate-400">
                      Mathématiques · S3
                    </p>
                  </div>

                  <Download className="h-3.5 w-3.5 text-slate-300" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating update card */}
      <div className="absolute -bottom-5 -right-3 z-20 w-[240px] rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_20px_50px_rgba(15,37,96,0.15)] sm:right-5">

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50">
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>

          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                Nouveau
              </span>
            </div>

            <p className="text-[11px] font-semibold leading-snug text-slate-800">
              Examen Final Analyse 3 ajouté
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              il y a 2 heures · Mathématiques S3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PopularResources() {
  return (
    <section
      id="vault"
      className="relative overflow-hidden bg-slate-50 py-24"
      aria-labelledby="vault-showcase-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.88fr_1.12fr]">

          {/* LEFT */}
          <div className="max-w-xl">

            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-apex-border-light bg-apex-cream px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B1A4A]">
              <FolderOpen className="h-3.5 w-3.5" strokeWidth={2} />
              Vault Académique
            </div>

            {/* Heading */}
            <h2
              id="vault-showcase-heading"
              className="font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Tout ce dont tu as besoin pour{" "}
              <span className="text-[#8B1A4A]">
                avancer plus vite.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-500 sm:text-base">
              Cours, TDs, TPs et anciens examens sont centralisés,
              organisés et accessibles en quelques secondes.
              Plus besoin de fouiller dans des groupes ou des dossiers dispersés.
            </p>

            {/* Mini stats */}
            <div className="mt-8 grid grid-cols-3 border-y border-slate-200 py-5">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`${
                      index !== stats.length - 1
                        ? "border-r border-slate-200"
                        : ""
                    } ${index > 0 ? "pl-4 sm:pl-6" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-[#8B1A4A]" />
                      <span className="text-xl font-bold tracking-tight text-slate-900">
                        {stat.value}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">

              <Link
                to="/vault"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#3D0821] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-stone-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5C1232] hover:shadow-lg"
              >
                Explorer le Vault

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>

              <span className="text-xs text-slate-400">
                Gratuit pour tous les étudiants
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:pl-4">
            <VaultPreview />
          </div>

        </div>
      </div>
    </section>
  );
}


