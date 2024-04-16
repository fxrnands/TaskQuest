import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortType } from "../utils/type";

const initialState: SortType = {
    sortBy: "Sort By",
    category: "Select Category",
}

const SortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        sortByStatus: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload
        },
        filterByCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        }
    }
})

export const { sortByStatus, filterByCategory } = SortSlice.actions
export default SortSlice.reducer