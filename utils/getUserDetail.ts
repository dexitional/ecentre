import { fetchUsers } from "./serverApi";

export const getUserDetail = async (email:string = 'ebenezer.ackah@ucc.edu.gh') => {
    const AdminUsers = await fetchUsers()
    const admins = await AdminUsers?.documents;
    const isAdminUser = admins.find((r: any) => r.email == email )
    return isAdminUser;
}