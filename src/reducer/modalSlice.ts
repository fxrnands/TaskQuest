import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../utils/type";

const initialState: ModalType = {
    isOpen: false
}

const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        }
    }
})


export const { openModal, closeModal } = ModalSlice.actions
export default ModalSlice.reducer