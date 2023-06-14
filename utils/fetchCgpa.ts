export const fetchCgpa = async (tag: string) => {
    const res = fetch(`https://ehub.ucc.edu.gh/zeus/getcgpa?tag=${encodeURIComponent(tag)}`)
    const response = (await res).json()
    return response;
}