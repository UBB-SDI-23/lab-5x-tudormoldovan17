import {Tourist} from "./Tourist";
import {Country} from "./Country";
import {Citizen} from "./Citizen";

export interface City {
    id?: number;
    cityName: string;
    cityPopulation: number;
    cityArea: number;
    cityMoney: number;
    cityDescription: string;
    cityCountry?: Country[];
    cityCitizen?: Citizen[];
}