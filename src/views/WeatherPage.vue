  <template>
      <div class="about">
          <SidebarComponent/>
          <div class="p-4 sm:ml-64">
            <div class="flex flex-col items-center justify-center min-h-screen text-gray-700 p-10 dark:bg-gray-800 bg-custom-gray">
              
      <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ">
    <div class="mb-5">
      <div class="flex">
      <input
      type="text"
      v-model="locationName"
      id="text"
      @keypress.enter="getLatLon"
      class="bg-custom-gray border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
    />
    <button
      id="theme-toggle"
      type="button"
      class="text-white ml-4 bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
      style="margin-inline-start: 10px;" 
      @click="getLatLon"
    >
    {{ $t("search_weather") }}
    </button>
  </div>
</div>

<div class="flex justify-between">
  <div class="flex flex-col">
    <div>
      <span class="text-4xl md:text-6xl font-bold mt-2">{{ weatherData.currentTemp }}°C</span>
    </div>
  </div>
  <img
    class="h-16 w-16 md:h-24 md:w-24 fill-current text-yellow-400"
    :src="weatherData.weatherIcon"
    height="20"
    viewBox="0 0 24 24"
    width="24"
  />
</div>


    
  </div>


  </div>
          </div>
      </div>
  </template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import SidebarComponent from '../components/SidebarComponent.vue'
import { getWeather, getLocation, getIconUrl } from '../WeatherService/weather'

const locationName = ref<string>('Tehran')
const weatherData = ref({ currentTemp: 0, weatherCode: 0, hourly:  {}, weatherIcon: ''}) // Define weatherData as a ref with number types

export default {
  name: 'WeatherComponent',
  components:{
    SidebarComponent
  },
  setup() {
    onMounted(async () => {
        const weather = await getWeather(52.52, 13.41, 'Europe/London');
        weatherData.value.currentTemp = Number(weather?.current?.temperature);
        weatherData.value.weatherCode = Number(weather?.current?.weathercode);
        weatherData.value.weatherIcon = `/weather-icons/${getIconUrl(weatherData.value.weatherCode)}`;
        console.log(weatherData.value.weatherIcon);
        
        weatherData.value.hourly = weather.hourly
    });
    return {
      weatherData,
      locationName,
    };
  },
  methods: {
    async getLatLon() {
    try {
      const weather = await getLocation(locationName.value);
      weatherData.value.currentTemp = Number(weather?.current?.temperature);
      weatherData.value.weatherCode = Number(weather?.current?.weathercode);
      weatherData.value.weatherIcon = `/weather-icons/${getIconUrl(weatherData.value.weatherCode)}`;
      weatherData.value.hourly = weather.hourly;
    } catch (error) {
      alert('City not found. Please try again.');
    }
  }
} 
};
</script>

