"use client";

import { useJobListing } from "@/hooks/use-job-listing";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";

export default function JobListingDashboard() {
  const { jobListings, isLoadingJobListings } = useJobListing();

  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Your Job Listings</h1>

      {isLoadingJobListings ? (
        <div className="flex justify-center items-center h-40">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable
            value={jobListings}
            paginator
            rows={10}
            className="shadow-md rounded-lg min-w-full"
            stripedRows
            tableStyle={{ minWidth: "100%" }}
            rowClassName={() => "text-sm whitespace-normal leading-relaxed"}>
            <Column
              field="title"
              header="Title"
              sortable
              bodyStyle={{ whiteSpace: "normal", padding: "1rem" }}
              headerStyle={{ padding: "1rem" }}
            />
            <Column
              field="job_company.name"
              header="Company"
              sortable
              bodyStyle={{ whiteSpace: "normal", padding: "1rem" }}
              headerStyle={{ padding: "1rem" }}
            />
            <Column
              field="created_at"
              header="Created At"
              sortable
              bodyStyle={{ padding: "1rem" }}
              headerStyle={{ padding: "1rem" }}
            />
            <Column
              field="user_notes"
              header="Notes"
              body={(row) => row.user_notes || "—"}
              bodyStyle={{ whiteSpace: "normal", padding: "1rem" }}
              headerStyle={{ padding: "1rem" }}
            />
          </DataTable>
        </div>
      )}
    </div>
  );
}
