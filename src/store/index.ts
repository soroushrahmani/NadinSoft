import { createStore } from 'vuex'

interface Todo {
  title: string;
  notes: string;
  checked: boolean;
  focused: boolean;
  open: boolean;
  time: string;
}

export default createStore({
  state: {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    todos: JSON.parse(localStorage.getItem('todos') || '[]') as Todo[],
    language: localStorage.getItem('language') || 'en',
  },
  mutations: {
    SET_NAME(state, firstName) {
      state.firstName = firstName;
      localStorage.setItem('firstName', firstName);
    },
    SET_LAST_NAME(state, lastName) {
      state.lastName = lastName;
      localStorage.setItem('lastName', lastName);
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
      localStorage.setItem('todos', JSON.stringify(todos));
    },
    ADD_TODO(state, todo: Todo) {
      state.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    REMOVE_TODO(state, index: number) {
      state.todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    SET_LANGUAGE(state, language) {
      state.language = language;
      localStorage.setItem('language', language); 
    },
  },
  actions: {
    setName({ commit }, firstName) {
      commit('SET_NAME', firstName.charAt(0).toUpperCase() + firstName.slice(1));
    },
    setLastName({ commit }, lastName) {
      commit('SET_LAST_NAME', lastName.charAt(0).toUpperCase() + lastName.slice(1));
    },
    setTodos({ commit }, todos) {
      commit('SET_TODOS', todos);
    },
    addTodo({ commit }, todo: Todo) {
      commit('ADD_TODO', todo);
    },
    removeTodo({ commit }, index: number) {
      commit('REMOVE_TODO', index);
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
  },
})
