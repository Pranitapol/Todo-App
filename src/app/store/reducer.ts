import {createReducer, on} from '@ngrx/store';
import {addTodoList,deleteTodo,editTodo,getTodoList,deleteMany} from './action';
import { TODOList } from './todo.model';


export const initialState:TODOList[]=[
   // {id:0,title:'',description:'',completed:false}
]
let idCounter=1;
export const todoReducer=createReducer(
    initialState,
    on(addTodoList,(state,{task}) =>{return [...state,{id:idCounter++,title:task.title,description:task.description,completed:task.completed}]}),

    on(deleteTodo,(state,{id})=>{
        return state.filter((item)=>item.id!==id)}
    ),

    on(editTodo,(state,{id,updatedTask})=>{
        return state.map((item)=>item.id===id?{...item,...updatedTask}:item)
     }),

     on(deleteMany, (state, { deletedItems }) => {
        const selectedIds = deletedItems?.map(item => Number(item.id));
        const filtered = state.filter(item => !selectedIds?.includes(item.id));
        return filtered.map((item, index) => ({ ...item, id: index }));
      })
)

