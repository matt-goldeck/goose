"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

import { useJobCompany } from "@/hooks/use-job-company";
import { formatDate } from "@/utils/dates";
import JobCompanyManageModal from "@/components/job-companies/job-company-manage-modal";
import { JobCompany } from "@/lib/types/db";
import { deleteJobCompany } from "@/utils/supabase/client-queries";

export default function JobCompanyDashboard() {
  const { jobCompanies, isLoadingJobCompanies, loadJobCompanies } =
    useJobCompany();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const formatWebsite = (website: string | null) =>
    website ? (
      <a
        href={website.startsWith("http") ? website : `https://${website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-harvest hover:underline">
        {website}
      </a>
    ) : (
      <Tag severity="warning" value="No Website" />
    );

  const [editingCompany, setEditingCompany] = useState<JobCompany | undefined>(
    undefined
  );

  const handleEdit = (company: JobCompany) => {
    setEditingCompany(company);
    setIsModalVisible(true);
  };

  const handleDelete = async (company: JobCompany) => {
    if (
      window.confirm(
        `Are you sure you want to delete the company "${company.name}"?`
      )
    ) {
      await deleteJobCompany(company.id);
      loadJobCompanies();
    }
  };

  return (
    <Card className="outline shadow-sm rounded-2xl">
      <div className="w-full p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-foreground font-tourney">
          Saved Companies
        </h1>
        <Button
          label="Add Company"
          icon="pi pi-plus"
          className="btn-primary font-tourney"
          onClick={() => setIsModalVisible(true)}
        />

        {isLoadingJobCompanies ? (
          <div className="flex justify-center items-center h-40">
            <ProgressSpinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              value={jobCompanies}
              paginator
              rows={10}
              stripedRows
              className="rounded-lg shadow-sm"
              emptyMessage="No companies found."
              tableStyle={{ minWidth: "100%" }}
              rowClassName={() => "text-sm"}>
              <Column field="name" header="Name" sortable />
              <Column
                field="website"
                header="Website"
                body={(rowData) => formatWebsite(rowData.website)}
              />
              <Column
                field="created_at"
                header="Created At"
                sortable
                body={(row) => formatDate(row.created_at)}
              />
              <Column
                header="Actions"
                body={(rowData) => (
                  <div className="flex gap-2">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-sm p-button-text"
                      onClick={() => handleEdit(rowData)}
                      tooltip="Edit"
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-sm p-button-text p-button-danger"
                      onClick={() => handleDelete(rowData)}
                      tooltip="Delete"
                    />
                  </div>
                )}
                style={{ width: "120px" }}
              />
            </DataTable>
          </div>
        )}
      </div>

      <JobCompanyManageModal
        isVisible={isModalVisible}
        setIsVisible={(val) => {
          setIsModalVisible(val);
          if (!val) setEditingCompany(undefined);
        }}
        jobCompany={editingCompany}
      />
    </Card>
  );
}
