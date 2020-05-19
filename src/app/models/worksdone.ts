import { IWorksDone } from './../interfaces/iworksdone';
import * as _ from 'lodash';

export class WorksDone implements IWorksDone{

    constructor(data){
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id');
    }

    get servId(): string{
        return _.get(this, 'data.servId');
    }

    get tagId(): string{
        return _.get(this, 'data.tagId');
    }

    set tagId(value: string){
        _.set(this, 'data.tagId', value);
    }

    get tagDesc(): string{
        return _.get(this, 'data.tagDesc');
    }

    set tagDesc(value: string){
        _.set(this, 'data.tagDesc', value);
    }

    get description(): string{
        return _.get(this, 'data.description');
    }

    set description(value: string){
        _.set(this, 'data.description', value);
    }
    
    get imagePath(): string{
        return _.get(this, 'data.imagePath');
    }
    
    set imagePath(value: string){
        _.set(this, 'data.imagePath', value);
    }

    get created(): string{
        return _.get(this, 'data.created');
    }
}
