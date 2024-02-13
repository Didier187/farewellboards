import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatDate } from "@/lib/utils";
function FarewellCard(props: {
  farewell_for: string;
  description: string;
  created_at: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.farewell_for}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.description}</CardDescription>
      </CardContent>
      <CardFooter>{formatDate(props.created_at)}</CardFooter>
    </Card>
  );
}
export { FarewellCard };
