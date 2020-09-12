import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';
import { projectmasterdata } from '../projectmasterdata';
import { SharedataService } from  '../sharedata.service';


@Component({
  selector: 'app-project-master-list',
  templateUrl: './project-master-list.component.html',
  styleUrls: ['./project-master-list.component.css']
})
export class ProjectMasterListComponent implements OnInit {

projectlist:any;
viewDetail:any;
searchString:any;
key:any;
projectcode:any;
  constructor(private toastr: ToastrService,private view: OtpserviceService, private share: SharedataService) { }

  ngOnInit(): void {
    var email = this.share.getusername();
    this.view.getProjectMasterList(email).subscribe(result => {
      this.projectlist = JSON.parse(JSON.stringify(result))
    });
    this.viewDetail = {};
  }
search(){}
viewprojectdeatils(x){
  this.viewDetail = x;
  this.data.protocol = this.viewDetail.protocol;
  this.data.url = this.viewDetail.url;
  this.data.IP = this.viewDetail.IP;
  this.data.FailoverIP = this.viewDetail.FailoverIP;
  this.data.projectname = this.viewDetail.projectname;
  this.data.description = this.viewDetail.description;
  this.data.pcname = this.viewDetail.pcname;
  this.data.pcemail = this.viewDetail.pcemail;
  this.data.pcmobile1 = this.viewDetail.pcmobile1;
  this.data.pcmobile2 = this.viewDetail.pcmobile2;
}
editdata(){
  this.view.updateprojectmaster(this.viewDetail.projectcode, this.data).subscribe(result =>{
    this.toastr.success(result.message)
  }, error => this.toastr.error(error.error.message, error.status)
  )
  this.ngOnInit();
}

changeApi(x){
this.projectcode = x.projectcode;
this.view.changeApiKey(this.projectcode).subscribe(result =>{
  this.key = JSON.parse(JSON.stringify(result.key))
  this.ngOnInit()
  this.toastr.success(result.message)
}, error => this.toastr.error(error.error.message, error.status)
)}

delete(){
  this.view.deleteproject(this.viewDetail.projectcode).subscribe(result =>{
     this.toastr.success(result.message)
        },
       error => this.toastr.error(error.error.messaage, error.status)
  )
  this.ngOnInit();
}

data = new projectmasterdata(0,"","","","","","","","","");

}
