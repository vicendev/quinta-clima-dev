import { IOfferConditions } from './../interfaces/iofferconditions';
import * as _ from 'lodash';

export class OfferConditions implements IOfferConditions{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id')
    }

    get offerId(): string{
        return _.get(this, 'data.id')
    }

    get description(): string{
        return _.get(this, 'data.title')
    }

    set description(value: string){
        _.set(this, 'data.title', value)
    }

    get imagePath(): string{
        return _.get(this, 'data.imagePath')
    }

    set imagePath(value: string){
        _.set(this, 'data.imagePath', value)
    }
    
}
