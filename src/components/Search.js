import React, {useState} from 'react';

function Search(props){
    const [searchVal, setSearchVal] = useState('');

    const handleSearchInputChanges = (e) => {
        setSearchVal(e.target.value);
    }

    const resetInputField = () => {
        setSearchVal('');
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchVal);
        resetInputField();
    }

    return (
        <div>
            <form className="search">
                <input type="text" value={searchVal} onChange={handleSearchInputChanges}/>
                <input type="submit" value="Search" onClick={callSearchFunction}/>
            </form>
        </div>
    )
}

export default Search;