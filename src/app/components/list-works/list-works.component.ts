import { WorkService } from './../../services/work.service';
import { Component, OnInit } from '@angular/core';
import * as mongoose from "mongoose";

@Component({
  selector: 'app-list-works',
  templateUrl: './list-works.component.html',
  styleUrls: ['./list-works.component.css']
})
export class ListWorksComponent implements OnInit {

  public listWorks: any[];
  public innerWidth: any;
  public mobileResolution: number;

  constructor(
    private workService: WorkService
  ) {
    this.listWorks = [];
    this.innerWidth = 0;
    this.mobileResolution = 1024;
   }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.listWorks = this.workService.categories;
  }

  selectCategory(category){
    this.workService.worksSelected = category.services;
  }

}
