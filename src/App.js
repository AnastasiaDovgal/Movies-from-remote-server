import React, { useState, useEffect } from 'react';
import './App.css';
import FilmCart from './components/FilmCart';
import FilmDetails from './components/FilmDetails';
import { useFetchDetails } from './components/useFetchDetails';
import Loader from 'react-loader-spinner';
import Pagination from './components/Pagination';

export default function App() {
    const dropDownYears = () => {
        const maxOffset = 29;
        let thisYear = (new Date()).getFullYear();
        let allYears = [];
        for (let x = 0; x <= maxOffset; x++) {
            allYears.push(thisYear - x);
        }
        return (allYears.map((x) => { return (<option key={x}>{x}</option>) }));
    }

    const emptyState = () => {
        if (films && films.length === 0) {
            return (
                <div>
                    <h3>Here you can find some interesting films for watching!</h3>
                    <h3>Just type film's title. And year, if you'd like.</h3>
                </div>
            );
        }
    }

    const [films, setFilms] = useState([]);

    const [curentPage, setCurentPage] = useState(0);

    const handleFormValues = event => {
        event.preventDefault();

        // console

        setCurentPage(1);

        setFormData({
            title: event.target[0].value,
            year: event.target[1].value
        });
    }

    const [formData, setFormData] = useState({
        title: '',
        year: ''
    });

    useEffect(() => {
        if (curentPage !== 0) {
            fetchFilms();
        }
    }, [formData]);

    const fetchFilms = (page = 1) => {
        setLoader(true);

        let fetchStr = '';

        if (formData.year === 'Select year' || formData.year === 'none') {
            fetchStr = 'http://www.omdbapi.com/?apikey=4b601aab&s=*' + formData.title + '*&type=movie&page=' + page;
        } else {
            fetchStr = 'http://www.omdbapi.com/?apikey=4b601aab&s=*' + formData.title + '*&y=' + formData.year + '&type=movie&page=' + page;
        }

        fetch(fetchStr)
            .then(response => { return response.json(); })
            .then(data => {
                setFilms(data.Search);
                setLoader(false);
            });
    }

    const hookDetails = useFetchDetails();

    const [loader, setLoader] = useState(false);

    return (
        <div className="container">
            <form onSubmit={handleFormValues}>
                <input type="text" placeholder="Type film's name" autoFocus required />
                {/* <select onChange={handleFormValues}> */}
                <select onChange={handleFormValues}>
                    <option hidden>Select year</option>
                    <option>none</option>
                    {dropDownYears()}
                </select>

                <button type="submit">Search</button>
                {/* woker */}
            </form>

            {emptyState()}

            <div className="film-cart-container">
                {films ? films.map((i) => {
                    return (
                        <FilmCart
                            key={i.imdbID}
                            Title={i.Title}
                            Year={i.Year}
                            Poster={i.Poster}
                            imdbID={i.imdbID}
                            setLoader={setLoader}
                            hookDetails={hookDetails}
                        />
                    )
                }) : <h3>Movie not found</h3>}
            </div>

            <Pagination
                fetchFilms={fetchFilms}
                curentPage={curentPage}
                setCurentPage={setCurentPage}
            />

            <Loader
                type="BallTriangle"
                color="#00BFFF"
                height={300}
                width={300}
                visible={loader}
                className="loader"
            />

            <FilmDetails hookDetails={hookDetails} setLoader={setLoader} />
        </div>
    )
}