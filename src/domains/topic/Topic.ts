import {Entity, EntityObject, Validation, ValidationResult} from "../../modelingSupport/Entity";
import {Value} from "../../modelingSupport/ValueObject";
import {UserID} from "../user/User";
/**
 * Created by ryota on 2017/06/03.
 */

export class TopicID extends Value<number> {}
export class TopicTitle extends Value<string> {}
export class TopicDescribe extends Value<string> {}
export class TopicImageUrl extends Value<string> {}

export class Topic implements Entity<TopicID> {
  private constructor(
    public id: TopicID,
    public title: TopicTitle,
    public createdUserId: UserID,
    public describe: TopicDescribe,
    public imageUrl: TopicImageUrl,
    public followed: boolean,
  ) {}

  static factory({id, title, createdUserId, describe, imageUrl, followed}: EntityObject<Topic>): ValidationResult<Readonly<Topic>> {
    const topic = new Topic(id, title, createdUserId, describe, imageUrl, followed);
    return Validation.doCall(topic, new ValidationTopicDescribe(), new ValidationTopicTitle());
  }
}

function updateTopicFollowStatus(followStatus: boolean) {
  return (topicId: TopicID)  => (topic: Topic) => {
    if (topic.id.equals(topicId)) {
      const updatedTopic = Topic.factory({...topic, followed: followStatus});
      if (updatedTopic instanceof Topic) {
        return updatedTopic;
      } else {
        throw new Error(`invalid topic here ${topic}`)
      }
    }
    return topic;
  }
}

export function followTopic(topicId: TopicID) {
  return (topic: Topic) => {
    return updateTopicFollowStatus(true)(topicId)(topic);
  }
}

export function unFollowTopic(topicId: TopicID) {
  return (topic: Topic) => {
    return updateTopicFollowStatus(false)(topicId)(topic);
  }
}



export class ValidationTopicTitle extends Validation<Topic> {
  doCall(topic: Topic): ValidationResult<Topic> {
    if (topic.title.value.length > 0 && topic.title.value.length <= 20) {
      return topic;
    }
    return this.fail("invalid topic title length");
  }
}

export class ValidationTopicDescribe extends Validation<Topic> {
  doCall(topic: Topic): ValidationResult<Topic> {
    if (topic.describe.value.length > 0 && topic.describe.value.length <= 100) {
      return topic;
    }
    return this.fail("invalid topic describe length");
  }
}