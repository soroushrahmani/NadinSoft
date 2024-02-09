<template>
  <div class="p-4 sm:ml-64">
    <SidebarComponent />
    <div class="min-w-screen min-h-screen bg-custom-gray dark:bg-gray-800 flex items-center justify-center px-5 py-5">
      <div class="w-full mx-auto rounded-lg border border-gray-700 p-8 lg:py-12 lg:px-14 text-gray-300" style="max-width: 800px">
        <div class="mb-10">
          <h1 class="text-2xl font-bold text-custom-dark-gray dark:text-gray-500"><i class="mdi mdi-star text-yellow-300 text-3xl leading-none align-bottom"></i> {{ $t('todos') }}</h1>
        </div>
        <div class="mb-10">
          <ul v-if="todos.length" v-click-outside="defocusItems" class="-mx-1">
            <li v-for="(item, index) in todos" :key="index" @click="focusItem(index)" @dblclick="openItem(index)" class="px-2 py-2 rounded transition-all flex text-md" :class="{'bg-indigo-800':item.focused,'bg-gray-700 shadow-lg px-4 py-4 my-10 -mx-2':item.open,'mb-1 cursor-pointer':!item.open}">
              <div class="flex-none w-10 leading-none">
                <input type="checkbox" v-model="item.checked">
              </div>
              <div class="flex-grow max-w-full">
                <div class="w-full leading-none">
                  <h3 v-show="!item.open" class="text-md leading-none truncate w-full pr-10" :class="item.title.length?'text-custom-dark-gray':'text-custom-dark-gray'">{{ item.title || $t('new_todo') }}</h3>
                  <input v-show="item.open" type="text" class="text-md w-full bg-transparent text-custom-dark-grayleading-none focus:outline-none mb-2" v-model="item.title" :id="`titleField${index}`" :placeholder="$t('What_should_you_do')"/>
                </div>

                <div class="w-full" v-show="item.open">
                  <textarea class="text-md w-full bg-transparent text-gray-300 leading-tight focus:outline-none mt-4" rows="10" v-model="item.notes" :placeholder="$t('more_detail')"></textarea>
                </div>
                <div class="w-full flex justify-end" v-show="item.open">
                  <button class="p-1 -mr-1 focus:outline-none hover:text-red-300" @click="removeItem(index)"><i class="mdi mdi-trash-can-outline"></i></button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <button class="py-1 px-10 border dark:text-gray-500 text-custom-dark-gray border-gray-800 hover:border-gray-700 rounded leading-none focus:outline-none text-xl" @click="addItem()"><i class="mdi mdi-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import SidebarComponent from '../components/SidebarComponent.vue'

interface TodoItem {
  title: string;
  notes: string;
  checked: boolean;
  focused: boolean;
  open: boolean;
  time: number;
  rawTime: string;
}

export default {
  components: {
    SidebarComponent
  },
  setup() { 
    const store = useStore();
    const todos = computed(() => store.state.todos);

    const focusItem = (index: number) => {
      if (todos.value[index] && !todos.value[index].open) {
        for (let i = 0; i < todos.value.length; i++) {
          todos.value[i].open = false;
          todos.value[i].focused = i === index;
        }
      }
    };

    const openItem = (index: number) => {
      if (todos.value[index]) {
        for (let i = 0; i < todos.value.length; i++) {
          todos.value[i].focused = false;
          todos.value[i].open = i === index;
        }
        setTimeout(() => (document.getElementById(`titleField${index}`) as HTMLInputElement).focus(), 10);
      }
    };

    const defocusItems = () => {
      for (let i = 0; i < todos.value.length; i++) {
        todos.value[i].focused = false;
        todos.value[i].open = false;
      }
    };

    const removeItem = (index: number) => {
      store.commit('REMOVE_TODO', index);
    };

    const validateTime = (item: TodoItem) => {
      const time = parseFloat(item.rawTime);
      if (!isNaN(time)) {
        item.time = time;
      }
    };

    const addItem = () => {
      const newTodo: TodoItem = {
        title: '',
        notes: '',
        checked: false,
        focused: false,
        open: false,
        time: 0,
        rawTime: ''
      };
      store.commit('ADD_TODO', newTodo);
    };

    return {
      todos,
      focusItem,
      openItem,
      defocusItems,
      removeItem,
      addItem,
      validateTime
    };
  }
};
</script>





<style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style>
