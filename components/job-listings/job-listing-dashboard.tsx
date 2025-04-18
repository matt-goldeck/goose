"use client";

import { useJobListing } from "@/hooks/use-job-listing";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import JobListingManageModal from "./job-listing-manage-modal";
import { Button } from "primereact/button";

export default function JobListingDashboard() {
  const { jobListings, isLoadingJobListings } = useJobListing();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Your Job Listings</h1>
          <Button
            label="Add Listing"
            icon="pi pi-plus"
            className="bg-secondary p-2 rounded-md"
            onClick={() => setShowAddModal(true)}
          />
        </div>

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
      <JobListingManageModal
        isVisible={showAddModal}
        setIsVisible={setShowAddModal}
      />
    </>
  );
}
