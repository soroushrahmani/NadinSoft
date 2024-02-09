  <template>
      <div class="about">
          <SidebarComponent/>
          <div class="p-4 sm:ml-64">
            <div class="flex flex-col items-center justify-center min-h-screen text-gray-700 p-10 dark:bg-gray-800 bg-custom-gray">
              <div class="mb-5">
                      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ٍEnter City</label>
                      <input type="text"  v-model="locationName" id="text" class=" bg-custom-gray border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <button id="theme-toggle" type="button" class="text-white ml-4 bg-blue-700  hover:bg-blue-800   dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" @click="getLatLon">
                      Get weather
                  </button>
                  </div>
  <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ">
    <div class="flex justify-between">
      <div class="flex flex-col">
    <div>
      <!-- <input type="text" v-model="locationName">
      <input type="submit" @click="getLatLon" value="submit"> -->
    <span class="text-6xl font-bold">{{ weatherData.currentTemp }}°C</span>
    <span class="font-semibold mt-1 text-gray-500">{{ $t('your_city_name') }} {{ locationName }}</span>
  </div>
  </div>
      <img class="h-24 w-24 fill-current text-yellow-400" :src="weatherData.weatherIcon" height="24" viewBox="0 0 24 24" width="24"/>
    </div>
    <div class="flex justify-between mt-12">
      <div class="flex flex-col items-center">
        <span class="font-semibold text-lg">29°C</span>
        <svg class="h-10 w-10 fill-current text-gray-400 mt-3" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z"/></svg>
        <span class="font-semibold mt-1 text-sm">11:00</span>
        <span class="text-xs font-semibold text-gray-400">AM</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold text-lg">31°C</span>
        <svg class="h-10 w-10 fill-current text-gray-400 mt-3" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z"/></svg>
        <span class="font-semibold mt-1 text-sm">1:00</span>
        <span class="text-xs font-semibold text-gray-400">PM</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold text-lg">32°C</span>
        <svg class="h-10 w-10 fill-current text-gray-400 mt-3" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z"/></svg>
        <span class="font-semibold mt-1 text-sm">3:00</span>
        <span class="text-xs font-semibold text-gray-400">PM</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold text-lg">31°C</span>
        <svg class="h-10 w-10 fill-current text-gray-400 mt-3" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z"/></svg>
        <span class="font-semibold mt-1 text-sm">5:00</span>
        <span class="text-xs font-semibold text-gray-400">PM</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold text-lg">27°C</span>
        <svg class="h-10 w-10 fill-current text-gray-400 mt-3" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M19.78,17.51c-2.47,0-6.57-1.33-8.68-5.43C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12 c0,0.14,0.02,0.28,0.02,0.42C2.61,12.16,3.28,12,3.98,12c0,0,0,0,0,0c0-3.09,1.73-5.77,4.3-7.1C7.78,7.09,7.74,9.94,9.32,13 c1.57,3.04,4.18,4.95,6.8,5.86c-1.23,0.74-2.65,1.15-4.13,1.15c-0.5,0-1-0.05-1.48-0.14c-0.37,0.7-0.94,1.27-1.64,1.64 c0.98,0.32,2.03,0.5,3.11,0.5c3.5,0,6.58-1.8,8.37-4.52C20.18,17.5,19.98,17.51,19.78,17.51z"/><path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z"/></g></g></svg>
        <span class="font-semibold mt-1 text-sm">7:00</span>
        <span class="text-xs font-semibold text-gray-400">PM</span>
      </div>
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

const locationName = ref<string>('Qazvin')
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
    // console.log(locationName.value);
    const weather = await getLocation(locationName.value);
    // console.log(weather);
    weatherData.value.currentTemp = Number(weather?.current?.temperature);
    weatherData.value.weatherCode = Number(weather?.current?.weathercode);
    weatherData.value.weatherIcon = `/weather-icons/${getIconUrl(weatherData.value.weatherCode)}`;
    weatherData.value.hourly = weather.hourly;
    console.log(weatherData);    
    
    // Add more fields as needed
  }
}
};
</script>

