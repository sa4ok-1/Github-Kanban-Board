import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IssueCard from "./IssueCard";
import { Issue, ColumnType } from "../../types";

const mockIssue: Issue = {
  id: 1,
  title: "Sample Issue",
  number: 123,
  state: "open",
  created_at: "2023-01-01T00:00:00Z",
  comments: 5,
  assignee: null,
  user: { login: "testuser" },
};

const renderWithDndProvider = (ui: React.ReactElement) => {
  return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
};

describe("IssueCard Component", () => {
  it("renders issue details correctly", () => {
    renderWithDndProvider(<IssueCard issue={mockIssue} type="ToDo" />);

    expect(screen.getByTestId("issue-card")).toBeInTheDocument();
    expect(screen.getByText("Sample Issue")).toBeInTheDocument();
    expect(screen.getByText("testuser | Comments: 5")).toBeInTheDocument();
  });

  it("formats the date correctly", () => {
    renderWithDndProvider(<IssueCard issue={mockIssue} type="ToDo" />);

    const formattedDate = new Date(mockIssue.created_at).toDateString();
    expect(
      screen.getByText(`#123 opened ${formattedDate}`)
    ).toBeInTheDocument();
  });
});
