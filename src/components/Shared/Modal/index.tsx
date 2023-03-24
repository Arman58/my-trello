import React from "react";
import {SubmitHandler} from "react-hook-form";
import TaskForm from "../../Task/TaskForm";
import {TaskFormValues} from "../../Task/TaskForm/interface";
import ColumnForm from "../../Columns/Column/ColumnForm";
import {ColumnFormValues, IColumn} from "../../Columns/Column/interface";
import {useAppDispatch} from "../../../app/hooks";
import {addColumn, addTaskColumn} from "../../Columns/columnsSlice";
import uuid from "react-uuid";

interface IModal {
    title?: string;
    showModal: boolean;
    columnActive?: boolean;
    taskActive?: boolean;
    setShowModal: (boolean: boolean) => void;
    column?: IColumn
}

const Modal: React.FC<IModal> = ({showModal, setShowModal, taskActive, columnActive, title, column}) => {
    const dispatch = useAppDispatch()
    const onTaskSubmit: SubmitHandler<TaskFormValues> = (data) => {
        dispatch(addTaskColumn({
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

    const formId = taskActive ? "task-form" : "column-form"

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
                                    {columnActive && <ColumnForm onSubmit={onColumnSubmit}/>}
                                    {taskActive && <TaskForm onSubmit={onTaskSubmit}/>}
                                </div>
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
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
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
export default Modal;