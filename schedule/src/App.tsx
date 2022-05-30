import { isNil } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import "./content/css/main.css";
import busPng from "./content/images/bus.png";
import { pluralize } from "./utlis/pluralize";

type Props = {};

type Points = {
    hours: number;
    minutes: number;
};

const START_POINT: Points = { hours: 6, minutes: 0 };
const END_POINT: Points = { hours: 0, minutes: 0 };
const BUS_INTERVAL = 15;
const WALK_TIME = 5;

export const App: React.FC<Props> = ({}) => {
    const [currentTime, setCurrentTime] = useState<string>("");

    const [result, setResult] = useState<string>("");
    
    const busPoints = useMemo(() => {
        let points: Points[] = [];
        for (let minutes = 0; minutes <= (24 - 6) * 60; minutes += BUS_INTERVAL) {
            points.push({
                hours: new Date(0, 0, 0, 6, minutes).getHours(),
                minutes: new Date(0, 0, 0, 6, minutes).getMinutes(),
            });
        }
        return points;
    }, []);

    const checkTime = useCallback(() => {
        const [hour, minute] = currentTime.split(":")?.map((el) => +el);

        if (hour >= 24 || hour < 0 || minute > 60 || minute < 0 || isNil(hour) || isNil(minute)) {
            setResult("Некорректное время");
            return;
        }

        if (hour < START_POINT.hours && hour >= END_POINT.hours) {
            busPoints[1].hours === hour + 1 &&
            busPoints[1].minutes + 60 - WALK_TIME >= minute &&
            busPoints[0].minutes + 60 - minute < WALK_TIME
                ? setResult(
                      `До выхода ещё ${busPoints[1].minutes + 60 - minute} ${pluralize(busPoints[1].minutes + 60 - minute, [
                          "минута",
                          "минуты",
                          "минут",
                      ])}`
                  )
                : setResult(`Следующий автобус отправляется в ${START_POINT.hours}:${START_POINT.minutes}${START_POINT.minutes}`);

            return;
        }

        const preTime = busPoints.find(({ hours, minutes }) => hours === hour && minutes - WALK_TIME >= minute);

        if (preTime) {

            if (preTime.minutes - minute - WALK_TIME === 0) {
                setResult("Нужно выходить сейчас");
                return;
            }

            setResult(
                `До выхода ещё ${preTime.minutes - minute - WALK_TIME} ${pluralize(preTime.minutes - minute - WALK_TIME, [
                    "минута",
                    "минуты",
                    "минут",
                ])}`
            );

            return;
        }

        const postTime = busPoints.find(({ hours, minutes }) => hours === hour + 1 && minutes + 60 - minute >= WALK_TIME);

        if (postTime) {
            
            if (postTime.minutes + 60 - minute - WALK_TIME === 0) {
                setResult("Нужно выходить сейчас");
                return;
            }

            setResult(
                `До выхода ещё ${postTime.minutes + 60 - minute - WALK_TIME} ${pluralize(
                    postTime.minutes + 60 - minute - WALK_TIME,
                    ["минута", "минуты", "минут"]
                )}`
            );
            
            return;
        }

        setResult(`Следующий автобус отправляется в ${START_POINT.hours}:${START_POINT.minutes}${START_POINT.minutes}`);
    }, [currentTime, busPoints]);

    return (
        <div className="wrapper">
            <div>Автобусы ходят с 6:00 до 0:00&nbsp;с интервалом в 15 минут. Время в пути до автобуса — 5 минут.</div>
            <img className="bus-img" src={busPng} alt="" />
            <div className="input-wrapper">
                <input
                    value={currentTime}
                    onChange={(e) => setCurrentTime(e.currentTarget.value)}
                    placeholder="Введите время в формате чч:мм"
                ></input>
                <button onClick={checkTime}>Рассчитать</button>
            </div>
            <div>{result}</div>
        </div>
    );
};

export default App;
