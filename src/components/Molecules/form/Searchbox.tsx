import {useState,memo,FC} from 'react'



export const Searchbox:FC= memo(() => {

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let defaultValue = params.get('game') ? params.get('game') : '';
    const [inputValue, setInputValue] = useState(defaultValue);

    const handleSubmit = (event) => {
      event.preventDefault();
      const queryParams = `?game=${inputValue}`;
      const url = '/search' + queryParams;
      console.log(url)
      window.location.href = url;
    };
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };


    return (
        <div className='search_box_wrap'>
            <form onSubmit={handleSubmit}>
            <i className="fa-solid fa-magnifying-glass" onClick={handleSubmit}></i>
                <input type="text" value={inputValue} onChange={handleInputChange} placeholder='ゲームの名前'/>
            </form>
        </div>
    )

})

