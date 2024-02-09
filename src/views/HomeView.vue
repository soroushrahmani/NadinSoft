<template>
  <section class="h-screen">
  <div class="h-full">
    <!-- Left column container with background-->
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image" />
      </div>

      <!-- Right column container -->
      <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <form>
          <!--Sign in section-->
          <div
            class="flex flex-row items-center justify-center lg:justify-center text-white">
            <p class="mb-0 mr-4 text-lg ">{{ $t('enter_your_name') }}</p>

            
          </div>

<br>
<br>


          <!-- Email input -->
          <div class="relative mb-6 mr-12" data-te-input-wrapper-init>
            <input
              v-model="firstName"
              type="text"
              class="peer block  border-gray-300 min-h-[auto] w-full  border  rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="first name" />
            <label 
            v-if="!firstName"
              for="exampleFormControlInput2"
              class="pointer-events-none absolute left-3 top-0  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >{{ $t('name') }}
            </label>
          </div>

          <!-- Last name input -->
          <div class="relative mb-6 mr-12" data-te-input-wrapper-init>
            <input
              v-model="lastName"
              type="text"
              class="peer block min-h-[auto] w-full border border-gray-300 rounded  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput22"
              placeholder="last name" 
              @keypress.enter="login"
/>
            <label
            v-if="!lastName"
              for="exampleFormControlInput22"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >{{ $t('last_name') }}
            </label>
          </div>

          <!-- Login button -->
          <div class="text-center lg:text-left">
            <button
              @click="login"
              type="button"
              class="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              {{ $t('login') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section> 

</template>

 
<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const firstName = ref('')
    const lastName = ref('')

    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const login = () => {
      if (firstName.value && lastName.value) {
        localStorage.setItem('firstName', capitalizeFirstLetter(firstName.value))
        localStorage.setItem('lastName', capitalizeFirstLetter(lastName.value))
        router.push('/DashboardPage')
      } else {
        alert('Please write your name')
      }
    }

    return {
      firstName,
      lastName,
      login
    }
  }
}
</script>
