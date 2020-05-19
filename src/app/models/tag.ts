import { ITag } from './../interfaces/itag';
import * as _ from 'lodash';

export class Tag implements ITag{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id');
    }

    get content(): string{
        return _.get(this, 'data.content');
    }

    get date(): string{
        return _.get(this, 'data.date');
    }

    // getData(){
    //     return _.get(this, 'data');
    // }
}
