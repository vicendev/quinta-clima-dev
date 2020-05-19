import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  public innerWidth: any;
  public mobileResolution: number;

  constructor(private authService: AuthService) {
    this.innerWidth = 0;
    this.mobileResolution = 1024;
   }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.innerWidth = window.innerWidth;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    if(this.authListenerSubs){
      this.authListenerSubs.unsubscribe();
    }
  }

}
