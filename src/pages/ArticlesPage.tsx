import { useEffect, useMemo, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Coffee,
  ListTodo,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  Target,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useStudyTimer, type StudyDurations, type TimerMode } from '../contexts/StudyTimerContext';

type StudyTask = {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
};

const TASKS_STORAGE_KEY = 'apex-ens-study-tasks-v1';
const FOCUS_PRESETS = [25, 45, 60, 90];
const MODE_LABELS: Record<TimerMode, string> = {
  focus: 'Concentration',
  shortBreak: 'Petite pause',
  longBreak: 'Pause longue',
};

function readSavedTasks(): StudyTask[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is StudyTask => (
      item !== null
      && typeof item === 'object'
      && typeof item.id === 'string'
      && typeof item.title === 'string'
      && typeof item.subject === 'string'
      && typeof item.completed === 'boolean'
    ));
  } catch {
    return [];
  }
}

function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getTodayLabel(): string {
  const label = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function TaskList({ tasks, setTasks }: {
  tasks: StudyTask[];
  setTasks: Dispatch<SetStateAction<StudyTask[]>>;
}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const { timer, setTaskLabel } = useStudyTimer();

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: StudyTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: trimmedTitle,
      subject: subject.trim(),
      completed: false,
    };

    setTasks((current) => [newTask, ...current]);
    setTitle('');
    setSubject('');
  };

  const toggleTask = (taskId: string) => {
    setTasks((current) => current.map((task) => (
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )));
  };

  const deleteTask = (taskId: string) => {
    const deleted = tasks.find((task) => task.id === taskId);
    setTasks((current) => current.filter((task) => task.id !== taskId));
    if (deleted && deleted.title === timer.taskLabel) setTaskLabel('');
  };

  const clearCompleted = () => {
    const completedTitles = new Set(tasks.filter((task) => task.completed).map((task) => task.title));
    setTasks((current) => current.filter((task) => !task.completed));
    if (completedTitles.has(timer.taskLabel)) setTaskLabel('');
  };

  return (
    <section
      aria-labelledby="tasks-heading"
      className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[#861746]">
            <ListTodo className="h-4 w-4" aria-hidden="true" />
            Mon organisation
          </div>
          <h2 id="tasks-heading" className="font-heading text-2xl font-black tracking-tight text-slate-900">
            Mes tâches d'étude
          </h2>
          <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-500">
            Transforme tes objectifs en petites étapes concrètes et faciles à suivre.
          </p>
        </div>

        <div className="min-w-[84px] rounded-2xl bg-slate-50 px-4 py-3 text-right ring-1 ring-slate-100">
          <p className="font-heading text-2xl font-black tabular-nums text-slate-900">{remainingCount}</p>
          <p className="text-xs font-medium text-slate-500">à faire</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold">
          <span className="text-slate-500">Progression des tâches</span>
          <span className="text-slate-700">
            {completedCount}/{tasks.length} terminée{completedCount === 1 ? '' : 's'}
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Progression des tâches"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="h-full rounded-full bg-[#861746] transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form onSubmit={addTask} className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
        <label htmlFor="study-task-title" className="mb-2 block text-sm font-bold text-slate-800">
          Ajouter une tâche
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="study-task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex. : Résoudre les exercices 1 à 4"
            maxLength={140}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#861746] focus:ring-4 focus:ring-rose-900/5"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#861746] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#6f1038] focus:outline-none focus:ring-4 focus:ring-rose-900/15 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter
          </button>
        </div>
        <label htmlFor="study-task-subject" className="sr-only">Matière (facultatif)</label>
        <input
          id="study-task-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Matière facultative : Analyse, Algèbre, Physique..."
          maxLength={60}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#861746] focus:ring-4 focus:ring-rose-900/5"
        />
      </form>

      <div className="mt-5 space-y-2">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-9 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-[#861746]">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="font-bold text-slate-800">Ta liste commence ici.</p>
            <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-slate-500">
              Ajoute une première tâche pour savoir exactement par quoi commencer.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-start gap-3 rounded-xl border p-3 transition-colors sm:p-4 ${
                task.completed
                  ? 'border-slate-100 bg-slate-50/80'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                aria-label={task.completed ? `Marquer « ${task.title} » comme non terminée` : `Marquer « ${task.title} » comme terminée`}
                aria-pressed={task.completed}
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus:ring-4 focus:ring-rose-900/10 ${
                  task.completed
                    ? 'border-[#861746] bg-[#861746] text-white'
                    : 'border-slate-300 text-transparent hover:border-[#861746]'
                }`}
              >
                {task.completed
                  ? <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  : <Circle className="h-5 w-5" aria-hidden="true" />}
              </button>

              <div className="min-w-0 flex-1">
                <p className={`break-words text-sm font-semibold leading-6 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {task.title}
                </p>
                {task.subject && <p className="mt-1 text-xs font-medium text-slate-500">{task.subject}</p>}
                {!task.completed && (
                  <button
                    type="button"
                    onClick={() => setTaskLabel(task.title)}
                    className="mt-2 text-xs font-bold text-[#861746] underline decoration-rose-200 underline-offset-4 transition hover:text-[#6f1038]"
                  >
                    {timer.taskLabel === task.title ? 'Tâche sélectionnée' : 'Étudier cette tâche'}
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Supprimer la tâche « ${task.title} »`}
                title="Supprimer la tâche"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-900/15 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))
        )}
      </div>

      {completedCount > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={clearCompleted}
            className="text-xs font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-[#861746]"
          >
            Effacer les tâches terminées
          </button>
        </div>
      )}

      <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-slate-400">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
        Enregistrement automatique sur cet appareil.
      </p>
    </section>
  );
}

function PomodoroPanel({ tasks }: { tasks: StudyTask[] }) {
  const { timer, selectMode, toggleTimer, resetTimer, updateDurations, setTaskLabel } = useStudyTimer();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [focusDraft, setFocusDraft] = useState(String(timer.durations.focus));
  const [shortBreakDraft, setShortBreakDraft] = useState(String(timer.durations.shortBreak));
  const [longBreakDraft, setLongBreakDraft] = useState(String(timer.durations.longBreak));

  useEffect(() => {
    setFocusDraft(String(timer.durations.focus));
    setShortBreakDraft(String(timer.durations.shortBreak));
    setLongBreakDraft(String(timer.durations.longBreak));
  }, [timer.durations]);

  const totalSeconds = timer.durations[timer.mode] * 60;
  const progress = totalSeconds > 0
    ? Math.min(100, Math.max(0, ((totalSeconds - timer.secondsLeft) / totalSeconds) * 100))
    : 0;
  const ModeIcon = timer.mode === 'focus' ? Target : Coffee;
  const availableTasks = tasks.filter((task) => !task.completed);

  const applyDurations = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const focus = Number(focusDraft);
    const shortBreak = Number(shortBreakDraft);
    const longBreak = Number(longBreakDraft);

    if (
      !Number.isFinite(focus) || focus < 1 || focus > 180
      || !Number.isFinite(shortBreak) || shortBreak < 1 || shortBreak > 60
      || !Number.isFinite(longBreak) || longBreak < 1 || longBreak > 60
    ) return;

    const nextDurations: StudyDurations = { focus, shortBreak, longBreak };
    updateDurations(nextDurations);
    setSettingsOpen(false);
  };

  const applyFocusPreset = (minutes: number) => {
    if (timer.isRunning) return;
    const nextDurations = { ...timer.durations, focus: minutes };
    setFocusDraft(String(minutes));
    updateDurations(nextDurations);
  };

  return (
    <section
      aria-labelledby="pomodoro-heading"
      className="relative overflow-hidden rounded-3xl bg-[#3D0821] p-5 text-white shadow-lg shadow-rose-950/10 sm:p-7"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-300/10 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-rose-100">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            Minuteur Pomodoro
          </div>
          <h2 id="pomodoro-heading" className="font-heading text-xl font-bold sm:text-2xl">
            Ta session, ton rythme.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-rose-100/75">
            25 minutes, une heure ou plus : choisis la durée qui correspond à ton travail.
          </p>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/10 p-3 sm:block">
          <ModeIcon className="h-6 w-6 text-rose-100" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-black/10 p-1">
        {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => selectMode(mode)}
            aria-pressed={timer.mode === mode}
            className={`rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
              timer.mode === mode
                ? 'bg-white text-[#3D0821]'
                : 'text-rose-100/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {MODE_LABELS[mode]}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center py-7">
        <div
          className="grid h-48 w-48 place-items-center rounded-full p-2 sm:h-52 sm:w-52"
          style={{ background: `conic-gradient(#F9A8D4 ${progress}%, rgba(255,255,255,0.14) ${progress}% 100%)` }}
          role="img"
          aria-label={`Progression du minuteur : ${Math.round(progress)} pour cent`}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#3D0821]">
            <span className="font-mono text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
              {formatTime(timer.secondsLeft)}
            </span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-100/65">
              {timer.sessionFinished ? 'Session terminée' : timer.isRunning ? 'Reste concentré' : 'Prêt à démarrer'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex w-full max-w-xs gap-3">
          <button
            type="button"
            onClick={toggleTimer}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-[#3D0821] transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-white/25"
          >
            {timer.isRunning
              ? <Pause className="h-4 w-4" aria-hidden="true" />
              : <Play className="h-4 w-4 fill-current" aria-hidden="true" />}
            {timer.isRunning ? 'Pause' : timer.sessionFinished ? 'Relancer' : timer.hasStarted ? 'Reprendre' : 'Démarrer'}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
            aria-label="Réinitialiser le minuteur"
            title="Réinitialiser"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p aria-live="polite" className="mt-4 min-h-5 text-center text-sm text-rose-100/85">
          {timer.sessionFinished
            ? timer.mode === 'focus'
              ? 'Session terminée. Bien joué ! Prends une pause avant de continuer.'
              : 'Pause terminée. Tu peux reprendre quand tu es prêt.'
            : timer.isRunning
              ? 'Le minuteur continue même lorsque tu navigues vers une autre page.'
              : 'Mets-toi à l’aise et lance ta session quand tu es prêt.'}
        </p>
      </div>

      <div className="relative z-10 border-t border-white/10 pt-5">
        <label htmlFor="timer-task" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-rose-100/70">
          Sur quoi vas-tu travailler ?
        </label>
        <select
          id="timer-task"
          value={timer.taskLabel}
          onChange={(event) => setTaskLabel(event.target.value)}
          className="w-full rounded-xl border border-white/15 bg-[#52112f] px-3.5 py-3 text-sm text-white outline-none transition focus:border-rose-200 focus:ring-4 focus:ring-rose-200/10"
        >
          <option value="" className="bg-[#3D0821]">Choisir une tâche (facultatif)</option>
          {timer.taskLabel && !availableTasks.some((task) => task.title === timer.taskLabel) && (
            <option value={timer.taskLabel} className="bg-[#3D0821]">{timer.taskLabel}</option>
          )}
          {availableTasks.map((task) => (
            <option key={task.id} value={task.title} className="bg-[#3D0821]">
              {task.subject ? `${task.subject} — ${task.title}` : task.title}
            </option>
          ))}
        </select>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-rose-100/70">Durée de concentration</p>
          <button
            type="button"
            onClick={() => setSettingsOpen((open) => !open)}
            aria-expanded={settingsOpen}
            aria-controls="timer-settings"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
          >
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            {settingsOpen ? 'Fermer' : 'Personnaliser'}
          </button>
        </div>

        <div className="mt-2 grid grid-cols-4 gap-2">
          {FOCUS_PRESETS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => applyFocusPreset(minutes)}
              disabled={timer.isRunning}
              aria-pressed={timer.durations.focus === minutes}
              className={`rounded-xl border px-2 py-2.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                timer.durations.focus === minutes
                  ? 'border-rose-200 bg-rose-100 text-[#3D0821]'
                  : 'border-white/15 bg-white/[0.04] text-rose-100/85 hover:bg-white/10'
              }`}
            >
              {minutes >= 60 ? `${minutes / 60} h` : `${minutes} min`}
            </button>
          ))}
        </div>

        {settingsOpen && (
          <form id="timer-settings" onSubmit={applyDurations} className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
            <p className="mb-3 text-xs leading-5 text-rose-100/70">
              Les durées sont en minutes. Mets le minuteur en pause pour modifier les réglages ; appliquer les changements réinitialise le temps de la session choisie.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="focus-minutes" className="mb-1.5 block text-[11px] font-semibold text-rose-100/80">Concentration</label>
                <input
                  id="focus-minutes"
                  type="number"
                  min={1}
                  max={180}
                  required
                  disabled={timer.isRunning}
                  value={focusDraft}
                  onChange={(event) => setFocusDraft(event.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#52112f] px-2.5 py-2.5 text-sm text-white outline-none focus:border-rose-200 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="short-break-minutes" className="mb-1.5 block text-[11px] font-semibold text-rose-100/80">Petite pause</label>
                <input
                  id="short-break-minutes"
                  type="number"
                  min={1}
                  max={60}
                  required
                  disabled={timer.isRunning}
                  value={shortBreakDraft}
                  onChange={(event) => setShortBreakDraft(event.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#52112f] px-2.5 py-2.5 text-sm text-white outline-none focus:border-rose-200 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="long-break-minutes" className="mb-1.5 block text-[11px] font-semibold text-rose-100/80">Pause longue</label>
                <input
                  id="long-break-minutes"
                  type="number"
                  min={1}
                  max={60}
                  required
                  disabled={timer.isRunning}
                  value={longBreakDraft}
                  onChange={(event) => setLongBreakDraft(event.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#52112f] px-2.5 py-2.5 text-sm text-white outline-none focus:border-rose-200 disabled:opacity-50"
                />
              </div>
            </div>
            {(!timer.isRunning && (
              Number(focusDraft) < 1 || Number(focusDraft) > 180
              || Number(shortBreakDraft) < 1 || Number(shortBreakDraft) > 60
              || Number(longBreakDraft) < 1 || Number(longBreakDraft) > 60
            )) && (
              <p className="mt-3 text-xs text-rose-200">Concentration : 1–180 min. Pauses : 1–60 min.</p>
            )}
            <button
              type="submit"
              disabled={timer.isRunning}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#3D0821] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Enregistrer les durées
            </button>
          </form>
        )}
      </div>

      <p className="relative z-10 mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-rose-100/60">
        Tes réglages et le temps restant sont enregistrés automatiquement dans ce navigateur.
      </p>
    </section>
  );
}

function StudyMethodCard() {
  return (
    <section aria-labelledby="study-method-heading" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <BookMarked className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="study-method-heading" className="font-heading text-xl font-black text-slate-900">Une méthode simple</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Pour commencer sans te disperser.</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-black text-[#861746]">1</span>
          <div>
            <p className="text-sm font-bold text-slate-800">Choisis une tâche précise</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">Par exemple : résoudre deux exercices plutôt que « réviser tout le chapitre ».</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-black text-[#861746]">2</span>
          <div>
            <p className="text-sm font-bold text-slate-800">Choisis une durée réaliste</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">Une courte session ou une heure complète : adapte le minuteur à ton objectif.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-black text-[#861746]">3</span>
          <div>
            <p className="text-sm font-bold text-slate-800">Rappelle-toi ce que tu as appris</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">Ferme le cours et essaie de refaire l'exercice ou d'expliquer l'idée de mémoire.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ArticlesPage() {
  const today = useMemo(() => getTodayLabel(), []);
  const [tasks, setTasks] = useState<StudyTask[]>(readSavedTasks);

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Tasks remain usable for this session when local storage is unavailable.
    }
  }, [tasks]);

  return (
    <>
      {/* Keep the current activePage key for existing Header navigation compatibility. */}
      <Header activePage="articles" />

      <main id="main-content" className="min-h-screen bg-[#f8fafc] pb-16">
        <section aria-labelledby="study-space-heading" className="pb-8 pt-8 sm:pb-10 sm:pt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10 lg:p-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-rose-100/80 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.13em] text-[#861746]">
                    <Target className="h-3.5 w-3.5" aria-hidden="true" />
                    APEX Focus · Espace d'étude
                  </div>
                  <p className="mb-2 text-sm font-semibold text-slate-500">{today}</p>
                  <h1 id="study-space-heading" className="font-heading text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    Organise tes études.
                    <br />
                    <span className="text-[#861746]">Avance à ton rythme.</span>
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                    Prépare ta liste de travail, choisis ta durée de concentration et reprends ta session même après avoir changé de page.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a href="#mes-taches" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#861746] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#6f1038] focus:outline-none focus:ring-4 focus:ring-rose-900/15">
                      Planifier mon travail
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                    <Link to="/vault" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/5">
                      <BookOpen className="h-4 w-4 text-[#861746]" aria-hidden="true" />
                      Trouver mes cours
                    </Link>
                  </div>
                </div>

                <div className="grid shrink-0 grid-cols-2 gap-3 sm:max-w-sm lg:w-72">
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 sm:p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-[#861746]">
                      <ListTodo className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="font-heading text-base font-bold text-slate-900">Mes tâches</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Savoir quoi faire ensuite.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 sm:p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Clock3 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="font-heading text-base font-bold text-slate-900">Pomodoro flexible</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">De 1 à 180 minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <div id="mes-taches" className="scroll-mt-24">
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
            <div className="space-y-6">
              <PomodoroPanel tasks={tasks} />
              <StudyMethodCard />
              <Link to="/vault" className="group flex items-center justify-between gap-4 rounded-3xl border border-rose-100 bg-rose-50/70 p-5 transition hover:border-rose-200 hover:bg-rose-50 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#861746] shadow-sm">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-heading font-black text-slate-900">Besoin d'un cours ou d'un TD ?</p>
                    <p className="mt-1 text-sm leading-5 text-slate-600">Retrouve les ressources dans le Vault académique.</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#861746] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm leading-6 text-slate-500">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            <p>
              Tes tâches et tes réglages sont enregistrés automatiquement dans ce navigateur. Le minuteur reste visible pendant la navigation lorsque tu démarres une session ; aucune donnée n'est synchronisée avec un compte.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
