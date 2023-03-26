import React from "react";
import {useForm} from "react-hook-form";
import {ColumnFormValues, IColumnFormProps} from "../interface";


const EditColumnForm: React.FC<IColumnFormProps> = ({onSubmit}) => {

    const {register, handleSubmit, formState: {errors}} = useForm<ColumnFormValues>();

    return (
        <form id='column-form' onSubmit={handleSubmit(onSubmit)}>
            <input  {...register("columnType", {required: true})}
                    className="border border-gray-900 w-full px-4 py-2 text-primary outline-none text-base font-light rounded-md"
                    placeholder="edit column"/>
            {errors.columnType && <span>This field is required</span>}
        </form>
    )
}

export default EditColumnForm
