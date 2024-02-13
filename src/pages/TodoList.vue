<template>
  <div class="container_todoapp">
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          v-model.trim="newTodo"
          @keyup.enter="createTodo"
          autofocus
        />
      </header>

      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <ul class="todo-list">
          <li
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :class="{ completed: todo.isDone, editing: todo === editingTodo }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.isDone" />
              <label @dblclick="startEditing(todo)">{{ todo.text }}</label>
              <button class="destroy" @click="destroy(todo)"></button>
            </div>

            <input
              class="edit"
              @keyup.escape="cancelEditing(todo)"
              @keyup.enter="finishEditing(todo)"
              @blur="finishEditing(todo)"
              v-model.trim="todo.text"
            />
          </li>
        </ul>
      </section>

      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ itemsLeft }}</strong> item(s) left</span
        >

        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <router-link to="/todo-list/all" :class="{ selected: status === 'all' }"
              >All</router-link
            >
          </li>
          <li>
            <router-link to="/todo-list/active" :class="{ selected: status === 'active' }"
              >Active</router-link
            >
          </li>
          <li>
            <router-link
              to="/todo-list/completed"
              :class="{ selected: status === 'completed' }"
              >Completed</router-link
            >
          </li>
        </ul>

        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="clearCompleted">
          Clear completed
        </button>
      </footer>
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Esc to cancel edit</p>
      <p>Enter to accept edit</p>
    </footer>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo-app-vue";
export default {
  data() {
    return {
      todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
        { text: "Thanh Hải", isDone: false },
        { text: "Yêu Hậu Linh", isDone: false },
        { text: "Nhớ Em", isDone: false },
      ],
      editingTodo: null,
      newTodo: null,
    };
  },
  methods: {
    destroy(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    startEditing(todo) {
      this.editingTodo = todo;
      this.beforeText = todo.text;
    },
    finishEditing() {
      this.editingTodo = null;
    },
    cancelEditing(todo) {
      this.editingTodo = null;
      todo.text = this.beforeText;
    },
    createTodo() {
      if (this.newTodo.length) {
        this.todos.push({ text: this.newTodo, isDone: false });
        this.newTodo = null;
      }
    },
    clearCompleted() {
      this.todos = this.activeTodos;
    },
  },
  computed: {
    itemsLeft() {
      return this.todos.filter((t) => !t.isDone).length;
    },
    status() {
      return this.$route.params.status;
    },
    activeTodos() {
      return this.todos.filter((t) => !t.isDone);
    },
    completedTodos() {
      return this.todos.filter((t) => t.isDone);
    },
    filteredTodos() {
      switch (this.status) {
        case "active":
          return this.activeTodos;
        case "completed":
          return this.completedTodos;

        default:
          return this.todos;
      }
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      },
    },
  },
};
</script>
<style lang="css" scoped src="todomvc-app-css/index.css"></style>

<style scoped>
.container_todoapp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 240px;
    padding-top: 70px;
}
.todoapp {
    width: 50%;
}
.header {
  z-index: 1;
  position: relative;
}
.view {
    display: flex;
    padding-left: 20px;
}
</style>
