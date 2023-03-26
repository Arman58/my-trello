
export interface ITask {
    id:string,
    name: string,
    parentId?:string
}
export interface ITaskFormProps {
    onSubmit: (data: Omit<ITask, "id">) => void;
}

export interface TaskFormValues {
    id?:string,
    parentId?:string,
    name: string;
}
