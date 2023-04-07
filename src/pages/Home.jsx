import React from "react";
import SuperHeroList from "../components/SuperHeroList";
import SearchForm from "../components/SearchForm";

const Home = () => {
    return (
        <main>
            <SearchForm />
            <SuperHeroList />
        </main>
    );
};

export default Home;
