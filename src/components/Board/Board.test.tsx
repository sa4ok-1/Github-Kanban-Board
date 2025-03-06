import { render, screen } from "@testing-library/react";
import Board from "./Board";

jest.mock("../Column/Column", () => {
  return {
    __esModule: true,
    default: jest.fn(({ title }) => (
      <div data-testid={`column-${title}`}>{title}</div>
    )),
  };
});

describe("Board Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all columns correctly", async () => {
    render(<Board />);

    expect(screen.getByTestId("column-ToDo")).toBeInTheDocument();
    expect(screen.getByTestId("column-In Progress")).toBeInTheDocument();
    expect(screen.getByTestId("column-Done")).toBeInTheDocument();

    const ColumnMock = require("../Column/Column").default;
    expect(ColumnMock).toHaveBeenCalledTimes(3);
    expect(ColumnMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "ToDo", type: "ToDo" }),
      expect.anything()
    );
    expect(ColumnMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "In Progress", type: "In Progress" }),
      expect.anything()
    );
    expect(ColumnMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Done", type: "Done" }),
      expect.anything()
    );
  });
});
