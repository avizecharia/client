import { IUser } from "./user"

export enum DataStatus{
    LOADING = "LOADING",
    SUCCCESS = "SUCCCESS",
    FAILED = "FAILED",
    IDLE = "IDLE"
}
export interface UserState{
    error:string|null
    status:DataStatus
    user:null|IUser
}