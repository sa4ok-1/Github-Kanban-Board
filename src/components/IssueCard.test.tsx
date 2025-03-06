import { render, screen } from "@testing-library/react";
import IssueCard from "./IssueCard";
import { Issue } from "../types";

const mockIssue: Issue = {
    title: "Sample Issue",
    number: 123,
    created_at: "2024-03-06T12:00:00Z",
    user: { login: "test-user" },
    comments: 5,
    id: 0,
    state: "open"
};

describe("IssueCard Component", () => {
  it("renders issue details correctly", () => {
    render(<IssueCard issue={mockIssue} />);

    expect(screen.getByTestId("issue-card")).toBeInTheDocument();
    expect(screen.getByText("Sample Issue")).toBeInTheDocument();
    expect(screen.getByText(/#123 opened/i)).toBeInTheDocument();
    expect(screen.getByText("test-user | Comments: 5")).toBeInTheDocument();
  });

  it("formats the date correctly", () => {
    render(<IssueCard issue={mockIssue} />);
    
    const formattedDate = new Date(mockIssue.created_at).toDateString();
    expect(screen.getByText(new RegExp(`#123 opened ${formattedDate}`, "i"))).toBeInTheDocument();
  });
});
