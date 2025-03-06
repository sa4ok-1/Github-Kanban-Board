import { create } from "zustand";
import { Issue, ColumnType } from "../types/index";

interface IssueState {
  issues: Record<ColumnType, Issue[]>;
  isLoading: boolean;
  setIssues: (column: ColumnType, issues: Issue[]) => void;
  moveIssue: (id: number, from: ColumnType, to: ColumnType) => void;
  setLoading: (loading: boolean) => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: {
    ToDo: [],
    "In Progress": [],
    Done: [],
  },
  isLoading: false,

  setIssues: (column: ColumnType, issues: Issue[]) => {
    set({ isLoading: true });
    setTimeout(() => {
      set((state) => ({
        issues: {
          ...state.issues,
          [column]: [...issues],
        },
        isLoading: false,
      }));
    }, 800); 
  },

  moveIssue: (id: number, from: ColumnType, to: ColumnType) =>
    set((state) => {
      if (from === to) return state;

      const issueToMove = state.issues[from].find((issue) => issue.id === id);
      if (!issueToMove) return state;

      return {
        issues: {
          ...state.issues,
          [from]: state.issues[from].filter((issue) => issue.id !== id),
          [to]: [...state.issues[to], { ...issueToMove }],
        },
      };
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
