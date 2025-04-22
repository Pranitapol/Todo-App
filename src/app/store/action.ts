import {createAction, props} from '@ngrx/store';
import { todos,TODO } from './state';

export const getTodoList=createAction('get');
export const addTodoList=createAction('[Popup] save',props<{task:TODO}>())
export const deleteTodo=createAction('[Popup] delete',props<{id:number}>())
export const editTodo=createAction('[Popup] edit',props<{id:number,updatedTask:TODO}>())
// export const updateTodoList= createAction('update');
// export const deleteTodoList=createAction('delete');