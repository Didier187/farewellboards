"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateFarewellBoard } from "@/actions/farewell-board";
import { useRouter } from "next/navigation";

import { useState } from "react";
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
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path, { scroll: false });
  };
  return (
    <form
      ref={formRef}
      className="flex flex-col w-full mb-5 space-y-4 md:mb-0 md:col-span-2"
      onSubmit={async (event) => {
        event.preventDefault();
        updateFarewellBoard(id, form)
          .then((res) => {
            formRef.current?.reset();
            toast.success("Farewell board updated successfully", {
              duration: 4000,
              description:
                "Your farewell board has been updated successfully. Share the link with your loved ones.",
            });
            redirect(`/`);
          })
          .catch((e) => {
            toast.error("Failed to update farewell board", {
              duration: 4000,
              description: e.message,
            });
          });
      }}
    >
      <Label htmlFor="farewell_for">Farewell For</Label>
      <Input
        type="text"
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
        onChange={(e) => {
          setForm({ ...form, description: e.target.value });
        }}
        value={form.description}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
export { UpdateBoardForm };
