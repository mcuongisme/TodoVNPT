import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice } from "../components/Common/layoutSlice";


export const store = configureStore({
    reducer: {
        layout: layoutSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
