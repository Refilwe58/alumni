import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
private loginUrl = 'http://localhost:3100/api/v1/login';
private regUrl = 'http://localhost:3100/api/v1/register';
private login1Url = 'http://3.88.53.196:3100/api/v1/login';

  getToken():string{
   return window.localStorage['jwtToken'];
  }

saveToken(token: string){
  window.localStorage['jwtToken']=token;
}


  constructor(private http:HttpClient) {
    const jwtToken=this.getToken();
  }
loginUser(user: any):Observable <any>{
  return this.http.post<any>(`${this.loginUrl}`,user)
  .pipe(catchError(this.handleError));
}
regUser(urs:any):Observable<any>{
  return this.http.post<any>(`${this.regUrl}`,urs)
  .pipe(catchError(this.handleError));
}

//,{responseType: 'text'}

handleError(error:any){
    return throwError(error.message || "server error")
  }


}

