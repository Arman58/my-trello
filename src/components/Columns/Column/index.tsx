import React from "react";
import {IColumn} from "./interface";
import {GrAdd} from "@react-icons/all-files/gr/GrAdd";
import Modal from "../../Shared/Modal";
import Task from "../../Task";


const Column = ({column}: { column: IColumn }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [taskActive, setTaskActive] = React.useState(false);

    console.log(column,"columncolumncolumn");
    const handleClick = () => {
        setShowModal(true)
        setTaskActive(true)
    }
    return (
        <div className="w-[270px] min-h-[348px] bg-customGray p-4">
            <div className="text-customDarkGray font-bold text-xl">{column.columnType}</div>
            {column?.tasks && column.tasks.map((task, index) => <Task key={index} task={task} parentId={column.id}/>)}
            <span className="flex items-center justify-start cursor-pointer"
                  onClick={handleClick}><GrAdd/> add task</span>
            <Modal showModal={showModal} setShowModal={setShowModal}
                   taskActive={taskActive} title="Add Task" column={column}/>
        </div>
    )
}

export default Column;