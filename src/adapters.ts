import { createEntityAdapter } from "@reduxjs/toolkit";
import { RedditReducedPostData } from "./types/entity";

export const adapters = createEntityAdapter<RedditReducedPostData>({
    selectId: (p) => p.id
})
