import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../adminShared/user.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
 })
export class SignUpComponent { 
  email: string;
  password: string;
  confirmPassword: string;
  passwordFail: boolean = false;

  constructor(private userSVC: UserService, private router: Router){}

  signUp(){
    if(this.password !== this.confirmPassword) {
      this.passwordFail = true;
    } else {
      this.passwordFail = false;
      this.userSVC.register(this.email, this.password);
      this.userSVC.verifyUser();
    }
  }

  cancel(){
    this.router.navigate(['/admin/login']);
  }
}
