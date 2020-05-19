import { AuthService } from './services/auth.service';
import { slideInAnimation } from './animations';
import { Component , OnInit, ElementRef, NgZone} from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent extends Carousel implements OnInit{
  title = 'quinta-clima-app';

  constructor(
    private authService: AuthService,
    private router: Router,
    public el:ElementRef,
    public zone: NgZone) {
      
      super(el,zone);
      Carousel.prototype.changePageOnTouch = (e,diff) => {}
    }

  ngOnInit(){
    this.authService.autoAuthUser();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
  ScrollTop(event){
    window.scrollTo(0,0);
    let top = window.document.getElementById("goTop")
    top.scrollTop = 0;
  }

}
