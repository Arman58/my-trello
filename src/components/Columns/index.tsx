import React from "react";
import Column from "./Column";
import {GrAdd} from "@react-icons/all-files/gr/GrAdd";
import {deleteColumn, draggableEnd, selectColumns} from "./columnsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Modal from "../Shared/Modal";
import {AiFillEdit} from "@react-icons/all-files/ai/AiFillEdit";
import {TiDelete} from "@react-icons/all-files/ti/TiDelete";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {IColumn} from "./Column/interface";


const Columns = () => {

    const [showModal, setShowModal] = React.useState(false);
    const [columnActive, setColumnActive] = React.useState(false);
    const [columnEdit, setColumnEdit] = React.useState(false);
    const [columnId, setColumnId] = React.useState<string>("");
    const columns = useAppSelector(selectColumns)
    const dispatch = useAppDispatch()
    const columnTitle = columnEdit ? "edit column" : "add column"

    const handleClick = () => {
        setShowModal(true)
        setColumnActive(true)
    }

    const handleDelete = (id: string) => {
        dispatch(deleteColumn({parentId: id}))
    }
    const handleEdit = (id: string) => {
        setShowModal(true)
        setColumnEdit(true)
        setColumnId(id)
    }

    const onDragEnd = (result: DropResult, columns: IColumn[]) => {
        dispatch(draggableEnd({result, columns}))
    };

    return (
        <div className="w-full h-screen flex items-center justify-center gap-x-[20px]">
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns)}
            >
                {columns.map((column, index) => {
                        return (
                            <div key={column.id} className="flex items-start justify-center">
                                <div className="flex items-start justify-center">
                                    <Column column={column}/>
                                    <span className="text-rose-700 cursor-pointer"
                                          onClick={() => handleDelete(column.id)}><TiDelete/></span>
                                    <span className="cursor-pointer"
                                          onClick={() => handleEdit(column.id)}><AiFillEdit/></span>
                                </div>
                                {columns.length - 1 === index &&
                                    <button className="bg-customGray p-2 cursor-pointer ml-3"
                                            onClick={handleClick}>
                                        <GrAdd/>
                                    </button>
                                }
                            </div>
                        )
                    }
                )}
            </DragDropContext>
            <Modal showModal={showModal} setShowModal={setShowModal} columnActive={columnActive} title={columnTitle}
                   columnEdit={columnEdit} setColumnEdit={setColumnEdit} columnId={columnId}/>
        </div>
    )
}

export default Columns;
