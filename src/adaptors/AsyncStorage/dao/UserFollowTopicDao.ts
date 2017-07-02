/**
 * Created by ryota on 2017/07/02.
 */
import {AsyncStorage} from "react-native";
type UserID = number;
type TopicID = number;
const userFollowTopicLocation = (userId: UserID) => `/user/${userId}/followTopics`;

export const UserFollowTopicsDao = {
    store(userId: UserID, topicId: TopicID): Promise<void> {
        return AsyncStorage.getItem(userFollowTopicLocation(userId)).then(userFollowTopicIds => {
            if (userFollowTopicIds) {
                return AsyncStorage.setItem(userFollowTopicLocation(userId), `${userFollowTopicIds},${topicId.toString()}`);
            } else {
                return AsyncStorage.setItem(userFollowTopicLocation(userId), topicId.toString());
            }
        });
    },

    replace(userId: UserID, topicIds: TopicID[]) {
        return AsyncStorage.setItem(userFollowTopicLocation(userId), topicIds.map(n => String(n)).join(","));
    },

    findByUserId(userId: UserID): Promise<TopicID[]> {
        return AsyncStorage.getItem(userFollowTopicLocation(userId)).then(topicIdsStr => {
           return topicIdsStr.split(",").map(topicIdStr => Number(topicIdStr));
        });
    }
};