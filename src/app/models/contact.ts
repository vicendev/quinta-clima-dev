import { IContact } from './../interfaces/icontact';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

export class Contact implements IContact{

    constructor(){}

    get name(): string{
        return _.get(this, 'data.name');
    }

    set name(value: string){
        _.set(this, 'data.name', value);
    }

    get surname(): string{
        return _.get(this, 'data.surname');
    }

    set surname(value: string){
        _.set(this, 'data.surname', value);
    }

    get email(): string{
        return _.get(this, 'data.email');
    }

    set email(value: string){
        _.set(this, 'data.email', value);
    }

    get works(): string{
        return _.get(this, 'data.works');
    }

    set works(value: string){
        _.set(this, 'data.works', value);
    }

    get message(): string{
        return _.get(this, 'data.messsage');
    }

    set message(value: string){
        _.set(this, 'data.message', value);
    }

    get date(): string{
        return _.get(this, 'data.date');
    }

    set date(value: string){
        _.set(this, 'data.date', value);
    }

}
