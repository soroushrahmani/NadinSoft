import axios from "axios";
const ICON_MAP = new Map()

interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: string;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    precipitation_sum: number[];
    time: number[];
    weathercode: string[];
  };
  hourly: {
    time: number[];
    weathercode: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    windspeed_10m: number[];
    precipitation: number[];
  };
}

export function getWeather(lat: number, lon: number, timezone: string) {
    //      `https://geocoding-api.open-meteo.com/v1/search?name=${test}&count=10&language=en&format=json`,
  
  return axios
    .get<WeatherData>(
      "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=celsius&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
      {
        params: {
          latitude: lat,
          longitude: lon,
          timezone,
        },
      }
    )
    .then((data) => {
      console.log(data);
      return {
        current: data.data.current_weather,
        hourly:  data.data.hourly,
      };
    });
}

export function getLocation(locationName: string) {
  console.log(locationName);
  
return axios
  .get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=10&language=en&format=json`,
  )
  .then((data) => {
    const lat = data.data.results[0].latitude;
    const lon = data.data.results[0].longitude;
    return getWeather(lat,lon, 'Europe/London');
    // return {
    //   current: data.data.current_weather,
    //   hourly:  data.data.hourly,
    // };
  });
}

addMapping([0, 1], "sun")
addMapping([2], "cloud-sun")
addMapping([3], "cloud")
addMapping([45, 48], "smog")
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "cloud-showers-heavy"
)
addMapping([71, 73, 75, 77, 85, 86], "snowflake")
addMapping([95, 96, 99], "cloud-bolt")

function addMapping(values: Array<number>, icon: string) {
  values.forEach(value => {
    ICON_MAP.set(value, icon)
  })
}

export function getIconUrl(iconCode: number): string {
  // ../../public/weather-icons/cloud-sun.svg
  return `${ICON_MAP.get(iconCode)}.svg`
}

