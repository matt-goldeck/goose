import { Resume } from "@/lib/types/db";
import { Dialog } from "primereact/dialog";
import ResumeUploadForm from "./resume-upload-form";

export interface ResumeManageModalProps {
  resume?: Resume;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onSubmitCallback: () => void;
}
export default function ResumeManageModal({
  resume,
  isVisible,
  setIsVisible,
  onSubmitCallback,
}: ResumeManageModalProps) {
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setIsVisible(false)}
      className="rounded-xl shadow-2xl w-full max-w-2xl font-tourney"
      header={resume ? "Edit Resume" : "Add Resume"}>
      <ResumeUploadForm resume={resume} onSubmitCallback={onSubmitCallback} />
    </Dialog>
  );
}
