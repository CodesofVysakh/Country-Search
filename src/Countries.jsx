import React, { useEffect, useState } from "react";

const CountryCard = ({ name, flagImage, flagAlt }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
            height: "200px",
            width: "200px",
            border: "1px solid black",
            borderRadius: "8px",
            margin: "10px",
        }}
    >
        <img
            src={flagImage}
            alt={flagAlt}
            style={{ width: "100px", height: "100px" }}
        />
        <h2>{name}</h2>
    </div>
);

function Countries() {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        try{
            await fetch("https://restcountries.com/v3.1/all")
                .then((res) => res.json())
                .then((data) => {
                    setIsLoading(false);
                    setCountries(data);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.error(err);
                });
        }
        catch{
            // setCountries([])
                console.error("Internal Server Error");
                setIsLoading(false);
        }
    }, []);

    return (
        isLoading ?
        <div>Loading...</div>
        :
        <div
            style={{
                width: "90%",
                margin: "30px auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            {countries?.map((country) => (
                <CountryCard
                    name={country.name.common}
                    flagImage={country.flags.png ? country.flags.png : country.flags.svg}
                    flagAlt={country.flags.alt ? country.flags.alt : `This is the flag of ${country.name.common}`}
                />
            ))}
        </div>
    );
}

export default Countries;
