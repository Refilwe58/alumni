import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
//import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;

  }
  constructor(private service:PostService){}

  viewProf:any={email:"",
  faculty:"",
  id:"",
  name:"",
  surname:"",
  picture:""}

  ngOnInit(){

		this.service.getAllData().subscribe(result=>{
			console.log(result);
			this.viewProf=result;
			console.log(this.viewProf,"==")

		},
		(error)=>{
		  console.log(error)
		})
	}

}

