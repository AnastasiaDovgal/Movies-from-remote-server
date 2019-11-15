import { useState } from 'react';

export function useFetchDetails() {
    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState({});

    const changeModal = (imdbID, setLoader) => {
        if (!modal) {
            setLoader(true);
            fetchDetails(imdbID, setLoader);
        } else {
            setModal(false);
        }
    }

    const fetchDetails = (imdbID, setLoader) => {
        const fetchStr = 'http://www.omdbapi.com/?apikey=4b601aab&i=' + imdbID;
        fetch(fetchStr)
            .then(response => { return response.json(); })
            .then(data => {
                const newData = data;

                let rel = new Date(newData.Released);
                let day = rel.getDate();
                let month = rel.getMonth() + 1; //January is 0!
                let year = rel.getFullYear();

                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                rel = day + '/' + month + '/' + year;

                newData.Released = rel;

                let money;
                if (newData.BoxOffice !== 'N/A') {
                    money = newData.BoxOffice.replace('$', '').replace(/,/g, '');
                    newData.BoxOffice = '$' + formatMoney(+money);
                } else {
                    newData.BoxOffice = 'N/A';
                }

                setDetails(newData);
                setLoader(false);
                setModal(true);
            });
    }

    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) { console.log(e) }
    };

    return { modal, details, changeModal, fetchDetails }
}