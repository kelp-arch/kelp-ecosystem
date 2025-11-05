import webvtt from "node-webvtt";
import fs from "node:fs/promises";
import path from "node:path";

export interface Interview {
  slug: string;
  title: string;
  name: string;
  role: string;
  duration: string;
  src: string;
  thumbnail: string;
  transcript?: string;
}

export const interviews: Interview[] = [
  {
    slug: "eleanor-vann",
    title: "Interview with Eleanor Vann",
    name: "Eleanor Vann",
    role: "Chief Technology Officer",
    duration: "36:08",
    src: "https://assets.tailwindcss.com/templates/compass/interviews/eleanor-vann.mp4",
    thumbnail: "https://assets.tailwindcss.com/templates/compass/interviews/eleanor-vann.jpg",
  },
  {
    slug: "tom-harris",
    title: "Interview with Tom Harris",
    name: "Tom Harris",
    role: "Product Designer",
    duration: "33:46",
    src: "https://assets.tailwindcss.com/templates/compass/interviews/tom-harris.mp4",
    thumbnail: "https://assets.tailwindcss.com/templates/compass/interviews/tom-harris.jpg",
  },
  {
    slug: "sophia-reid",
    title: "Interview with Sophia Reid",
    name: "Sophia Reid",
    role: "UX Researcher",
    duration: "32:01",
    src: "https://assets.tailwindcss.com/templates/compass/interviews/sophia-reid.mp4",
    thumbnail: "https://assets.tailwindcss.com/templates/compass/interviews/sophia-reid.jpg",
  },
  {
    slug: "nolan-grayson",
    title: "Interview with Nolan Grayson",
    name: "Nolan Grayson",
    role: "Engineering Manager",
    duration: "43:35",
    src: "https://assets.tailwindcss.com/templates/compass/interviews/nolan-grayson.mp4",
    thumbnail: "https://assets.tailwindcss.com/templates/compass/interviews/nolan-grayson.jpg",
  },
  {
    slug: "mick-larson",
    title: "Interview with Mick Larson",
    name: "Mick Larson",
    role: "Frontend Engineer",
    duration: "31:30",
    src: "https://assets.tailwindcss.com/templates/compass/interviews/mick-larson.mp4",
    thumbnail: "https://assets.tailwindcss.com/templates/compass/interviews/mick-larson.jpg",
  },
  {
    slug: "annie-king",
    title: "Interview with Annie King",
    name: "Annie King",
    role: "Marketing Director",
    duration: "26:13",
    src: "https://assets.tailwindcss.com/templates/compass/interviews/annie-king.mp4",
    thumbnail: "https://assets.tailwindcss.com/templates/compass/interviews/annie-king.jpg",
  },
];

export async function getInterviews(): Promise<Interview[]> {
  return interviews;
}

export async function getInterview(slug: string): Promise<Interview | undefined> {
  return interviews.find((interview) => interview.slug === slug);
}

export async function getInterviewTranscript(slug: string): Promise<string> {
  const vttPath = path.join(process.cwd(), "data", "interviews", `${slug}.vtt`);
  const vttContent = await fs.readFile(vttPath, "utf-8");
  const parsed = webvtt.parse(vttContent);

  return parsed.cues.map((cue: any) => cue.text).join(" ");
}
