import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterServiceService {
  toasterSuccess = new BehaviorSubject<string>('')
  constructor() { }
  showToasterSuccess(message: string) {
    this.toasterSuccess.next(message)
  }
}
