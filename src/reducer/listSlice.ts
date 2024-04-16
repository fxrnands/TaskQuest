import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListSliceType, List } from "../utils/type";

const initialState: ListSliceType = {
    list: [],
    sortCategory: "All",
}

const ListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setTask: (state, action: PayloadAction<List[]>) => {
            state.list = action.payload;
        },
        addTask: (state, action: PayloadAction<List>) => {
            state.list.push({
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                category: action.payload.category,
                completed: false,
            });
        },
        editTask: (state, action: PayloadAction<List>) => {
            const { id, title, description } = action.payload;
            const updateTask = state.list.find((task) => task.id === id);
            if (updateTask) {
                updateTask.title = title;
                updateTask.description = description;
            }
        },
        completeTask: (state, action: PayloadAction<number>) => {
            const index = state.list.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.list[index].completed = true;
            }
        },
    }
});

export const { setTask, addTask, editTask, completeTask } = ListSlice.actions
export default ListSlice.reducer;

