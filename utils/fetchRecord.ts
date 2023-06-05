export const fetchRecord = async (tag: string) => {
    const res = fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(tag)}`)
    const response = (await res).json()
    return response;
}