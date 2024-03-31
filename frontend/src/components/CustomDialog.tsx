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
  dialogTrigger?: React.ReactNode;
  className?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  dialogFooter?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomDialog: React.FC<CustomDialogProps> = ({
  dialogTrigger,
  className,
  dialogTitle,
  dialogDescription,
  children,
  dialogFooter,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
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
