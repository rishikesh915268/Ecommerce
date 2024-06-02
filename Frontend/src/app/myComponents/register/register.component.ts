import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  user = {
    name:'',
    email:'',
    username:'',
    password:'',
  }

  constructor(private registerService: RegisterService, private router:Router){
  }

  onSubmit(){
    this.registerService.register(this.user).subscribe(
      response=>{
        console.log("User registered Successfully.", response)
        this.router.navigate(['/login']);
      },
      error=>{
        console.log("Error in registering", error);
        alert(error.message);
      }
    )
  }
}
