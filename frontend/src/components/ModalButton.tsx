import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  text: string;
  children: React.ReactNode;
  colour?: string;
}

function ModalButton({ text, children, colour }: Props) {
  const [open, setOpen] = React.useState(false);

  const getButtonVariant = () => {
    if (colour === "#d4351c") return "destructive";
    if (colour === "#1d70b8") return "default";
    return "default";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={getButtonVariant()} size="sm">
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4">
          {React.isValidElement(children) 
            ? React.cloneElement(children, { onClose: () => setOpen(false) } as any)
            : children
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalButton;
