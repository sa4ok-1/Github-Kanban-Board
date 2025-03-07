import { create } from "zustand";
import { Issue, ColumnType } from "../types/index";

interface IssueState {
  issues: Record<ColumnType, Issue[]>;
  isLoading: boolean;
  setIssues: (column: ColumnType, issues: Issue[]) => void;
  moveIssue: (
    id: number,
    from: ColumnType,
    to: ColumnType,
    targetIndex?: number,
    hoverId?: number,
    insertAfter?: boolean
  ) => void;
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

  moveIssue: (
    id: number,
    from: ColumnType,
    to: ColumnType,
    targetIndex?: number,
    hoverId?: number,
    insertAfter?: boolean
  ) =>
    void set((state) => {
      const issueToMove = state.issues[from].find((issue) => issue.id === id);
      if (!issueToMove) return state;

      if (from === to && hoverId !== undefined) {
        const fromIssues = state.issues[from].filter(
          (issue) => issue.id !== id
        );
        const hoverIndex = fromIssues.findIndex(
          (issue) => issue.id === hoverId
        );
        if (hoverIndex === -1) return state;

        const newIssues = [...fromIssues];
        const insertIndex = insertAfter ? hoverIndex + 1 : hoverIndex;
        newIssues.splice(insertIndex, 0, issueToMove);

        return {
          issues: {
            ...state.issues,
            [from]: newIssues,
          },
        };
      }

      if (from !== to) {
        const fromIssues = state.issues[from].filter(
          (issue) => issue.id !== id
        );
        const toIssues = [...state.issues[to]];
        const insertIndex =
          targetIndex !== undefined
            ? Math.min(targetIndex, toIssues.length)
            : toIssues.length;
        toIssues.splice(insertIndex, 0, issueToMove);

        return {
          issues: {
            ...state.issues,
            [from]: fromIssues,
            [to]: toIssues,
          },
        };
      }

      return state;
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
