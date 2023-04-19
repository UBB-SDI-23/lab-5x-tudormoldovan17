import {Card, CardActions, CardContent, IconButton} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { City } from "../../models/City";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
        padding: '4em',
    },
    card: {
        display: "inline-block",
        minWidth: 100,
        maxWidth: 1000,
        overflow: "hidden",
    },

    second_card: {
        display: "inline-block",
    },

    p: {
        paddingLeft: "3%",
    }
});

export const CityDetail = () => {
    const { cityId } = useParams();
    const [city, setCity] = useState<City>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = `${BACKEND_API_URL}/cities/${cityId}`
        const axiosCity = async () => {
            setLoading(true);
            await axios.get(url)
                .then(response => {
                    const city = response.data;
                    setCity(city);
                    setLoading(false);
                }, error => {
                    console.log(error);
                });
        };
        axiosCity();

        //fetchCity();
    }, [cityId]);


    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/cities`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>City Details</h1>
                    <p>City name: {city?.cityName}</p>
                    <p>City population: {city?.cityPopulation}</p>
                    <p>City area: {city?.cityArea}</p>
                    <p>City money: {city?.cityMoney}</p>
                    <p>City description: {city?.cityDescription}</p>
                    <p>City tourists with countries:</p>
                    <ul>
                        {city?.cityCountry?.map((country, index) => (
                            <CardContent key={country.id}>
                                <li>Country details</li>
                                <p className={classes.p}>Name : {country?.countryName}</p>
                                <p className={classes.p}>Cities : {country?.countryCities}</p>
                                <p className={classes.p}>Population : {country?.countryPopulation}</p>
                                <p className={classes.p}>Money : {country?.countryMoney}</p>
                                <p className={classes.p}>Description : {country?.countryDescription}</p>
                                <li>Tourist details</li>
                                <p className={classes.p}>Name : {country?.countryTourist?.touristName}</p>
                                <p className={classes.p}>Age : {country?.countryTourist?.touristAge}</p>
                                <p className={classes.p}>Money : {country?.countryTourist?.touristMoney}</p>
                                <p className={classes.p}>Phone : {country?.countryTourist?.touristPhone}</p>
                                <p className={classes.p}>Email : {country?.countryTourist?.touristEmail}</p>
                                <hr/>
                            </CardContent>
                        ))}
                    </ul>
                    <p>City citizens:</p>
                    <ul>
                        {city?.cityCitizen?.map((citizen, index) => (
                            <CardContent key={citizen.id}>
                                <li>Citizen details</li>
                                <p className={classes.p}>Name : {citizen?.citizenName}</p>
                                <p className={classes.p}>Age : {citizen?.citizenAge}</p>
                                <p className={classes.p}>Money : {citizen?.citizenMoney}</p>
                                <p className={classes.p}>Wage : {citizen?.citizenWage}</p>
                                <p className={classes.p}>Phone : {citizen?.citizenPhone}</p>
                                <hr/>
                            </CardContent>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/cities/${cityId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/cities/${cityId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
