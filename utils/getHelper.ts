import { fetchGroup, fetchSession } from "./serverApi"

export const getHelper = async( sessionId: string, groupId: string) => {
    const session_res:any = await fetchSession(sessionId)
    const session =  session_res?.documents[0]
    const group_res = await fetchGroup(groupId)
    const group = group_res?.documents[0]
    return { group, session }
}