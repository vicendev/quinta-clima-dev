import { Router } from '@angular/router';
import { WorkService } from './../../services/work.service';
import { Work } from './../../models/work';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {

  public listWorks: Work[];
  public loadList: boolean;
  public innerWidth: any;
  public mobileResolution: number;

  constructor(
    private workService: WorkService,
    private router: Router
  ) { 
    this.listWorks = [];
    this.loadList = false;
    this.innerWidth = 0;
    this.mobileResolution = 1024;
  }

  ngOnInit() {

    if(!this.workService.worksSelected){
      this.router.navigate(['/list-works']);
    }else{
      this.innerWidth = window.innerWidth;
      this.listWorks = this.workService.worksSelected;
      this.loadList = true;
    }

  }

  selectService(service){
    this.workService.workSelected = service;
  }

}
