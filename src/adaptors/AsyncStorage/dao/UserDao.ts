import {AsyncStorage} from "react-native";
import {dto2User, user2Dto} from "../../translators/User";
import {User} from "../../../domains/user/User";
/**
 * Created by ryota on 2017/07/02.
 */

type UserID = number;
const userStorageLocation = (userId:UserID) => `/user/${userId}`;
const userIdsLocation = `/userIds`;

export const UserDao = {
    findAll(): Promise<User[]> {
        return AsyncStorage.getItem(userIdsLocation).then(userIdsString => {
           const userIds = JSON.parse(userIdsString) as number[];
           const userPaths = userIds.map(userStorageLocation);
           return AsyncStorage.multiGet(userPaths).then(users => {
              return users.map(([_, userString]) => dto2User(JSON.parse(userString)));
           });
        });
    },

    findById(userId: UserID): Promise<User> {
        return AsyncStorage.getItem(userStorageLocation(userId)).then((userString) => {
            if (userString) {
                return dto2User(JSON.parse(userString));
            } else {
                return Promise.reject(`not have UserID: ${userId}`) as any;
            }
        });
    },

    store(user: User): Promise<void> {
        return AsyncStorage.setItem(userStorageLocation(user.id.value) ,JSON.stringify(user2Dto(user)));
    }
};