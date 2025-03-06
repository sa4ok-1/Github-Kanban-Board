import Column from "../Column/Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = () => (
  <DndProvider backend={HTML5Backend}>
    <div
      style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}
    >
      <Column title="ToDo" type="ToDo" />
      <Column title="In Progress" type="In Progress" />
      <Column title="Done" type="Done" />
    </div>
  </DndProvider>
);

export default Board;