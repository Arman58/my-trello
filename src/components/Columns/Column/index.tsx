import React, {useState} from "react";
import {IColumn} from "./interface";
import {GrAdd} from "@react-icons/all-files/gr/GrAdd";
import Modal from "../../Shared/Modal";
import Task from "../../Task";
import {Draggable, Droppable} from "react-beautiful-dnd";


const Column = ({column}: { column: IColumn }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [taskActive, setTaskActive] = useState<boolean>(false);

    const handleClick = () => {
        setShowModal(true)
        setTaskActive(true)
    }
    return (
        <div>
            <div className="text-4xl font-black">{column.columnType}</div>
            <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`w-[300px] min-h-[500px] p-4 ${snapshot.isDraggingOver ? 'bg-sky-200' : 'bg-gray-300'}`}
                        >
                            {column?.tasks && column.tasks.map((task, index) => {
                                return (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: "none",
                                                        padding: 16,
                                                        margin: "0 0 8px 0",
                                                        minHeight: "50px",
                                                        backgroundColor: snapshot.isDragging
                                                            ? "#263B4A"
                                                            : "#456C86",
                                                        color: "white",
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <Task key={task.id} task={task} parentId={column.id}/>
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
            <span className="flex items-center justify-start cursor-pointer"
                  onClick={handleClick}><GrAdd/> add task</span>
            <Modal showModal={showModal} setShowModal={setShowModal} taskActive={taskActive} title="Add Task"
                   column={column}/>
        </div>
    )
}

export default Column;
