<template>
  <div class="container">

    <h1>Todos</h1>

    <div class="row justify-content-md-center">

      <div class="col-lg-6 arrowWrapper">
        <sort-alphabetical-icon @click="sortByName('text')" />
        <redo-icon @click="normalOrder" />
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 actionWrapper">
        <input type="text" v-model.lazy="newTodo" @keyup.enter="addTodo" />
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 todosWrapper">
        <div class="todos" v-for="(todo, index) in todosFiltered" :key="todo.id">

          <div class="todo">
            <input class="checkbox" type="checkbox" v-model="todo.completed">

            <div v-if="!todo.editing" :class="{ completed : todo.completed }" @dblclick="editTodo(todo)">
              {{ todo.text }}
            </div>

            <input v-else type="text" v-model="todo.text" @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            v-focus />

            <div class="remove-item" @click="removeTodo(index)">
              &times;
            </div>

          </div>
        </div>
      </div>

    </div>

    <div class="row bottomWrapper">

      <div class="col-lg-4 col-md-4 col-sm-12">

        <button :class="{ active : filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active : filter == 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active : filter == 'completed' }" @click="filter = 'completed'">Completed</button>

      </div>

      <div class="col-lg-3 col-md-3 col-sm-12">
        <div class="flex-container">
          <label>Check All</label>
          <div class="verticalCentered">
            <input type="checkbox" class="checkall" :checked="!anyRemaining" @change="checkAllTodos"  />
          </div>
        </div>

      </div>

      <div class="col-lg-2 col-md-2 col-sm-12">
        <div class="remaining">{{ remaining }} items left.</div>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-12">
        <button v-if="showClearCompleteButton" @click="clearCompleted">Clear Completed</button>
      </div>




    </div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      sorted: false,
      filter: 'all',
      newTodo: '',
      beforeEditCache: '',
      idForTodo: 4,
      todos: [
        {
          id: 1,
          text: 'Pay Internet bill.',
          completed: false,
          editing: false
        },
        {
          id: 2,
          text: 'Buy ketchup.',
          completed: false,
          editing: false
        },
        {
          id: 3,
          text: 'Go to the store.',
          completed: false,
          editing: false
        },
      ]
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  components: {

  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.todos.push({
        id: this.idForTodo,
        text: this.newTodo,
        completed: false
      });

      this.newTodo = '';
      this.idForTodo++;
    },
    sortByName(prop) {
      if (!this.sorted) {
        this.todosFiltered.sort((a,b) => a[prop] < b[prop] ? -1 : 1);
        this.sorted = true;
      } else {
        this.todosFiltered.sort((a,b) => a[prop] > b[prop] ? -1 : 1);
        this.sorted = false;
      }
    },
    backwardOrder() {
      console.log("backwardOrder");

    },
    normalOrder() {
      this.todosFiltered.sort((a,b) => a['id'] < b['id'] ? -1 : 1);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    cancelEdit(todo) {
      todo.text = this.beforeEditCache;
      todo.editing = false;
    },
    editTodo(todo) {
      this.beforeEditCache = todo.text;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.text.trim().length == 0) {
        todo.text = this.beforeEditCache;
      }

      todo.editing = false;
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => {
        todo.completed = event.target.checked;
      });
    }
  },
  computed: {
    showClearCompleteButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    },
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos;
      } else if (this.filter == 'active') {
        return this.todos.filter((todo) => !todo.completed);
      } else {
        return this.todos.filter((todo) => todo.completed);
      }

      return this.todos;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.completed {
  text-decoration: line-through;
  color: grey;
}
h1 {
  text-align: center;
}
.todosWrapper {
  margin-top: 2em;
}
.todo {
  background-color: white;
  padding: 1em;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
input[type=checkbox] {
  width: 1.5em;
  height: 1.5em;
  margin-right: 2em;
}
.arrowWrapper {

}
.material-design-icon {
  font-size: 2em;
}
.remove-item {
  cursor: pointer;
}

i {
  font-size: 2em;
}

.bottomWrapper {
  margin-top: 2em;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.verticalCentered {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkall {
  margin: 0 1em;
}

.active {
  background-color: black;
  color: #fff;
}
button:focus {
  outline: none;
}

</style>
