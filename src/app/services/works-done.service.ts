import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { WorksDone } from './../models/worksdone';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/worksdone"

@Injectable({
  providedIn: 'root'
})
export class WorksDoneService {

  private worksDone: WorksDone[];
  private worksDoneUpdated = new Subject<WorksDone[]>();

  private worksDoneByField: WorksDone[];
  private worksDoneByFieldUpdated = new Subject<WorksDone[]>();

  constructor(
    private http: HttpClient
  ) {
    this.worksDone = [];
  }

  getWorksDone(){
    this.http
      .get<{ message: string, worksdone: any}>( BACKEND_URL )
      .pipe(
        map(worksdoneData => {
          return worksdoneData.worksdone.map(wd => {
            return {
              id: wd._id,
              servId: wd.servId,
              tagId: wd.tagId,
              tagDesc: wd.tagDesc,
              description: wd.description,
              imagePath: wd.imagePath
            };
          });
        })
      )
      .subscribe(transformedWorksDone => {
        this.worksDone = transformedWorksDone;
        this.worksDoneUpdated.next([...this.worksDone]);
      });
  }
  
  getWorksDoneUpdateListener() {
    return this.worksDoneUpdated.asObservable();
  }

  getWorksDoneById(id: string){
    this.http
    .get<{ message: string, worksdone: any}>( BACKEND_URL + "/" + id)
    .pipe(
      map(worksdoneData => {
        return worksdoneData.worksdone.map(wd => {
          return {
            id: wd._id,
            servId: wd.servId,
            tagId: wd.tagId,
            tagDesc: wd.tagDesc,
            description: wd.description,
            imagePath: wd.imagePath,
            created: wd.created
          };
        });
      })
    )
    .subscribe(transformedWorksDone => {
      this.worksDoneByField = transformedWorksDone;
      this.worksDoneByFieldUpdated.next([...this.worksDoneByField]);
    });
  }

  getWorksDoneByIdUpdateListener() {
    return this.worksDoneByFieldUpdated.asObservable();
  }

  getWorksDoneByServId(servId: string) {
    this.http
      .get<{ message: string, worksdone: any}>( BACKEND_URL + "/byService/" + servId)
      .pipe(
        map(worksdoneData => {
          return worksdoneData.worksdone.map(wd => {
            return {
              id: wd._id,
              servId: wd.servId,
              tagId: wd.tagId,
              tagDesc: wd.tagDesc,
              description: wd.description,
              imagePath: wd.imagePath,
              created: wd.created
            };
          });
        })
      )
      .subscribe(transformedWorksDone => {
        this.worksDoneByField = transformedWorksDone;
        this.worksDoneByFieldUpdated.next([...this.worksDoneByField]);
      });

  }

  getWorksDoneByServIdUpdateListener() {
    return this.worksDoneByFieldUpdated.asObservable();
  }

  getWorksDoneByTagId(tagId: string) {
    this.http
      .get<{ message: string, worksdone: any}>( BACKEND_URL + "/byTag/" + tagId)
      .pipe(
        map(worksdoneData => {
          return worksdoneData.worksdone.map(wd => {
            return {
              id: wd._id,
              servId: wd.servId,
              tagId: wd.tagId,
              tagDesc: wd.tagDesc,
              description: wd.description,
              imagePath: wd.imagePath,
              created: wd.created
            };
          });
        })
      )
      .subscribe(transformedWorksDone => {
        this.worksDoneByField = transformedWorksDone;
        this.worksDoneByFieldUpdated.next([...this.worksDoneByField]);
      });

  }

  getWorksDoneByTagIdUpdateListener() {
    return this.worksDoneByFieldUpdated.asObservable();
  }

  addWorksDone(worksdone: WorksDone, image: File){
    const worksdoneData = new FormData();
    worksdoneData.append("servId", worksdone.servId);
    worksdoneData.append("tagId", worksdone.tagId);
    worksdoneData.append("tagDesc", worksdone.tagDesc);
    worksdoneData.append("description", worksdone.description);
    worksdoneData.append("image", image, image.name);
    worksdoneData.append("created", worksdone.created);
    this.http
      .post< { message: string, worksdonePost: WorksDone}>(
        BACKEND_URL,
        worksdoneData
      )
      .subscribe(responseData => {
        console.log(responseData.worksdonePost);
      })
  }

  updateWorksDone(worksdone: WorksDone, image: File | string){
    let worksdoneData: WorksDone | FormData;
    if(typeof image === "object") {
      worksdoneData = new FormData();
      worksdoneData.append("id", worksdone.id);
      worksdoneData.append("servId", worksdone.servId);
      worksdoneData.append("tagId", worksdone.tagId);
      worksdoneData.append("tagDesc", worksdone.tagDesc);
      worksdoneData.append("description", worksdone.description);
      worksdoneData.append("image", image, image.name);
      worksdoneData.append("created", worksdone.created);
    } else {
      worksdoneData = {
        id: worksdone.id,
        servId: worksdone.servId,
        tagId: worksdone.tagId,
        tagDesc: worksdone.tagDesc,
        description: worksdone.description,
        imagePath: image,
        created: worksdone.created 
      }
    }
    console.log(worksdoneData);
    this.http
      .put( BACKEND_URL + "/" + worksdone.id, worksdoneData)
      .subscribe(response => {
        console.log(response);
      })
  }

  deleteWorkDone(id: string) {
    this.http.delete( BACKEND_URL + "/" + id)
      .subscribe(() => {
        const updatedWorkDone = this.worksDone.filter(tag => tag.id !== id);
        this.worksDone = updatedWorkDone;
        this.worksDoneByFieldUpdated.next([...this.worksDone]);
      })
  }

  deleteImageSource(imagePath: string) {
    const data = {
      imagePath: imagePath
    }
    console.log(data)
    this.http.post<{ message: string}>( BACKEND_URL + "/deleteImage", data)
      .subscribe(result => {
        console.log(result);
      })
  }

}
