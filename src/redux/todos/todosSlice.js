import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { fetchTodos, changeTodo, addTodo, deleteTodo, updateTodo } from "./todosOperation";
import { createEntityAdapter } from '@reduxjs/toolkit'

// const initialState = [{ id: 1, completed: false, text: "qwe" }];
const todosAdapter = createEntityAdapter();
const todosSlice = createSlice({
  name: "todos",

  initialState: todosAdapter.getInitialState({
    loading: false,
    error: null,
  }),

  // reducers: {
  //   addTodo: {
  //     reducer(state, action) {
  //       state.push(action.payload);
  //     },

  //     prepare(text) {
  //       return {
  //         payload: {
  //           id: nanoid(),
  //           text,
  //           completed: false,
  //         },
  //       };
  //     },
  //   },
  //   removeTodo: {
  //     reducer(state, action) {
  //       return state.filter((todo) => todo.id !== action.payload);
  //     }, 

  //     prepare(id) {
  //       return {payload: id};
  //     }

  //   },
  //   changeTodo: {
  //       reducer(state, action) {
  //       return state.map((todo) => {
  //           if (todo.id === action.payload) {
  //               return {...todo, completed: !todo.completed}
  //           } else {
  //               return todo;
  //           }
  //       });
  //     },

  //     prepare(id){
  //       return {payload: id};
  //     }
  //   }
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      todosAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(changeTodo.fulfilled, (state, action) => {
        todosAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})
      // state.todos = state.todos.map((todo) => {
      //   if (todo.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return todo;
      // });
      state.loading = false;
    });
    builder.addCase(changeTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      // state.todos.push(action.payload);
      todosAdapter.addOne(state, action.payload)
      state.loading = false;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log(action.payload)
      todosAdapter.removeOne(state, action.payload.id)
      // const newArr = state.todos.filter(todo => todo.id !== action.payload.id)
      // state.todos = newArr
      state.loading = false;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      todosAdapter.updateOne(state, {id: action.payload.id, changes: action.payload})
      // state.todos = state.todos.map((todo) => {
      //   if (todo.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return todo;
      // });
      state.loading = false;
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    })
  }
});
export const {selectAll, selectById, selectIds} = todosAdapter.getSelectors(
  (state) => state.todos)
  
// export const { addTodo, removeTodo, changeTodo } = todosSlice.actions;

export const todosReducer = todosSlice.reducer;