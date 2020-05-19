import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any;

  constructor(private http: HttpClient) { }

  public getData(){
    return new Promise((resolve, reject) => {
      if (navigator.language == "en-US" || navigator.language == "es-CL" || navigator.language == "es-ES")
      {
        this.http.get('assets/translations/' + navigator.language + '.json').subscribe(data => {
          this.data = data;
          resolve(true);
        }, error =>{
          console.error('Error al recuperar las traducciones' + error);
          reject(true)
        })
      }
      else{
        this.http.get('assets/translations/es-ES.json').subscribe(data => {
          this.data = data;
          resolve(true);
        }, error =>{
          console.error('Error al recuperar las traducciones' + error);
          reject(true)
        })
      }

    })
  }

  public getTranslate(word: string){
    return this.data[word];
  }

}
