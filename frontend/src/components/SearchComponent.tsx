import {ChangeEvent} from "react";
import "./SearchComponent.css";
import {FontAwesomeIcon} from "@fortawesome/fontawesome-free";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

type SearchComponentProps = {
    handleSearchText: (searchText: string) => void,
}
export default function SearchComponent(props: Readonly<SearchComponentProps>) {

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearchText(event.target.value);
    }

    return (
        <div className="search-box">
            <button className="btn-search"><FontAwesomeIcon icon={faSearch}/></button>
            <input onChange={handleInputOnChange} type="text" className="input-search" placeholder="Type to Search..."/>
        </div>
    );
}
