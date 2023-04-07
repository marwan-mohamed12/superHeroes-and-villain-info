import React from "react";
import { Link } from "react-router-dom";

const SuperHero = ({ id, name, url, fullName, placeOfBirth }) => {
    return (
        <article className="character">
            <div className="img-container">
                <img src={url} alt={name} />
            </div>
            <div className="character-footer">
                <h3>{name}</h3>
                <h4>{fullName}</h4>
                <p>{placeOfBirth}</p>
                <Link
                    to={`/superHero/${id}`}
                    className="btn btn-primary btn-details"
                >
                    details
                </Link>
            </div>
        </article>
    );
};

export default SuperHero;
