import { ContactService } from './../../services/contact.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private _contact: Contact;

  public name: any;
  public surname: any;
  public email: any;
  public works: any;
  public message: any;

  constructor(
    private contactService: ContactService
  ) {
    this._contact = new Contact();

    this.name = '';
    this.surname = '';
    this.email = '';
    this.works = 'Climatizacion';
    this.message = '';

   }

  ngOnInit() {
  }

  sendEmail(form: NgForm){

    this._contact.name = form.value.name
    this._contact.surname = form.value.surname
    this._contact.email = form.value.email
    this._contact.works = form.value.works
    this._contact.message = form.value.message
    this._contact.date = new Date().toLocaleString();

    this.contactService.sendEmail(this._contact);
  }

}
