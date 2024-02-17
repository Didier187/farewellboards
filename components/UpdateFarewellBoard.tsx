"use client";

import { updateFarewellBoard } from "@/actions/farewell-board";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

function UpdateBoardForm({
  id,
  initialState,
}: {
  id: number;
  initialState: {
    farewell_for: string;
    description: string;
  };
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    farewell_for: initialState.farewell_for || "",
    description: initialState.description || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold leading-none tracking-tight text-xl">
        Update Farewell Board
      </h2>
      <form
        ref={formRef}
        className="flex flex-col w-full mb-5 space-y-4 md:mb-0 md:col-span-2"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          updateFarewellBoard(id, form)
            .then((res) => {
              formRef.current?.reset();
              toast.success("Farewell board updated successfully", {
                duration: 4000,
                description:
                  "Your farewell board has been updated successfully. Share the link with your loved ones.",
              });
              router.back();
            })
            .catch((e) => {
              toast.error("Failed to update farewell board", {
                duration: 4000,
                description: e.message,
              });
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        }}
      >
        <Label htmlFor="farewell_for">Farewell For</Label>
        <Input
          type="text"
          placeholder="Farewell for"
          tabIndex={0}
          onChange={(e) => {
            setForm({ ...form, farewell_for: e.target.value });
          }}
          value={form.farewell_for}
          name="farewell_for"
          id="farewell_for"
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          placeholder="Write a description for your farewell board."
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
          value={form.description}
        />
        <p className="text-sm text-muted-foreground">
          Your farewell board will be updated once you submit the form.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}
export { UpdateBoardForm };
