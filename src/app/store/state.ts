import { Action, ActionReducer } from "@ngrx/store";
import { todoReducer } from "./reducer";

export interface TODO{
    id?:number,
    title:string,   
    description:string,
    completed?:boolean
}

export interface todos{
    id:number,
    todo:TODO[]
}

export interface AppState {
    todo: todos
  }
  
  export interface AppStore {
    todo: ActionReducer<todos, Action>;
  }
  
  // export const appStore: AppStore = {
  //   todo: todoReducer
  // }