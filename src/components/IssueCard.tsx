import { Card } from "antd";
import { Issue } from "../types";

const IssueCard = ({ issue }: { issue: Issue }) => (
  <Card data-testid="issue-card" style={{ marginBottom: 10 }}>
    <h4>{issue.title}</h4>
    <p>#{issue.number} opened {new Date(issue.created_at).toDateString()}</p>
    <p>{issue.user.login} | Comments: {issue.comments}</p>
  </Card>
);

export default IssueCard;