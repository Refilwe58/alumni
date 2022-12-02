import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
//export class RegisterComponent implements OnInit {

  //constructor() { }

  //ngOnInit(): void {
  //}

//}
export class RegistrationComponent {
   title=" Register Account";

   constructor(private http:HttpClient,private route:Router){
     
   }

  onUsers(users:{alumni_name:string,alumni_surname:string,alumni_email:string,alumni_password:string,alumni_faculty:string}){
     
    console.log(users);
    this.http.post('http://localhost:3100/api/v1/register',users)
    .subscribe((res)=>{
      console.log(res);
      this.route.navigate(['login']);
      
    },
    (error)=>{
      console.log(error)
    }
    
    );

  }

  }