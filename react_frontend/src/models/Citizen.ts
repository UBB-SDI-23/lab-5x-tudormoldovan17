import {City} from "./City";

export interface Citizen {
    id?: number;
    citizenCity: City;
    citizenName: string;
    citizenAge: number;
    citizenMoney: number;
    citizenWage: number;
    citizenPhone: string;
}