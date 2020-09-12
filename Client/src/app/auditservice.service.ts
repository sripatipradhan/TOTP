import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuditserviceService {

  constructor(private http:HttpClient) { }

  getauditlist(): Observable<any> {
  return this.http.get('http://localhost:3000/totp/getauditlist/');
}
getpclist(): Observable<any> {
  return this.http.get('http://localhost:3000/totp/getpclist/');
}

addcompany(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/addcompany' , data);
}

searchbycode(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbycode' , data);
}

searchbystatus(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbystatus', data);
}

searchbydate(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbydate', data);
}

searchbycs(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbycs',  data);
}

searchbycsd(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbycsd',  data);
}

searchbycd(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbycd',  data);
}

searchbyds(data): Observable<any> {
  return this.http.post('http://localhost:3000/totp/searchbyds',  data);
}

}
