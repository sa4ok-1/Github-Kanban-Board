import { useRef } from "react";
import { Card } from "antd";
import { Issue, ColumnType } from "../../types";
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import { useIssueStore } from "../../store/useIssueStore";

const IssueCard = ({ issue, type }: { issue: Issue; type: ColumnType }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { moveIssue } = useIssueStore();

  const [{ isDragging }, drag] = useDrag<
    { id: number; fromType: ColumnType },
    void,
    { isDragging: boolean }
  >({
    type: "ISSUE",
    item: { id: issue.id, fromType: type },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop<
    { id: number; fromType: ColumnType },
    void,
    { isOver: boolean }
  >({
    accept: "ISSUE",
    hover: (item, monitor) => {
      if (!cardRef.current) return;

      const dragId = item.id;
      const hoverId = issue.id;

      if (dragId === hoverId) return;

      const hoverBoundingRect = cardRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      const isBelowMiddle = hoverClientY > hoverMiddleY;

      if (item.fromType === type) {
        moveIssue(
          dragId,
          item.fromType,
          type,
          undefined,
          hoverId,
          isBelowMiddle
        );
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(cardRef));

  return (
    <Card
      ref={cardRef}
      data-testid="issue-card"
      style={{
        marginBottom: 10,
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? "#e0e0e0" : "white",
        cursor: "move",
      }}
    >
      <h4>{issue.title}</h4>
      <p>
        #{issue.number} opened {new Date(issue.created_at).toDateString()}
      </p>
      <p>
        {issue.user.login} | Comments: {issue.comments}
      </p>
    </Card>
  );
};

export default IssueCard;
