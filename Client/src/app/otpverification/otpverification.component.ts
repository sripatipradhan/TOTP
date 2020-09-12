import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';


@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit {

  constructor(private toastr: ToastrService, private add:OtpserviceService, private router: Router) { }
mobile:any;
key:any;
otp:any;
result:any;
qrcode: any;
  ngOnInit(): void {
    this.mobile = 1234123413;
    this.key = "12345678901234567890";
    let data ={ mobile:this.mobile, key: this.key}
    this.add.addSmsBasedOtp(data).subscribe( result => {
          this.toastr.success(result.message)
        },
       error => this.toastr.error(error.error.messaage, error.status)
      );
  }

  onadd(){
    let data ={mobile: this.mobile, otp:this.otp}
    this.add.totpsecret(data).subscribe( result => {
          this.qrcode = result.qrcode;
        }, error => {
          this.toastr.error(error.error.messaage, error.status)
        } );
  }
  redirect(){
    this.router.navigate(['/Secretecodevalid', {mobile:this.mobile}])
  }
}
