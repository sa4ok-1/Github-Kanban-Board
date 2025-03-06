import { useRef } from "react";
import { Card } from "antd";
import { Issue, ColumnType } from "../../types";
import { useDrag, DragSourceMonitor } from "react-dnd";

const IssueCard = ({ issue, type }: { issue: Issue; type: ColumnType }) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

  drag(cardRef);

  return (
    <Card
      ref={cardRef}
      data-testid="issue-card"
      style={{
        marginBottom: 10,
        opacity: isDragging ? 0.5 : 1,
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
