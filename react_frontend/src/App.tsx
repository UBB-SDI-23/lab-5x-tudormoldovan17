import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import {AllCities} from "./components/cities/AllCities";
import {CityDetail} from "./components/cities/CityDetail";
import {CityDelete} from "./components/cities/CityDelete";
import {CityAdd} from "./components/cities/CityAdd";
import {CityEdit} from "./components/cities/CityEdit";
import {CitiesByAvgAge} from "./components/cities/CitiesByAvgAge";
import {AllTourists} from "./components/tourists/AllTourists";

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

                    <Route path="/tourists" element={<AllTourists />} />
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App
