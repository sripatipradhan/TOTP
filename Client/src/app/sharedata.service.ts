import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  constructor() { }
setusername(data){
   localStorage.setItem('username', data);
}
getusername(){
  return localStorage.getItem('username');
}
logout(){
  return localStorage.removeItem('username');
}
}
