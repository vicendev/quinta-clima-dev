import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { WorksDoneService } from './../../services/works-done.service';
import { Work } from './../../models/work';
import { WorkService } from './../../services/work.service';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { WorksDone } from 'src/app/models/worksdone';
import { Lightbox } from '@tomscript/ngx-lightbox';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @ViewChild('modal_display_tag', {static: false}) modal_display_tag

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight - 50;
    console.log(this.width, this.height);
  }

  public width: number;
  public height: number;
  public listCarousel: any[];
  public loadPage: boolean;
  public screenOrientation: string;

  public work: Work;
  public worksdone: WorksDone[];

  private worksdoneSub: Subscription;

  constructor(
    private workService: WorkService,
    private worksdoneService: WorksDoneService,
    private modalService: NgbModal,
    private router: Router,
    private _lightbox: Lightbox
  ) { 
    this.listCarousel = [];
    this.loadPage = false;

  }

  ngOnInit() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if(!this.workService.workSelected){
      this.router.navigate(["/list-works"]);
    }

    this.loadWorks();

    if(this.listCarousel)
    {
      setTimeout(() => {
        this.loadPage = true;
      }, 3000);
    }

  }

  loadWorks(){

    const serviceId = this.workService.workSelected.id;

    this.worksdoneService.getWorksDoneByServId(serviceId);
    this.worksdoneSub = this.worksdoneService.getWorksDoneByServIdUpdateListener()
      .subscribe((worksdone: WorksDone[]) => {
        this.worksdone = worksdone;        

        _.forEach(worksdone, item => {
          this.listCarousel.push({
            tagId: item.tagId,
            thumb: item.imagePath,
            src: item.imagePath,
            caption: item.description,
            tag: item.tagDesc
          })
        });

      })

  }

  showModalTag(){
    this.modalService.open(this.modal_display_tag);
  } 
  
  onViewTag(tagId: string){
    this.router.navigate(['works-tag-registration',tagId])

  }

  open(index: number){
    this._lightbox.open(this.listCarousel, index)
  }

  close(){
    this._lightbox.close();
  }

  ngOnDestroy(){

    if(this.worksdoneSub){
      this.worksdoneSub.unsubscribe;
    }
  }

}
