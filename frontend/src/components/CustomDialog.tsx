import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type CustomDialogProps = {
  dialogTrigger: React.ReactNode;
  className?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  dialogFooter?: React.ReactNode;
};

const CustomDialog: React.FC<CustomDialogProps> = ({
  dialogTrigger,
  className,
  dialogTitle,
  dialogDescription,
  children,
  dialogFooter,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        <DialogFooter>{dialogFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
