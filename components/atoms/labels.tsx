import React from "react";
import { Label } from "../ui/label";

interface LabelsProps {
  htmlFor: string;
  className: string;
  children?: React.ReactNode;
}

const Labels = ({ htmlFor, className, children }: LabelsProps) => {
  return (
    <div>
      <Label htmlFor={htmlFor} className={className}>
        {children}
      </Label>
    </div>
  );
};

export default Labels;
