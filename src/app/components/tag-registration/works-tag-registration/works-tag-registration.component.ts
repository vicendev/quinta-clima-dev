import { Tag } from './../../../models/tag';
import { WorksDone } from './../../../models/worksdone';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorksDoneService } from 'src/app/services/works-done.service';
import * as _ from 'lodash';
import { TagsService } from 'src/app/services/tags.service';
import { Lightbox } from '@tomscript/ngx-lightbox';

@Component({
  selector: 'app-works-tag-registration',
  templateUrl: './works-tag-registration.component.html',
  styleUrls: ['./works-tag-registration.component.css']
})
export class WorksTagRegistrationComponent implements OnInit {

  public listCarousel: any[];
  public title: string;
  public loadPage: boolean;

  private worksdoneSub: Subscription;
  private tagSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private worksdoneService: WorksDoneService,
    private tagService: TagsService,
    private _lightbox: Lightbox
    ) {
      this.listCarousel = [];
      this.title = '';
      this.loadPage = false;
     }

  ngOnInit() {
    this.loadImages();
    this.loadTagTitle();

    if(this.listCarousel)
    {
      setTimeout(() => {
        this.loadPage = true;
      }, 3000);
    }
  }

  loadImages(){
    const id = this.activatedRoute.snapshot.params.id

    this.worksdoneService.getWorksDoneByTagId(id);
    this.worksdoneSub = this.worksdoneService.getWorksDoneByTagIdUpdateListener()
    .subscribe((worksdone: WorksDone[]) => {
      _.forEach(worksdone, item => {
        this.listCarousel.push({
          src: item.imagePath,
          thumb: item.imagePath,
          caption: item.description,
          tag: item.tagDesc
        });

      });
    });
  }

  loadTagTitle(){
    const id = this.activatedRoute.snapshot.params.id

    this.tagService.getTagById(id);
    this.tagSub = this.tagService.getTagByIdUpdateListener()
      .subscribe((tag: Tag[]) => {
        _.forEach(tag, item => {
          this.title = item.content;
        })
      })
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
    if(this.tagSub){
      this.worksdoneSub.unsubscribe;
    }
  }

}
