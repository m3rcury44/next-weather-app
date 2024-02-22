import styles from './styles.module.scss'
import {Search} from "@/components/search";
import {Forecast} from "@/components/forecast";
import {IWeather, IAirQuality, ICookiesData, IForecast} from "@/shared/types";
import {cookies} from "next/headers";
import Image from "next/image";
import {ChangeTheme} from "@/components/change-theme";

export default async function Main() {

    const existingCoordinates = cookies().get('coordinates')?.value
    const cookiesData: ICookiesData = existingCoordinates && JSON.parse(cookies().get('coordinates')?.value as string)

    const lat = Number(cookiesData?.lat || '') || 40.7127281
    const lon = Number(cookiesData?.lon || '') || -74.0060152

    const weather: IWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then(res => res.json())

    const airQuality: IAirQuality = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then(res => res.json())

    const forecast: IForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then(res => res.json())

    const updateCookies = async (coordinates: string) => {
        "use server"

        if (existingCoordinates !== coordinates) {
            cookies().set('coordinates', coordinates, {priority: 'high'})
        }
    }

    const getAirQualityIndex = () => {
        switch (airQuality.list[0].main.aqi) {
            case 1: return '1 - Good'
            case 2: return '2 - Fair'
            case 3: return '3 - Moderate'
            case 4: return '4 - Poor'
            case 5: return '5 - Very Poor'
        }
    }

    const getForecastTime = () => {
        const hours = (new Date(weather.dt * 1000).getUTCHours() + weather.timezone / 3600) % 24
        const minutes = String(new Date(weather.dt * 1000).getMinutes()).padStart(2, "0")

        return `${hours}:${minutes}`
    }

    return (
        <main className={styles.main}>
            <Search updateCookies={updateCookies}/>
            <ChangeTheme/>
            <section className={styles.city}>
                <div>
                    <h1>at {getForecastTime()}</h1>
                    <h1>{`${cookiesData?.name || weather.name}, ${weather.sys.country}`}</h1>
                    <div>
                        <p><span>{Math.round(weather.main.temp)}°</span> {weather.weather[0].description}</p>
                        <Image
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            height={60}
                            width={60}
                            alt={weather.weather[0].icon}
                        />
                    </div>
                </div>
                <div>
                    <p>{weather.weather[0].main} {weather.main.temp_min}° {weather.main.temp_max}°</p>
                    <p>Air quality : {getAirQualityIndex()}</p>
                </div>
            </section>
            <section className={styles.weatherInfo}>
                <div>
                    <h2>Weather details</h2>
                    <div className={styles.weatherDetailsWrapper}>
                        <article className={styles.weatherDetailsWrapperItem}>
                            <p>Feels like</p>
                            <h3>{Math.round(weather.main.feels_like)}°</h3>
                        </article>
                        <article className={styles.weatherDetailsWrapperItem}>
                            <p>ENE wind</p>
                            <h3>{weather.wind.speed} m/s</h3>
                        </article>
                        <article className={styles.weatherDetailsWrapperItem}>
                            <p>Humidity</p>
                            <h3>{weather.main.humidity}%</h3>
                        </article>
                        <article className={styles.weatherDetailsWrapperItem}>
                            <p>Cloudiness</p>
                            <h3>{weather.clouds.all}%</h3>
                        </article>
                        <article className={styles.weatherDetailsWrapperItem}>
                            <p>Visibility</p>
                            <h3>{+(weather.visibility / 1000).toFixed(2)} km</h3>
                        </article>
                        <article className={styles.weatherDetailsWrapperItem}>
                            <p>Pressure</p>
                            <h3>{weather.main.pressure} hPa</h3>
                        </article>
                    </div>
                </div>
                <Forecast forecast={forecast}/>
            </section>
        </main>
    );
};