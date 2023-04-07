import React from "react";
import SuperHero from "./SuperHero";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const SuperHeroList = () => {
    const { superHeros, loading } = useGlobalContext();
    if (loading) {
        return <Loading />;
    }

    if (superHeros.length < 1) {
        return (
            <h2 className="section-title">
                no super heroes matched your search criteria
            </h2>
        );
    }
    return (
        <section className="section">
            <h2 className="section-title">Super Heroes</h2>
            <div className="characters-center">
                {superHeros.map((item) => {
                    return <SuperHero key={item.id} {...item} />;
                })}
            </div>
        </section>
    );
};

export default SuperHeroList;
