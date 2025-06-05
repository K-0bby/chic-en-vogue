"use client";

import {
  deleteProduct,
  toggleProductAvailability,
} from "@/app/admin/_actions/product";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ActiveToggle({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
          router.refresh();
        });
      }}
    >
      {isAvailable ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
