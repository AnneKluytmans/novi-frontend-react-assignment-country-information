import {useState} from 'react';
import axios from 'axios';
import Header from "./components/Header/Header.jsx";
import Button from "./components/Button/Button.jsx";
import Footer from "./components/Footer/Footer.jsx";
import spinningGlobe from './assets/spinning-globe.gif';
import map from './assets/world_map.png';
import './App.css';
import InputField from "./components/InputField/InputField.jsx";



function App() {
    function fetchCountries() {
        return console.log("fetchCountries");
    }

    return (
        <>
            <Header text="Country facts"/>
            <main>
                <section className="world-map__section">
                    <h2>World regions</h2>
                    <img src={map} alt="Worldmap" className="world-map__img"/>
                </section>
                <section className="all-country__section">
                    <h2>Countries overview</h2>
                    <Button type="button" clickHandler={fetchCountries} className="button" text="Fetch all countries"/>
                </section>
                <section className="search-country__section">
                    <h2>Search country information</h2>
                    <img src={spinningGlobe} alt="SpinningGlobe" className="spinning-globe__img"/>
                    <p>Search country information</p>
                </section>
            </main>
            <Footer text="Country Facts &copy; NOVI Hogeschool 2024"/>
        </>
    )
}

export default App
