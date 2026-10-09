import { useMemo, useState } from "react";
import {
  Search,
  Upload,
  ChevronRight,
  BookOpen,
  User,
  X,
  ArrowRight,
  Menu,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import VaultSidebar from "../components/vault/VaultSidebar";
import VaultFileRow from "../components/vault/VaultFileRow";
import VaultMobileDrawer from "../components/vault/VaultMobileDrawer";
import VaultUploadModal from "../components/vault/VaultUploadModal";
import VaultExamSpace from "../components/vault/VaultExamSpace";

import { branches } from "../data/mockData";
import {
  getVaultFiles,
  getModuleFileCount,
  getModuleProfessor,
} from "../data/vaultData";

import type { VaultFileType } from "../data/vaultData";
import type { Branch, Semester, Module } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY TABS CONFIGURATION (Section 8.B)
// ─────────────────────────────────────────────────────────────────────────────

type TabId = "all" | VaultFileType;

const CATEGORIES: { id: TabId; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "cours", label: "Cours" },
  { id: "td-tp", label: "TD" },
  { id: "examen", label: "Examens" },
];

export default function VaultPage() {
  // Navigation state
  const [selectedBranch, setSelectedBranch] = useState("maths");
  const [selectedSemester, setSelectedSemester] = useState("s1");
  const [selectedModule, setSelectedModule] = useState("s1-analyse1");

  // Filter state
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers state
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // ───────────────────────────────────────────────────────────────────────────
  // DERIVED NAVIGATION DATA
  // ───────────────────────────────────────────────────────────────────────────

  const branchData = branches.find((b: Branch) => b.id === selectedBranch);
  const semesterData = branchData?.semesters.find(
    (s: Semester) => s.id === selectedSemester
  );
  const moduleData = semesterData?.modules.find(
    (m: Module) => m.id === selectedModule
  );

  const branchLabel = branchData?.label ?? "Mathématiques";
  const semesterLabel = semesterData?.label ?? "Semestre 01";
  const moduleLabel = moduleData?.label ?? "";

  const totalModuleCount = selectedModule ? getModuleFileCount(selectedModule) : 0;
  const professor = selectedModule ? getModuleProfessor(selectedModule) : "";

  // ───────────────────────────────────────────────────────────────────────────
  // RESOURCE DISCOVERY (SEARCH & CATEGORIES WORKING TOGETHER)
  // ───────────────────────────────────────────────────────────────────────────

  const moduleFiles = useMemo(() => {
    if (!selectedModule) return [];
    return getVaultFiles(selectedModule);
  }, [selectedModule]);

  // Search filtered subset
  const searchFilteredFiles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return moduleFiles;

    return moduleFiles.filter((file) => {
      const matchName = file.name.toLowerCase().includes(query);
      const matchOriginal = file.originalFileName.toLowerCase().includes(query);
      const matchProf = file.professor
        ? file.professor.toLowerCase().includes(query)
        : false;
      return matchName || matchOriginal || matchProf;
    });
  }, [moduleFiles, searchQuery]);

  // Category filtered items
  const displayedFiles = useMemo(() => {
    if (activeTab === "all") return searchFilteredFiles;
    return searchFilteredFiles.filter((file) => file.type === activeTab);
  }, [searchFilteredFiles, activeTab]);

  // Dynamic counts reflecting current search filter (Section 8.B)
  const tabCounts = useMemo(() => {
    return {
      all: searchFilteredFiles.length,
      cours: searchFilteredFiles.filter((f) => f.type === "cours").length,
      "td-tp": searchFilteredFiles.filter((f) => f.type === "td-tp").length,
      examen: searchFilteredFiles.filter((f) => f.type === "examen").length,
    };
  }, [searchFilteredFiles]);

  // ───────────────────────────────────────────────────────────────────────────
  // NAVIGATION HANDLERS
  // ───────────────────────────────────────────────────────────────────────────

  const handleSelectBranch = (id: string) => {
    setSelectedBranch(id);
    const branch = branches.find((b: Branch) => b.id === id);
    const firstSem = branch?.semesters[0];
    const firstMod = firstSem?.modules[0];

    setSelectedSemester(firstSem?.id ?? "");
    setSelectedModule(firstMod?.id ?? "");
    setActiveTab("all");
    setSearchQuery("");
  };

  const handleSelectSemester = (id: string) => {
    setSelectedSemester(id);
    const branch = branches.find((b: Branch) => b.id === selectedBranch);
    const semester = branch?.semesters.find((s: Semester) => s.id === id);
    const firstMod = semester?.modules[0];

    setSelectedModule(firstMod?.id ?? "");
    setActiveTab("all");
    setSearchQuery("");
  };

  const handleSelectModule = (id: string) => {
    setSelectedModule(id);
    setActiveTab("all");
    setSearchQuery("");
  };

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F4]">
      <Header activePage="vault" />

      <main id="main-content" className="flex-1 py-5 sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ─────────────────────────────────────────────────────────────────
              MOBILE ACADEMIC BAR (Accessible drawer trigger on small screens)
          ───────────────────────────────────────────────────────────────── */}
          <div className="mb-4 lg:hidden">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-apex-cream text-[#8B1A4A]">
                  <BookOpen className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                    {branchLabel} · {semesterLabel}
                  </p>
                  <p className="font-heading text-xs font-bold text-slate-900 truncate">
                    {moduleLabel || "Choisir une matière"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#8B1A4A]/20 bg-apex-cream px-3 py-1.5 text-xs font-semibold text-[#8B1A4A] transition-colors hover:bg-apex-cream/80"
              >
                <Menu className="h-3.5 w-3.5" />
                <span>Matières</span>
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              MAIN 2-COLUMN WORKSPACE
          ───────────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-24">
              <VaultSidebar
                selectedBranch={selectedBranch}
                selectedSemester={selectedSemester}
                selectedModule={selectedModule}
                onSelectBranch={handleSelectBranch}
                onSelectSemester={handleSelectSemester}
                onSelectModule={handleSelectModule}
              />
            </div>

            {/* Main Content Area */}
            <div className="min-w-0">

              {/* ─────────────────────────────────────────────────────────────
                  ACADEMIC BREADCRUMB
              ───────────────────────────────────────────────────────────── */}
              <nav aria-label="Fil d'Ariane" className="mb-3.5 flex items-center gap-1.5 text-xs text-slate-400">
                <span className="font-medium text-slate-500">Vault</span>
                <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" strokeWidth={2} />
                <span className="font-medium text-slate-500">{branchLabel}</span>
                <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" strokeWidth={2} />
                <button
                  type="button"
                  onClick={() => setSelectedModule("")}
                  className="font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                  {semesterLabel}
                </button>
                {moduleLabel && (
                  <>
                    <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" strokeWidth={2} />
                    <span className="font-semibold text-slate-800 truncate">{moduleLabel}</span>
                  </>
                )}
              </nav>

              {/* ─────────────────────────────────────────────────────────────
                  PRIMARY SUBJECT WORKSPACE
              ───────────────────────────────────────────────────────────── */}
              {moduleLabel ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">

                  {/* Header: Title, Teacher & Contribution */}
                  <div className="border-b border-slate-100 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                          {moduleLabel}
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          {professor && (
                            <span className="inline-flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-slate-400" />
                              Professeur : <strong className="font-semibold text-slate-700">{professor}</strong>
                            </span>
                          )}

                          <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>

                          <span className="font-medium text-slate-600">
                            {totalModuleCount} ressource{totalModuleCount > 1 ? "s" : ""} au total
                          </span>
                        </div>
                      </div>

                      {/* Secondary Contribution Action */}
                      <button
                        type="button"
                        onClick={() => setIsUploadOpen(true)}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-[#8B1A4A]/30 hover:bg-apex-cream hover:text-[#8B1A4A]"
                      >
                        <Upload className="h-3.5 w-3.5 text-[#8B1A4A]" />
                        <span>Contribuer</span>
                      </button>
                    </div>

                    {/* Single Subject-specific Search Bar (Section 8.A) */}
                    <div className="mt-5">
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Rechercher un cours, un TD, un examen..."
                          aria-label="Rechercher un cours, un TD ou un examen dans cette matière"
                          className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#8B1A4A] focus:bg-white focus:ring-3 focus:ring-[#8B1A4A]/10"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                            aria-label="Effacer la recherche"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Simple Resource Category Controls (Section 8.B) */}
                    <div className="mt-4 flex flex-wrap items-center gap-2" role="tablist" aria-label="Catégories de ressources">
                      {CATEGORIES.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const count = tabCounts[tab.id] ?? 0;

                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveTab(tab.id)}
                            className={[
                              "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A]",
                              isActive
                                ? "bg-[#8B1A4A] text-white shadow-xs"
                                : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900",
                            ].join(" ")}
                          >
                            <span>{tab.label}</span>
                            <span
                              className={[
                                "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-white text-slate-500 shadow-2xs",
                              ].join(" ")}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ───────────────────────────────────────────────────────────
                      RESOURCE LIST OR IN-CONTEXT STATE
                  ─────────────────────────────────────────────────────────── */}
                  <div>
                    {activeTab === "examen" && displayedFiles.length === 0 && !searchQuery ? (
                      /* Dedicated calm empty state for exams */
                      <div className="p-5 sm:p-6">
                        <VaultExamSpace
                          moduleLabel={moduleLabel}
                          semesterLabel={semesterLabel}
                          branchLabel={branchLabel}
                          onOpenContributeModal={() => setIsUploadOpen(true)}
                          onViewFiles={() => setActiveTab("all")}
                        />
                      </div>
                    ) : displayedFiles.length > 0 ? (
                      <div>
                        {/* Desktop Table Header */}
                        <div className="hidden sm:flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <span className="flex-1">Document</span>
                          <span className="w-20 text-right">Taille</span>
                          <span className="w-40 text-right">Actions</span>
                        </div>

                        {/* List of files */}
                        <ul className="divide-y divide-slate-100" aria-label={`Ressources pour ${moduleLabel}`}>
                          {displayedFiles.map((file, idx) => (
                            <VaultFileRow
                              key={file.id}
                              file={file}
                              isLast={idx === displayedFiles.length - 1}
                            />
                          ))}
                        </ul>
                      </div>
                    ) : (
                      /* Clean empty state for search query or empty category */
                      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3.5">
                          <BookOpen className="h-5 w-5" />
                        </div>

                        <h3 className="font-heading text-sm font-bold text-slate-800">
                          {searchQuery
                            ? `Aucun résultat pour « ${searchQuery} »`
                            : `Aucun document disponible dans cette catégorie`}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 max-w-sm">
                          {searchQuery
                            ? "Vérifiez l'orthographe ou tentez une recherche avec un autre terme."
                            : "Vous pouvez proposer un document ou consulter toutes les autres ressources."}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                          {searchQuery ? (
                            <button
                              type="button"
                              onClick={() => setSearchQuery("")}
                              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
                            >
                              Effacer la recherche
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => setActiveTab("all")}
                                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
                              >
                                Voir toutes les ressources
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsUploadOpen(true)}
                                className="rounded-xl bg-[#8B1A4A] px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#6D1239] transition-colors"
                              >
                                Partager un document
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ─────────────────────────────────────────────────────────────
                   SEMESTER LANDING VIEW (When no module is selected)
                ───────────────────────────────────────────────────────────── */
                <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                  <div className="mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Vue d'ensemble
                    </span>
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Matières du {semesterLabel}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Sélectionnez une matière ci-dessous pour accéder immédiatement à ses cours, TDs et examens.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(semesterData?.modules ?? []).map((m: Module) => {
                      const count = getModuleFileCount(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleSelectModule(m.id)}
                          className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-apex-cream hover:border-apex-border text-left transition-all group"
                        >
                          <div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200/60 text-[#8B1A4A] mb-3 group-hover:bg-[#8B1A4A] group-hover:text-white transition-colors">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <h3 className="font-heading text-sm font-bold text-slate-900 group-hover:text-[#8B1A4A] transition-colors">
                              {m.label}
                            </h3>
                          </div>

                          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                            <span>{count} ressource{count > 1 ? "s" : ""}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#8B1A4A] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          MOBILE NAVIGATION DRAWER
      ───────────────────────────────────────────────────────────────────── */}
      <VaultMobileDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        selectedBranch={selectedBranch}
        selectedSemester={selectedSemester}
        selectedModule={selectedModule}
        onSelectSemester={handleSelectSemester}
        onSelectModule={handleSelectModule}
      />

      {/* ─────────────────────────────────────────────────────────────────────
          CONTRIBUTION / UPLOAD MODAL
      ───────────────────────────────────────────────────────────────────── */}
      <VaultUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        defaultModule={moduleLabel}
        defaultType={activeTab === "examen" ? "examen" : "cours"}
      />

      <Footer />
    </div>
  );
}
