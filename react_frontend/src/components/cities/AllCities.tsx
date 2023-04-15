import {useEffect, useState} from "react";
import {City} from "../../models/City";

export const CitiesShowAll = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetch("http://34.154.231.138/api/cities/")
            .then((res) => res.json())
            .then((data) => setCities(data));
    }, []);

    if (cities.length === 0) {
        return <div>Cities failed to fetch.</div>;
    }

    return (
        <div className="App">
            <h1>Cities list</h1>
            <table>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>City name</th>
                    <th>City population</th>
                    <th>City area</th>
                    <th>City money</th>
                    <th>City description</th>
                </tr>
                </tbody>
                {cities.map((city: City, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{city.cityName}</td>
                            <td>{city.cityPopulation}</td>
                            <td>{city.cityArea}</td>
                            <td>{city.cityMoney}</td>
                            <td>{city.cityDescription}</td>
                        </tr>
                    )
                )}
            </table>
        </div>
    );
}