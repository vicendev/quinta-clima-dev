import { NgForm } from '@angular/forms';
import { Offer } from './../../../../models/offer';
import { Subscription } from 'rxjs';
import { OfferService } from './../../../../services/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  private _offerSub: Subscription;
  private _oldImagePath: string;
  private _oldDocumentPath: string;
  private _oldDocumentName: string;

  private _offer: Offer;

  public title: any;
  public price: any;
  public imagePath: any;
  public documentPath: any;
  public uploadFile: File;
  public uploadDoc: File;
  public documentName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private offerService: OfferService,
  ) {
    this.title = '';
    this.price = '';
    this.imagePath = '';
    this._oldDocumentName = '';
    this.uploadFile = null;
    this.uploadDoc = null;
   }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    const id = this.activatedRoute.snapshot.params.id;

    this.offerService.getOfferById(id);
    this._offerSub = this.offerService.getOfferByIdUpdateListener()
      .subscribe((offer: Offer[]) => {

        this._offer = offer[0];
        
        this.title = this._offer.title;
        this.price = this._offer.price;
        this.imagePath = this._offer.imagePath;
        this.documentPath = this._offer.documentPath;
        this._oldImagePath = this._offer.imagePath;

        const indexString = this._offer.documentPath.indexOf('offers/');
        this._oldDocumentName  = this._offer.documentPath.substr(indexString + 7);
        this.documentName = this._oldDocumentName;

      })

  }

  onUploadHandler(event){

    const reader = new FileReader();

    _.forEach(event.files, item => {

      this.uploadFile = item;
    });

    reader.onload = () => {
      this.imagePath = reader.result as string;
    };
    reader.readAsDataURL(this.uploadFile);

  }

  removeItem(){
    this.uploadFile = null;
    this.imagePath = this._oldImagePath;
  }

  onUploadFileHandler(event){

    _.forEach(event.files, item => {

      this.uploadDoc = item;
    });

    this.documentName = this.uploadDoc.name;
  }

  removeFileItem(){
    this.uploadDoc = null;
    this.documentName = this._oldDocumentName;
  }

  editOffer(){
      
    this._offer.title = this.title;
    this._offer.price = this.price;

    if(this.uploadFile && this.uploadDoc)
    {
      this.offerService.updateOffer(this._offer, this.uploadFile, this.uploadDoc);
    }
    else if (this.uploadFile && !this.uploadDoc) {
      this.offerService.updateOffer(this._offer, this.uploadFile, this.documentPath);
    }
    else if (this.uploadDoc && !this.uploadFile) {
      this.offerService.updateOffer(this._offer, this.imagePath, this.uploadDoc);
    }
    else{
      this.offerService.updateOffer(this._offer, this.imagePath, this.documentPath);
    }

    this.router.navigate(['list-offers']);
    
  }

    /**
   * Remueve los caracteres del input precio onKeyup
   */
  formatInputNumber(){
    this.removeFirstZero();
    this.removeChar();
  }

  /**
   * Remueve los 0 que estan al prinicipio de un input
   */
  removeFirstZero(){

    const valuePrice = this.price;
    const firstCharPrice = String(valuePrice).trim().charAt(0);

    if(firstCharPrice == '0'){
      let newValue = String(valuePrice).replace(String(firstCharPrice),'')
      this.price = newValue;
    }
  }

    /**
   * Remueve caracteres especiales
   */
  removeChar(){
    const valuePrice = this.price

    let newValue = String(valuePrice).trim().replace(/[\s+-.,]/g, "")
    this.price = newValue;
  }

}
