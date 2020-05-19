import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Offer } from './../models/offer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + "/offer"

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private _offer: Offer[];
  private offerUpdated = new Subject<Offer[]>();

  private _offerByField: Offer[];
  private offerByFieldUpdated = new Subject<Offer[]>();



  constructor(
    private http: HttpClient
  ) {
    this._offer = [];
   }

  getOffers(){
    this.http
      .get<{ message: string, offer: any}>( BACKEND_URL )
      .pipe(
        map(offerData => {
          return offerData.offer.map(wd => {
            return {
              id: wd._id,
              title: wd.title,
              price: wd.price,
              imagePath: wd.imagePath,
              documentPath: wd.documentPath,
              created: wd.created,
            };
          });
        })
      )
      .subscribe(transformedOffer => {
        this._offer = transformedOffer;
        this.offerUpdated.next([...this._offer]);
      });
  }
  
  getOfferUpdateListener() {
    return this.offerUpdated.asObservable();
  }

  
  getOfferById(id: string) {
    this.http
      .get<{ message: string, offer: any}>( BACKEND_URL + "/" + id)
      .pipe(
        map(offerData => {
          return offerData.offer.map(wd => {
            return {
              id: wd._id,
              title: wd.title,
              price: wd.price,
              imagePath: wd.imagePath,
              documentPath: wd.documentPath,
              created: wd.created
            };
          });
        })
      )
      .subscribe(transformedOffer => {
        this._offerByField = transformedOffer;
        this.offerByFieldUpdated.next([...this._offerByField]);
      });

  }

  getOfferByIdUpdateListener() {
    return this.offerByFieldUpdated.asObservable();
  }

  addOffer(offer: Offer, image: File, document: File){
    const offerData = new FormData();
    offerData.append("title", offer.title);
    offerData.append("price", offer.price.toString());
    offerData.append("image", image, image.name);
    offerData.append("document", document, document.name);
    offerData.append("created", offer.created);
    this.http
      .post< { message: string, offerPost: Offer}>(
        BACKEND_URL,
        offerData
      )
      .subscribe(responseData => {
        console.log(responseData.message);
      })
  }

  updateOffer(offer: Offer, image: File | string, document: File | string){
    let offerData: Offer | FormData;
    if(typeof image === "object" && typeof document === "object") {
      offerData = new FormData();
      offerData.append("id", offer.id);
      offerData.append("title", offer.title);
      offerData.append("price", offer.price.toString());
      offerData.append("image", image, image.name);
      offerData.append("document", document, document.name);
      offerData.append("created", offer.created);
    } 
    else if(typeof image === "object")
    {
      offerData = new FormData();
      console.log("aqui2")
      offerData.append("id", offer.id);
      offerData.append("title", offer.title);
      offerData.append("price", offer.price.toString());
      offerData.append("image", image, image.name);
      offerData.append("document", String(document));
      offerData.append("created", offer.created);
    }
    else if(typeof document === "object")
    {
      offerData = new FormData();
      offerData.append("id", offer.id);
      offerData.append("title", offer.title);
      offerData.append("price", offer.price.toString());
      offerData.append("image", String(image));
      offerData.append("document", document, document.name);
      offerData.append("created", offer.created);
    }
    else {
      offerData = {
        id: offer.id,
        title: offer.title,
        price: offer.price,
        imagePath: String(image),
        documentPath: String(document),
        created: offer.created 
      }
    }
    this.http
      .put( BACKEND_URL + "/" + offer.id, offerData)
      .subscribe(response => {
        console.log(response);
      })
  }

  deleteOffer(id: string) {
    this.http.delete( BACKEND_URL + "/" + id)
      .subscribe(() => {
        const updatedWorkDone = this._offer.filter(tag => tag.id !== id);
        this._offer = updatedWorkDone;
        this.offerByFieldUpdated.next([...this._offer]);
      })
  }

  deleteImageSource(imagePath: string, documentPath: string) {
    const data = {
      imagePath: imagePath,
      documentPath: documentPath
    }
    this.http.post<{ message: string}>( BACKEND_URL + "/deleteImage", data)
      .subscribe(result => {
        console.log(result);
      })
  }

}
