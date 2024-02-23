"use client";

import { useState } from "react";
import { createFarewell } from "@/actions/farewells";
import { Button } from "@/components/ui/button";
import { ReloadIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  content: z.string().min(3).max(1000),
  email: z.string().email().optional().or(z.literal("")),
  name: z.string().min(3).max(100),
});

function CreateFarewellForm({ farewellBoardId }: { farewellBoardId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      email: "",
      name: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createFarewell(farewellBoardId, values);
  }
  return (
    <div className="max-w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="So long partner.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <Button
            variant="outline"
            className="!mt-1"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            😍
          </Button>

          <EmojiPicker
            open={isOpen}
            skinTonesDisabled={true}
            onEmojiClick={(emojiObject, event) => {
              form.setValue(
                "content",
                form.getValues("content") + emojiObject.emoji
              );
            }}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  Optional, but we will send you a confirmation email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
            )}
            {isSubmitting ? "Submitting..." : "Add farewell"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

const CreateFarewell = ({ farewellBoardId }: { farewellBoardId: number }) => {
  return (
    <div>
      <Drawer modal={true}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <PlusIcon />
            Add farewell
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>farewell card</DrawerTitle>
              <DrawerDescription>
                Add a farewell card to this board.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <CreateFarewellForm farewellBoardId={farewellBoardId} />
            </div>
            <DrawerFooter>
              <p className="p-2 text-xs text-center text-slate-400 row-start-3 row-span-1">
                By using this feature you agree to our terms of service
              </p>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export { CreateFarewell };
