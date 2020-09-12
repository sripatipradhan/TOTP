import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from '../companyservice.service';

@Component({
  selector: 'app-companyerrorlist',
  templateUrl: './companyerrorlist.component.html',
  styleUrls: ['./companyerrorlist.component.css']
})
export class CompanyerrorlistComponent implements OnInit {
errorlist:any;
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
     this.view.cgeterrorlist(this.projectcode).subscribe((result) => {
        this.errorlist = JSON.parse(JSON.stringify(result))
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
            this.view.csearchbydsE(data).subscribe((result) => {
           this.errorlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        } else if(data.searchstatus != ""  && data.datestart == undefined && data.dateend == undefined){
          this.view.csearchbystatusE(data).subscribe((result) => {
           this.errorlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });

        } else if( data.searchstatus == "" && data.datestart != undefined && data.dateend != undefined){
            this.view.csearchbydateE(data).subscribe((result) => {
           this.errorlist = JSON.parse(JSON.stringify(result))
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