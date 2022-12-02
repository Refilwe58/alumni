import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import{HttpHeaders} from '@angular/common/http';
import { PostService } from '../service/post.service';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import {Observable, pipe, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdatePasswordService } from '../services/update-password.service';
import { UpdateProfileService } from '../services/update-profile.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})

export class ViewProfileComponent implements OnInit{

  formGroup!: FormGroup;
  updatePro!:FormGroup;
  responsedata:any;

	constructor(private service:PostService,private password:UpdatePasswordService, private updateProfile:UpdateProfileService){}
	viewProf:any={email:"",
                faculty:"",
			id:"",
			name:"",
		surname:"",
  picture:""}

    initForm(){;
      this.formGroup=new FormGroup({
        entered_password: new FormControl('',[Validators.required]),
        new_password: new FormControl('',[Validators.required]),
        re_password: new FormControl('',[Validators.required]),
        })

        this.updatePro=new FormGroup ({
          alumni_name: new FormControl('',[Validators.required]),
          alumni_surname: new FormControl('',[Validators.required]),
          alumni_email: new FormControl('',[Validators.required]),
         image: new FormControl('',[Validators.required])
        })
    }
	ngOnInit(){
    this.initForm();
		this.service.getAllData().subscribe(result=>{
			console.log(result);
			this.viewProf=result;
			console.log(this.viewProf,"==")

		},
		(error)=>{
		  console.log(error)
		})
	}
  updatePass(){
    if(this.formGroup.valid){
      this.password.updatePass(this.formGroup.value).subscribe(result=>{
        console.log(result);
        this.password.saveToken(result.token);
      },
      (error)=>{
        console.log(error)
      }
      )

    }
  }

  updateProf(){
    if(this.updatePro.valid){
      this.updateProfile.updateProf(this.updatePro.value).subscribe(result=>{
        console.log(result);
        this.updateProfile.saveToken(result.token);
      },
      (error)=>{
        console.log(error)
      }
      )

    }

  }

  url:any;
 //Angular 11, for stricter type
	msg = "";

	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;


		if(event.target.files && event.target.files[0]){
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;

		}
	}


}
}
