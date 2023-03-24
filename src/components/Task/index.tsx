import {ITask} from "./TaskForm/interface";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteTask, selectColumns} from "../Columns/columnsSlice";

export interface ITaskProps {
    task:ITask,
    parentId:string
}
const Task:React.FC<ITaskProps> = ({task,parentId}) => {

    const dispatch = useAppDispatch()
    const handleDelete = (id:string) => {
        dispatch(deleteTask({id,parentId}))
    }

    return (
        <div>
            {task.name} <span className="text-rose-700 cursor-pointer" onClick={() => handleDelete(task.id)}>X</span>
        </div>
    )
}

export default Task;