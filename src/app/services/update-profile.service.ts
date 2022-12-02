import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  apiUrl='http://localhost:3100/api/v1/updateProfile';
  getToken():string{
    return window.localStorage['jwtToken'];
   }

 saveToken(token: string){
   window.localStorage['jwtToken']=token;
 }
  constructor(private http:HttpClient) { }

  handleError(error:any){
    return throwError(error.message || "server error")
  }

  updateProf(data:any):Observable<any>{



    let head_obj=new HttpHeaders().set("Authorization",`${this.getToken()}`)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json')
    return this.http.put(`${this.apiUrl}`,data,{headers:head_obj,responseType: 'text'}).pipe(catchError(this.handleError));


  }

}
