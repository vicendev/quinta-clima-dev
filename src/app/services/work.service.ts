import { Work } from './../models/work';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private _data: any;

  private _worksSelected: Work[];

  private _workSelected: Work;

  get categories(){
    return _.get(this._data, 'categories')
  }

  get worksSelected(): Work[] {
    return this._worksSelected;
  }
  set worksSelected(value: Work[]) {
    this._worksSelected = value;
  }

  get workSelected(): Work {
    return this._workSelected;
  }
  set workSelected(value: Work) {
    this._workSelected = value;
  }

  constructor(private http: HttpClient) { }

  public getData(){
    return new Promise((resolve, reject) =>{
      this.http.get('assets/data/categories.json').subscribe(data =>{
        this._data = data
        resolve(true)
      }, error =>{
        console.error("Error al recuperar las categorias: " + error);
        reject(true);
      })
    })
  } 

}
