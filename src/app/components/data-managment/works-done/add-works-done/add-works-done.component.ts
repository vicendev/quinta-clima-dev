import { Router } from '@angular/router';
import { WorkService } from '../../../../services/work.service';
import { WorksDoneService } from '../../../../services/works-done.service';
import { WorksDone } from '../../../../models/worksdone';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TagsService } from '../../../../services/tags.service';
import { Tag } from '../../../../models/tag';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { timeout } from 'rxjs/operators';
//import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-add-works-done',
  templateUrl: './add-works-done.component.html',
  styleUrls: ['./add-works-done.component.css']
})
export class AddWorksDoneComponent implements OnInit, OnDestroy {

  @ViewChild("modal_info_form", {static:false}) modal_info_form
  @ViewChild("modal_new_form", {static:false}) modal_new_form

  public uploadedFiles: any[];
  public tagsDropdown: any[];
  public worksDropdown: any[];
  public servicesDropdown: any[];
  public tagSelected: any[];
  public workSelected: any[];
  public serviceSelected: string;

  public description: string;
  public dataFormInfo: string;

  public ddWorkCheck: boolean;
  public ddServiceCheck: boolean;
  public loadPage: boolean;

  private tagsSub: Subscription;
  private _worksDone: WorksDone[];

  constructor(
    private http: HttpClient,
    private tagsService: TagsService,
    private worksDoneService: WorksDoneService,
    private worksService: WorkService,
    private modalService: NgbModal,
    private route: Router
    ) {
    // Listas
    this.uploadedFiles = [];
    this.tagsDropdown = [{
      label: '--- Escoge un tag ---',
      value: null
    }];
    this.worksDropdown = [{
      label: 'Escoge tipo de trabajo',
      value: null
    }]
    this.servicesDropdown = [{
      label: '--- Escoge un servicio ---',
      value: null
    }]
    this._worksDone = [];

    // strings
    this.description = '';
    this.dataFormInfo = '';

    // boolean
    this.ddWorkCheck = false;
    this.ddServiceCheck = false;
    this.loadPage = true;

   }

  ngOnInit() {
    this.loadWorks();
    this.loadTags();
  }

  ngOnDestroy(){
    if(this.tagsSub){
      this.tagsSub.unsubscribe()
    }
  }

  /**
   * param: @event
   * Generar una lista de archivos, a traves de un evento del DOM.
   */
  onUploadHandler(event){
    
    this.uploadedFiles = [];

    _.forEach( event.files, file =>{
      this.uploadedFiles.push(file);
    })

  }

  /**
   * 
   * @param event Event from DOM
   * Remove elements from list uploadedFiles
   */
  removeItems(event){

    if(this.uploadedFiles.length > 0){

      let index = 0;

      _.forEach(this.uploadedFiles, file =>{
        if(file === event.file){
          this.uploadedFiles.splice(index, 1);
        }
        index++;
      })

    }
  }

  clearItems(){

    if(this.uploadedFiles.length > 0)
    {
      this.uploadedFiles.splice(0);
    }

  }

  loadTags(){
    this.tagsService.getTags();
    this.tagsSub = this.tagsService.getTagsUpdateListener()
    .subscribe((tags: Tag[]) => {
      _.forEach(tags, item =>{
        this.tagsDropdown.push({label: item.content,
                                value:{
                                tagId: item.id,
                                tagDesc: item.content
                                }
                              })
      })
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
      
      let initServiceDrop = [{
        label: 'Escoge tipo de trabajo',
        value: null
      }]
      this.servicesDropdown = initServiceDrop;

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
      this.ddServiceCheck = true;
    }else{
      this.ddServiceCheck = false;
    }
  }


  /**
   * Call add to db
   */
  addWorkDone(form: NgForm){
    
    if(!this.validationForm(form)){

      this.modalService.open(this.modal_info_form);

    } else {


      for (let index = 0; index < this.uploadedFiles.length; index++) {
        
        this._worksDone.push(
          {
            id : null,
            servId: this.serviceSelected,
            tagId: form.value.tags.tagId,
            tagDesc: form.value.tags.tagDesc,
            description: this.description,
            imagePath: null,
            created: new Date().toLocaleDateString()             
          });
      }

      for (let index = 0; index < this.uploadedFiles.length; index++){

        this.worksDoneService.addWorksDone(this._worksDone[index], this.uploadedFiles[index]);
      }

      this.modalService.open(this.modal_new_form);

    }
  }

  validationForm(form: NgForm){

    if(this.description == '' && !form.value.tags){

      this.dataFormInfo = 'Por favor escriba una descripción y seleccione un hastag';

      return false

    }
    else if(this.description == ''){

      this.dataFormInfo = 'Por favor escriba una descripción';

      return false

    }
    else if(!form.value.tags){

      this.dataFormInfo = 'Por favor seleccione un hashtag';

      return false;

    } else {

      return true;

    }

  }

  resetForm(){
    this.modalService.dismissAll();
    this.loadPage = false;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  navigateTo(){
    this.modalService.dismissAll();
    this.loadPage = false;
    setTimeout(() => {
      this.route.navigate(["list-worksdone"]);
    }, 1000);
    
  }

}
