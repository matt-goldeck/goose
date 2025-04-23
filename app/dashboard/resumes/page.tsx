import ResumeUploadForm from "@/components/resumes/resume-upload-form";

export default async function ResumeLandingPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-3xl font-bold">Resumes</h1>
      <p className="text-lg">
        Manage your resumes and cover letters in one place.
      </p>
      <ResumeUploadForm />
    </div>
  );
}
