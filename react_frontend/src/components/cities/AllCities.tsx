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
    Tooltip, Button
} from "@mui/material";

import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";


import React, {useEffect, useState} from "react";
import {City} from "../../models/City";
import {BACKEND_API_URL} from "../../constants";


export const AllTeams = () => {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<City[]>([])
    const etc = `${BACKEND_API_URL}/cities`;
    console.log(etc);
    useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/cities`)
                .then((response) => response.json())
                .then((data) => {
                    setCities(data);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [])


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByAdmin = () => {
        const sortedCities = [...cities].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.cityName.localeCompare(b.cityName);
            } else {
                return b.cityName.localeCompare(a.cityName);
            }
        });
        setCities(sortedCities);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    return (
        <Container sx={{maxWidth:"xl", padding: '4em'}}>

            <h1>All cities</h1>

            {loading && <CircularProgress />}
            {!loading && cities.length === 0 && <p>No cities found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/cities/add`}>
                    <Tooltip title={"Add a new city"} arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && (
                <Button type={"submit"} component={Link} sx={{mr : 3}} to={'by-avg-wage'}>Check this statistical report by avg-wage</Button>
            )}
            <Button onClick={handleSortByAdmin}>Sort by Admin</Button>
            {!loading && teams.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Created</TableCell>
                                <TableCell align="right">Free places</TableCell>
                                <TableCell align="right">Purpose</TableCell>
                                <TableCell align="right">Admin</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams.map((team, index) => (
                                <TableRow key={team.id}>
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/teams/${team.id}/details`} title={"View team details"}>
                                            {team.nameOfTeam}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{team.created?.toString()}</TableCell>
                                    <TableCell align="right">{team.freePlaces}</TableCell>
                                    <TableCell align="right">{team.purpose}</TableCell>
                                    <TableCell align="right">{team.admin}</TableCell>
                                    <TableCell align="right">{team.rating}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr : 3}}
                                            to={`/teams/${team.id}/details`}>
                                            <Tooltip title="View team details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/teams/${team.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/teams/${team.id}/delete`}>
                                            <DeleteForeverIcon sx={{color : "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};