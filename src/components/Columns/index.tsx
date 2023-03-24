import React from "react";
import Column from "./Column";
import {GrAdd} from "@react-icons/all-files/gr/GrAdd";
import {selectColumns} from "./columnsSlice";
import {useAppSelector} from "../../app/hooks";
import Modal from "../Shared/Modal";


const Columns = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [columnActive, setColumnActive] = React.useState(false);
    const columns = useAppSelector(selectColumns)

    const handleClick = () => {
        setShowModal(true)
        setColumnActive(true)
    }
    return (
        <div className="w-full h-screen flex items-center justify-center gap-x-[20px]">
            {columns.map((data, index) => {
                    return (
                        <div key={index} className="flex items-start justify-center ">
                            <Column column={data}/>
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
            <Modal showModal={showModal} setShowModal={setShowModal} columnActive={columnActive} title="Add Column"/>
        </div>
    )
}

export default Columns;