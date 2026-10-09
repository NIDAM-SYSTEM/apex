import { Download, FileText, BookOpen, ClipboardList, Package } from 'lucide-react';
import type { Resource, ResourceType } from '../../types';

type ResourceMeta = { label: string; color: string; icon: React.ReactNode };

function getMeta(type: ResourceType): ResourceMeta {
  switch (type) {
    case 'past-exam':    return { label: 'Examen', color: 'text-red-600 bg-red-50',     icon: <FileText      className="w-3 h-3" strokeWidth={2} /> };
    case 'td':           return { label: 'TD',      color: 'text-apex-blue bg-apex-cream',   icon: <ClipboardList className="w-3 h-3" strokeWidth={2} /> };
    case 'tp':           return { label: 'TP',      color: 'text-purple-700 bg-purple-50', icon: <Package     className="w-3 h-3" strokeWidth={2} /> };
    case 'course-notes': return { label: 'Cours',   color: 'text-green-700 bg-green-50', icon: <BookOpen      className="w-3 h-3" strokeWidth={2} /> };
    default:             return { label: 'PDF',     color: 'text-slate-600 bg-slate-100', icon: <FileText     className="w-3 h-3" strokeWidth={2} /> };
  }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-MA', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const meta = getMeta(resource.type);
  return (
    <article
      className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer group"
      aria-label={`${resource.title} — ${resource.module}`}
    >
      {/* Type tag + NEW badge */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 text-[11px] font-body font-semibold px-2 py-0.5 rounded-full ${meta.color}`}>
          {meta.icon}{meta.label}
        </span>
        {resource.isNew && (
          <span className="text-[10px] font-body font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Nouveau
          </span>
        )}
      </div>

      {/* Title & meta */}
      <div className="flex-1">
        <p className="font-body text-[11px] text-slate-400 mb-1">
          {resource.module} · {resource.semester}
        </p>
        <h3 className="font-heading font-semibold text-apex-dark text-[14px] leading-snug group-hover:text-apex-blue transition-colors duration-150">
          {resource.title}
        </h3>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <span className="font-body text-[11px] text-slate-400">{fmt(resource.date)}</span>
        <button
          type="button"
          onClick={() => console.log('download', resource.id)}
          className="inline-flex items-center gap-1.5 bg-apex-blue text-white font-body font-medium text-[12px] px-3 py-1.5 rounded-[6px] hover:bg-[#6D1239] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-apex-blue focus:ring-offset-1"
          aria-label={`Télécharger ${resource.title}`}
        >
          <Download className="w-3 h-3" strokeWidth={2.5} />
          Télécharger
        </button>
      </div>
    </article>
  );
}


