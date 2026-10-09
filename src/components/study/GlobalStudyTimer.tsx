import { ArrowUpRight, Clock3, Pause, Play, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudyTimer } from '../../contexts/StudyTimerContext';

const MODE_LABELS = {
  focus: 'Concentration',
  shortBreak: 'Petite pause',
  longBreak: 'Pause longue',
} as const;

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/** Render this once inside BrowserRouter and outside Routes, so it remains mounted during navigation. */
export default function GlobalStudyTimer() {
  const { timer, toggleTimer, resetTimer } = useStudyTimer();

  if (!timer.hasStarted) return null;

  const totalSeconds = timer.durations[timer.mode] * 60;
  const progress = totalSeconds > 0
    ? Math.min(100, Math.max(0, ((totalSeconds - timer.secondsLeft) / totalSeconds) * 100))
    : 0;
  const actionLabel = timer.isRunning
    ? 'Mettre le minuteur en pause'
    : timer.sessionFinished
      ? 'Relancer le minuteur'
      : 'Reprendre le minuteur';

  return (
    <aside
      aria-label="Minuteur d'étude en cours"
      className="fixed inset-x-3 bottom-3 z-[100] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[340px]"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#240817]/95 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="h-1 w-full bg-white/10" aria-hidden="true">
          <div
            className="h-full bg-rose-300 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-rose-200">
            <Clock3 className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-rose-100/75">
              {timer.sessionFinished ? 'Session terminée' : MODE_LABELS[timer.mode]}
            </p>
            <p className="font-mono text-2xl font-bold leading-tight tracking-tight tabular-nums">
              {formatTime(timer.secondsLeft)}
            </p>
            {timer.taskLabel && (
              <p className="mt-0.5 truncate text-[11px] text-white/55">{timer.taskLabel}</p>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTimer}
            aria-label={actionLabel}
            title={actionLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#3D0821] transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#240817]"
          >
            {timer.isRunning
              ? <Pause className="h-4 w-4" aria-hidden="true" />
              : <Play className="h-4 w-4 fill-current" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={resetTimer}
            aria-label="Réinitialiser et masquer le minuteur"
            title="Réinitialiser"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/55 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="border-t border-white/[0.08] px-4 py-2.5">
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-100/75 transition hover:text-white focus-visible:outline-none focus-visible:underline"
          >
            Ouvrir l'espace d'étude
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
