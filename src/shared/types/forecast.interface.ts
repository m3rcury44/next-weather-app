import {IWeather} from "./weather.interface";

interface IList extends Omit<IWeather, 'coord' | 'cod'> {
    dt_txt: string
}

export interface IForecast {
    list: IList[]
    city: Pick<IWeather, 'coord' | 'name' | 'id'>
}

