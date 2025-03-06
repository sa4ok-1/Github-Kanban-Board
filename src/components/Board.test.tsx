import { render, screen } from "@testing-library/react";
import Board from "./Board";
import Column from "./Column";

jest.mock("./Column", () => ({
  __esModule: true,
  default: jest.fn(({ title }) => <div data-testid={`column-${title}`}>{title}</div>),
}));

describe("Board Component", () => {
  it("renders all columns correctly", () => {
    render(<Board />);

    expect(screen.getByTestId("column-ToDo")).toBeInTheDocument();
    expect(screen.getByTestId("column-In Progress")).toBeInTheDocument();
    expect(screen.getByTestId("column-Done")).toBeInTheDocument();
  });
});
