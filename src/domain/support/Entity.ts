/**
 * Created by ryota on 2017/06/07.
 */
import * as _ from 'lodash';
export type Entity<T extends string ,ID> = {
    type: T
    id: ID
}

export function copy<TYPE extends string, ID, T extends Entity<TYPE, ID>>(entity: T, partial: Partial<T>): Readonly<T> {
    return deepFreeze(Object.assign({}, _.cloneDeep(entity), partial));
}

export function createEntity<TYPE extends string, ID, T extends Entity<TYPE, ID>>(args: {[k in keyof T]: T[k]}): Readonly<T> {
    return deepFreeze(Object.assign({}, _.cloneDeep(args)));
}

function deepFreeze (o: any) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop)
            && o[prop] !== null
            && (typeof o[prop] === "object" || typeof o[prop] === "function")
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });

    return o;
}