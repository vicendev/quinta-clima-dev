import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild("modal_contact", {static: false}) modal_contact;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  openModalContact(){
    this.modalService.open(this.modal_contact);
  }

}
