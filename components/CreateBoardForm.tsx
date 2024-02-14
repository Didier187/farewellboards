"use client";

import { useRef } from "react";
import SubmitButton from "./SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createFarewellBoard } from "@/actions/farewell-board";

function CreateBoardForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="flex flex-col w-full mb-5 space-y-4 md:mb-0 md:col-span-2"
      action={async (form) => {
        createFarewellBoard(form)
          .then((res) => {
            formRef.current?.reset();
            toast.success("Farewell board created successfully", {
              duration: 4000,
              description:
                "Your farewell board has been created successfully. Share the link with your loved ones.",
            });
          })
          .catch((e) => {
            toast.error("Failed to create farewell board", {
              duration: 4000,
              description: e.message,
            });
          });
      }}
    >
      <Label htmlFor="farewell_for">Farewell For</Label>
      <Input type="text" name="farewell_for" id="farewell_for" />
      <Label htmlFor="description">Description</Label>
      <Textarea name="description" id="description" />
      <SubmitButton />
    </form>
  );
}
export { CreateBoardForm };
