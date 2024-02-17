"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
    // remove overflow from the body on mount
    document.body.style.overflow = "hidden";
    return () => {
      // restore overflow on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop ">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <Button
          size="icon"
          variant="outline"
          className="absolute top-3 right-3 rounded-full"
          tabIndex={1}
          onClick={onDismiss}
        >
          <Cross2Icon />
        </Button>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
