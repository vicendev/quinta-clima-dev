import { environment } from './../../environments/environment';
import {map} from 'rxjs/operators';
import { Tag } from './../models/tag';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/tags"

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tags: Tag[];
  private tagsUpdated = new Subject<Tag[]>();

  private tagByField: Tag[];
  private tagByFieldUpdated = new Subject<Tag[]>();

constructor(
  private http: HttpClient
) {
  this.tags = [];
 }

  getTags(){

    this.http
    .get<{ message: string; tag: any }>(
      BACKEND_URL
    )
    .pipe(map((tagData) => {
      return tagData.tag.map( item =>{
        return {
          content: item.content,
          date: item.date,
          id: item._id          
        };
      });
    }))
    .subscribe(transformedTags =>{
      this.tags = transformedTags;
      this.tagsUpdated.next([...this.tags]);
    })
  }

  getTagsUpdateListener(){
    return this.tagsUpdated.asObservable();
  }

  getTagById(id: string){

    this.http
    .get<{ message: string; tag: any }>(
      BACKEND_URL + "/" + id
    )
    .pipe(map((tagData) => {
      return tagData.tag.map( item =>{
        return {
          content: item.content,
          date: item.date,
          id: item._id          
        };
      });
    }))
    .subscribe(transformedTags =>{
      this.tagByField = transformedTags;
      this.tagByFieldUpdated.next([...this.tagByField]);
    })
  }

  getTagByIdUpdateListener(){
    return this.tagByFieldUpdated.asObservable();
  }

  addTag(content: string, date: string){
    const tag: Tag = { id: null, content: content, date: date};
    this.http
      .post<{ message: string }>( BACKEND_URL, tag)
      .subscribe(responseData => {
        console.log(responseData.message);
      })
  }

  deleteTag(tagId: string) {
    this.http.delete( BACKEND_URL +"/" + tagId)
      .subscribe(() => {
        const updatedTags = this.tags.filter(tag => tag.id !== tagId);
        this.tags = updatedTags;
        this.tagsUpdated.next([...this.tags]);
      })
  }

}
