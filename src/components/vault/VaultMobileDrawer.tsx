import { useState, useEffect } from "react";
import { X, Search, BookOpen, Check, Layers3 } from "lucide-react";
import { branches } from "../../data/mockData";
import { getModuleFileCount } from "../../data/vaultData";
import type { Branch, Semester, Module } from "../../types";

interface VaultMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBranch: string;
  selectedSemester: string;
  selectedModule: string;
  onSelectSemester: (id: string) => void;
  onSelectModule: (id: string) => void;
}

export default function VaultMobileDrawer({
  isOpen,
  onClose,
  selectedBranch,
  selectedSemester,
  selectedModule,
  onSelectSemester,
  onSelectModule,
}: VaultMobileDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const activeBranch = branches.find(
    (branch: Branch) => branch.id === selectedBranch
  );

  const activeSemester = activeBranch?.semesters.find(
    (semester: Semester) => semester.id === selectedSemester
  );

  const modules = activeSemester?.modules ?? [];
  const query = searchQuery.trim().toLowerCase();
  const filteredModules = query
    ? modules.filter((m: Module) => m.label.toLowerCase().includes(query))
    : modules;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation académique"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-apex-cream text-[#8B1A4A]">
              <Layers3 className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Navigation Académique
              </p>
              <h3 className="font-heading text-sm font-bold text-slate-900">
                {activeBranch?.label ?? "Filière"}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {/* Semester Selector */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Choisir un semestre
            </span>
            <div className="grid grid-cols-6 gap-1.5">
              {(activeBranch?.semesters ?? []).map((sem: Semester, index: number) => {
                const isActive = sem.id === selectedSemester;
                const label = `S${index + 1}`;
                return (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => {
                      onSelectSemester(sem.id);
                      setSearchQuery("");
                    }}
                    className={[
                      "flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-all",
                      isActive
                        ? "bg-[#8B1A4A] text-white shadow-xs"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Search */}
          <div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrer les matières..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#8B1A4A] focus:bg-white"
              />
            </div>
          </div>

          {/* Subject List */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Matières ({activeSemester?.label})
              </span>
              <span className="text-[10px] text-slate-400">
                {filteredModules.length} disponible{filteredModules.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-1">
              {filteredModules.map((module: Module) => {
                const isSelected = module.id === selectedModule;
                const count = getModuleFileCount(module.id);
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => {
                      onSelectModule(module.id);
                      onClose();
                    }}
                    className={[
                      "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-all",
                      isSelected
                        ? "bg-apex-cream font-bold text-[#8B1A4A] border border-apex-border"
                        : "border border-transparent bg-slate-50 font-medium text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                          isSelected
                            ? "bg-[#8B1A4A] text-white"
                            : "bg-white text-slate-400",
                        ].join(" ")}
                      >
                        <BookOpen className="h-3 w-3" />
                      </div>
                      <span className="truncate">{module.label}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400">
                        {count} doc{count > 1 ? "s" : ""}
                      </span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-[#8B1A4A]" strokeWidth={2.5} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
