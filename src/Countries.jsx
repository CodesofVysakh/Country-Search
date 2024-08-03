import React, { useEffect, useState } from "react";

const CountryCard = ({ name, flagImage, flagAlt }) => (
    <div
        className="countryCard"
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
            height: "150px",
            width: "150px",
            border: "1px solid black",
            borderRadius: "8px",
            margin: "10px",
        }}
    >
        <img
            src={flagImage}
            alt={flagAlt}
            style={{ width: "80px", height: "80px" }}
        />
        <h2>{name}</h2>
    </div>
);

function Countries() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            const res = await fetch("https://restcountries.com/v3.1/all");
            const data = await res.json();
            setCountries(data);
            setFilteredCountries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (value) => {
        const searchValue = value.toLowerCase();
        setFilteredCountries(
            countries.filter((country) =>
                country.name.common.toLowerCase().includes(searchValue)
            )
        );
    };

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            <div
                style={{
                    padding: "10px",
                    boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
            >
                <input
                    type="text"
                    onChange={(e) => handleChange(e.target.value)}
                    style={{ width: "50%", padding: "5px" }}
                    placeholder="Search for countries..."
                />
            </div>
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
                {filteredCountries.map((country) => (
                    <CountryCard
                        key={country.cca3}
                        name={country.name.common}
                        flagImage={
                            country.flags.png
                                ? country.flags.png
                                : country.flags.svg
                        }
                        flagAlt={
                            country.flags.alt
                                ? country.flags.alt
                                : `This is the flag of ${country.name.common}`
                        }
                    />
                ))}
            </div>
        </>
    );
}

export default Countries;
