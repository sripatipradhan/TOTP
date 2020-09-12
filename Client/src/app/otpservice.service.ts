import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpserviceService {

  constructor(private http:HttpClient) { }

addSmsBasedOtp(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/addSmsBasedOtp', data);
}

addProjectMaster(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/addProjectMaster', data);
}

adminlogin(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/adminlogin', data);
}

 totpsecret(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/totp-secret', data);
}

totpvalidate(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/totp-validate', data);
}

gettotpdetails(username): Observable<any> {
  return this.http.get('http://localhost:3000/totp/gettotpdetails/'+ username);
}

getProjectMasterList(username): Observable<any> {
  return this.http.get('http://localhost:3000/totp/getProjectMasterList/'+username);
}
getfilitertotpdetails(mobile): Observable<any> {
  return this.http.get('http://localhost:3000/totp/getfilitertotpdetails/'+ mobile);
}
showQrcode(mobile): Observable<any> {
  return this.http.get('http://localhost:3000/totp/showQrcode/'+ mobile);
}
updateblockstatus(mobile, updateBody): Observable<any> {
  return this.http.put('http://localhost:3000/totp/updateblockstatus/' + mobile, updateBody);
}

updateprojectmaster(projectcode, updateBody): Observable<any> {
  return this.http.put('http://localhost:3000/totp/updateprojectmaster/' + projectcode, updateBody);
}

changepswd(username, updateBody): Observable<any> {
  return this.http.put('http://localhost:3000/totp/changepswd/' + username, updateBody);
}

changeApiKey(projectcode): Observable<any> {
  return this.http.get('http://localhost:3000/totp/changeApiKey/' + projectcode);
}

deleteuser(mobile): Observable<any> {
  return this.http.delete('http://localhost:3000/totp/deleteuser/' + mobile);
}

deleteproject(projectcode): Observable<any> {
  return this.http.delete('http://localhost:3000/totp/deleteproject/' + projectcode);
}
}
