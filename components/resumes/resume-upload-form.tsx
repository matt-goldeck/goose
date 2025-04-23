"use client";

import { auth } from "@/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResumeUploadForm() {
  const [resumeName, setResumeName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = await auth();
    if (!session || !session.accessToken) {
      router.push("/sign-in");
      return;
    }

    if (!file || !resumeName) {
      setStatus("Please provide both a name and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", resumeName);
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/resume/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setStatus(data.message || "Upload successful!");
    } catch (error) {
      setStatus("Upload failed.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4">
      <div>
        <label className="block mb-1 font-medium">Resume Name</label>
        <input
          type="text"
          value={resumeName}
          onChange={(e) => setResumeName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="e.g. Software Engineer Resume"
          required
        />
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
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Upload Resume
      </button>

      {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
    </form>
  );
}
