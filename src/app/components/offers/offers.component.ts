import { Offer } from './../../models/offer';
import { Subscription } from 'rxjs';
import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import { Lightbox } from '@tomscript/ngx-lightbox';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  responsiveOptions;

  private _offerSub: Subscription;

  public offerList: any[];

  public loadPage: boolean;

  constructor(
    private _offerService: OfferService,
    private _lightbox: Lightbox
  ) {
    this.offerList = [];
    this.loadPage = false;

    this.responsiveOptions = [
      {
          breakpoint: '1025px',
          numVisible: 4,
          numScroll: 4
      },
      {
          breakpoint: '1024px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit() {
    this.loadOffer();

    if(this.offerList)
    {
      setTimeout(() => {
        this.loadPage = true;
      }, 3000);
    }

  }

  loadOffer(){

    this._offerService.getOffers();
    this._offerSub = this._offerService.getOfferUpdateListener()
      .subscribe((offer: Offer[]) => {
        let i = 0
        _.forEach(offer, item => {
          this.offerList.push({
            src: item.imagePath,
            thumb: item.imagePath,
            title: item.title,
            caption:item.title + " | $" + item.price,
            price: item.price,
            index: i++,
            docPath: item.documentPath
          });
        });

      })
      
  }

  open(index: number){
    this._lightbox.open(this.offerList, index)
  }

  close(){
    this._lightbox.close();
  }

  ngOnDestroy(){

    if(this._offerSub){
      this._offerSub.unsubscribe;
    }
  }


}
