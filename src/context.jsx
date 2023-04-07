import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.superheroapi.com/api.php/1150718452270796/search/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("b");
    const [superHeros, setSuperHeroes] = useState([]);

    const fetchSuperHeroes = useCallback(async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${url}${searchTerm}`);
            const data = await resp.json();
            const { results } = data;
            if (results) {
                if (results.length > 27) results.length = 27;
                const newSuperHero = results.map((item) => {
                    const {
                        id,
                        name,
                        image: { url },
                        biography: {
                            "full-name": fullName,
                            "place-of-birth": placeOfBirth,
                        },
                    } = item;
                    return {
                        id,
                        name,
                        url,
                        fullName,
                        placeOfBirth,
                    };
                });
                setSuperHeroes(newSuperHero);
            } else {
                setSuperHeroes([]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchSuperHeroes();
    }, [searchTerm, fetchSuperHeroes]);

    return (
        <AppContext.Provider
            value={{
                loading,
                superHeros,
                setSearchTerm,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
