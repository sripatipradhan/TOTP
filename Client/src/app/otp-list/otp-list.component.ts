import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';
import { SharedataService } from  '../sharedata.service';

@Component({
  selector: 'app-otp-list',
  templateUrl: './otp-list.component.html',
  styleUrls: ['./otp-list.component.css']
})
export class OtpListComponent implements OnInit {
otplistdata:any;
viewDelete:any;
searchString:any;
qrcode:any;
  constructor(private toastr: ToastrService,private view: OtpserviceService, private share: SharedataService) { }

  ngOnInit(): void {
    var email = this.share.getusername();
    this.view.gettotpdetails(email).subscribe((result) => {
        this.otplistdata = JSON.parse(JSON.stringify(result))
    });
  }
active(x){
  let mobile = x.mobile;
  let status = !x.block;
  let updateBody ={block:status};
  this.view.updateblockstatus(mobile,updateBody).subscribe(result =>{
     this.toastr.success(result.message)
        },
       error => this.toastr.error(error.error.messaage, error.status)
  );
  this.ngOnInit();
    
}

viewDeleteDetail(x){
  this.viewDelete = x;
}

delete(mobile){
   this.view.deleteuser(mobile).subscribe(result =>{
     this.toastr.success(result.message)
        },
       error => this.toastr.error(error.error.messaage, error.status)
  );
  this.ngOnInit();
}
viewQrcode(x){
  let mobile = x.mobile;
  console.log(mobile);
  this.view.showQrcode(mobile).subscribe( result => {
        console.log("inside qrcode" + result.qrcode);
          this.qrcode = result.qrcode;
        }, error => {
          this.toastr.error(error.error.messaage, error.status)
        } );

}
search(){
  if(this.searchString != ""){
  this.view.getfilitertotpdetails(this.searchString).subscribe((result) => {
        this.otplistdata = JSON.parse(JSON.stringify(result))
    });
  }else{
    this.ngOnInit();
  }
}
}
