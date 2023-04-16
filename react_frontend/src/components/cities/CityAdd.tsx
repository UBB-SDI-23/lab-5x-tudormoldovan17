import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { City } from "../../models/City";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const CityAdd = () => {
    const navigate = useNavigate();

    const [city, setCity] = useState<City>({
        cityName: "",
        cityPopulation: 0,
        cityArea: 0,
        cityMoney: 0,
        cityDescription: ""
    });

    const addCity = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/cities/`, city);
            navigate("/cities");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/cities`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addCity}>
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

                        <Button type="submit">Add City</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};
