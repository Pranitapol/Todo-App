import { Component, OnInit } from '@angular/core';
import { ToasterServiceService } from '../toaster-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toaster-comp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toaster-comp.component.html',
  styleUrl: './toaster-comp.component.scss'
})
export class ToasterCompComponent implements OnInit {
  successToaster!: string | null;
  constructor(private toaster:ToasterServiceService){}

  ngOnInit(): void {

      this.toaster.toasterSuccess.subscribe((res)=>{
        if (res) {
          this.successToaster = res;
          setTimeout(() => {
            this.successToaster = null;
          }, 2000);
        }
      })
  }

}
