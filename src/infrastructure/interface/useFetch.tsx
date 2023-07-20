//ライブラリを使う場合
import { useQuery } from 'react-query';

type IUseFetch = {
	key:string;
	fetcher:Function;
	keyword?:string
}


//useQueryを利用
export const UseFetch = <T extends {}>(props:IUseFetch)  => {
	const { data,error,isLoading} = useQuery(
		props.key,
		() => props.fetcher(),
	);

	return{
		data,
		error,
		isLoading,
	}

}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

let test = typeof tuple


