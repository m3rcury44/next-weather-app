import {IWeather} from "./weather.interface";

export interface IAirQuality extends Pick<IWeather, 'coord'> {
    list: [{
        main: {
            aqi: number
        }
        dt: number
    }]
}