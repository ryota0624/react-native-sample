import {Topic, TopicDescribe, TopicID, TopicImageUrl, TopicTitle} from "../../domains/topic/Topic";
import {UserID} from "../../domains/user/User";



export function topic2Dto(topic: Topic) {
    return {
        id: topic.id.value,
        title: topic.title.value,
        createdUserId: topic.createdUserId.value,
        describe: topic.describe.value,
        imageUrl: topic.imageUrl.value,
        followed: topic.followed ? 1 : 0
    }
}

export function dto2Topic(dto: any): Topic {
    const id = new TopicID(dto.id);
    const title = new TopicTitle(dto.title);
    const createdUserId = new UserID(dto.createdUserId);
    const describe = new TopicDescribe(dto.describe);
    const imageUrl = new TopicImageUrl(dto.imageUrl);
    const followed = dto.followed === 1;
    const topic = Topic.factory({
        id, title, createdUserId, describe, imageUrl, followed
    });

    if (topic instanceof Topic) {
        return topic;
    }

    throw new Error(topic.reason);
}