
export const getidfromURL = (url:string,exclusion:string) =>{
    return Number(url.replace('/' + exclusion + '/', ''))
}