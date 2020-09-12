import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from '../companyservice.service';

@Component({
  selector: 'app-companyauditlist',
  templateUrl: './companyauditlist.component.html',
  styleUrls: ['./companyauditlist.component.css']
})
export class CompanyauditlistComponent implements OnInit {
auditlist:any;
searchStatus = "";
projectcode:any;
viewDetail:any;
dateStart:any;
dateEnd:any;
message: any;
cl: boolean;
 p: number = 1;
  constructor(private toastr: ToastrService, private view: CompanyserviceService) { }

   ngOnInit(): void {
    this.projectcode = this.view.getprojectcode();
    console.log(this.projectcode);
     this.view.cgetauditlist(this.projectcode).subscribe((result) => {
        this.auditlist = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = { browser:{}};
  }

  viewAuditDetail(x){
    this.viewDetail = x;
  }
clear(){
  this.searchStatus = undefined;
  this.dateStart = undefined;
  this.dateEnd = undefined;
  this.cl = false;
  this.message = "";

  this.ngOnInit();
}
  search(){
    if( this.searchStatus != "" || this.dateEnd != undefined || this.dateStart != undefined){
          let data = {searchstatus: this.searchStatus, searchCode : this.projectcode, datestart: this.dateStart, dateend: this.dateEnd}
          console.log(data);
         if( data.searchstatus != "" && data.datestart != undefined && data.dateend != undefined){
            this.view.csearchbyds(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        } else if(data.searchstatus != ""  && data.datestart == undefined && data.dateend == undefined){
          this.view.csearchbystatus(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });

        } else if( data.searchstatus == "" && data.datestart != undefined && data.dateend != undefined){
            this.view.csearchbydate(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        } else if(data.datestart == undefined  || data.dateend == undefined){
           this.message = "Please choice the correct search order";
           this.cl = true;
        }
    }
    else {
          this.ngOnInit()
    }
  }
}