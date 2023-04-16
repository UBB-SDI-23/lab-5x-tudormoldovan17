import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {City} from "../../models/City";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import {Container} from "@mui/system";
import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    container: {
        padding: '4em',
    },
    card: {
        display: "inline-block",
        minWidth: 100,
        maxWidth: 500,
        overflow: "hidden",
    },

    second_card: {
        display: "inline-block",
    },

    p: {
        paddingLeft: "3%",
    }
});


export const CityEdit = () => {

    const navigate = useNavigate();

    const { cityId } = useParams();
    const [city, setCity] = useState<City>({
        cityName: "",
        cityPopulation: 0,
        cityArea: 0,
        cityMoney: 0,
        cityDescription: ""
    });

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

    const updateCity = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            setCity(city);
            const response = await axios.put(`${BACKEND_API_URL}/cities/${cityId}/`, city);
            navigate("/cities");
        } catch (error) {
            console.log(error);
        }
    };



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
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <p>{city?.id}</p>
                    <form onSubmit={updateCity}>
                        <TextField
                            id="cityName"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCity({ ...city, cityName: event.target.value })}
                        />
                        <TextField
                            id="cityPopulation"
                            label="Population"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCity({ ...city, cityPopulation: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="cityArea"
                            label="Area"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCity({ ...city, cityArea: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="cityMoney"
                            label="Money"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCity({ ...city, cityMoney: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="cityDescription"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCity({ ...city, cityDescription: event.target.value })}
                        />

                        <Button type="submit">Update City</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};
