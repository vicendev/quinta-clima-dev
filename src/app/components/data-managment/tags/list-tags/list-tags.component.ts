import { WorksDoneService } from './../../../../services/works-done.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { TagsService } from './../../../../services/tags.service';
import { Tag } from './../../../../models/tag';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorksDone } from 'src/app/models/worksdone';

import * as _ from 'lodash';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit, OnDestroy {

  @ViewChild("modal_delete_tag", {static: false}) modal_delete_tag;
  @ViewChild("modal_count_images", {static: false}) modal_count_images;
  @ViewChild("modal_delete_no_tag", {static: false}) modal_delete_no_tag;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public displayedColumns: string[]
  public resultsLength: number;
  dataSource: MatTableDataSource<Tag>;

  public tags: Tag[];
  public countNoTag: number;
  public tagName: string;
  private tagsSub: Subscription;
  private noTagsSub: Subscription;
  private _tagObj: Tag;

  private worksdoneSub: Subscription;
  private worksdone: WorksDone[];
  private noTags: WorksDone[];

  public workdoneCount: number;
  public loadPage: boolean;

  constructor(
    private tagsService: TagsService,
    private worksdoneService: WorksDoneService,
    private modalService: NgbModal
    ) {

    this.displayedColumns = ['content', 'created', 'delete'];
    this.resultsLength = 0;
    this.tags = [];
    this.loadPage = false;
   }

  ngOnInit() {

    this.loadTags();
    this.loadNoTag();
  }

  loadTags(){
    this.tagsService.getTags();
    this.tagsSub = this.tagsService.getTagsUpdateListener()
    .subscribe((tags: Tag[]) => {
      this.tags = tags;
      this.dataSource = new MatTableDataSource(this.tags);
      this.resultsLength = this.tags.length;
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;

      this.loadPage = true;
    })
  }

  loadNoTag(){

    this.worksdoneService.getWorksDoneByTagId('none');
    this.noTagsSub = this.worksdoneService.getWorksDoneByNoTagUpdateListener()
    .subscribe((noTags: WorksDone[]) => {
      this.noTags = noTags;
      this.countNoTag = this.noTags.length;
    });

  }

  openDeleteModal(tag: Tag){
    this._tagObj = tag;
    this.tagName = this._tagObj.content;
    this.modalService.open(this.modal_delete_tag);
  }

  onDelete(){
    this.modalService.dismissAll();
    this.countImagesToDelete();
    this.modalService.open(this.modal_count_images);
  }

  onDeleteTag(){
    this.tagsService.deleteTag(this._tagObj.id);
    this.modalService.dismissAll();
  }

  onDeleteWorksDone(){
    _.forEach(this.worksdone, item => {

      this.worksdoneService.deleteWorkDone(item.id);
    });

    this.modalService.dismissAll()
    this.tagsService.deleteTag(this._tagObj.id);
  }

  onEditWorksDone(){

    _.forEach(this.worksdone , item => {
      item.tagId = "none";
      item.tagDesc = "Sin Tag"
      
      this.worksdoneService.updateWorksDone(new WorksDone(item), item.imagePath);
    });

    this.modalService.dismissAll()
    this.tagsService.deleteTag(this._tagObj.id);
  }

  openDeleteNoTagModal(){
    this.modalService.open(this.modal_delete_no_tag);
  }

  onNoTagDelete(){
    this.modalService.dismissAll();
    this.deleteNoTagWorksDone();
  }

  countImagesToDelete(){
    
    this.worksdoneService.getWorksDoneByTagId(this._tagObj.id);
    console.log(this._tagObj.id)
    this.worksdoneSub = this.worksdoneService.getWorksDoneByTagIdUpdateListener()
      .subscribe((worksdone: WorksDone[]) => {
        this.workdoneCount = worksdone.length;
        this.worksdone = worksdone;
      });
  }

  deleteNoTagWorksDone(){

    _.forEach(this.noTags, item => {

      let indexString = item.imagePath.indexOf('worksdone/');
      let imgToDelete = item.imagePath.substr(indexString + 10);

      console.log(item.id);
      this.worksdoneService.deleteWorkDone(item.id)
      this.worksdoneService.deleteImageSource(imgToDelete);  
    });

    this.modalService.dismissAll();
    this.countNoTag = 0;
  }

  ngOnDestroy(){
    if(this.tagsSub){
      this.tagsSub.unsubscribe();
    }
  }

}
