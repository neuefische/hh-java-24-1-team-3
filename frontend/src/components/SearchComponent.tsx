import {ChangeEvent} from "react";
import "./SearchComponent.css";

type SearchComponentProps = {
    handleSearchText: (searchText: string) => void,
}
export default function SearchComponent(props: Readonly<SearchComponentProps>) {

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearchText(event.target.value);
    }

    return (
        <div className="search-box">
            <input onChange={handleInputOnChange} type="text" className="input-search" placeholder="Type to Search..."/>
        </div>
    );
}
