import {UserRepository} from "../../domains/user/UserRepository";
import {User, UserID, UserName} from "../../domains/user/User";
import {TopicID} from "../../domains/topic/Topic";
import {Repository} from "../../domains/Repository";
import {LoveLevel, Tag} from "../../domains/tag/Tag";
import {UserDao} from "./dao/UserDao";
import {UserFollowTopicsDao} from "./dao/UserFollowTopicDao";
import {UserLoveTagsDao} from "./dao/UserLoveTagsDao";
/**
 * Created by ryota on 2017/06/03.
 */

interface TagLoveLevel {
    tagName: string,
    loveLevel: LoveLevel,
}
// userId, tag, level
type userId = number
let userLoveTags: [userId, TagLoveLevel][] = [
    [10, {tagName: 'お札', loveLevel: LoveLevel.Two}]
];

export class UserRepositoryonAsyncStorage extends Repository implements UserRepository {
    store(user: User, topicIdOrTag?: TopicID | Tag) {
        const relPromise = function () {
            if (topicIdOrTag instanceof TopicID) {
                UserFollowTopicsDao.findByUserId(user.id.value).then(followTopicIds => {
                    if (!followTopicIds.some(topicIdInt => {
                            return topicIdInt === topicIdOrTag.value;
                        })) {
                        return UserFollowTopicsDao.store(user.id.value, topicIdOrTag.value);
                    } else {
                        const updatedFollowTopicIds = followTopicIds.filter((topicIdInt) => {
                            return !(topicIdInt === topicIdOrTag.value);
                        });
                        return UserFollowTopicsDao.replace(user.id.value, updatedFollowTopicIds);
                    }
                });

            } else if (topicIdOrTag instanceof Tag) {
                return UserLoveTagsDao.findByUserId(user.id.value).then(loveTags => {
                    const updatedLoveTags: {
                        tagId: string,
                        loveLevel: number
                    }[] = loveTags.map(loveTag => {
                        if (loveTag.tagId === topicIdOrTag.id.value) {
                            return {tagId: topicIdOrTag.id.value, loveLevel: topicIdOrTag.loveLevel}
                        } else {
                            return loveTag;
                        }
                    });
                    return UserLoveTagsDao.replace(user.id.value ,updatedLoveTags)
                });

            } else {
                return Promise.resolve();
            }
        }();

        return Promise.all([UserDao.store(user), relPromise]).then(([user]) => {
            return user;
        });
    }

    findById(id: UserID) {
        return UserDao.findById(id.value);
    }

    findAll() {
        return UserDao.findAll()
    }
}

export default new UserRepositoryonAsyncStorage();