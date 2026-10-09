import { GraduationCap, Upload, ArrowRight, ShieldCheck, FileCheck2, Clock } from "lucide-react";

interface VaultExamSpaceProps {
  moduleLabel: string;
  semesterLabel: string;
  branchLabel: string;
  onOpenContributeModal: () => void;
  onViewFiles: () => void;
}

export default function VaultExamSpace({
  moduleLabel,
  semesterLabel,
  onOpenContributeModal,
  onViewFiles,
}: VaultExamSpaceProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-apex-cream text-[#8B1A4A]">
            <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 mb-1.5">
              <Clock className="h-3 w-3" />
              Collecte en cours
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
              Anciens Examens — {moduleLabel}
            </h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-xl">
              Les épreuves écrites et rattrapages pour ce module ({semesterLabel}) sont actuellement en cours de numérisation et de vérification par la communauté APEX ENS.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenContributeModal}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#8B1A4A] px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-[#6D1239]"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Proposer un sujet</span>
          </button>

          <button
            type="button"
            onClick={onViewFiles}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span>Voir les cours & TDs</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <FileCheck2 className="h-4 w-4 text-[#8B1A4A]" />
            <h3 className="text-xs font-bold text-slate-800">
              Épreuves et Rattrapages
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Sessions normales et rattrapages avec énoncés originaux numérisés.
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-800">
              Corrigés et Barèmes
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Solutions types relues et vérifiées méthodologiquement avant publication.
          </p>
        </div>
      </div>
    </div>
  );
}
