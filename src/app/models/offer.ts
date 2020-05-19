import { IOffer } from './../interfaces/ioffer';
import * as _ from 'lodash';

export class Offer implements IOffer{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id')
    }

    get title(): string{
        return _.get(this, 'data.title')
    }

    set title(value: string){
        _.set(this, 'data.title', value)
    }

    get price(): number{
        return _.get(this, 'data.price')
    }

    set price(value: number){
        _.set(this, 'data.price', value)
    }

    get imagePath(): string{
        return _.get(this, 'data.imagePath')
    }

    get documentPath(): string{
        return _.get(this, 'data.documentPath');
    }

    get created(): string{
        return _.get(this, 'data.created')
    }

    set created(value: string){
        _.set(this, 'data.created', value)
    }
}
