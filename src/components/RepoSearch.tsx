import { useState } from "react";
import { Input, Button } from "antd";
import { useGithubIssues } from "../hooks/useGithubIssues";

const RepoSearch = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const { fetchIssues } = useGithubIssues();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Input
        placeholder="Enter repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <Button type="primary" onClick={() => fetchIssues(repoUrl)}>
        Load Issues
      </Button>
    </div>
  );
};

export default RepoSearch;
