import { useIssueStore } from "../store/useIssueStore";
import { ColumnType } from "../types";
import IssueCard from "./IssueCard";

const Column = ({ title, type }: { title: string; type: ColumnType }) => {
  const { issues } = useIssueStore();

  return (
    <div style={{ width: "30%", padding: "10px", background: "#f0f0f0" }}>
      <h3>{title}</h3>
      {issues[type].map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default Column;
