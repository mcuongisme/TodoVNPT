import { createSlice } from "@reduxjs/toolkit";

interface LayoutState {
    collapsed: boolean;
}

const initialState: LayoutState = {
    collapsed: false,
};
export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleCollapsed(state) {
            state.collapsed = !state.collapsed;
        }
    }

})