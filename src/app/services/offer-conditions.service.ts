import { OfferConditions } from './../models/offerconditions';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + "/offerconditions"

@Injectable({
  providedIn: 'root'
})
export class OfferConditionsService {

  constructor(
    private http: HttpClient
  ) { }

  addOfferConditions(offercond: OfferConditions, image: File | null){
    const offercondData = new FormData();
    offercondData.append("offerId", offercond.offerId);
    if (image){
      offercondData.append("image", image, image.name);
    } else {
      offercondData.append("description", offercond.description);
    }
    this.http
      .post< { message: string, offerPost: OfferConditions}>(
        BACKEND_URL,
        offercondData
      )
      .subscribe(responseData => {
        console.log(responseData.message);
      })
  }

}
