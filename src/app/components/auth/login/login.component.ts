import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.email = '';
    this.password = '';
   }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password);
    
  }

}
