"use client";

import { useState } from "react";
import Link from "next/link";
import { useJobListing } from "@/hooks/use-job-listing";
import { useResume } from "@/hooks/use-resume";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import JobListingManageModal from "@/components/job-listings/job-listing-manage-modal";
import JobCompanyManageModal from "@/components/job-companies/job-company-manage-modal";
import ResumeManageModal from "@/components/resumes/resume-manage-modal";
import { formatDate } from "@/utils/dates";
import { Card } from "primereact/card";
import { formatTypeString } from "@/utils/text";
import JobListingFilters from "@/components/job-listings/job-listing-filters";

export default function JobListingDashboard() {
  const { jobListings, isLoadingJobListings, loadJobListings } =
    useJobListing();
  const { loadResumes } = useResume();

  const [modalState, setModalState] = useState({
    job: false,
    company: false,
    resume: false,
  });

  const openModal = (key: keyof typeof modalState) =>
    setModalState((prev) => ({ ...prev, [key]: true }));

  const closeModal = (key: keyof typeof modalState) =>
    setModalState((prev) => ({ ...prev, [key]: false }));

  return (
    <Card className="outline shadow-sm rounded-2xl">
      <div className="w-full p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-foreground font-tourney">
          Saved Listings
        </h1>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            <Button
              label="Add Listing"
              icon="pi pi-plus"
              className="btn-primary font-jetBrainsMono"
              onClick={() => openModal("job")}
            />
            <Button
              label="Add Company"
              icon="pi pi-plus"
              className="btn-primary font-jetBrainsMono"
              onClick={() => openModal("company")}
            />
            <Button
              label="Add Resume"
              icon="pi pi-plus"
              className="btn-primary font-jetBrainsMono"
              onClick={() => openModal("resume")}
            />
          </div>
          <JobListingFilters />
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
              className="rounded-lg shadow-sm font-jetBrainsMono"
              stripedRows
              tableStyle={{ minWidth: "100%" }}
              rowClassName={() => "text-sm"}>
              <Column
                field="title"
                header="Title"
                sortable
                body={(row) => (
                  <Link
                    href={`/dashboard/listings/${row.id}`}
                    className="text-harvest hover:underline font-medium max-w-[400px] truncate block">
                    {row.title}
                  </Link>
                )}
              />
              <Column
                field="job_company.name"
                header="Company"
                sortable
                body={(row) => (
                  <span className="block max-w-[150px] truncate">
                    {row.job_company?.name || "—"}
                  </span>
                )}
              />
              <Column
                field="application.application_outcome"
                header="Outcome"
                body={(row) =>
                  row.application?.application_outcome
                    ? formatTypeString(
                        row.application.application_outcome.outcome
                      )
                    : "Active"
                }
              />

              <Column
                field="created_at"
                header="Created At"
                sortable
                body={(row) => formatDate(row.created_at)}
              />
            </DataTable>
          </div>
        )}
      </div>

      {/* Modals */}
      <JobListingManageModal
        isVisible={modalState.job}
        setIsVisible={(val) => setModalState((s) => ({ ...s, job: val }))}
        onSubmitCallback={() => {
          closeModal("job");
          loadJobListings();
        }}
      />
      <JobCompanyManageModal
        isVisible={modalState.company}
        setIsVisible={(val) => setModalState((s) => ({ ...s, company: val }))}
      />
      <ResumeManageModal
        isVisible={modalState.resume}
        setIsVisible={(val) => setModalState((s) => ({ ...s, resume: val }))}
        onSubmitCallback={() => {
          closeModal("resume");
          loadResumes();
        }}
      />
    </Card>
  );
}
