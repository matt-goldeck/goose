import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { JobListingWithCompany } from "@/lib/types/db";

export interface JobListingDetailProps {
  job: JobListingWithCompany;
}

export default function JobListingDetail({ job }: JobListingDetailProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray">
      <Card title={job.title} subTitle={`${job.job_company.name}`}>
        <div className="text-sm text-gray-500 mb-2">
          Created at: {new Date(job.created_at).toLocaleString()}
        </div>

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mb-4">
            View job post
          </a>
        )}

        <h4 className="font-semibold mb-4">Description</h4>
        <pre className="whitespace-pre-wrap p-4 rounded-md dark:bg-zinc-800 dark:text-white">
          {job.description}
        </pre>

        {job.user_notes && (
          <div className="mt-4 rounded-lg">
            <h4 className="font-semibold mb-1 ">Your Notes</h4>
            <p className="p-4 rounded-md dark:bg-zinc-800 dark:text-white">
              {job.user_notes}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
