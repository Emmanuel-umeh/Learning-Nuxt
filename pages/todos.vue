<template>
  <ul>
      <br/>
   
      <h1>Counter value !! {{getCounter}}</h1>

      <button @click="increaseCount">Increase count</button>
       <br/>
      <br/>
    <li v-for="todo in getTodos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li>
      <input @keyup.enter="addTodo" placeholder="What needs to be done?" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'todos',
  
  computed: {
    ...mapGetters({
      getTodos : "todos/getTodos",
      getCounter : "todos/getCounter"
    }),
  

  },

  methods: {
    addTodo(e) {
      this.$store.commit('todos/addTodo', e.target.value)
      e.target.value = ""
    
    },
    increaseCount(){
        this.$store.dispatch('increaseCount')
    },
   
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}</style>
