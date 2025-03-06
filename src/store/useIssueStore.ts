import { create } from "zustand";
import { Issue, ColumnType } from "../types/index";

interface IssueState {
  issues: Record<ColumnType, Issue[]>;
  setIssues: (column: ColumnType, issues: Issue[]) => void;
  moveIssue: (id: number, from: ColumnType, to: ColumnType) => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: {
    ToDo: [],
    "In Progress": [],
    Done: [],
  },

  setIssues: (column: ColumnType, issues: Issue[]) =>
    set((state) => ({
      issues: {
        ...state.issues,
        [column]: [...issues],
      },
    })),

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
}));
