/**
 * 
 * @param url 
 * @returns bool
 * 末尾が'/'だとエラーになるためチェックを入れる
 */
export const checkApiUrl = (url:string) => {
    if(url.slice(0,1) === '/'){
        throw new Error('APIの末尾にはスラッシュを入れないようにしてください')
    }

}