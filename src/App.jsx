import {useState} from 'react';
import axios from 'axios';
import Header from "./components/Header/Header.jsx";
import Button from "./components/Button/Button.jsx";
import Footer from "./components/Footer/Footer.jsx";
import InputField from "./components/InputField/InputField.jsx";
import getRegionClassName from "./helpers/getRegionClassName.js";
import spinningGlobe from './assets/spinning-globe.gif';
import map from './assets/world_map.png';
import './App.css';
import formatNumberToMillions from "./helpers/formatNumberToMillions.js";


function App() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [countryInformation, setCountryInformation] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchCountries() {
        setError('');

        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            console.log(response.data);

            response.data.sort((a, b) => {
                return a.population - b.population;
            });

            setCountries(response.data);
        } catch (e) {
            console.error(e);
            setError('Something went wrong with fetching the countries overview data. Try again later.');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setCountryInformation('');

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            console.log(response.data[0]);
            setCountryInformation(response.data[0]);
            setSearchQuery('');
        } catch (e) {
            console.error(e);
            setError(`${searchQuery} is not a valid search query. Try again.`);
        }
    }

    return (
        <>
            <Header text="Country facts"/>
            <main>
                <section className="world-map__section">
                    <h2>World regions</h2>
                    <img src={map} alt="Worldmap" className="world-map__img"/>
                </section>
                <section className="countries-overview__section">
                    <h2>Countries overview</h2>
                    {countries.length > 0
                        ? <ul className="countries-overview__list">
                            {countries.map((country) => {
                                return (
                                    <li key={country.name.common}>
                                        <div className="flag-name__container">
                                            <img src={country.flags.svg} alt={`Flag off ${country.name.common}`} className="flag"/>
                                            <h3 className={getRegionClassName(country.region)}>{country.name.common}</h3>
                                        </div>
                                        <p className="population">Has a population of {country.population} people</p>
                                    </li>
                                )
                            })}
                        </ul>
                        : <Button type="button" clickHandler={fetchCountries} className="button" text="Fetch all countries"/>
                    }
                    {error && <p>{error}</p>}
                </section>
                <section className="search-country__section">
                    <h2>Search country information</h2>
                    <img src={spinningGlobe} alt="SpinningGlobe" className="spinning-globe__img"/>
                    <form className="search-country__form" onSubmit={handleSubmit}>
                        <InputField
                            type="text"
                            name="query"
                            id="query-field"
                            placeholder="For example France or Peru"
                            value={searchQuery}
                            setValue={setSearchQuery}
                        />
                        <Button type="submit" className="button" text="Search"/>
                    </form>
                    {countryInformation &&
                        <article className="search-country-information">
                            <div className="flag-name__container">
                              <img src={countryInformation.flags.svg} alt="vlag" className="flag"/>
                              <h2>{countryInformation.name.common}</h2>
                            </div>
                            <p>{countryInformation.name.common} is situated in {countryInformation.subregion} and the capital
                                is {countryInformation.capital[0]}</p>
                            <p>It has a population of {formatNumberToMillions(countryInformation.population)} people and it borders
                                with {countryInformation.borders ? countryInformation.borders.length : 0} neighboring countries</p>
                            <p>Websites can be found on <code>{countryInformation.tld[0]}</code> domain's</p>
                        </article>
                    }
                    {error && <p>{error}</p>}
                </section>
            </main>
            <Footer text="Country Facts &copy; NOVI Hogeschool 2024"/>
        </>
    )
}

export default App
