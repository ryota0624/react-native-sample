import {Repository} from "../../domains/Repository";
import {TopicReadRepository, TopicWriteRepository} from "../../domains/topic/TopicRepository";
import {Topic, TopicID, TopicTitle, TopicDescribe, TopicImageUrl} from "../../domains/topic/Topic";
import {UserRepositoryOnMem} from "./UserRepositoryOnMem";
import {UserID} from "../../domains/user/User";
import {TagName} from "../../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */
let topicsMap: Map<number, Topic> = new Map(
  [
    [1 ,Topic.factory({
      id: new TopicID(1),
      title: new TopicTitle("sample"),
      createdUserId: new UserID(100),
      describe: new TopicDescribe("sample\nsamle"),
      imageUrl: new TopicImageUrl("http://the-rich-secret.com/wp-content/uploads/2014/07/kinnun-gazou.png"),
      followed: true,
    }) as Topic],
    [2 ,Topic.factory({
      id: new TopicID(2),
      title: new TopicTitle("sample2"),
      createdUserId: new UserID(10),
      describe: new TopicDescribe("sample\nsamle"),
      imageUrl: new TopicImageUrl("https://pbs.twimg.com/profile_images/3406268893/54b7e1f981b7df7c817af48d1b96ad5e_400x400.jpeg"),
      followed: false,
    }) as Topic]
  ]
);

let topicRelTag: [TopicID, TagName][] = [
    [new TopicID(1), new TagName("お札")]
];

export class TopicRepositoryOnMem extends Repository implements TopicReadRepository, TopicWriteRepository {
  static get topicRelTag() { return topicRelTag };
  store(topic: Topic, tagIds: TagName[]) {
    topicsMap.set(topic.id.value, topic);
    tagIds.forEach(tagId => {
      topicRelTag.push([topic.id, tagId]);
    });
    UserRepositoryOnMem.userFollowTopic.push([topic.createdUserId.value, topic.id.value]);
    this.emitChange();
    return Promise.resolve();
  }

  findById(id: TopicID) {
    const topic = topicsMap.get(id.value);
    if (topic) {
      return Promise.resolve(topic);
    }
    return Promise.reject(`not find Topic ${JSON.stringify(id)}`);
  }

  findAll() {
    let topics: Topic[] = [];
    topicsMap.forEach(user => {
      topics.push(user);
    });
    return Promise.resolve(topics);
  }

  findByTagName(tagName: TagName) {
    const topicIds = topicRelTag.filter(([topicId, otherTagName]) => {
      return tagName.equals(otherTagName);
    }).map(([topicId]) => topicId);
    const topicPromises = topicIds.map(this.findById.bind(this));
    return Promise.all(topicPromises);
  }

  findUserFollows(userId: UserID) {
    const topicPromises = UserRepositoryOnMem.userFollowTopic.filter(([userIdInt]) => {
      return userIdInt === userId.value;
    }).map(([_, topicId]) => {
      return this.findById(new TopicID(topicId)).then((topic: any) => {
        topic.followed = true;
        return topic as Readonly<Topic>;
      });
    });

    return Promise.all(topicPromises);
  }
}

export default new TopicRepositoryOnMem();