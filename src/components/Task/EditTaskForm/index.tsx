import React from "react";
import { useForm} from "react-hook-form";
import {ITaskFormProps, TaskFormValues} from "./interface";


const EditTaskForm: React.FC<ITaskFormProps> = ({onSubmit}) => {

    const {register, handleSubmit, formState: {errors}} = useForm<TaskFormValues>();

    return (
        <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
            <input  {...register("name", {required: true})} placeholder="edit task" className="border border-gray-900 w-full px-4 py-2 text-primary outline-none text-base font-light rounded-md"/>
            {errors.name && <span>This field is required</span>}
        </form>
    )
}

export default EditTaskForm
