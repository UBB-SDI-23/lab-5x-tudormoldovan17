import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip, Button, TablePagination
} from "@mui/material";

import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import React, {useEffect, useState} from "react";
import {Country} from "../../models/Country";
import {BACKEND_API_URL} from "../../constants";


export const AllCountries = () => {
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<Country[]>([])
    const etc = `${BACKEND_API_URL}/countries/`;
    console.log(etc);
    useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/countries/`)
                .then((response) => response.json())
                .then((data) => {
                    setCountries(data);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [])


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByAdmin = () => {
        const sortedCountries = [...countries].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.countryName.localeCompare(b.countryName);
            } else {
                return b.countryName.localeCompare(a.countryName);
            }
        });
        setCountries(sortedCountries);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    setpg(0);
    setrpg(100);

    function handleChangePage() {
        setpg(pg + 1);
    }

    return (
        <Container sx={{maxWidth:"xl", padding: '4em'}}>

            <h1>All countries</h1>

            {loading && <CircularProgress />}
            {!loading && countries.length === 0 && <p>No countries found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/countries/add`}>
                    <Tooltip title={"Add a new country"} arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            <Button onClick={handleSortByAdmin}>Sort by Name</Button>
            {!loading && countries.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Cities</TableCell>
                                <TableCell align="right">Population</TableCell>
                                <TableCell align="right">Money</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">Tourist</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countries.slice(pg * rpg, pg * rpg + rpg).map((country, index) => (
                                <TableRow key={country.id}>
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/countries/${country.id}/details`} title={"View country details"}>
                                            {country.countryName}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{country.countryCities}</TableCell>
                                    <TableCell align="right">{country.countryPopulation}</TableCell>
                                    <TableCell align="right">{country.countryMoney}</TableCell>
                                    <TableCell align="right">{country.countryDescription}</TableCell>
                                    <TableCell align="right">{country?.countryCity?.id}</TableCell>
                                    <TableCell align="right">{country?.countryTourist?.id}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr : 3}}
                                            to={`/countries/${country.id}/details`}>
                                            <Tooltip title="View country details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/countries/${country.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/countries/${country.id}/delete`}>
                                            <DeleteForeverIcon sx={{color : "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[100]}
                        component="div"
                        count={countries.length}
                        rowsPerPage={rpg}
                        page={pg}
                        onPageChange={handleChangePage}
                    />
                </TableContainer>
            )}
        </Container>
    );
};

