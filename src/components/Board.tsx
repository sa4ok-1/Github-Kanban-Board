import Column from "./Column";

const Board = () => (
  <div
    style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}
  >
    <Column title="ToDo" type="ToDo" />
    <Column title="In Progress" type="In Progress" />
    <Column title="Done" type="Done" />
  </div>
);

export default Board;
