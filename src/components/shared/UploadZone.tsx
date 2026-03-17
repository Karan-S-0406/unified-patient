import { Upload, FileCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  label: string;
  accept?: string;
  uploaded?: boolean;
  className?: string;
}

export function UploadZone({ label, uploaded: initialUploaded = false, className }: UploadZoneProps) {
  const [uploaded, setUploaded] = useState(initialUploaded);

  return (
    <button
      type="button"
      onClick={() => setUploaded(true)}
      className={cn(
        "w-full border-2 border-dashed rounded-[8px] p-6 text-center transition-colors cursor-pointer",
        uploaded
          ? "border-success/40 bg-success/5"
          : "border-border hover:border-primary/40 hover:bg-accent/50",
        className
      )}
    >
      {uploaded ? (
        <div className="flex flex-col items-center gap-2">
          <FileCheck className="w-8 h-8 text-success" />
          <p className="text-sm font-medium text-success">Document Uploaded</p>
          <p className="text-xs text-muted-foreground">Click to replace</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">Click or drag to upload • JPG, PNG, PDF up to 10MB</p>
        </div>
      )}
    </button>
  );
}
