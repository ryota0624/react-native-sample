/**
 * Created by ryota on 2017/07/02.
 */

import {AsyncStorage} from "react-native";
type UserId = number;
type TagId = string;
type LoveTag = { tagId: TagId, loveLevel: number };
const userLovesLocation = (userId: UserId) => `/user/${userId}/loveTags`;

export const UserLoveTagsDao = {
    store(userId: UserId, tagId: TagId, loveLevel: number) {
        return AsyncStorage.getItem(userLovesLocation(userId)).then(userLoves => {
            if (userLoves) {
                const updatedUserLoves = userLoves.split(",").concat(JSON.stringify([{
                    tagId,
                    loveLevel
                } as LoveTag]));
                return AsyncStorage.setItem(userLovesLocation(userId), updatedUserLoves.join(","));
            } else {
                return AsyncStorage.setItem(userLovesLocation(userId), JSON.stringify([{
                    tagId,
                    loveLevel
                } as LoveTag]));

            }
        });
    },
    findByUserId(userId: UserId): Promise<LoveTag[]> {
        return AsyncStorage.getItem(userLovesLocation(userId)).then(userLoves => {
            return userLoves.split(",").map(userLoveString => JSON.parse(userLoveString))
        });
    },

    replace(userId: UserId, loveTags: LoveTag[]) {
        return AsyncStorage.setItem(userLovesLocation(userId), loveTags.map(n => JSON.stringify(n)).join(","));
    },

};