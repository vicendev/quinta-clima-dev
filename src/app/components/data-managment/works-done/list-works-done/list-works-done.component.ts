import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkService } from '../../../../services/work.service';
import { TagsService } from '../../../../services/tags.service';
import { Subscription } from 'rxjs';
import { WorksDoneService } from '../../../../services/works-done.service';
import { WorksDone } from '../../../../models/worksdone';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-works-done',
  templateUrl: './list-works-done.component.html',
  styleUrls: ['./list-works-done.component.css']
})
export class ListWorksDoneComponent implements OnInit, OnDestroy {

  @ViewChild("modal_delete_workdone", {static: false}) modal_delete_workdone;
  @ViewChild("modal_edit_workdone", {static: false}) modal_edit_workdone;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  public worksDropdown: any[];
  public servicesDropdown: any[];
  public workSelected: any[];
  public serviceSelected: string;

  public ddWorkCheck: boolean;
  public ddServiceCheck: boolean;

  public displayedColumns: string[]
  public resultsLength: number;

  public worksDone: WorksDone[];
  private worksdoneSub: Subscription;

  private _workdoneObj: WorksDone;

  constructor(
    private modalService: NgbModal, 
    private tagsService: TagsService,
    private worksDoneService: WorksDoneService,
    private worksService: WorkService,
    private route: Router
  ) {
    this.worksDropdown = [{
      label: '--- Escoge un tipo de trabajo ---',
      value: null
    }]
    this.servicesDropdown = [{
      label: '--- Escoge un servicio ---',
      value: null
    }]

    // boolean
    this.ddWorkCheck = false;
    this.ddServiceCheck = false;

    this.displayedColumns = ['imagePath', 'description', 'tagDesc', 'created', 'edit', 'delete'];
   }

  ngOnInit() {
    this.loadWorks();
  }

  ngOnDestroy(){
    if(this.worksdoneSub){
      this.worksdoneSub.unsubscribe();
    }
  }

  loadWorksDone(){

    this.worksDoneService.getWorksDoneByServId(this.serviceSelected);

    this.worksdoneSub = this.worksDoneService.getWorksDoneByServIdUpdateListener()
    .subscribe((worksdone: WorksDone[]) => {
      this.worksDone = worksdone;
      this.dataSource = new MatTableDataSource(this.worksDone);
      this.resultsLength = this.worksDone.length;
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })
  }

  loadWorks(){
    let works = this.worksService.categories;

    _.forEach(works, item => {
      this.worksDropdown.push({label: item.name,
                              value:{
                                idcat: item.id,
                                arrServ: item.services,
                              } 
                            })
    })

  }

  ddWorks(){
    if(!this.workSelected){
      this.ddWorkCheck = false;
      this.ddServiceCheck = false;
    } else{
      
      _.forEach(this.workSelected, services =>{

        _.forEach(services, item =>{
          if(item.name){
            this.servicesDropdown.push({label: item.name,
            value: item.id});
          }
        });

      });
      this.ddWorkCheck = true;
    }
  }
  
  ddServices(){
    if(this.ddWorkCheck){
      this.loadWorksDone();
      this.ddServiceCheck = true;
    }else{
      this.ddServiceCheck = false;
    }
  }

  openDeleteModal(data: any){
    this._workdoneObj = data;
    this.modalService.open(this.modal_delete_workdone);
  }

  onDelete(){

    const indexString = this._workdoneObj.imagePath.indexOf('worksdone/');
    const imgToDelete = this._workdoneObj.imagePath.substr(indexString + 10);

    this.worksDoneService.deleteWorkDone(this._workdoneObj.id);
    this.worksDoneService.deleteImageSource(imgToDelete);
    this.modalService.dismissAll();
    this.worksDone = [];
    this.loadWorksDone();
  }

  openEditModal(data: any){
    this._workdoneObj = data;
    this.modalService.open(this.modal_edit_workdone);
  }

  onEdit(){
    this.route.navigate(["edit-worksdone", this._workdoneObj.id]);
    this.modalService.dismissAll();
  }

}
