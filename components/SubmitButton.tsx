"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  const text = pending ? "Submitting..." : "Submit";
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />} {text}
    </Button>
  );
}

export default SubmitButton;
