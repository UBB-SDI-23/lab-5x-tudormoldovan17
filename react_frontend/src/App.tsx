import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import {AllCities} from "./components/cities/AllCities";
import {CityDetail} from "./components/cities/CityDetail";
import {CityDelete} from "./components/cities/CityDelete";
import {CityAdd} from "./components/cities/CityAdd";
import {CityEdit} from "./components/cities/CityEdit";
import {CitiesByAvgAge} from "./components/cities/CitiesByAvgAge";

function App() {
    return (
        <React.Fragment>
            <Router>
                <AppMenu />
                <Routes>
                    <Route path="/" element={<AppHome />} />
                    <Route path="/cities" element={<AllCities />} />
                    <Route path="/cities/:cityId/details" element={<CityDetail />} />
                    <Route path="/cities/:cityId/edit" element={<CityEdit />} />
                    <Route path="/cities/:cityId/delete" element={<CityDelete />} />
                    <Route path="/cities/add" element={<CityAdd />} />
                    <Route path="/cities/by-avg-age/" element={<CitiesByAvgAge />}/>
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App
