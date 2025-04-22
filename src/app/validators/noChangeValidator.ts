import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export class FormCustomValidators {
//     static noChangesValidator(initialValue: any): ValidatorFn {
//       return (group: AbstractControl): ValidationErrors | null => {
//         const currentValue = group.value;
//         const hasChanged = JSON.stringify(currentValue) !== JSON.stringify(initialValue);
  
//         return hasChanged ? null : { noChanges: true };
//       };
//     }
//   }

  export function noChangeValidator(initialValue:any):ValidatorFn{
    return (controls:AbstractControl):ValidationErrors|null=>{
      
      return JSON.stringify(initialValue)!==JSON.stringify(controls.value) ?null:{noControlValueChange:true}
    }
  }