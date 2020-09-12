import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';


@Component({
  selector: 'app-project-registration-page',
  templateUrl: './project-registration-page.component.html',
  styleUrls: ['./project-registration-page.component.css']
})
export class ProjectRegistrationPageComponent implements OnInit {

protocol:any;
url:any;
IP:any;
FailoverIP:any;
projectname:any;
description:any;
apikey:any;
pcname:any;
pcemail:any;
pcmobile1:any;
pcmobile2:any;
inspection:any;
  constructor(private toastr: ToastrService,private view: OtpserviceService) { }

  ngOnInit(): void {
  }
onadd(){
  let data = {protocol: this.protocol,
              url:this.url,
              IP:this.IP,
              FailoverIP: this.FailoverIP,
              projectname:this.projectname,
              description:this.description,
              createdBy: localStorage.getItem('username'),
              pcname:this.pcname,
              pcemail:this.pcemail,
              pcmobile1:this.pcmobile1,
              pcmobile2:this.pcmobile2,
              inspection: this.inspection
               }
    this.view.addProjectMaster(data).subscribe(result =>{
      this.toastr.success(result.message)
      this.apikey= result.apikey
    },error => this.toastr.error(error.error.messaage, error.status)
    )
     this.projectname="";
     this.protocol = "";
     this.url="";
     this.description="";
     this.IP= "";
     this.FailoverIP="";
     this.pcname="";
     this.pcemail ="";
     this.pcmobile1 ="";
     this.pcmobile2="";
     this.inspection = false;
}
}
