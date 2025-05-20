"use client";

import { useJobCompany } from "@/hooks/use-job-company";
import { useJobListing } from "@/hooks/use-job-listing";
import { Dropdown } from "primereact/dropdown";

export default function JobListingFilters() {
  const { filters, setFilters, jobListings } = useJobListing();
  const { jobCompanies } = useJobCompany();

  const statusOptions = [
    { label: "All", value: undefined },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const companyOptions = [
    { label: "All Companies", value: undefined },
    ...jobCompanies.map((company) => ({
      label: company.name,
      value: company.id,
    })),
  ];

  return (
    <div className="flex gap-4 flex-wrap items-center">
      <Dropdown
        value={filters.status}
        options={statusOptions}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            status: e.value,
          }))
        }
        placeholder="Select a status"
        className="w-56"
      />

      <Dropdown
        value={filters.companyId}
        options={companyOptions}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            companyId: e.value,
          }))
        }
        placeholder="All Companies"
        className="w-56"
        optionLabel="label"
        optionValue="value"
      />
    </div>
  );
}
