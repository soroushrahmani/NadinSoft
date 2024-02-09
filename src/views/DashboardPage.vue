<template>
  <div class="about">
    <SidebarComponent/>
    <div class="p-4 sm:ml-64">
    <div class="p-4 rounded-lg dark:border-gray-700">
      <div class="grid grid-cols-2 gap-4 mb-4">
         
         <div class="flex items-center justify-center h-24 rounded bg-custom-gray dark:bg-gray-800">
            <!-- Adjust the font size based on the screen size -->
            <p class="text-xl md:text-2xl text-custom-dark-gray dark:text-gray-500">
               {{ $t('the_time_is') }} {{ currentTime  }}
            </p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-custom-gray dark:bg-gray-800">
            
            <div class="relative">
    <!-- Adjust the button size based on the screen size -->
    <button id="dropdownHoverButton" class="text-sm md:text-base px-3 md:px-5 py-2 md:py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      {{ $t('your_last_activity') }}
      <svg class="w-2 h-2 md:w-2.5 md:h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdownHover" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full mt-2">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
        <li v-for="(todo, index) in todos" :key="index">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ todo.title }}</a>
        </li>
        <li v-if="todos.length === 0">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('you_are_all_done') }} {{ firstName }}</a>
        </li>
      </ul>
    </div>
   </div>
         </div>
      </div>
      <div class="flex items-center justify-center h-48 mb-4 rounded bg-custom-gray dark:bg-gray-800">
         <p class="text-2xl text-custom-dark-gray dark:text-gray-500">
         {{ greeting }} {{ firstName }} 
         </p>
      </div>
      
      
   </div>
</div>
  </div>
</template>







<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import SidebarComponent from '../components/SidebarComponent.vue'



export default defineComponent({
  components: {
    SidebarComponent
  },
  setup() {
    const store = useStore();
    const todos = computed(() => store.state.todos);
    const { t } = useI18n()
    const greeting = ref('')
    const currentTime = ref('')
    const firstName = ref(localStorage.getItem('firstName') || '')
    const lastName = ref(localStorage.getItem('lastName') || '')

    onMounted(() => {
      const dropdownButton = document.getElementById('dropdownHoverButton')
      const dropdownMenu = document.getElementById('dropdownHover')

      if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener('mouseover', () => {
          dropdownMenu.classList.remove('hidden')
        })

        dropdownButton.addEventListener('mouseout', () => {
          dropdownMenu.classList.add('hidden')
        })
      } else {
        console.error('Dropdown elements not found')
      }

      updateTime()
      setInterval(updateTime, 1000)
      
    })

    const updateTime = () => {
      const date = new Date()
      const hours = date.getHours()
      currentTime.value = date.toLocaleTimeString()

      if (hours < 12) {
        greeting.value = t('good_morning')
      } else if (hours < 18) {
        greeting.value = t('good_afternoon')
      } else {
        greeting.value = t('sweet_dreams')
      }
    }



    return {
      todos,
      greeting,
      currentTime,
      updateTime,
      firstName,
      lastName,

    };
  }
});
</script>

