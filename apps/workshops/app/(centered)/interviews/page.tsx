import { Breadcrumb, Breadcrumbs, BreadcrumbSeparator, BreadcrumbHome } from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { VideoCard } from "@/components/video-card";
import { getInterviews } from "@/data/interviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interviews",
  description: "Watch interviews with industry experts",
};

export default async function InterviewsPage() {
  const interviews = await getInterviews();

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Interviews</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="mt-6">
        <h1 className="text-4xl font-semibold">Interviews</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-400">
          Watch in-depth conversations with industry experts
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {interviews.map((interview) => (
          <VideoCard
            key={interview.slug}
            href={`/interviews/${interview.slug}`}
            thumbnail={interview.thumbnail}
            title={interview.title}
            description={`${interview.role} • ${interview.duration}`}
          />
        ))}
      </div>
    </CenteredPageLayout>
  );
}
