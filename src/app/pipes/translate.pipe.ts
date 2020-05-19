import { TranslateService } from './../services/translate.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService){}

  transform(value: any, args?: any): any {
    return this.translateService.getTranslate(value) ? this.translateService.getTranslate(value) : '';
  }

}
