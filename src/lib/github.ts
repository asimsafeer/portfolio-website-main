import { Project } from "./projects";

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
    homepage: string | null;
}

// Language to color mapping for badges
const languageColors: Record<string, string> = {
    Python: "from-blue-500/20 to-yellow-500/20",
    Dart: "from-cyan-500/20 to-blue-500/20",
    JavaScript: "from-yellow-500/20 to-orange-500/20",
    TypeScript: "from-blue-500/20 to-indigo-500/20",
    "Jupyter Notebook": "from-orange-500/20 to-red-500/20",
    Java: "from-red-500/20 to-orange-500/20",
    HTML: "from-orange-500/20 to-red-500/20",
    CSS: "from-blue-500/20 to-purple-500/20",
    default: "from-gray-500/20 to-slate-500/20",
};

// Custom descriptions for known repos
const customDescriptions: Record<string, string> = {
    Poul3y:
        "A digital platform for poultry industry management with real-time data access, disease tracking, and resource planning.",
    "MLOps-Project":
        "Machine Learning Operations project implementing best practices for ML model deployment and monitoring.",
    Jarvis:
        "An intelligent virtual assistant designed to automate tasks and provide a seamless interactive experience.",
    "Virtual-Assistant":
        "Python-based virtual assistant with voice recognition and task automation capabilities.",
    "The-Perfect-Guess": "Interactive number guessing game built with Python.",
    "Snake-Water-Gun-Game":
        "Classic Snake-Water-Gun game implementation in Python with CLI interface.",
};

export async function fetchGitHubRepos(
    username: string = "asimsafeer"
): Promise<GitHubRepo[]> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();
        return repos.filter((repo) => !repo.name.includes(".github.io")); // Filter out GitHub pages repos
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return [];
    }
}

export function mapRepoToProject(repo: GitHubRepo): Project {
    const language = repo.language || "default";
    const color = languageColors[language] || languageColors.default;
    const description =
        customDescriptions[repo.name] ||
        repo.description ||
        `A ${language} project by Aasim Safeer.`;

    // Generate tags from language and topics
    const tags: string[] = [];
    if (repo.language) tags.push(repo.language);
    if (repo.topics?.length) {
        tags.push(...repo.topics.slice(0, 3));
    }
    if (tags.length === 0) tags.push("Code");

    return {
        id: `github-${repo.name.toLowerCase()}`,
        title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description,
        image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
        tags,
        link: repo.homepage || repo.html_url,
        github: repo.html_url,
        category: "github",
        featured: repo.stargazers_count > 0 || repo.name === "Poul3y",
        color,
    };
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }
}
