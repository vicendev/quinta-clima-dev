import { Router } from '@angular/router';
import { WorksDone } from './../../models/worksdone';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tag } from './../../models/tag';
import { Subscription } from 'rxjs';
import { TagsService } from './../../services/tags.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WorksDoneService } from 'src/app/services/works-done.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tag-registration',
  templateUrl: './tag-registration.component.html',
  styleUrls: ['./tag-registration.component.css']
})
export class TagRegistrationComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public displayedColumns: string[]
  public resultsLength: number;
  dataSource: MatTableDataSource<any>;
  public pageLoad: boolean;

  private tagsSub: Subscription;
  private worksdoneSub: Subscription;

  private tags: Tag[];
  private worksdone: WorksDone[];
  private tagList: any[];

  private counterLength: number;

  constructor(
    private tagsService: TagsService,
    private router: Router
  ) { 
    this.displayedColumns = ['tag', 'view'];
    this.resultsLength = 0;
    this.counterLength = 0;
    this.tags = [];
    this.worksdone = [];
    this.tagList = [];
    this.pageLoad = false;
  }

  ngOnInit() {
    this.getTagList();
  }

  getTagList(){
    this.tagsService.getTags();
    this.tagsSub = this.tagsService.getTagsUpdateListener()
    .subscribe((tags: Tag[]) => {
      this.tags = tags;
      this.resultsLength = this.tags.length;
      _.forEach(this.tags, item => {
        this.tagList.push({id: item.id, content: item.content});
      })
  
      this.dataSource = new MatTableDataSource(this.tagList);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
    })

    this.pageLoad = true;
  }

  onView(row: any){
    this.router.navigate(['works-tag-registration',row.id])
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
