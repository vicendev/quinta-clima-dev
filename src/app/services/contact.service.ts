import { environment } from './../../environments/environment';
import { Contact } from './../models/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + "/mail"

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contact: Contact;

  constructor(
    private http: HttpClient
  ) {
    this.contact = new Contact();
  }

  sendEmail(contact: Contact){
    this.http.post( BACKEND_URL , contact)
    .subscribe(responseData => {
      console.log(responseData)
    });
  }

}
