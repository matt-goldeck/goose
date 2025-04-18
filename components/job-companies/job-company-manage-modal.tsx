import { Dialog } from "primereact/dialog";
import { JobCompany } from "@/lib/types/db";
import { useJobCompany } from "@/hooks/use-job-company";
import JobCompanyForm from "@/components/job-companies/job-company-form";

export interface JobCompanyManageModalProps {
  jobCompany?: JobCompany;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function JobCompanyManageModal({
  jobCompany,
  isVisible,
  setIsVisible,
}: JobCompanyManageModalProps) {
  const { loadJobCompanies } = useJobCompany();
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setIsVisible(false)}
      className="bg-white text-black dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl w-full max-w-2xl p-6">
      <JobCompanyForm
        jobCompany={jobCompany}
        onSubmitCallback={() => {
          loadJobCompanies();
          setIsVisible(false);
        }}
      />
    </Dialog>
  );
}
