import {ITask} from "../../Task/AddTaskForm/interface";


export interface IColumn {
    id:string,
    columnType: string,
    tasks: ITask[],
}

export interface IColumnFormProps {
    onSubmit: (data: Omit<IColumn, "id">) => void;
}

export interface ColumnFormValues {
    columnType: string;
    tasks:ITask[]
}
