import axios from "axios";
import { useEffect, useState } from "react";
import ShowsList from './ShowsList';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [searchKey, setSearchKey] = useState("");
    const [isEmptySearch, setEmpty] = useState(false);
    const navigate = useNavigate();
    const styles = {
        fontSize: "smaller",
        color: 'red'
    }
    useEffect(() => {

    }, []);

    const onChangeHandler = (e) => {
        setEmpty(false)
        setSearchKey(e.target.value)
    }
    const onSubmitClick = (e) => {
        e.preventDefault();
        console.log(searchKey)
        if(searchKey == "" || searchKey == undefined || searchKey == null){
            setEmpty(true)
        }else{
            setEmpty(false)
            navigate(`/tv-shows/${searchKey}`)
        }
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="search_box">
                <h1>Search Shows</h1>
                <form>
                    <input type="text" value={searchKey} onChange={onChangeHandler} placeholder="Enter show name..." />
                    <button className='btn_search' onClick={onSubmitClick}>&#128269;</button>
                    {
                        isEmptySearch ? <div>
                    <span className="error">Please enter correct show name</span>
                    </div> : ""}
                </form>
            </div>
        </div>
    );
}

export default SearchBox;
