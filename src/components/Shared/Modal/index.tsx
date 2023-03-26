import React from "react";
import {SubmitHandler} from "react-hook-form";
import TaskForm from "../../Task/AddTaskForm";
import {TaskFormValues} from "../../Task/AddTaskForm/interface";
import {ColumnFormValues, IColumn} from "../../Columns/Column/interface";
import {useAppDispatch} from "../../../app/hooks";
import {addColumn, addTask, editColumn, editTask} from "../../Columns/columnsSlice";
import uuid from "react-uuid";
import AddColumnForm from "../../Columns/Column/AddColumnForm";
import EditColumnForm from "../../Columns/Column/EditColumnForm";
import EditTaskForm from "../../Task/EditTaskForm";

interface IModal {
    title?: string;
    showModal: boolean;
    columnActive?: boolean;
    taskActive?: boolean;
    setShowModal: (boolean: boolean) => void;
    column?: IColumn;
    columnEdit?: boolean;
    setColumnEdit?: (boolean: boolean) => void;
    columnId?: string;
    setTaskEdit?: (boolean: boolean) => void;
    taskEdit?: boolean;
    taskId?: string;
    parentId?: string
}

const Modal: React.FC<IModal> = ({
                                     showModal,
                                     setShowModal,
                                     taskActive,
                                     columnActive,
                                     title,
                                     column,
                                     columnEdit,
                                     setColumnEdit,
                                     columnId,
                                     setTaskEdit,
                                     taskEdit,
                                     taskId,
                                     parentId
                                 }) => {
    const dispatch = useAppDispatch()
    const onTaskSubmit: SubmitHandler<TaskFormValues> = (data) => {
        dispatch(addTask({
            id: uuid(),
            name: data.name,
            parentId: column?.id,
        }))
        setShowModal(false)
    };
    const onColumnSubmit: SubmitHandler<ColumnFormValues> = (data) => {
        dispatch(addColumn({
            id: uuid(),
            ...data,
            tasks: []
        }))
        setShowModal(false)
    };

    const editColumnSubmit: SubmitHandler<ColumnFormValues> = (data) => {
        dispatch(editColumn({
            id: columnId,
            name: data.columnType,
        }))
        setShowModal(false)
        setColumnEdit?.(false)
    }

    const editTaskSubmit: SubmitHandler<TaskFormValues> = (data) => {
        dispatch(editTask({
            id: taskId,
            parentId: parentId,
            name: data.name,
        }))
        setShowModal(false)
        setTaskEdit?.(false)
    }

    const formId = taskActive || taskEdit ? "task-form" : "column-form"

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {columnActive && !columnEdit && <AddColumnForm onSubmit={onColumnSubmit}/>}
                                    {columnEdit && <EditColumnForm onSubmit={editColumnSubmit}/>}
                                    {taskActive && !taskEdit && <TaskForm onSubmit={onTaskSubmit}/>}
                                    {taskEdit && <EditTaskForm onSubmit={editTaskSubmit}/>}
                                </div>
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false)
                                            setColumnEdit?.(false)
                                            setTaskEdit?.(false)
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        form={formId}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                </>
            ) : null}
        </>
    );
}
export default Modal;
