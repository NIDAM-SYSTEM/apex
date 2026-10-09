import {
  Download,
  FileText,
  BookOpen,
  ClipboardList,
  ExternalLink,
} from "lucide-react";

import type { VaultFile, VaultFileType } from "../../data/vaultData";

interface VaultFileRowProps {
  file: VaultFile;
  isLast?: boolean;
}

function FileTypeBadge({ type }: { type: VaultFileType }) {
  switch (type) {
    case "cours":
      return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
          Cours
        </span>
      );
    case "td-tp":
      return (
        <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
          TD / TP
        </span>
      );
    case "examen":
      return (
        <span className="inline-flex items-center rounded-md bg-purple-50 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700">
          Examen
        </span>
      );
  }
}

function FileTypeIcon({ type }: { type: VaultFileType }) {
  switch (type) {
    case "cours":
      return <BookOpen className="h-4 w-4 text-blue-600" strokeWidth={2} />;
    case "td-tp":
      return <ClipboardList className="h-4 w-4 text-emerald-600" strokeWidth={2} />;
    case "examen":
      return <FileText className="h-4 w-4 text-purple-600" strokeWidth={2} />;
  }
}

export default function VaultFileRow({ file, isLast = false }: VaultFileRowProps) {
  const hasUrl = Boolean(file.downloadUrl) && file.downloadUrl !== "#";

  return (
    <li
      className={[
        "group flex flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5",
        "transition-colors duration-150 hover:bg-slate-50/80",
        !isLast ? "border-b border-slate-100" : "",
      ].join(" ")}
    >
      {/* ─────────────────────────────────────────────────────────────
          FILE ICON & CORE INFO
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 mt-0.5 sm:mt-0"
          aria-hidden="true"
        >
          <FileTypeIcon type={file.type} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3
              className="text-[13px] font-semibold leading-snug text-slate-900 group-hover:text-[#8B1A4A] transition-colors truncate max-w-full"
              title={file.name}
            >
              {file.name}
            </h3>

            <FileTypeBadge type={file.type} />

            {file.isNew && (
              <span className="rounded-full bg-amber-50 border border-amber-200/70 px-1.5 py-0.2 text-[9px] font-semibold text-amber-700">
                Nouveau
              </span>
            )}
          </div>

          {/* Subtitle / Metadata */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500">
            {file.professor && (
              <>
                <span className="font-medium text-slate-600">
                  {file.professor}
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
              </>
            )}
            <span className="text-slate-400 font-mono text-[10px]">
              {file.originalFileName}
            </span>
            <span className="text-slate-300 sm:hidden" aria-hidden="true">·</span>
            <span className="text-slate-500 sm:hidden font-medium text-[10px]">
              {file.size}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FILE SIZE (DESKTOP)
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden sm:block w-20 text-right shrink-0">
        <span className="text-xs font-medium text-slate-500">
          {file.size}
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ACTIONS (OPEN + DOWNLOAD)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        {hasUrl ? (
          <>
            {/* Open in new tab */}
            <a
              href={file.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-[#8B1A4A]/30 hover:bg-apex-cream hover:text-[#8B1A4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A]"
              title={`Ouvrir ${file.name}`}
              aria-label={`Ouvrir ${file.name} dans un nouvel onglet`}
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
              <span>Ouvrir</span>
            </a>

            {/* Direct Download */}
            <a
              href={file.downloadUrl}
              download={file.originalFileName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[#8B1A4A] px-3 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-[#6D1239] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A] focus-visible:ring-offset-1"
              title={`Télécharger ${file.originalFileName}`}
              aria-label={`Télécharger ${file.name}`}
            >
              <Download className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
              <span>Télécharger</span>
            </a>
          </>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 text-xs font-medium text-slate-400 cursor-not-allowed"
            aria-label={`${file.name} indisponible`}
          >
            <Download className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
            <span>Indisponible</span>
          </button>
        )}
      </div>
    </li>
  );
}
