import {ITask} from "./AddTaskForm/interface";
import {useAppDispatch} from "../../app/hooks";
import {deleteTask} from "../Columns/columnsSlice";
import {TiDelete} from "@react-icons/all-files/ti/TiDelete";
import React from "react";
import {AiFillEdit} from "@react-icons/all-files/ai/AiFillEdit";
import Modal from "../Shared/Modal";

export interface ITaskProps {
    task: ITask,
    parentId: string
}

const Task: React.FC<ITaskProps> = ({task, parentId}) => {
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [taskEdit, setTaskEdit] = React.useState<boolean>(false)
    const [taskId, setTaskId] = React.useState<string>('')
    const [taskParentId, setParentId] = React.useState<string>('')
    const dispatch = useAppDispatch()
    const handleDelete = (id: string) => {
        dispatch(deleteTask({id, parentId}))
    }
    const handleEdit = (id: string, parentId: string) => {
        setShowModal(true)
        setTaskEdit(true)
        setTaskId(id)
        setParentId(parentId)
    }

    return (
        <div className="flex justify-start items-center"
             draggable={true}
        >
            <span className="text-md font-bold">{task.name}</span>
            <span className="text-rose-700 cursor-pointer ml-1"
                  onClick={() => handleDelete(task.id)}><TiDelete/></span>
            <span className="cursor-pointer" onClick={() => handleEdit(task.id, parentId)}><AiFillEdit/></span>
            <Modal showModal={showModal} setShowModal={setShowModal} taskEdit={taskEdit} taskId={taskId}
                   parentId={taskParentId} title="edit task"/>
        </div>
    )
}

export default Task;
