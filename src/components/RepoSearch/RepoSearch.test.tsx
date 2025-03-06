import { render, screen, fireEvent } from "@testing-library/react";
import RepoSearch from "./RepoSearch";
import { useGithubIssues } from "../../hooks/useGithubIssues";

jest.mock("../../hooks/useGithubIssues", () => ({
  useGithubIssues: jest.fn(),
}));

describe("RepoSearch Component", () => {
  it("renders input and button correctly", () => {
    const mockFetchIssues = jest.fn();
    (useGithubIssues as jest.Mock).mockReturnValue({ fetchIssues: mockFetchIssues });
    render(<RepoSearch />);

    expect(screen.getByPlaceholderText("Enter repo URL")).toBeInTheDocument();
    expect(screen.getByText("Load Issues")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    const mockFetchIssues = jest.fn();
    (useGithubIssues as jest.Mock).mockReturnValue({ fetchIssues: mockFetchIssues });
    render(<RepoSearch />);

    const input = screen.getByPlaceholderText("Enter repo URL");
    fireEvent.change(input, { target: { value: "https://github.com/user/repo" } });
    expect(input).toHaveValue("https://github.com/user/repo");
  });

  it("calls fetchIssues with correct URL when button is clicked", () => {
    const mockFetchIssues = jest.fn();
    (useGithubIssues as jest.Mock).mockReturnValue({ fetchIssues: mockFetchIssues });
    render(<RepoSearch />);

    const input = screen.getByPlaceholderText("Enter repo URL");
    const button = screen.getByText("Load Issues");

    fireEvent.change(input, { target: { value: "https://github.com/user/repo" } });
    fireEvent.click(button);

    expect(mockFetchIssues).toHaveBeenCalledWith("https://github.com/user/repo");
  });
});
