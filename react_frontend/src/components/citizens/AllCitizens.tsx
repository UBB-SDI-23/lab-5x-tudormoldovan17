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
    Tooltip, Button, Pagination
} from "@mui/material";

import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import React, {useEffect, useState} from "react";
import {Citizen} from "../../models/Citizen";
import {BACKEND_API_URL} from "../../constants";


export const AllCitizens = () => {
    const [loading, setLoading] = useState(false);
    const [citizens, setCitizens] = useState<Citizen[]>([])
    const etc = `${BACKEND_API_URL}/citizens/`;
    console.log(etc);
    useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/citizens/`)
                .then((response) => response.json())
                .then((data) => {
                    setCitizens(data);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [])


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByAdmin = () => {
        const sortedCitizens = [...citizens].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.citizenName.localeCompare(b.citizenName);
            } else {
                return b.citizenName.localeCompare(a.citizenName);
            }
        });
        setCitizens(sortedCitizens);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };



    return (
        <Container sx={{maxWidth:"xl", padding: '4em'}}>

            <h1>All citizens</h1>

            {loading && <CircularProgress />}
            {!loading && citizens.length === 0 && <p>No citizens found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/citizens/add`}>
                    <Tooltip title={"Add a new citizen"} arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && (
                <Button type={"submit"} component={Link} sx={{mr : 3}} to={'citizens/by-avg-population/'}>Check this statistical report by avg-population</Button>
            )}
            <Button onClick={handleSortByAdmin}>Sort by Name</Button>
            {!loading && citizens.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Age</TableCell>
                                <TableCell align="right">Money</TableCell>
                                <TableCell align="right">Wage</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Pagination count={100} variant="outlined" />
                            {citizens.map((citizen, index) => (
                                <TableRow key={citizen.id}>
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/citizens/${citizen.id}/details`} title={"View citizen details"}>
                                            {citizen.citizenName}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{citizen.citizenAge}</TableCell>
                                    <TableCell align="right">{citizen.citizenMoney}</TableCell>
                                    <TableCell align="right">{citizen.citizenWage}</TableCell>
                                    <TableCell align="right">{citizen.citizenPhone}</TableCell>
                                    <TableCell align="right">{citizen?.citizenCity?.id}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr : 3}}
                                            to={`/citizens/${citizen.id}/details`}>
                                            <Tooltip title="View citizen details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/citizens/${citizen.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/citizens/${citizen.id}/delete`}>
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