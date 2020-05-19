import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Tag } from './../../../../models/tag';
import { TagsService } from './../../../../services/tags.service';
import { WorksDone } from './../../../../models/worksdone';
import { Subscription } from 'rxjs';
import { WorksDoneService } from 'src/app/services/works-done.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-edit-works-done',
  templateUrl: './edit-works-done.component.html',
  styleUrls: ['./edit-works-done.component.css']
})
export class EditWorksDoneComponent implements OnInit {

  @ViewChild("modal_info_form", {static:false}) modal_info_form

  private worksdoneSub: Subscription;
  private tagsSub: Subscription;
  private _oldImagePath: string;
  private _workDone: WorksDone;

  public tagsDropdown: any[];
  public uploadFile: File;

  public dataFormInfo: string;
  public description: string;
  public imagePath: string;
  public tagDesc: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private worksdoneService: WorksDoneService,
    private tagsService: TagsService,
    private modalService: NgbModal,
    private route: Router
  ) { 
    this.description = '';
    this.tagsDropdown = [];
    this._workDone = null;
  }

  ngOnInit() {
    this.loadData();
    this.loadTags();
  }

  loadData(){
    const id = this.activatedRoute.snapshot.params.id;

    this.worksdoneService.getWorksDoneById(id);
    this.worksdoneSub = this.worksdoneService.getWorksDoneByIdUpdateListener()
      .subscribe((worksdone: WorksDone[]) => {

        this._workDone = worksdone[0];

        _.forEach(worksdone, item => {

          this.description = item.description;
          this.imagePath = item.imagePath;
          this._oldImagePath = item.imagePath;
          this.tagDesc = item.tagDesc;

        });
      })

  }

  loadTags(){

    this.tagsService.getTags();
    this.tagsSub = this.tagsService.getTagsUpdateListener()
      .subscribe((tags: Tag[]) => {

        _.forEach(tags, item => {

          this.tagsDropdown.push({
            label: item.content,
            value:{
            tagId: item.id,
            tagDesc: item.content
            }
          });
        });
      });
  }

  onUploadHandler(event){

    const reader = new FileReader();

    _.forEach(event.files, item => {

      this.uploadFile = item;
    });

    reader.onload = () => {
      this.imagePath = reader.result as string;
    };
    reader.readAsDataURL(this.uploadFile);

  }

  removeItems(){
    this.uploadFile = null;
    this.imagePath = this._oldImagePath;
    console.log(this.imagePath)
  }
  
  clearItems(){
    this.uploadFile = null;
    this.imagePath = this._oldImagePath;
  }

  editWorkDone(form: NgForm){
    if(!this.validationForm()){
      this.modalService.open(this.modal_info_form);
    } else {
      
      if(!form.value.tags)
      {
        this._workDone.description = this.description;
        if(this.uploadFile)
        {
          this.worksdoneService.updateWorksDone(this._workDone, this.uploadFile);
        }else{
          this.worksdoneService.updateWorksDone(this._workDone, this.imagePath);
        }
      } else {
        this._workDone.description = this.description;
        this._workDone.tagId = form.value.tags.tagId;
        this._workDone.tagDesc = form.value.tags.tagDesc;
        if(this.uploadFile)
        {
          this.worksdoneService.updateWorksDone(this._workDone, this.uploadFile);
        }else{
          this.worksdoneService.updateWorksDone(this._workDone, this.imagePath);
        }
      }

      this.route.navigate(["list-worksdone"]);
    }
  }

  validationForm(){

    if(this.description == ''){

      this.dataFormInfo = 'Por favor escriba una descripción';

      return false

    } else {

      return true;

    }

  }

  ngOnDestroy(){

    if(this.tagsSub){
      this.tagsSub.unsubscribe;
    }

    if(this.worksdoneSub){
      this.worksdoneSub.unsubscribe;
    }
  }

}
