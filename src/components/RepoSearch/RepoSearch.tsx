import { useState } from "react";
import { Input, Button, Typography } from "antd";
import { useGithubIssues } from "../../hooks/useGithubIssues";
import { StarFilled } from "@ant-design/icons";

const { Text } = Typography;

const RepoSearch = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState<{
    owner: string;
    name: string;
    stars: number;
  } | null>(null);
  const { fetchIssues } = useGithubIssues();

  const extractRepoInfo = async () => {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return;

    const owner = match[1];
    const name = match[2];

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${name}`
      );
      const data = await response.json();
      if (data?.stargazers_count !== undefined) {
        setRepoData({ owner, name, stars: data.stargazers_count });
      }
    } catch (error) {
      console.error("Error fetching repo data:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <Input
          placeholder="Enter repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            fetchIssues(repoUrl);
            extractRepoInfo();
          }}
        >
          Load Issues
        </Button>
      </div>

      {repoData && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #ddd",
            padding: "8px",
            borderRadius: "5px",
            background: "#f5f5f5",
            width: "fit-content",
          }}
        >
          <Text type="secondary">
            <a
              href={`https://github.com/${repoData.owner}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repoData.owner}
            </a>{" "}
            {">"}{" "}
            <a
              href={`https://github.com/${repoData.owner}/${repoData.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repoData.name}
            </a>
          </Text>
          <StarFilled style={{ color: "orange" }} />
          <Text strong>{repoData.stars.toLocaleString()} stars</Text>
        </div>
      )}
    </div>
  );
};

export default RepoSearch;
