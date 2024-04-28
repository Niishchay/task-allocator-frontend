import { RoleEnum } from "../enums/role.enum"
import { UserStatus } from "../enums/user-status.enum";

export interface User{
    id: number;
    username: string,
    password: string,
    role: RoleEnum,
    status: UserStatus
}