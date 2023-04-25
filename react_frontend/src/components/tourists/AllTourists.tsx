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
import {Tourist} from "../../models/Tourist";
import {BACKEND_API_URL} from "../../constants";


export const AllTourists = () => {
    const [loading, setLoading] = useState(false);
    const [tourists, setTourists] = useState<Tourist[]>([])
    const etc = `${BACKEND_API_URL}/tourists/`;
    console.log(etc);
    useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/tourists/`, {
                method: "GET",
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setTourists(data);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [])


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByAdmin = () => {
        const sortedTourists = [...tourists].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.touristName.localeCompare(b.touristName);
            } else {
                return b.touristName.localeCompare(a.touristName);
            }
        });
        setTourists(sortedTourists);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    return (
        <Container sx={{maxWidth:"xl", padding: '4em'}}>

            <h1>All tourists</h1>

            {loading && <CircularProgress />}
            {!loading && tourists.length === 0 && <p>No tourists found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tourists/add`}>
                    <Tooltip title={"Add a new tourist"} arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && (
                <Button type={"submit"} component={Link} sx={{mr : 3}} to={'by-avg-money/'}>Check this statistical report by avg-money</Button>
            )}
            <Button onClick={handleSortByAdmin}>Sort by Name</Button>
            {!loading && tourists.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Age</TableCell>
                                <TableCell align="right">Money</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tourists.map((tourist, index) => (
                                <TableRow key={tourist.id}>
                                    <TableCell component="th" scope="row">{index+1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/tourists/${tourist.id}/details`} title={"View tourist details"}>
                                            {tourist.touristName}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{tourist.touristAge}</TableCell>
                                    <TableCell align="right">{tourist.touristMoney}</TableCell>
                                    <TableCell align="right">{tourist.touristPhone}</TableCell>
                                    <TableCell align="right">{tourist.touristEmail}</TableCell>
                                    <TableCell align="right">
                                        <IconButton component={Link} sx={{mr : 3}} to={`/tourists/${tourist.id}/details`}>
                                            <Tooltip title="View tourist details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/tourists/${tourist.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/tourists/${tourist.id}/delete`}>
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