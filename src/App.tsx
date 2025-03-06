import RepoSearch from "./components/RepoSearch";
import Board from "./components/Board";

const App = () => (
  <div style={{ padding: 20 }}>
    <h1>GitHub Issues Kanban Board</h1>
    <RepoSearch />
    <Board />
  </div>
);

export default App;
