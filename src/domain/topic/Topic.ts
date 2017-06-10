/**
 * Created by ryota on 2017/06/07.
 */
import {createEntity, Entity} from "../support/Entity";
import {ValueObject} from "../support/ValueObject";
import {UserID} from "../user/User";

const typeTopicID = '_topic_id_type';
export type TopicID = ValueObject<typeof typeTopicID, number>

const typeTopicTitle = '_topic_title_type';
export type TopicTitle = ValueObject<typeof typeTopicTitle, string>

const typeTopicImageUrl = '_topic_image_url_type';
export type TopicImageUrl = ValueObject<typeof typeTopicImageUrl, string>

const typeTopic = '_topic_type';
type Topic = Entity<typeof typeTopic,TopicID> & {
    title: TopicTitle
    imageUrl: TopicImageUrl
    followed: boolean
    createdUserID: UserID
};

export function Topic(id: TopicID, title: TopicTitle, imageUrl: TopicImageUrl, followed: boolean, userId: UserID): Topic {
    return createEntity({followed, id, type: typeTopic, title, imageUrl, createdUserID: userId});
}

export function unFollow(topic: Topic): Topic {
    return {...topic, followed: false};
}

export function follow(topic: Topic): Topic {
    return {...topic, followed: true};
}

