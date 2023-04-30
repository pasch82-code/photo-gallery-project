import { createEntityAdapter } from "@reduxjs/toolkit";
import { RedditReducedPost } from "./state";

export const adapters = createEntityAdapter<RedditReducedPost>({
    selectId: (p) => p.id
})
