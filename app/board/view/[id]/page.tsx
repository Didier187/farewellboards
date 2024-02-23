import { CreateFarewell } from "@/components/CreateFarewell";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function page({ params }: { params: { id: number } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("farewells")
    .select()
    .eq("farewellboard_id", params.id);
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <CreateFarewell farewellBoardId={params.id} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="flex flex-wrap gap-3 w-full">
          {data?.map((farewell) => (
            <Card
              key={farewell.id}
              className="w-full max-w-[350px] text-balance"
            >
              <CardHeader>
                <CardTitle>{farewell.created_by} </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{farewell.content}</CardDescription>
              </CardContent>
              <CardFooter>
                <p>{formatDate(farewell.created_at)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
