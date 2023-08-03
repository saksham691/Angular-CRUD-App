import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA} from '@angular/cdk/dialog';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-edit-add',
  templateUrl: './emp-edit-add.component.html',
  styleUrls: ['./emp-edit-add.component.scss']
})
export class EmpEditAddComponent implements OnInit {
empForm:FormGroup
  Education: string[]=[
     'Metric',
     'Diploma',
     'Graduation',
     'Graduate',
     'Post Graduate',
  ]


  constructor(private _fb:FormBuilder,
              private _empService:EmployeeService,
              private _dialogRef:MatDialogRef<EmpEditAddComponent>,
              private _coreService:CoreService,
              @Inject(MAT_DIALOG_DATA) public data:any,
              
              ){
                
                
    this.empForm= this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
      
   
    });
  } 
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onSubmitForm(){
    if(this.empForm.valid){
      if(this.data){
        this._empService. updateEmployee(this.data.id ,this.empForm.value).subscribe({
          next: (val:any)=>{
            
            this._coreService.openSnackBar('Employee updated Successfuly');
            this._dialogRef.close(true);
          },
          error: (err:any)=>{
            console.error(err);
          }
         });
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any)=>{
            
            this._coreService.openSnackBar('Employee added Successfuly');
            this._dialogRef.close(true);
          },
          error: (err:any)=>{
            console.error(err);
          }
         });
      }
     
    }
    
  }

  



  }


