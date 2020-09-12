import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from '../companyservice.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
employeelistdata:any;
searchString:any;
  constructor(private toastr: ToastrService,private view: CompanyserviceService) { }

  ngOnInit(): void {
    this.view.getemployeedetails().subscribe((result) => {
        this.employeelistdata = JSON.parse(JSON.stringify(result))
    });
  }

active(x){
  let mobile = x.mobile;
  let status = !x.block;
  let updateBody ={block:status};
  this.view.updateblock(mobile,updateBody).subscribe(result =>{
     this.toastr.success(result.message)
        },
       error => this.toastr.error(error.error.messaage, error.status)
  );
  this.searchString = "";
  this.ngOnInit();  
}

search(){
  if(this.searchString != ""){
  this.view.getfiliteremployeelist(this.searchString).subscribe((result) => {
        this.employeelistdata = JSON.parse(JSON.stringify(result))
    });
  }else{
    this.ngOnInit();
  }
}

}
