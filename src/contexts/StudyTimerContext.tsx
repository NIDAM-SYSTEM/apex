import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export type StudyDurations = Record<TimerMode, number>;

export interface StudyTimerState {
  mode: TimerMode;
  durations: StudyDurations; // minutes
  secondsLeft: number;
  isRunning: boolean;
  endsAt: number | null;
  sessionFinished: boolean;
  hasStarted: boolean;
  taskLabel: string;
}

interface StudyTimerContextValue {
  timer: StudyTimerState;
  selectMode: (mode: TimerMode) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  updateDurations: (durations: StudyDurations) => void;
  setTaskLabel: (label: string) => void;
}

const STORAGE_KEY = 'apex-ens-study-timer-v1';

const DEFAULT_DURATIONS: StudyDurations = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
};

const TimerContext = createContext<StudyTimerContextValue | undefined>(undefined);

function clampMinutes(value: unknown, fallback: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(1, Math.round(value)));
}

function isTimerMode(value: unknown): value is TimerMode {
  return value === 'focus' || value === 'shortBreak' || value === 'longBreak';
}

function readInitialTimer(): StudyTimerState {
  const defaults: StudyTimerState = {
    mode: 'focus',
    durations: { ...DEFAULT_DURATIONS },
    secondsLeft: DEFAULT_DURATIONS.focus * 60,
    isRunning: false,
    endsAt: null,
    sessionFinished: false,
    hasStarted: false,
    taskLabel: '',
  };

  if (typeof window === 'undefined') return defaults;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== 'object') return defaults;

    const data = saved as Partial<StudyTimerState>;
    const savedDurations = data.durations as Partial<StudyDurations> | undefined;
    const durations: StudyDurations = {
      focus: clampMinutes(savedDurations?.focus, DEFAULT_DURATIONS.focus, 180),
      shortBreak: clampMinutes(savedDurations?.shortBreak, DEFAULT_DURATIONS.shortBreak, 60),
      longBreak: clampMinutes(savedDurations?.longBreak, DEFAULT_DURATIONS.longBreak, 60),
    };
    const mode: TimerMode = isTimerMode(data.mode) ? data.mode : 'focus';
    const validRunning = data.isRunning === true && typeof data.endsAt === 'number';
    const computedSeconds = validRunning
      ? Math.max(0, Math.ceil(((data.endsAt as number) - Date.now()) / 1000))
      : Math.max(
          0,
          Math.min(
            durations[mode] * 60,
            typeof data.secondsLeft === 'number' && Number.isFinite(data.secondsLeft)
              ? Math.round(data.secondsLeft)
              : durations[mode] * 60,
          ),
        );

    // The deadline-based timer keeps the correct remaining time after refresh.
    // If the deadline passed while the app was closed, restore a finished session.
    if (validRunning && computedSeconds === 0) {
      return {
        mode,
        durations,
        secondsLeft: 0,
        isRunning: false,
        endsAt: null,
        sessionFinished: true,
        hasStarted: true,
        taskLabel: typeof data.taskLabel === 'string' ? data.taskLabel : '',
      };
    }

    return {
      mode,
      durations,
      secondsLeft: computedSeconds,
      isRunning: validRunning,
      endsAt: validRunning ? (data.endsAt as number) : null,
      sessionFinished: data.sessionFinished === true,
      hasStarted: data.hasStarted === true || validRunning,
      taskLabel: typeof data.taskLabel === 'string' ? data.taskLabel.slice(0, 140) : '',
    };
  } catch {
    return defaults;
  }
}

export function StudyTimerProvider({ children }: { children: ReactNode }) {
  const [timer, setTimer] = useState<StudyTimerState>(readInitialTimer);

  // Store the timer in one place, shared by every route in the application.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(timer));
    } catch {
      // The timer remains usable for the current session if storage is unavailable.
    }
  }, [timer]);

  // Use an absolute deadline rather than decrementing blindly, so the timer
  // does not drift and survives refreshes or temporary backgrounding.
  useEffect(() => {
    if (!timer.isRunning || timer.endsAt === null) return undefined;

    const deadline = timer.endsAt;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

      setTimer((current) => {
        if (!current.isRunning || current.endsAt !== deadline) return current;
        if (remaining === 0) {
          return {
            ...current,
            secondsLeft: 0,
            isRunning: false,
            endsAt: null,
            sessionFinished: true,
          };
        }
        return current.secondsLeft === remaining
          ? current
          : { ...current, secondsLeft: remaining };
      });
    };

    tick();
    const intervalId = window.setInterval(tick, 250);
    return () => window.clearInterval(intervalId);
  }, [timer.isRunning, timer.endsAt]);

  const selectMode = useCallback((mode: TimerMode) => {
    setTimer((current) => ({
      ...current,
      mode,
      secondsLeft: current.durations[mode] * 60,
      isRunning: false,
      endsAt: null,
      sessionFinished: false,
    }));
  }, []);

  const toggleTimer = useCallback(() => {
    setTimer((current) => {
      if (current.isRunning && current.endsAt !== null) {
        const remaining = Math.max(0, Math.ceil((current.endsAt - Date.now()) / 1000));
        return {
          ...current,
          secondsLeft: remaining,
          isRunning: false,
          endsAt: null,
          sessionFinished: remaining === 0,
        };
      }

      const seconds = current.secondsLeft > 0
        ? current.secondsLeft
        : current.durations[current.mode] * 60;
      return {
        ...current,
        secondsLeft: seconds,
        isRunning: true,
        endsAt: Date.now() + seconds * 1000,
        sessionFinished: false,
        hasStarted: true,
      };
    });
  }, []);

  const resetTimer = useCallback(() => {
    setTimer((current) => ({
      ...current,
      secondsLeft: current.durations[current.mode] * 60,
      isRunning: false,
      endsAt: null,
      sessionFinished: false,
      hasStarted: false,
    }));
  }, []);

  const updateDurations = useCallback((nextDurations: StudyDurations) => {
    const durations: StudyDurations = {
      focus: clampMinutes(nextDurations.focus, DEFAULT_DURATIONS.focus, 180),
      shortBreak: clampMinutes(nextDurations.shortBreak, DEFAULT_DURATIONS.shortBreak, 60),
      longBreak: clampMinutes(nextDurations.longBreak, DEFAULT_DURATIONS.longBreak, 60),
    };

    // Applying settings pauses and resets the selected mode deliberately.
    setTimer((current) => ({
      ...current,
      durations,
      secondsLeft: durations[current.mode] * 60,
      isRunning: false,
      endsAt: null,
      sessionFinished: false,
    }));
  }, []);

  const setTaskLabel = useCallback((taskLabel: string) => {
    setTimer((current) => ({ ...current, taskLabel: taskLabel.slice(0, 140) }));
  }, []);

  const value = useMemo<StudyTimerContextValue>(() => ({
    timer,
    selectMode,
    toggleTimer,
    resetTimer,
    updateDurations,
    setTaskLabel,
  }), [timer, selectMode, toggleTimer, resetTimer, updateDurations, setTaskLabel]);

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useStudyTimer(): StudyTimerContextValue {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useStudyTimer must be used inside StudyTimerProvider.');
  }
  return context;
}
