import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { EmpEditAddComponent} from './emp-edit-add/emp-edit-add.component'
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _Dialog: MatDialog, private _empService: EmployeeService, private _coreService:CoreService ){
  }
  ngOnInit():void{
  this.getEmployeeList();
  }
  AddAndEditEmp(){
    const _dialogRef=this._Dialog.open(EmpEditAddComponent)
    _dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    });
    
  }
  getEmployeeList(){
    this._empService.getEmployees().subscribe({
    next: (res)=>{
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    },
    error: console.log,
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    return this._empService.deleteEmployee(id).subscribe({
      next: (res)=>{
        
        this._coreService.openSnackBar('employee deleted');
        this.getEmployeeList();
      },
      error:console.log,
        
      });
      
    }

    openEditForm(data:any){
      const dialogRef=this._Dialog.open(EmpEditAddComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.getEmployeeList();
          }
        }
      }); 
    }
    

    

    }