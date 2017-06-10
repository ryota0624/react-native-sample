/**
 * Created by ryota on 2017/06/07.
 */
/**
 * Created by ryota on 2017/06/07.
 */
import {createEntity, Entity} from "../support/Entity";
import {ValueObject, valueObject} from "../support/ValueObject";

const typeUserID = '_User_id_type';
export type UserID = ValueObject<typeof typeUserID, number>
export function UserID(id: number): UserID {
    return valueObject(typeUserID, id);
}

const typeUserName = '_User_name_type';
export type UserName = ValueObject<typeof typeUserName, string>
export function UserName(name: string): UserName {
    return valueObject(typeUserName, name);
}

const typeUser = '_User_type';
type User = Entity<typeof typeUser,UserID> & {
    name: UserName
};

export function User(id: UserID, name: UserName): User {
    return createEntity({id, type: typeUser, name});
}

export function unFollow(user: User): User {
    return {...user, followed: false};
}

export function follow(user: User): User {
    return {...user, followed: true};
}

