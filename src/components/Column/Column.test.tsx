import { render, screen } from "@testing-library/react";
import Board from "../Board/Board";


jest.mock("./Column", () => ({ title, type }: { title: string; type: string }) => (
  <div data-testid={`column-${type}`}>{title}</div>
));

describe("Board component", () => {
  test("renders three columns with correct titles", () => {
    render(<Board />);

    expect(screen.getByText("ToDo")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("renders exactly three Column components with correct test-ids", () => {
    render(<Board />);

    expect(screen.getByTestId("column-ToDo")).toBeInTheDocument();
    expect(screen.getByTestId("column-In Progress")).toBeInTheDocument();
    expect(screen.getByTestId("column-Done")).toBeInTheDocument();
  });
});
