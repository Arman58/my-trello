import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ITask} from "./TaskForm/interface";


export interface TaskState {
    tasks: ITask[];
}

const initialState: TaskState = {
    tasks: []
}

const tasksSLice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload);
        },
    }
})

export const {addTask} = tasksSLice.actions
export const selectTasks = (state: RootState) => state.tasks.tasks;

export default tasksSLice.reducer;
