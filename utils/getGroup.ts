import { fetchGroup } from "./serverApi"

export const getGroup = async( groupId: string ) => {
    const group_res = await fetchGroup(groupId)
    const group = group_res?.documents[0]
    return { ...group }
}