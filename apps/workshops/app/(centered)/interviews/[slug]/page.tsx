import { Breadcrumbs } from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { NextPageLink } from "@/components/next-page-link";
import { Video } from "@/components/video-player";
import { getInterview, interviews } from "@/data/interviews";
import { ClockIcon } from "@/icons/clock-icon";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return interviews.map((interview) => ({
    slug: interview.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const interview = await getInterview(params.slug);

  if (!interview) {
    return {};
  }

  return {
    title: `Interview with ${interview?.name}`,
    description: `${interview.duration} interview with ${interview.name}, ${interview.role}`,
  };
}

export default async function InterviewPage(props: Props) {
  const params = await props.params;
  const interview = await getInterview(params.slug);

  if (!interview) {
    notFound();
  }

  const currentIndex = interviews.findIndex((i) => i.slug === params.slug);
  const nextInterview = interviews[currentIndex + 1];

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs
          links={[
            { href: "/interviews", label: "Interviews" },
            { label: interview.name },
          ]}
        />
      }
    >
      <div className="mt-6">
        <h1 className="text-4xl font-semibold">{interview.title}</h1>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <span>{interview.role}</span>
          <span>·</span>
          <ClockIcon className="size-4" />
          <span>{interview.duration}</span>
        </div>
      </div>
      <div className="mt-10">
        <Video src={interview.src} id="interview-video" />
      </div>
      {nextInterview && (
        <div className="mt-12">
          <NextPageLink href={`/interviews/${nextInterview.slug}`}>
            Next interview: {nextInterview.name}
          </NextPageLink>
        </div>
      )}
    </CenteredPageLayout>
  );
}
