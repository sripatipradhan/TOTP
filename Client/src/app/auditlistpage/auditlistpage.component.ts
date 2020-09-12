import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuditserviceService } from '../auditservice.service';

@Component({
  selector: 'app-auditlistpage',
  templateUrl: './auditlistpage.component.html',
  styleUrls: ['./auditlistpage.component.css']
})
export class AuditlistpageComponent implements OnInit {
auditlist:any;
searchStatus = "";
searchCode = "";
viewDetail:any;
dateStart:any;
dateEnd:any;
message: any;
cl: boolean;
 p: number = 1;
  constructor(private toastr: ToastrService, private view: AuditserviceService) { }

  ngOnInit(): void {
     this.view.getauditlist().subscribe((result) => {
        this.auditlist = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = { browser:{}};
  }

  viewAuditDetail(x){
    this.viewDetail = x;
  }
clear(){
  this.searchCode = undefined;
  this.searchStatus = undefined;
  this.dateStart = undefined;
  this.dateEnd = undefined;
  this.cl = false;
  this.message = "";
}
  search(){
    if(this.searchCode != "" || this.searchStatus != "" || this.dateEnd != undefined || this.dateStart != undefined){
          let data = {searchstatus: this.searchStatus, searchCode : this.searchCode, datestart: this.dateStart, dateend: this.dateEnd}
          console.log(data);
        if(data.searchCode != "" && data.searchstatus == "" && data.datestart == undefined && data.dateend == undefined){
            this.view.searchbycode(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
            this.cl = true;
            });

        } else if(data.searchCode == "" && data.searchstatus != "" && data.datestart != undefined && data.dateend != undefined){
            this.view.searchbyds(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        } else if(data.searchCode != "" && data.searchstatus == "" && data.datestart != undefined && data.dateend != undefined){
             this.view.searchbycd(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        } else if(data.searchstatus != "" && data.searchCode == "" && data.datestart == undefined && data.dateend == undefined){
          this.view.searchbystatus(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });

        } else if(data.searchCode != "" && data.searchstatus != "" && data.datestart == undefined && data.dateend == undefined){
          this.view.searchbycs(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });

        } else if(data.searchCode == "" && data.searchstatus == "" && data.datestart != undefined && data.dateend != undefined){
            this.view.searchbydate(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        } else if(data.searchCode != "" && data.searchstatus != "" && data.datestart != undefined && data.dateend != undefined){
             this.view.searchbycsd(data).subscribe((result) => {
           this.auditlist = JSON.parse(JSON.stringify(result))
           this.message = "";
           this.cl = true;
            });
        }else if(data.datestart == undefined  || data.dateend == undefined){
           this.message = "Please choice the correct search order";
           this.cl = true;
        }
    }
    else {
          this.ngOnInit()
    }
  }
}
