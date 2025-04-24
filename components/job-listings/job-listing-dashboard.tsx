"use client";

import { useJobListing } from "@/hooks/use-job-listing";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import JobListingManageModal from "@/components/job-listings/job-listing-manage-modal";
import { Button } from "primereact/button";
import JobCompanyManageModal from "@/components/job-companies/job-company-manage-modal";
import Link from "next/link";
import ResumeManageModal from "@/components/resumes/resume-manage-modal";
import { useResume } from "@/hooks/use-resume";

export default function JobListingDashboard() {
  const { jobListings, isLoadingJobListings, loadJobListings } =
    useJobListing();
  const { loadResumes } = useResume();

  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddResumeModal, setShowAddResumeModal] = useState(false);

  return (
    <>
      <div className="p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Your Job Listings</h1>
          <div className="flex flex-row gap-3">
            <Button
              label="Add Listing"
              icon="pi pi-plus"
              className="bg-secondary p-2 rounded-md"
              onClick={() => setShowAddJobModal(true)}
            />
            <Button
              label="Add Company"
              icon="pi pi-plus"
              className="bg-secondary p-2 rounded-md"
              onClick={() => setShowAddCompanyModal(true)}
            />
            <Button
              label="Add Resume"
              icon="pi pi-plus"
              className="bg-secondary p-2 rounded-md"
              onClick={() => setShowAddResumeModal(true)}
            />
          </div>
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
                body={(row) => (
                  <Link
                    href={`/dashboard/listing/${row.id}`}
                    className="text-blue-600 hover:underline font-medium">
                    {row.title}
                  </Link>
                )}
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
            </DataTable>
          </div>
        )}
      </div>
      <JobListingManageModal
        isVisible={showAddJobModal}
        setIsVisible={setShowAddJobModal}
        onSubmitCallback={() => {
          setShowAddJobModal(false);
          loadJobListings(); // Refetch the job listings after adding a new one
        }}
      />
      <JobCompanyManageModal
        isVisible={showAddCompanyModal}
        setIsVisible={setShowAddCompanyModal}
      />
      <ResumeManageModal
        isVisible={showAddResumeModal}
        setIsVisible={setShowAddResumeModal}
        onSubmitCallback={() => {
          setShowAddResumeModal(false);
          loadResumes();
        }}
      />
    </>
  );
}
