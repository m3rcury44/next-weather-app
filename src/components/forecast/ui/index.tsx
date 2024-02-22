"use client"

import styles from './styles.module.scss';
import {FC, useEffect, useState} from "react";
import {IForecast} from "@/shared/types";
import {defaults} from "chart.js/auto";
import {Line} from "react-chartjs-2";
import {useTheme} from "next-themes";
import {Loading} from "@/components/loading";

defaults.maintainAspectRatio = false
defaults.responsive = true
defaults.plugins.legend.display = false
defaults.plugins.title.display = true
defaults.plugins.tooltip.usePointStyle = true
defaults.plugins.tooltip.boxPadding = 8
defaults.interaction.intersect = false
defaults.scale.grid.color = "#333333"

const Forecast: FC<{forecast: IForecast}> = ({forecast}) => {

    const [isMounted, setIsMounted] = useState(false)
    const [start, setStart] = useState(0)
    const {resolvedTheme} = useTheme()

    useEffect(() => setIsMounted(true), []);

    const handleGoPreviousPage = () => {
        if (start >= 8) {
            setStart(prevState => prevState - 8)
        }
    }

    const handleGoNextPage = () => {
        if (start >= 32) {
            return
        }
        setStart(prevState => prevState + 8)
    }

    const formattedDate = (date: string) => {
        return `${new Date(`${date}`).toLocaleString('en-US', {day: 'numeric',
            month: 'short',
            hour: 'numeric',
            hourCycle: "h23"
        })}:00`
    }

    return (
        <div className={styles.forecast}>
            <h2>5 day forecast<span> with 3-hour step</span></h2>
            <div>
                {!isMounted ? <Loading style={{bottom: '50px'}}/> : <Line data={{
                    labels: forecast.list.slice(start, start + 8).map(item => formattedDate(item.dt_txt)),
                    datasets: [
                        {
                            data: forecast.list.slice(start, start + 8).map(item => item.main.temp),
                            pointBorderWidth: 6,
                            pointHitRadius: 2,
                            normalized: true,
                            pointBorderColor: resolvedTheme === 'dark' ? "#fff" : "#333333",
                            pointBackgroundColor: resolvedTheme === 'dark' ? "#fff" : "#333333",
                            borderColor: "#FFC701"
                        }
                    ],
                }} options={{plugins: {
                    tooltip: {
                        callbacks: {
                            labelPointStyle() {
                                const image = new Image(30, 30);

                                if (typeof image !== "undefined") {

                                    forecast.list.slice(start, start + 8).forEach(item => image.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` )

                                    return {
                                        pointStyle: image,
                                        rotation: 0,
                                    };
                                } else {
                                    return {
                                        pointStyle: "circle",
                                        rotation: 0,
                                    };
                                }
                            }
                        }
                    }
                }
                }}/>}
                <div className={styles.pagination}>
                    <button disabled={start <= 7} onClick={handleGoPreviousPage}>{'<'} Previous</button>
                    <button disabled={start >= 32} onClick={handleGoNextPage}>Next {'>'}</button>
                </div>
            </div>
        </div>
    );
};

export default Forecast;