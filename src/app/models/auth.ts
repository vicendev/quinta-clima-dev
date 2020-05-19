import { IAuth } from './../interfaces/iauth';
import * as _ from 'lodash';

export class Auth implements IAuth{

    constructor(data){
        _.set(this, 'data', data);
    }

    get email(): string{
        return _.get(this, 'data.email');
    }
    
    set email(email: string){
        _.set(this, 'data', email);
    }

    get password(): string{
        return _.get(this, 'data.password')
    }

    set password(password: string){
        _.set(this, 'data', password);
    }
}
