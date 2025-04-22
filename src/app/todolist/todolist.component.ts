import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Store } from '@ngrx/store';
import { AppState, TODO } from '../store/state';
import {selectAllTasks} from '../store/selector'
import {todoReducer} from '../store/reducer'
import { TODOList } from '../store/todo.model';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { deleteTodo } from '../store/action';
import { ShowtaskComponent } from './showtask/showtask.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,CommonModule,MatListModule,NgIf,ShowtaskComponent,MatInputModule,
    MatCheckboxModule,FormsModule
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent implements OnInit {
  todolist?:Observable<TODOList[]>;
  taskArr:TODOList[]=[]
  flag=false;
  isEdit=false;
  onrightClickData:TODO={
    title: '',
    description: ''
  }
  filteredArr:TODOList[]=[];
  isSearching:boolean=false;
  checked:boolean=false;

  constructor(private dialog: MatDialog,private store:Store<{addTodo:TODOList[]}>) {
    this.todolist=this.store.select('addTodo')
    console.log('tdodos',this.todolist);
  }

  ngOnInit(){
  this.todolist?.subscribe((res)=>{
      console.log('res',res);
      this.taskArr=res;
      this.isSearching=false
    })
  }

  addTask(){
    this.dialog.open(PopupComponent,{
      width:'400px',
      data:'added'
    })
  }

  onEdit(task:any){
    this.isEdit=true
    this.dialog.open(PopupComponent,{width:'400px',data:{
      id:task.id,
      title:task.title,
      description:task.description,
      editFlag:this.isEdit
    }})
  }

  onDelete(id:number){
    this.store.dispatch(deleteTodo({id}))
  }

onRightClick(task:TODO){
    this.flag=true;
    this.onrightClickData={
      id:task.id,
      title:task.title,
      description:task.description
    }
  }

  onChange(event:Event){
    const input = event.target as HTMLInputElement;
      this.filteredArr=this.taskArr.filter((item:any)=>{
      if(item.title.includes(input.value)){
        this.isSearching=true
        return item
      }
    })
  }


  onCheck(task:any){

    console.log(task,this.checked)
  }
}
