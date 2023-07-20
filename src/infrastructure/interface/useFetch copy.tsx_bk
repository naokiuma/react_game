
type IUseFetch<T> = {
	fetcher:Function
	target_id?:string
}


export const UseFetch = <T extends {}>(props:IUseFetch<T>)  => {
	const data = props.fetcher();
	return data;

}




