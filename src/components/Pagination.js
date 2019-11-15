import React, { useState, useEffect } from 'react';
import './Pagination.css';

export default function Pagination(props) {
    const [prevbtnState, setPrevBtnState] = useState(false);
    const [btnState, setBtnState] = useState(false);
    const [nextbtnState, setNextBtnState] = useState(false);

    useEffect(() => {
        if (props.curentPage === 1) {
            setPrevBtnState(false);
            setBtnState(true);
            setNextBtnState(true);
        }
    }, [props.curentPage])

    let page;
    const prevPage = () => {
        if (props.curentPage > 1) {
            page = props.curentPage;
            page--;

            props.setCurentPage(page);
            changePage(page);
        }
    }

    const nextPage = () => {
        if (props.curentPage < 2) {
            page = props.curentPage;
            page++;
            props.setCurentPage(page);
            changePage(page);
        }
    }

    const changePage = page => {
        props.setCurentPage(page);
        props.fetchFilms(page);

        if (page === 1) {
            setPrevBtnState(false);
            setNextBtnState(true);
        }

        if (page === 2) {
            setPrevBtnState(true);
            setNextBtnState(false);
        }
    }

// if(props.curentPage){

// }

    return (
        // <div className="pagination-container">
            <div className="pagination">
                <button onClick={prevPage} className={prevbtnState ? "flex" : "none"}>&lt;</button>
                <button onClick={() => changePage(1)} className={btnState ? "flex" : "none"}>1</button>
                <button onClick={() => changePage(2)} className={btnState ? "flex" : "none"}>2</button>
                <button onClick={nextPage} className={nextbtnState ? "flex" : "none"}>&gt;</button>
            </div>
        // </div>
    )
}