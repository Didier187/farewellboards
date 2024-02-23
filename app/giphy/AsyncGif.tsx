import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif, Grid } from "@giphy/react-components";
export default async function AsyncGif() {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);
  const { data } = await gf.gif("IIIg3ZHcOqYtW0wEIB");
  return (
    <div>
      <Gif gif={data} width={200} />
    </div>
  );
}
