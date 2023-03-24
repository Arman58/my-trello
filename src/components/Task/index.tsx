import {ITask} from "./TaskForm/interface";

const Task = ({task}: { task: ITask }) => {

    return (
        <div>
            {task.name}
        </div>
    )
}

export default Task;