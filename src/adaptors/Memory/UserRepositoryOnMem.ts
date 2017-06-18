import {UserRepository} from "../../domains/user/UserRepository";
import {User, UserID, UserName} from "../../domains/user/User";
import {TopicID} from "../../domains/topic/Topic";
import {Repository} from "../../domains/Repository";
import {LoveLevel, Tag} from "../../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */

let usersMap: Map<number, User> = new Map([
  [10, User.factory({id: new UserID(10), name: new UserName("su")})]
]);

// userId, topicId
let userFollowTopic: [number, number][] = [[10, 1]];


interface TagLoveLevel {
  tagName: string,
  loveLevel: LoveLevel,
}
// userId, tag, level
type userId = number
let userLoveTags: [userId, TagLoveLevel][] = [
  [10, {tagName: 'お札', loveLevel: LoveLevel.Two}]
];

export class UserRepositoryOnMem extends Repository implements UserRepository {
  static get userFollowTopic() { return userFollowTopic };
  static get userLoveTags() { return userLoveTags };

  store(user: User, topicIdOrTag?: TopicID|Tag) {
    if (topicIdOrTag instanceof TopicID) {
      if (!userFollowTopic.some(([userIdInt, topicIdInt]) => {
          return user.id.value === userIdInt && topicIdInt === topicIdOrTag.value;
        })) {
        userFollowTopic.push([user.id.value, topicIdOrTag.value]);
      } else {
        userFollowTopic = userFollowTopic.filter(([userIdInt, topicIdInt]) => {
          return !(user.id.value === userIdInt && topicIdInt === topicIdOrTag.value);
        });
      }
      console.log(userFollowTopic)
    } else if (topicIdOrTag instanceof Tag) {
      userLoveTags = userLoveTags.map(([userId, {tagName, loveLevel}]) => {
        if (userId === user.id.value && tagName === topicIdOrTag.id.value) {
          return [userId, { tagName, loveLevel: topicIdOrTag.loveLevel }] as [userId, TagLoveLevel];
        }
        return [userId, {tagName, loveLevel}] as [userId, TagLoveLevel];
      });
    }

    usersMap.set(user.id.value, user);
    this.emitChange();
    return Promise.resolve()
  }

  findById(id: UserID) {
    const user = usersMap.get(id.value);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject(`not found user ${JSON.stringify(id)}`);
  }

  findAll() {
    let users: User[] = [];
    usersMap.forEach(user => {
      users.push(user);
    });
    return Promise.resolve(users);
  }
}

export default new UserRepositoryOnMem();