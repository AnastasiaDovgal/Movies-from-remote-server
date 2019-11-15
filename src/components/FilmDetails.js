import React from 'react';
import './FilmDetails.css';

export default function FilmDetails(props) {
    let modalStatus = props.hookDetails.modal ? "flex details-container" : "none";

    let d = props.hookDetails.details;

    return (
        <div onClick={props.hookDetails.changeModal} className={modalStatus}>
            <ul>
                <h1>{d.Title}</h1>
                <li>Director: {d.Director}</li>
                <li>Actors: {d.Actors}</li>
                <li>Released: {d.Released}</li>
                <li>BoxOffice: {d.BoxOffice}</li>
                <li>Country: {d.Country}</li>
                <li>Genre: {d.Genre}</li>
                <li>Runtime: {d.Runtime}</li>
                <li>Plot: {d.Plot}</li>
                <li>imdbRating / imdbVotes: {d.imdbRating} / {d.imdbVotes}</li>
                <a href={d.Poster} rel="noopener noreferrer" target="_blank">
                    <img src={d.Poster} alt={d.Poster} />
                </a>
            </ul>
        </div>
    )
}