import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {

  constructor(private http:HttpClient) { }

  setusername(email,projectcode){
   localStorage.setItem('projectcode', projectcode);
   localStorage.setItem('username', email);
}
getusername(){
  return localStorage.getItem('username');
}
getprojectcode(){
  return localStorage.getItem('projectcode');
}
logout(){
  localStorage.removeItem('projectcode');
  return localStorage.removeItem('username');
}

  cadminlogin(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/cadminlogin', data);
}

  getemployeedetails(): Observable<any> {
  return this.http.get('http://localhost:3000/totp/getemployeedetails/');
}

  updateblock(mobile, updateBody): Observable<any> {
  return this.http.put('http://localhost:3000/totp/updateblock/' + mobile, updateBody);
}
  getfiliteremployeelist(mobile): Observable<any> {
  return this.http.get('http://localhost:3000/totp/getfiliteremployeelist/'+ mobile);
}
cgetauditlist(projectcode): Observable<any> {
  return this.http.get('http://localhost:3000/totp/cgetauditlist/' + projectcode);
}

cgeterrorlist(projectcode): Observable<any> {
  return this.http.get('http://localhost:3000/totp/cgeterrorlist/' + projectcode);
}

csearchbystatus(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/csearchbystatus', data);
}

csearchbydate(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/csearchbydate', data);
}

csearchbyds(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/csearchbyds',  data);
}

csearchbystatusE(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/csearchbystatusE', data);
}

csearchbydateE(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/csearchbydateE', data);
}

csearchbydsE(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/csearchbydsE',  data);
}
}
