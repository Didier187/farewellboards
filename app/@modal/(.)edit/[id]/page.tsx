import { getFarewellBoard } from "@/actions/farewell-board";
import { UpdateBoardForm } from "@/components/UpdateFarewellBoard";
import { Modal } from "./Modal";

export default async function page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [data, error] = await getFarewellBoard(params.id);
  return (
    <Modal>
      <UpdateBoardForm id={params.id} initialState={data} />
    </Modal>
  );
}
