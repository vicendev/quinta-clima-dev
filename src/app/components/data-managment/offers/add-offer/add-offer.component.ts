import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Offer } from './../../../../models/offer';
import { IOffer } from './../../../../interfaces/ioffer';
import { OfferService } from './../../../../services/offer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  @ViewChild("modal_new_form", {static:false}) modal_new_form


  public title: any;
  public price: any;

  private _offer: Offer;
  private _ioffer: IOffer;

  public uploadFile: File;
  public uploadDoc: File;
  public loadPage: boolean;


  constructor(
    private _offerService: OfferService,
    private router: Router,
    private _modalService: NgbModal
  ) {
    this.title = '';
    this.price = '';
    this._offer = new Offer(this._ioffer);
    this.loadPage = true;
   }

  ngOnInit() {
  }

  addOffer(form: NgForm){

    this._offer.title = form.value.title;
    this._offer.price = form.value.price
    this._offer.created = new Date().toLocaleDateString();

    this._offerService.addOffer(this._offer, this.uploadFile, this.uploadDoc)

    this._modalService.open(this.modal_new_form);
  }

  onUploadHandler(event){

    _.forEach(event.files, item => {

      this.uploadFile = item;
    });

  }

  removeItem(){
    this.uploadFile = null;
    this.uploadDoc = null;
    this.title = '';
    this.price = '';
  }

  onUploadFileHandler(event){

    _.forEach(event.files, item => {
      this.uploadDoc = item;
    });
  }

  removeFileItem(){
    this.uploadDoc = null;
    this.title = '';
    this.price = '';
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

  resetForm(){
    this._modalService.dismissAll();
    this.loadPage = false;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  navigateTo(){
    this._modalService.dismissAll();
    this.loadPage = false;
    setTimeout(() => {
      this.router.navigate(["list-offers"]);
    }, 1000);
    
  }

}
