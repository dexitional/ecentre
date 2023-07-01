import { fetchGroup, fetchPosition, fetchSession } from "./serverApi"

export const getHelper = async( sessionId: string, groupId: string) => {
    const session_res:any = await fetchSession(sessionId)
    const session =  session_res?.documents[0]
    const group_res = await fetchGroup(groupId)
    const group = group_res?.documents[0]
    return { group, session }
}

export const getHelperWithPost = async( sessionId: string, positionId: string) => {
    const session_res:any = await fetchSession(sessionId)
    const session =  session_res?.documents[0]
    const position_res = await fetchPosition(positionId)
    const position = position_res?.documents[0]
    return { position, session }
    
}