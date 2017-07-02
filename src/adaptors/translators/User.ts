import {User, UserID, UserName} from "../../domains/user/User";
export function user2Dto(user: User) {
    return {
        id: user.id.value,
        name: user.name.value
    }
}

export function dto2User(dto: any): User {
    return User.factory({
        id: new UserID(dto.id),
        name: new UserName(dto.name)
    })
}