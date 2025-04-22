import {createReducer, on} from '@ngrx/store';
import {TODO, todos} from './state'
import {addTodoList,deleteTodo,editTodo,getTodoList} from './action';
import { TODOList } from './todo.model';

export interface TODOS{
    id:number,
    todosList:TODO[]
}
export const initialState:TODOList[]=[
    {id:0,title:'',description:''}
]
let idCounter=1;
export const todoReducer=createReducer(
    initialState,
    on(addTodoList,(state,{task}) =>{return [...state,{id:idCounter++,title:task.title,description:task.description}]}),

    on(deleteTodo,(state,{id})=>{return state.filter((item)=>item.id!==id)}),

    on(editTodo,(state,{id,updatedTask})=>{
        return state.map((item)=>item.id===id?{...item,...updatedTask}:item)
     })

)

