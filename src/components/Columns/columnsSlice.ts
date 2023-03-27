import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IColumn} from "./Column/interface";
import {RootState} from "../../app/store";
import {ITask} from "../Task/AddTaskForm/interface";
import {DropResult} from "react-beautiful-dnd";


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
    initialState,
    name: "columns",
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
        deleteColumn: (state, action: PayloadAction<{ parentId: string }>) => {
            const currentState = current(state.columns)
            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.parentId)
            state.columns.splice(currentColumnByIndex, 1)

        },
        deleteTask: (state, action: PayloadAction<{ id: string, parentId: string }>) => {
            const currentState = current(state.columns)
            const currentColumnByIndex = currentState.findIndex((column) => column.id === action.payload.parentId)
            const filteredTasks = currentState[currentColumnByIndex].tasks?.findIndex((task) => task.id === action.payload.id)
            state.columns[currentColumnByIndex].tasks?.splice(filteredTasks, 1)
        },
        draggableEnd: (state, action: PayloadAction<{ result: DropResult, columns: IColumn[] }>) => {
            const {source, destination} = action.payload.result
            if (!destination) return;
            const currentState = current(state.columns)
            const currentColumn = currentState.find((column) => column.id === source.droppableId)
            const currentColumnIndex = currentState.findIndex((column) => column.id === source.droppableId)
            const destColumn = currentState.find((column) => column.id === destination.droppableId)
            const destColumnIndex = currentState.findIndex((column) => column.id === destination.droppableId)
            if (currentColumn && destColumn) {
                if (source.droppableId !== destination.droppableId) {

                    const sourceTasks = [...currentColumn.tasks];
                    const destTasks = [...destColumn.tasks];
                    const [removed] = sourceTasks.splice(source.index, 1);

                    destTasks.splice(destination.index, 0, removed);

                    state.columns[currentColumnIndex].tasks = sourceTasks
                    state.columns[destColumnIndex].tasks = destTasks


                } else {
                    const sourceTasks = [...currentColumn.tasks];
                    const [removed] = sourceTasks.splice(source.index, 1);
                    sourceTasks.splice(destination.index, 0, removed);
                    state.columns[currentColumnIndex].tasks = sourceTasks

                }
            }
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

export const {addColumn, addTask, deleteTask, deleteColumn, editColumn, editTask, draggableEnd} = columnsSlice.actions
export const selectColumns = (state: RootState) => state.columns.columns;

export default columnsSlice.reducer;
