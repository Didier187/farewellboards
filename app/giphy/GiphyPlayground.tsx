"use client";
import React from "react";

import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

export default function GiphyPlayground() {
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });
  const onGifClick = (gif: any) => {
    console.log(gif);
  };
  return (
    <div>
      <Grid
        width={800}
        columns={3}
        fetchGifs={fetchGifs}
        onGifClick={onGifClick}
        noLink={true}
      />
    </div>
  );
}
