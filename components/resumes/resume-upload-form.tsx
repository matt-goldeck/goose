"use client";

import { auth } from "@/auth-client";
import { Resume } from "@/lib/types/db";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useState } from "react";

export interface ResumeUploadFormProps {
  resume?: Resume;
  onSubmitCallback: () => void;
}

export default function ResumeUploadForm({
  resume,
  onSubmitCallback,
}: ResumeUploadFormProps) {
  const [formData, setFormData] = useState<Partial<Resume>>({
    id: resume?.id,
    name: resume?.name || "",
    content: resume?.content || "",
    user_id: resume?.user_id,
  });
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     const session = (await auth()) as Session;

  //     if (!session || !session.user) {
  //       console.error("User not authenticated");
  //       router.push("/sign-in");
  //       return;
  //     }
  //     setFormData((prev) => ({
  //       ...prev,
  //       user_id: session.user!.id,
  //     }));
  //   };
  // }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof Resume, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.title = "Title is required.";
    if (!file && !formData.content) {
      newErrors.file = "File is required";
    }
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

    if (resume) {
      console.log("how did you get here...?");
      // TODO: create an update resume workflow
    } else {
      const session = await auth();
      if (!session || !session.accessToken) {
        router.push("/sign-in");
        return;
      }

      const requestData = new FormData();
      requestData.append("name", formData.name || "");
      requestData.append("file", file!);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ICEMAN_URL}/resume/upload/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            body: requestData,
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          setSubmitError(responseData.message || "Something went wrong");
          setIsSubmitting(false);
          return;
        }

        // If successful
        setSubmitError(null);
        onSubmitCallback();
      } catch (error) {
        setSubmitError((error as Error).message);
        setIsSubmitting(false);
        console.error("Error uploading resume:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4">
      <div>
        <label className="block mb-1 font-medium">Resume Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="ex Resume v6"
          required
        />
        {errors.name && <small className="text-red-500">{errors.name}</small>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Resume File (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
        {errors.file && <small className="text-red-500">{errors.file}</small>}
      </div>

      <Button
        label={resume ? "Update Resume" : "Upload Resume"}
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        loading={isSubmitting}
      />
      {submitError && <p className="text-red-500">{submitError}</p>}
    </form>
  );
}
