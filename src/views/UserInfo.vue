<template>
  <div class="about">
      <SidebarComponent/>
      <div class="p-4 sm:ml-64">
          <div class="flex flex-col items-center justify-center min-h-screen text-gray-700 p-10 bg-custom-gray dark:bg-gray-800">
              <form class="max-w-sm mx-auto">
                  <div class="mb-5">
                      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("your_name") }}</label>
                      <input type="text" v-model="firstName" id="text" class="bg-custom-gray border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <div class="mb-5">
                      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("your_last_name") }}</label>
                      <input     @keypress.enter="save"
 type="text" v-model="lastName" id="text" class="bg-custom-gray border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>

                  <div class="flex flex-col sm:flex-row">
                    <button id="theme-toggle" type="button" class="text-white mb-4 sm:mb-0 sm:mr-4 bg-blue-700 hover:bg-blue-800  dark:hover:bg-blue-700 focus:outline-none focus:ring-4  focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" @click="toggleTheme">
                        {{ $t("change_theme") }}
                    </button>
                    <button @click="save" type="button" class="text-white mb-4 sm:mb-0 sm:mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {{ $t("save") }}
                    </button>

                    <button id="theme-toggle" type="button" class="text-white bg-blue-700  hover:bg-blue-800   dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" @click="switchLanguage">
                        {{ $t("change_language") }}
                    </button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>



<script lang="ts">
import { ref, onMounted } from 'vue';
import SidebarComponent from '../components/SidebarComponent.vue'
import { useStore } from 'vuex';

export default {
  components:{
    SidebarComponent
  },
  setup() {
    const themeToggleDarkIcon = ref<HTMLElement | null>(null);
    const themeToggleLightIcon = ref<HTMLElement | null>(null);
    const store = useStore();

    // Change 'name' to 'firstName'
    const firstName = ref(localStorage.getItem('firstName') || '');
    const lastName = ref(localStorage.getItem('lastName') || '');

    const toggleTheme = () => {
      // toggle icons inside button
      themeToggleDarkIcon.value?.classList.toggle('hidden');
      themeToggleLightIcon.value?.classList.toggle('hidden');

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    };

    const switchLanguage = () => {
      const newLanguage = store.state.language === 'en' ? 'fa' : 'en';
      store.commit('SET_LANGUAGE', newLanguage);
    };

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Update the save function to check for empty inputs
    const save = () => {
      if (!firstName.value || !lastName.value) {
        alert('Please fill in both fields.');
        return;
      }

      // Capitalize the first letter of firstName and lastName before saving
      const capitalizedFirstName = capitalizeFirstLetter(firstName.value);
      const capitalizedLastName = capitalizeFirstLetter(lastName.value);

      localStorage.setItem('firstName', capitalizedFirstName);
      localStorage.setItem('lastName', capitalizedLastName);

      // Alert the user that the name has been changed
      alert('Name has been successfully changed!');
    };

    onMounted(() => {
      themeToggleDarkIcon.value = document.getElementById('theme-toggle-dark-icon');
      themeToggleLightIcon.value = document.getElementById('theme-toggle-light-icon');

      // Change the icons inside the button based on previous settings
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        themeToggleLightIcon.value?.classList.remove('hidden');
      } else {
        themeToggleDarkIcon.value?.classList.remove('hidden');
      }

      // Load firstName and lastName from localStorage
      firstName.value = localStorage.getItem('firstName') || '';
      lastName.value = localStorage.getItem('lastName') || '';
    });

    return {
      toggleTheme,
      switchLanguage,
      save, // Make sure to return the new function
      firstName,
      lastName
    };
  },
};
</script>