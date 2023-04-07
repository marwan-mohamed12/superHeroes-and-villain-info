import React, { useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const baseUrl = "https://www.superheroapi.com/api.php/1150718452270796/";

const SingleSuperHero = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [superHero, setSuperHero] = useState(null);

    React.useEffect(() => {
        setLoading(true);
        const getSuperHero = async () => {
            try {
                const resp = await fetch(`${baseUrl}${id}`);
                const data = await resp.json();
                if (data) {
                    const {
                        name,
                        biography: { "full-name": fullName },
                        connections: { relatives },
                        appearance: {
                            gender,
                            race,
                            "eye-color": eyeColor,
                            "hair-color": hairColor,
                        },
                        image: { url },
                    } = data;
                    const newHero = {
                        name,
                        fullName,
                        relatives,
                        gender,
                        race,
                        eyeColor,
                        hairColor,
                        url,
                    };
                    setSuperHero(newHero);
                } else {
                    setSuperHero(null);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getSuperHero();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!superHero) {
        return <h2 className="section-title">no super hero to display</h2>;
    }

    const {
        name,
        fullName,
        relatives,
        gender,
        race,
        eyeColor,
        hairColor,
        url,
    } = superHero;
    console.log(superHero);

    return (
        <section className="section character-section">
            <Link to="/" className="btn btn-primary">
                back home
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="char">
                <img src={url} alt={name}></img>
                <div className="char-info">
                    <p>
                        <span className="char-data">name :</span>{" "}
                        {fullName ? fullName : "full name unknown"}
                    </p>
                    <p>
                        <span className="char-data">gender :</span>{" "}
                        {gender ? gender : "unknown"}
                    </p>
                    <p>
                        <span className="char-data">race :</span>{" "}
                        {race !== "null" ? race : "unknown"}
                    </p>
                    <p>
                        <span className="char-data">eye color :</span>{" "}
                        {eyeColor === "-" ? "unknown" : eyeColor}
                    </p>
                    <p>
                        <span className="char-data">hair color :</span>{" "}
                        {hairColor === "-" ? "unknown" : hairColor}
                    </p>
                    <p>
                        <span className="char-data">relatives :</span>
                        {relatives.split("�").map((item, index) => {
                            return item !== "-" ? (
                                <span key={index}> {item}</span>
                            ) : (
                                "unknown"
                            );
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SingleSuperHero;
