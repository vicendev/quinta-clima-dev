import { AuthService } from './../../../services/auth.service';
import { Auth } from './../../../models/auth';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public auth: Auth;

  public email: any;
  public password: any;

  constructor(private authService: AuthService) {
    this.auth = null;
   }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  signup(){
    this.authService.createUser(this.email, this.password);
  }

}
