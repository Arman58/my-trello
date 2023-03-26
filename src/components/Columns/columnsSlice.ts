import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IColumn} from "./Column/interface";
import {RootState} from "../../app/store";
import {ITask} from "../Task/AddTaskForm/interface";


export interface ColumnsState {
    columns: IColumn[];
}

const initialState: ColumnsState = {
    columns: [
        {
            id: "12",
            columnType: 'asd',
            tasks: [],
        }
    ]
}

const columnsSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<IColumn>) => {

            state.columns.push(action.payload);
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            const newTask = {
                id: action.payload.id,
                name: action.payload.name
            }
            const currentState = current(state.columns)

            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.parentId)

            state.columns[currentColumnByIndex].tasks?.push(newTask)

        },
        deleteTask: (state, action: PayloadAction<{ id: string, parentId: string }>) => {
            const currentState = current(state.columns)
            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.parentId)
            const filteredTasks = currentState[currentColumnByIndex].tasks?.findIndex((task) => task.id === action.payload.id)
            state.columns[currentColumnByIndex].tasks?.splice(filteredTasks, 1)
        },
        deleteColumn: (state, action: PayloadAction<{ parentId: string }>) => {
            const currentState = current(state.columns)
            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.parentId)
            state.columns.splice(currentColumnByIndex, 1)

        },
        editColumn: (state, action: PayloadAction<{ id?: string, name: string }>) => {
            const currentState = current(state.columns)
            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.id)
            state.columns[currentColumnByIndex].columnType = action.payload.name
        },
        editTask: (state, action: PayloadAction<any>) => {
            const currentState = current(state.columns)
            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.parentId)
            const filteredTasks = currentState[currentColumnByIndex].tasks?.findIndex((task) => task.id === action.payload.id)
            state.columns[currentColumnByIndex].tasks[filteredTasks].name = action.payload.name
        }
    }
})

export const {addColumn, addTask, deleteTask, deleteColumn, editColumn, editTask} = columnsSlice.actions
export const selectColumns = (state: RootState) => state.columns.columns;

export default columnsSlice.reducer;
