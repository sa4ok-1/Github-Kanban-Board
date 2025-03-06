import axios from "axios";
import { Issue } from "../types";
import { useIssueStore } from "../store/useIssueStore";

export const useGithubIssues = () => {
  const { setIssues } = useIssueStore();

  const fetchIssues = async (repoUrl: string) => {
    try {
      const repoMatch = repoUrl.match(/github\.com\/([^\/]+\/[^\/]+)/i);
      if (!repoMatch) {
        throw new Error("Invalid GitHub repository URL");
      }

      const repoPath = repoMatch[1];
      const apiUrl = `https://api.github.com/repos/${repoPath}/issues?state=all`;

      const { data } = await axios.get<Issue[]>(apiUrl);

      const toDo = data.filter(
        (issue) => !issue.assignee && issue.state === "open"
      );
      const inProgress = data.filter(
        (issue) => issue.assignee && issue.state === "open"
      );
      const done = data.filter((issue) => issue.state === "closed");

      setIssues("ToDo", toDo);
      setIssues("In Progress", inProgress);
      setIssues("Done", done);
    } catch (error) {
      console.error("Error fetching issues:", error);
      throw error;
    }
  };

  return { fetchIssues };
};
