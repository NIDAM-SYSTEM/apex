import { useState } from "react";
import {
  Search,
  BookOpen,
  ChevronDown,
  X,
  GraduationCap,
} from "lucide-react";

import { branches } from "../../data/mockData";
import { getModuleFileCount } from "../../data/vaultData";
import type { Branch, Semester, Module } from "../../types";

interface VaultSidebarProps {
  selectedBranch: string;
  selectedSemester: string;
  selectedModule: string;
  onSelectBranch: (id: string) => void;
  onSelectSemester: (id: string) => void;
  onSelectModule: (id: string) => void;
}

export default function VaultSidebar({
  selectedBranch,
  selectedSemester,
  selectedModule,
  onSelectBranch,
  onSelectSemester,
  onSelectModule,
}: VaultSidebarProps) {
  const [moduleSearch, setModuleSearch] = useState("");

  const availableBranches = branches.filter(
    (branch: Branch) =>
      branch.id === "maths" || branch.status === "available"
  );

  const activeBranch = branches.find(
    (branch: Branch) => branch.id === selectedBranch
  );

  const activeSemester = activeBranch?.semesters.find(
    (semester: Semester) => semester.id === selectedSemester
  );

  const modules = activeSemester?.modules ?? [];
  const query = moduleSearch.trim().toLowerCase();
  const filteredModules = query
    ? modules.filter((module: Module) =>
        module.label.toLowerCase().includes(query)
      )
    : modules;

  const handleBranchChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSelectBranch(event.target.value);
    setModuleSearch("");
  };

  const handleSemesterChange = (semesterId: string) => {
    onSelectSemester(semesterId);
    setModuleSearch("");
  };

  return (
    <aside
      className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs"
      aria-label="Navigation académique"
    >
      {/* ─────────────────────────────────────────────────────────────
          SIDEBAR HEADER & FILIÈRE
      ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="h-4 w-4 text-[#8B1A4A]" strokeWidth={2.2} />
          <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-800">
            Filière & Parcours
          </h2>
        </div>

        <div className="relative">
          <select
            id="vault-branch"
            value={selectedBranch}
            onChange={handleBranchChange}
            aria-label="Sélectionner la filière"
            className="h-9 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-8 text-xs font-semibold text-slate-800 outline-none transition-all hover:bg-slate-100/70 focus:border-[#8B1A4A] focus:bg-white focus:ring-2 focus:ring-[#8B1A4A]/10"
          >
            {availableBranches.map((branch: Branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* ───────────────────────────────────────────────────────────
            SEMESTRES
        ─────────────────────────────────────────────────────────── */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Semestre
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {activeSemester?.label}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1">
            {(activeBranch?.semesters ?? []).map(
              (semester: Semester, index: number) => {
                const isActive = selectedSemester === semester.id;
                const label = `S${index + 1}`;

                return (
                  <button
                    key={semester.id}
                    type="button"
                    onClick={() => handleSemesterChange(semester.id)}
                    className={[
                      "flex h-8 items-center justify-center rounded-lg text-[11px] font-bold transition-all",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A]",
                      isActive
                        ? "bg-[#8B1A4A] text-white shadow-xs"
                        : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                    ].join(" ")}
                    aria-pressed={isActive}
                    title={semester.label}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            MATIÈRES (SEARCH + LIST)
        ─────────────────────────────────────────────────────────── */}
        <div className="pt-2 border-t border-slate-100">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Matières
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {filteredModules.length}
            </span>
          </div>

          {/* Quick search input */}
          <div className="relative mb-2.5">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              id="vault-module-search"
              type="search"
              value={moduleSearch}
              onChange={(e) => setModuleSearch(e.target.value)}
              placeholder="Filtrer les matières..."
              className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#8B1A4A] focus:bg-white focus:ring-2 focus:ring-[#8B1A4A]/10"
            />
            {moduleSearch && (
              <button
                type="button"
                onClick={() => setModuleSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Effacer le filtre"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Subject List */}
          {filteredModules.length > 0 ? (
            <div
              className="max-h-[380px] space-y-1 overflow-y-auto pr-1"
              role="listbox"
              aria-label={`Matières de ${activeSemester?.label ?? ""}`}
            >
              {filteredModules.map((module: Module) => {
                const isSelected = selectedModule === module.id;
                const fileCount = getModuleFileCount(module.id);

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => onSelectModule(module.id)}
                    role="option"
                    aria-selected={isSelected}
                    title={module.label}
                    className={[
                      "group flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left transition-all",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A]",
                      isSelected
                        ? "bg-apex-cream text-[#8B1A4A] font-bold border border-apex-border"
                        : "border border-transparent bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                          isSelected
                            ? "bg-[#8B1A4A] text-white"
                            : "bg-slate-100 text-slate-400 group-hover:text-slate-600",
                        ].join(" ")}
                      >
                        <BookOpen className="h-3 w-3" strokeWidth={2} />
                      </span>

                      <span className="truncate text-xs">
                        {module.label}
                      </span>
                    </div>

                    <span
                      className={[
                        "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                        isSelected
                          ? "bg-[#8B1A4A]/10 text-[#8B1A4A]"
                          : "text-slate-400 group-hover:text-slate-500",
                      ].join(" ")}
                    >
                      {fileCount}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center">
              <p className="text-[11px] font-medium text-slate-500">
                Aucune matière trouvée
              </p>
              <button
                type="button"
                onClick={() => setModuleSearch("")}
                className="mt-1 text-[11px] font-semibold text-[#8B1A4A] hover:underline"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
