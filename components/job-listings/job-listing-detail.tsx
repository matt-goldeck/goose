import { JobListingWithCompanyAndApplication } from "@/lib/types/db";
import { Card } from "primereact/card";

export interface JobListingDetailProps {
  job: JobListingWithCompanyAndApplication;
}

export default function JobListingDetail({ job }: JobListingDetailProps) {
  return (
    <Card className="w-full bg-white dark:bg-zinc-900 shadow-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">{job.title}</h1>
        <p className="text-sm text-zinc-500 mt-1">{job.job_company.name}</p>
        <p className="text-xs text-zinc-400 mt-1">
          Created: {new Date(job.created_at).toLocaleString()}
        </p>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm underline mt-2 inline-block hover:underline-offset-2"
          >
            View job post
          </a>
        )}
      </header>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Description</h2>
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 text-sm text-zinc-800 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed">
          {job.description}
        </div>
      </section>

      {job.user_notes && (
        <section>
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Your Notes</h2>
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 text-sm text-zinc-800 dark:text-zinc-100 leading-relaxed">
            {job.user_notes}
          </div>
        </section>
      )}
    </Card>
  );
}