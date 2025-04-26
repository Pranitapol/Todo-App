import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodolistComponent } from '../todolist.component';
import { TODO } from '../../store/state';
import { NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-showtask',
  standalone: true,
  imports: [NgFor,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './showtask.component.html',
  styleUrl: './showtask.component.scss'
})
export class ShowtaskComponent implements OnInit {
  @Input()
  showData!: TODO;
@Output() cancel= new EventEmitter();
constructor(){}

ngOnInit(): void {
}

onClose(){
    this.cancel.emit()
  }

}
