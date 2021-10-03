export const state = () => ({
  todos: [],
  counter: 0,
  color: '',
})

export const getters = {
  getTodos: (state) => {
    return state.todos
  },
  getCounter: (state) => {
    return state.counter
  },

  getColor: (state) => {
    return state.color
  },
}

export const mutations = {
  SET_TODOS(state, payload) {
    state.todos = payload
  },

  ADD_TODO(state, payload) {
    const newTask = {
      id: new Date().getTime(),
      task: payload.task,
      completed: false,
    }
    state.todos.push(newTask)
  },

  TOGGLE_TODO(state, payload) {
    const item = state.todos.find((todo) => todo.id === payload)
    if (item) {
      item.completed = !item.completed
    }
  },

  DELETE_TODO(state, payload) {
    const index = state.todos.findIndex((todo) => todo.id === payload)
    state.todos.splice(index, 1)
  },

  INCREMENT (state, payload) {
        state.counter ++
  },
  // increment(state){
  //     state.counter ++
  // },

  // changeColor(state, color){
  //     state.color = color
  // },
  // add(state, text){
  //     state.todos.push({
  //         text,
  //         done : false
  //     })
  // },

  // remove(state, {todo}) {
  //     state.todos.splice(state.todos.indexOf(todo), 1)
  // },

  // toggle(state, todo){
  //     todo.done = !todo.done
  // }
}

export const actions = {
  addTodo({ commit }, todo) {
    commit('ADD_TODO', todo)
  },
  toggleTodo({ commit }, todo) {
    commit('TOGGLE_TODO', todo)
  },
  deleteTodo({ commit }, todo) {
    commit('DELETE_TODO', todo)
  },

  increaseCount({commit}){
      commit('INCREMENT')
  }
}
