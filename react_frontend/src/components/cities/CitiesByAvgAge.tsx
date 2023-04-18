import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container
} from "@mui/material";


import React, {useEffect, useState} from "react";
import {City} from "../../models/City";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";

interface CityWithAvgAge extends City {
    avg_citizenAge: number;
}
export const CitiesByAvgAge = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CityWithAvgAge[]>([]);


    useEffect(() => {
        const url = `${BACKEND_API_URL}/cities/by-avg-age/`;
        const axiosCity = async () => {
            setLoading(true);
            await axios.get<CityWithAvgAge[]>(url)
                .then(response => {
                    setData(response.data)
                    setLoading(false);
                }, error => {
                    console.log(error);
                });
        };
        axiosCity();
    }, []);


    return (
        <Container sx={{maxWidth:"xl", padding: '4em'}}>

            <h1>Cities by average age of citizens</h1>

            {loading && <CircularProgress />}
            {!loading && data.length === 0 && <p>No cities found</p>}
            {!loading && data.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Population</TableCell>
                                <TableCell align="center">Area</TableCell>
                                <TableCell align="center">Money</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Average age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((city, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{city.cityName}</TableCell>
                                    <TableCell align="center">{city.cityPopulation}</TableCell>
                                    <TableCell align="center">{city.cityArea}</TableCell>
                                    <TableCell align="center">{city.cityMoney}</TableCell>
                                    <TableCell align="center">{city.cityDescription}</TableCell>
                                    <TableCell align="center">{city.avg_citizenAge}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};