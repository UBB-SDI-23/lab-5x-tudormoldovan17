import {City} from "./City";
import {Country} from "./Country";

export interface Tourist {
    id?: number;
    touristName: string;
    touristAge: number;
    touristMoney: number;
    touristPhone: string;
    touristEmail: string;
    cities?: City[];
    country?: Country[];
}