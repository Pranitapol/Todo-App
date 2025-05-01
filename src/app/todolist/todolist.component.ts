import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Store } from '@ngrx/store';
import {  TODO } from '../store/state';
import { TODOList } from '../store/todo.model';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { deleteMany, deleteTodo } from '../store/action';
import { ShowtaskComponent } from './showtask/showtask.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ToasterServiceService } from '../toaster-service.service';
import { ToasterCompComponent } from '../toaster-comp/toaster-comp.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,CommonModule,MatListModule,NgIf,ShowtaskComponent,MatInputModule,
    MatCheckboxModule,FormsModule,ToasterCompComponent
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
  deleteItems:any=[]
  selectedIds: Set<number> = new Set();
  deleteFlag=false
  constructor(private dialog: MatDialog,private store:Store<{addTodo:TODOList[]}>,private toaster:ToasterServiceService) {
    this.todolist=this.store.select('addTodo')
  }

  ngOnInit(){
  this.todolist?.subscribe((res)=>{
      this.taskArr=res;
      this.isSearching=false
     
    })
    this.checked=false
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
    this.deleteFlag=true;

    setTimeout(() => {
      this.deleteFlag=false
    }, 1000);

    this.toaster.showToasterSuccess('deleted successfully...')
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
      if(item.title.toLowerCase().includes(input.value.toLowerCase())){
        this.isSearching=true
        return item
      }
    })
  }


  onCheck(event:any,task:any){
    const isChecked = event.checked;
    this.checked=true
    if (isChecked) {
      this.selectedIds.add(task.id);
    } else {
      this.selectedIds.delete(task.id);
    }
  
  }
  
  deleteSelected(){
    if(this.checked)
    this.deleteFlag=true;

    setTimeout(() => {
      this.deleteFlag=false
    }, 1000);

    this.checked=false
    this.toaster.showToasterSuccess('Deleted Successfully...')
    
    const itemsToDelete = this.taskArr.filter(item => this.selectedIds.has(item.id));
  
    this.store.dispatch(deleteMany({ deletedItems: itemsToDelete }));
  
    this.selectedIds.clear(); // clear selected ID
  }
}
