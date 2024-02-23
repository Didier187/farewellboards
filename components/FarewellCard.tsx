"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { deleteFarewellBoard } from "@/actions/farewell-board";
import { formatDate } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "./ui/button";

function FarewellCard(props: {
  farewell_for: string;
  description: string;
  created_at: string;
  id: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{props.farewell_for}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" variant="outline" size="icon">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={5}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Link href={`/edit/${props.id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                </Link>
                <Link href={`/board/view/${props.id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    View
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem className="cursor-pointer">
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-700 cursor-pointer"
                  onClick={async () => {
                    deleteFarewellBoard(props.id)
                      .then((res) => {
                        toast.success("Farewell board deleted successfully", {
                          duration: 4000,
                          description:
                            "Your farewell board has been deleted successfully.",
                        });
                      })
                      .catch((e) => {
                        toast.error("Failed to delete farewell board", {
                          duration: 4000,
                          description: e.message,
                        });
                      });
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-balance">{props.description}</CardDescription>
      </CardContent>
      <CardFooter>{formatDate(props.created_at)}</CardFooter>
    </Card>
  );
}
export { FarewellCard };
