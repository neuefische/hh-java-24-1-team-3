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

        <input onChange={handleInputOnChange} type="text" className="input-search" maxLength={100}
               placeholder="Type to Search..."/>

    );
}
