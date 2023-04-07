import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
    const { setSearchTerm } = useGlobalContext();
    const searchValue = React.useRef(null);

    const searchSuperHero = () => {
        if (searchValue.current.value === "") {
            setSearchTerm("b");
            return;
        }
        setSearchTerm(searchValue.current.value);
    };

    React.useEffect(() => {
        searchValue.current.focus();
    }, []);

    return (
        <section className="section search">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-control">
                    <label htmlFor="name">
                        search for your favorite super hero & villain
                    </label>
                    <input
                        type="text"
                        id="name"
                        ref={searchValue}
                        onChange={searchSuperHero}
                    />
                </div>
            </form>
        </section>
    );
};

export default SearchForm;
