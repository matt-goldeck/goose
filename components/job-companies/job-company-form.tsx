"use client";

import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useRouter } from "next/navigation";
import { auth } from "@/auth-client";
import { Session } from "@/lib/types/auth";
import {
  createJobCompany,
  updateJobCompany,
} from "@/utils/supabase/client-queries";
import { JobCompany } from "@/lib/types/db";

type JobCompanyFormProps = {
  onSubmitCallback: () => void;
  jobCompany?: JobCompany;
};

export default function JobCompanyForm({
  onSubmitCallback,
  jobCompany,
}: JobCompanyFormProps) {
  const [formData, setFormData] = useState<Partial<JobCompany>>({
    name: jobCompany?.name || "",
    website: jobCompany?.website || "",
    user_id: jobCompany?.user_id || undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

    if (!jobCompany) {
      fetchUserId();
    }
  }, [jobCompany]);

  const handleChange = (field: keyof JobCompany, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Company name is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    if (jobCompany) {
      await updateJobCompany(formData as JobCompany);
    } else {
      await createJobCompany(formData as JobCompany);
    }

    onSubmitCallback();
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Company Name
        </label>
        <InputText
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={classNames("w-full", { "p-invalid": !!errors.name })}
        />
        {errors.name && <small className="text-red-500">{errors.name}</small>}
      </div>

      <div>
        <label htmlFor="website" className="block font-medium mb-1">
          Website
        </label>
        <InputText
          id="website"
          value={formData.website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex justify-end">
        <Button
          label={jobCompany ? "Update Company" : "Create Company"}
          type="submit"
          loading={isSubmitting}
          className="p-2"
          rounded
        />
      </div>
    </form>
  );
}
