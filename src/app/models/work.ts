import { IWork } from './../interfaces/iwork';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

export class Work implements IWork{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id')
    }

    get name(): string{
        return _.get(this, 'data.name');
    }

    get img(): string{
        return _.get(this, 'data.img');
    }

    get carousel(): any[]{
        return _.get(this, 'data.carousel');
    }

    get description(): string{
        return _.get(this, 'data.description');
    }

}
