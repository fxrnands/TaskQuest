import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ListSlice, ModalSlice, SortSlice } from "../reducer";

export const store = configureStore({
    reducer: {
        taskList: ListSlice,
        openModal: ModalSlice,
        sort: SortSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 