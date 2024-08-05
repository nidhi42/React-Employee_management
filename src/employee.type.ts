export interface IEmployee {
    id: string;
    fullname: string;
    birthdate: string;
    department: string;
    experience: number;
}



export enum PageEnum  {
    list,
    add, 
    edit
}