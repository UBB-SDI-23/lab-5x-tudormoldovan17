import {City} from "./City";
import {Tourist} from "./Tourist";

export interface Country {
    id?: number;
    countryName: string;
    countryCities: string;
    countryPopulation: number;
    countryMoney: number;
    countryDescription: string;
    countryCity: City;
    countryTourist: Tourist;
}