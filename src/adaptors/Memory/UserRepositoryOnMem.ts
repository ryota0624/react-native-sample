import {UserRepository} from "../../domains/user/UserRepository";
import {User, UserID, UserName} from "../../domains/user/User";
import {TopicID} from "../../domains/topic/Topic";
import {Repository} from "../../domains/Repository";
/**
 * Created by ryota on 2017/06/03.
 */

let usersMap: Map<number, User> = new Map([
  [10, User.factory({id: new UserID(10), name: new UserName("su")})]
]);
let userFollowTopic: [number, number][] = [[10, 1]];

export class UserRepositoryOnMem extends Repository implements UserRepository {
  static userFollowTopic = userFollowTopic;

  store(user: User, topicId?: TopicID) {
    if (topicId) {
      if (!userFollowTopic.some(([userIdInt, topicIdInt]) => {
          return user.id.value === userIdInt && topicIdInt === topicId.value;
        })) {
        userFollowTopic.push([user.id.value, topicId.value]);
      }
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