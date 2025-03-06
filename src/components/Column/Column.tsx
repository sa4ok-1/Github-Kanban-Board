import { useRef } from "react";
import { useIssueStore } from "../../store/useIssueStore";
import { ColumnType } from "../../types";
import IssueCard from "../IssueCard/IssueCard";
import { useDrop, DropTargetMonitor } from "react-dnd";

const Column = ({ title, type }: { title: string; type: ColumnType }) => {
  const { issues, moveIssue, isLoading } = useIssueStore();
  const divRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop<
    { id: number; fromType: ColumnType },
    void,
    { isOver: boolean }
  >({
    accept: "ISSUE",
    drop: (item) => {
      moveIssue(item.id, item.fromType, type);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drop(divRef);

  return (
    <div
      ref={divRef}
      style={{
        width: "30%",
        padding: "10px",
        background: isOver ? "#e0e0e0" : "#f0f0f0",
        minHeight: "400px",
      }}
    >
      <h3>{title}</h3>
      {isLoading ? (
        <p>Завантаження...</p>
      ) : issues[type].length === 0 ? (
        <p>Немає задач</p>
      ) : (
        issues[type].map((issue) => (
          <IssueCard key={issue.id} issue={issue} type={type} />
        ))
      )}
    </div>
  );
};

export default Column;
