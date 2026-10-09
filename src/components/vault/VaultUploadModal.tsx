import { useEffect, useRef, useState } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  FileText,
  BookOpen,
  ClipboardList,
  GraduationCap,
  User,
  CalendarDays,
} from "lucide-react";

interface VaultUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
  defaultType?: "examen" | "cours" | "td-tp";
}

type DocumentType = "examen" | "cours" | "td-tp";

const documentTypes: {
  id: DocumentType;
  label: string;
  icon: typeof FileText;
}[] = [
  {
    id: "cours",
    label: "Cours",
    icon: BookOpen,
  },
  {
    id: "td-tp",
    label: "TD / TP",
    icon: ClipboardList,
  },
  {
    id: "examen",
    label: "Examen",
    icon: GraduationCap,
  },
];

export default function VaultUploadModal({
  isOpen,
  onClose,
  defaultModule = "",
  defaultType = "cours",
}: VaultUploadModalProps) {
  const [docType, setDocType] = useState<DocumentType>(defaultType);
  const [moduleTitle, setModuleTitle] = useState(defaultModule);
  const [year, setYear] = useState("2024");
  const [studentName, setStudentName] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);


  // Keep defaults synchronized when the modal is opened
  // from a different module / context.
  useEffect(() => {
    if (!isOpen) return;

    setDocType(defaultType);
    setModuleTitle(defaultModule);
    setSubmitted(false);
    setFileName("");
  }, [isOpen, defaultModule, defaultType]);


  if (!isOpen) return null;


  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // UI-only submission for now.
    // Connect this to your backend when the upload API exists.
    setSubmitted(true);
  };


  const handleClose = () => {
    setSubmitted(false);
    setFileName("");
    onClose();
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vault-upload-title"
    >

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fermer"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,37,96,0.22)]">

        {/* ───────────────────────────────────────────────────────────
            HEADER
        ─────────────────────────────────────────────────────────── */}

        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">

          <div className="flex min-w-0 items-start gap-3.5">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-apex-cream">
              <Upload
                className="h-4.5 w-4.5 text-[#8B1A4A]"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <h2
                id="vault-upload-title"
                className="font-heading text-base font-bold text-slate-900"
              >
                Partager une ressource
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Aidez les étudiants à enrichir le Vault.
              </p>
            </div>

          </div>


          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Fermer la fenêtre"
          >
            <X className="h-4 w-4" />
          </button>

        </div>


        {/* ───────────────────────────────────────────────────────────
            CONTENT
        ─────────────────────────────────────────────────────────── */}

        <div className="p-5 sm:p-6">

          {submitted ? (

            /* ========================================================
               SUCCESS
            ======================================================== */

            <div className="px-3 py-8 text-center sm:px-8">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2
                  className="h-8 w-8 text-emerald-500"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-5 font-heading text-lg font-bold text-slate-900">
                Contribution envoyée
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-slate-500">
                Merci pour votre contribution. L'équipe APEX vérifiera
                la ressource avant sa publication dans le Vault.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#3D0821] px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#5C1232] hover:shadow-md"
              >
                Fermer
              </button>

            </div>

          ) : (

            /* ========================================================
               FORM
            ======================================================== */

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* ─────────────────────────────────────────────────────
                  STEP 1 — DOCUMENT TYPE
              ───────────────────────────────────────────────────── */}

              <section>
                <div className="mb-3">
                  <p className="text-xs font-bold text-slate-800">
                    1. Type de ressource
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Choisissez le type qui correspond au document.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {documentTypes.map((type) => {
                    const Icon = type.icon;
                    const selected = docType === type.id;

                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setDocType(type.id)}
                        className={[
                          "flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl border transition-all",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300",
                          selected
                            ? "border-[#8B1A4A] bg-apex-cream text-[#8B1A4A] shadow-sm"
                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50",
                        ].join(" ")}
                        aria-pressed={selected}
                      >
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.9}
                        />

                        <span className="text-[11px] font-semibold">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>


              {/* ─────────────────────────────────────────────────────
                  STEP 2 — CONTEXT
              ───────────────────────────────────────────────────── */}

              <section>
                <div className="mb-3">
                  <p className="text-xs font-bold text-slate-800">
                    2. Contexte
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Indiquez à quelle matière appartient le document.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_150px]">

                  {/* Module */}
                  <div>
                    <label
                      htmlFor="vault-module"
                      className="mb-1.5 block text-[10px] font-semibold text-slate-600"
                    >
                      Module / Matière
                    </label>

                    <div className="relative">
                      <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                      <input
                        id="vault-module"
                        type="text"
                        value={moduleTitle}
                        onChange={(event) =>
                          setModuleTitle(event.target.value)
                        }
                        placeholder="Ex. Analyse 1"
                        required
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>


                  {/* Year */}
                  <div>
                    <label
                      htmlFor="vault-year"
                      className="mb-1.5 block text-[10px] font-semibold text-slate-600"
                    >
                      Année
                    </label>

                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                      <select
                        id="vault-year"
                        value={year}
                        onChange={(event) =>
                          setYear(event.target.value)
                        }
                        className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none transition-all focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      >
                        <option value="2024">
                          2023 / 2024
                        </option>

                        <option value="2023">
                          2022 / 2023
                        </option>

                        <option value="2022">
                          2021 / 2022
                        </option>

                        <option value="autre">
                          Autre
                        </option>
                      </select>
                    </div>
                  </div>

                </div>
              </section>


              {/* ─────────────────────────────────────────────────────
                  STEP 3 — FILE
              ───────────────────────────────────────────────────── */}

              <section>
                <div className="mb-3">
                  <p className="text-xs font-bold text-slate-800">
                    3. Votre fichier
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    PDF, JPG ou PNG · 50 MB maximum.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={[
                    "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 text-center",
                    "transition-all duration-200",
                    fileName
                      ? "border-apex-border bg-apex-cream/40"
                      : "border-slate-200 bg-slate-50/50 hover:border-rose-300 hover:bg-apex-cream/30",
                  ].join(" ")}
                >

                  <div
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      fileName
                        ? "bg-rose-100 text-[#8B1A4A]"
                        : "bg-white text-slate-400 border border-slate-200",
                    ].join(" ")}
                  >
                    {fileName ? (
                      <FileText
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    ) : (
                      <Upload
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    )}
                  </div>


                  {fileName ? (
                    <>
                      <p className="mt-3 max-w-full truncate px-3 text-xs font-semibold text-slate-800">
                        {fileName}
                      </p>

                      <p className="mt-1 text-[10px] text-[#8B1A4A]">
                        Cliquer pour remplacer le fichier
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-xs font-semibold text-slate-700">
                        Sélectionner un fichier
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Cliquez ici pour parcourir votre appareil
                      </p>
                    </>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />

                </button>
              </section>


              {/* ─────────────────────────────────────────────────────
                  OPTIONAL CONTRIBUTOR
              ───────────────────────────────────────────────────── */}

              <details className="group rounded-xl border border-slate-200 bg-slate-50/60">

                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    Informations supplémentaires
                    <span className="font-normal text-slate-400">
                      (optionnel)
                    </span>
                  </span>

                  <span className="text-[10px] text-slate-400 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-4 pb-4 pt-3">

                  <label
                    htmlFor="vault-student-name"
                    className="mb-1.5 block text-[10px] font-semibold text-slate-600"
                  >
                    Nom ou pseudo
                  </label>

                  <input
                    id="vault-student-name"
                    type="text"
                    value={studentName}
                    onChange={(event) =>
                      setStudentName(event.target.value)
                    }
                    placeholder="Ex. Yassine B."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-blue-50"
                  />

                </div>
              </details>


              {/* ─────────────────────────────────────────────────────
                  ACTIONS
              ───────────────────────────────────────────────────── */}

              <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-5">

                <p className="hidden text-[10px] leading-4 text-slate-400 sm:block">
                  Votre contribution sera vérifiée avant publication.
                </p>

                <div className="ml-auto flex items-center gap-2">

                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={!fileName || !moduleTitle.trim()}
                    className={[
                      "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all",
                      !fileName || !moduleTitle.trim()
                        ? "cursor-not-allowed bg-slate-300"
                        : "bg-[#3D0821] hover:-translate-y-0.5 hover:bg-[#5C1232] hover:shadow-md",
                    ].join(" ")}
                  >
                    <Upload
                      className="h-3.5 w-3.5"
                      strokeWidth={2}
                    />

                    Envoyer
                  </button>

                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}


