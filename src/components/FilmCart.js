import React from 'react';
import './FilmCart.css';

export default function FilmCart(props) {
    return (
        <div onClick={() => props.hookDetails.changeModal(props.imdbID, props.setLoader)} className="film-cart">
            <p>{props.Title}</p>
            <p>{props.Year}</p>
            <img src={props.Poster} alt={props.Poster} />
        </div>
    )
}