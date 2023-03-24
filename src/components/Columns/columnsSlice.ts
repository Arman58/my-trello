import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IColumn} from "./Column/interface";
import {RootState} from "../../app/store";
import {ITask} from "../Task/TaskForm/interface";


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
        addTaskColumn: (state, action: PayloadAction<ITask>) => {
            const newTask = {
                id: action.payload.id,
                name: action.payload.name
            }
            const currentState = current(state.columns)

            const currentColumnByIndex =  currentState.findIndex((column) => column.id === action.payload.parentId)

            state.columns[currentColumnByIndex].tasks?.push(newTask)

        },
    }
})

export const {addColumn, addTaskColumn} = columnsSlice.actions
export const selectColumns = (state: RootState) => state.columns.columns;

export default columnsSlice.reducer;
