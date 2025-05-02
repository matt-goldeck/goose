"use client";

import { use, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useJobCompany } from "@/hooks/use-job-company";
import { JobListing } from "@/lib/types/db";
import {
  createApplication,
  createJobListing,
  updateJobListing,
} from "@/utils/supabase/client-queries";
import { auth } from "@/auth-client";
import { Session } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { Checkbox } from "primereact/checkbox";

type JobListingFormProps = {
  onSubmitCallback: () => void;
  jobListing?: JobListing;
};

export default function JobListingForm({
  onSubmitCallback,
  jobListing,
}: JobListingFormProps) {
  const { jobCompanies } = useJobCompany();

  const [formData, setFormData] = useState<Partial<JobListing>>({
    title: jobListing?.title || "",
    description: jobListing?.description || "",
    url: jobListing?.url || "",
    user_notes: jobListing?.user_notes || "",
    job_company_id: jobListing?.job_company_id,
    user_id: undefined,
    id: jobListing?.id,
  });
  const [userSubmittedApplication, setUserSubmittedApplication] =
    useState(true);

  const router = useRouter();
  useEffect(() => {
    const fetchUserId = async () => {
      const session = (await auth()) as Session;

      if (!session || !session.user) {
        console.error("User not authenticated");
        router.push("/sign-in");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        user_id: session.user!.id,
      }));
    };

    if (!jobListing) {
      fetchUserId();
    }
  }, [jobListing]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof JobListing, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.job_company_id)
      newErrors.job_company_id = "Company is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Upsert job listing
    let result: JobListing;
    if (jobListing) {
      result = await updateJobListing(formData as JobListing);
    } else {
      result = await createJobListing(formData as JobListing);
    }

    // Create app
    if (userSubmittedApplication) {
      await createApplication(result.id);
    }

    onSubmitCallback();
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Job Title
        </label>
        <InputText
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={classNames("w-full", { "p-invalid": !!errors.title })}
        />
        {errors.title && <small className="text-red-500">{errors.title}</small>}
      </div>

      <div>
        <label htmlFor="url" className="block font-medium mb-1">
          Job URL
        </label>
        <InputText
          id="url"
          value={formData.url || ""}
          onChange={(e) => handleChange("url", e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="job_company_id" className="block font-medium mb-1">
          Company
        </label>
        <Dropdown
          id="job_company_id"
          value={formData.job_company_id}
          onChange={(e) => handleChange("job_company_id", e.value)}
          options={jobCompanies.map((company) => ({
            label: company.name,
            value: company.id,
          }))}
          placeholder="Select a company"
          className="w-full"
        />
        {errors.job_company_id && (
          <small className="text-red-500">{errors.job_company_id}</small>
        )}
      </div>
      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <InputTextarea
          id="description"
          rows={5}
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="user_notes" className="block font-medium mb-1">
          Notes
        </label>
        <InputTextarea
          id="user_notes"
          rows={3}
          value={formData.user_notes || ""}
          onChange={(e) => handleChange("user_notes", e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          inputId="user-submitted-application"
          checked={userSubmittedApplication}
          onChange={(e) => setUserSubmittedApplication(e.checked ?? false)}
        />
        <label htmlFor="user-submitted-application" className="font-medium">
          Submitted Application
        </label>
      </div>
      <div className="flex justify-end">
        <Button
          label={jobListing ? "Update Listing" : "Create Listing"}
          type="submit"
          loading={isSubmitting}
        />
      </div>
    </form>
  );
}
