import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { Store } from '@ngrx/store';
import {addTodoList, editTodo} from '../store/action';
import { TODOList } from '../store/todo.model';
import { CommonModule, NgIf } from '@angular/common';
import { ToasterServiceService } from '../toaster-service.service';
import { ToasterCompComponent } from '../toaster-comp/toaster-comp.component';
import { noChangeValidator} from '../validators/noChangeValidator';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule,ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,NgIf,
    CommonModule,ToasterCompComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit{
  taskGroup:FormGroup;
  successMessage:boolean=false;
//  count=0
 initialFormValue:any;

constructor(public dialogRef:MatDialogRef<PopupComponent>,
 @Optional() @Inject(MAT_DIALOG_DATA) public data:any,private store:Store<{addTodo:TODOList[]}>,
 private toaster:ToasterServiceService
  
){
  this.taskGroup=new FormGroup({
    task_title:new FormControl(this.data?.title || '',[Validators.required]),
    task_desc:new FormControl(this.data.description || '',[Validators.required])
  })
}
ngOnInit(): void {
  this.initialFormValue=JSON.parse(JSON.stringify(this.taskGroup.value))
  this.taskGroup.setValidators([noChangeValidator(this.initialFormValue)])
}

closeDialog() {
  this.dialogRef.close();
}

SaveTask(){
  this.successMessage=true;
  const task={
    // id:this.count,
    title:this.taskGroup.value['task_title'],
    description:this.taskGroup.value['task_desc'], 
    completed:false
  }
  this.store.dispatch(addTodoList({task}))
  this.toaster.showToasterSuccess('Task saved successfully....');
  setTimeout(() => { 
    this.dialogRef.close()
  }, 600);

  this.dialogRef.afterClosed().subscribe(() => {
    setTimeout(() => {
      this.successMessage=false
    }, 1000); // small delay (optional)
  });
}

  updateTask(){
    this.successMessage=true;
    const task={
      id:this.data.id,
      title:this.taskGroup.value['task_title'],
      description:this.taskGroup.value['task_desc'],
    }
    this.store.dispatch(editTodo({id:task.id,updatedTask:task}))

    this.toaster.showToasterSuccess('Task updated successfully...!')
    setTimeout(() => { 
      this.dialogRef.close()
    }, 1000);

    this.dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.successMessage=false
      }, 100); // small delay (optional)
    });
  }

  getFormControls(controls:string){
    return this.taskGroup.get(controls)
  }
}
