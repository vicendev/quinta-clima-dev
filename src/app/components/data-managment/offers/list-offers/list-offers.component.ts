import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Offer } from './../../../../models/offer';
import { Subscription } from 'rxjs';
import { OfferService } from './../../../../services/offer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {

  @ViewChild("modal_delete_workdone", {static: false}) modal_delete_workdone;
  @ViewChild("modal_edit_workdone", {static: false}) modal_edit_workdone;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  private _offerSub: Subscription;
  private _offerList: Offer[];
  private _offer: Offer;

  public displayedColumns: string[]
  public resultsLength: number;
  public loadPage: boolean;

  constructor(
    private _offerService: OfferService,
    private _modalService: NgbModal,
    private router: Router
  ) {
    this.resultsLength = 0;
    this.displayedColumns = ['imagePath', 'documentPath','title', 'price', 'created', 'edit', 'delete'];
    this.loadPage = false;
   }

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers(){

    this._offerService.getOffers();
    this._offerSub = this._offerService.getOfferUpdateListener()
      .subscribe((offer: Offer[]) => {
        this._offerList = offer;
        this.dataSource = new MatTableDataSource(this._offerList);
        this.resultsLength = this._offerList.length;
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      })

    this.loadPage = true;
  }

  openDeleteModal(data: any){
    this._offer = data;
    this._modalService.open(this.modal_delete_workdone);
  }

  onDelete(){

    const indexString = this._offer.imagePath.indexOf('offers/');
    const imgToDelete = this._offer.imagePath.substr(indexString + 7);
    const docToDelete = this._offer.documentPath.substr(indexString + 7);

    this._offerService.deleteOffer(this._offer.id);
    this._offerService.deleteImageSource(imgToDelete, docToDelete);
    this._modalService.dismissAll();
    this._offerList = [];
    this.loadOffers();
  }

  openEditModal(data: any){
    this._offer = data;
    this._modalService.open(this.modal_edit_workdone);
  }

  onEdit(){
    this.router.navigate(["edit-offer", this._offer.id]);
    this._modalService.dismissAll();
  }

}
