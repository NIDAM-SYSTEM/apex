import { useState, type FormEvent } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { branches } from '../../data/mockData';
import type { Branch, Semester, Module } from '../../types';

export default function Hero() {
  const [query,    setQuery]    = useState('');
  const [branch,   setBranch]   = useState('');
  const [semester, setSemester] = useState('');
  const [module,   setModule]   = useState('');

  const selectedBranch   = branches.find((b: Branch) => b.id === branch);
  const semesters        = selectedBranch?.semesters ?? [];
  const selectedSemester = semesters.find((s: Semester) => s.id === semester);
  const modules          = selectedSemester?.modules ?? [];

  const handleBranchChange = (v: string) => { setBranch(v); setSemester(''); setModule(''); };
  const handleSemChange    = (v: string) => { setSemester(v); setModule(''); };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Search:', { query, branch, semester, module });
  };

  return (
    <section className="bg-apex-cream py-16 sm:py-20" aria-labelledby="hero-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Centered text block */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-widest text-apex-blue mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-apex-blue" />
            Plateforme Étudiante · ENS Tétouan
          </div>
          <h1
            id="hero-heading"
            className="font-heading font-bold text-apex-dark text-3xl sm:text-4xl leading-tight mb-4"
          >
            Tout ce dont vous avez besoin à l'université,{' '}
            <span className="text-apex-blue">en un seul endroit.</span>
          </h1>
          <p className="font-body text-slate-500 text-base leading-relaxed">
            Trouvez vos cours, TDs, anciens examens et guides administratifs instantanément.
          </p>
        </div>

        {/* Search tool — full width of container */}
        <form
          onSubmit={handleSubmit}
          aria-label="Recherche de ressources académiques"
          className="max-w-3xl mx-auto"
        >
          {/* Main search input */}
          <div
            id="hero-search"
            className="flex items-center bg-white border-2 border-slate-200 rounded-xl h-14 px-4 gap-3 focus-within:border-apex-blue focus-within:shadow-[0_0_0_3px_rgba(139,26,74,0.08)] transition-all duration-200 mb-3"
          >
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un cours, module, examen, TD…"
              className="flex-1 bg-transparent border-none outline-none font-body text-apex-dark placeholder-slate-400 text-[15px]"
              aria-label="Terme de recherche"
            />
          </div>

          {/* Inline filters row */}
          <div className="flex flex-col sm:flex-row gap-2">

            {/* Filière */}
            <div className="relative flex-1">
              <select
                value={branch}
                onChange={e => handleBranchChange(e.target.value)}
                className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg font-body text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-apex-blue focus:border-apex-blue cursor-pointer transition-colors"
                aria-label="Filière"
              >
                <option value="" disabled>Filière</option>
                {branches.map((b: Branch) => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" strokeWidth={2} />
            </div>

            {/* Semestre */}
            <div className="relative flex-1">
              <select
                value={semester}
                onChange={e => handleSemChange(e.target.value)}
                disabled={!branch}
                className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg font-body text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-apex-blue focus:border-apex-blue cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Semestre"
              >
                <option value="" disabled>Semestre</option>
                {semesters.map((s: Semester) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" strokeWidth={2} />
            </div>

            {/* Module */}
            <div className="relative flex-1">
              <select
                value={module}
                onChange={e => setModule(e.target.value)}
                disabled={!semester}
                className="w-full h-10 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg font-body text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-apex-blue focus:border-apex-blue cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Module"
              >
                <option value="" disabled>Module</option>
                {modules.map((m: Module) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" strokeWidth={2} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-10 px-6 bg-apex-blue text-white font-body font-medium text-sm rounded-lg hover:bg-apex-blue-hover active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-apex-blue focus:ring-offset-2 flex-shrink-0"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

