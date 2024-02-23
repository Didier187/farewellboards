import React from "react";
import GiphyPlayground from "./GiphyPlayground";
import AsyncGif from "./AsyncGif";

export default function page() {
  return (
    <div>
      <h1>Giphy</h1>
      <AsyncGif />
      <hr />
      <GiphyPlayground />
    </div>
  );
}
