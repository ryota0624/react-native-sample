import {UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {TopicWriteRepository} from "../domains/topic/TopicRepository";
import {TopicID, Topic, TopicTitle, TopicDescribe, TopicImageUrl} from "../domains/topic/Topic";
import {UseCase} from "./UseCase";
import {TagRepository} from "../domains/tag/TagRepository";
import {ValidationResult, InvalidValidation} from "../../modelingSupport/Entity";
import {TagName, Tag, LoveLevel} from "../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */

function randomInt(): number {
  return Math.random() * 1000
}

export class TopicDTO {
  constructor(
    public title: string,
    public describe: string,
    public imageUrl: string,
  ) {}
}

function topicDto2Entity(createUserId: number, dto: TopicDTO): ValidationResult<Topic> {
  return Topic.factory({
    id: new TopicID(randomInt()),
    title: new TopicTitle(dto.title),
    createdUserId: new UserID(createUserId),
    describe: new TopicDescribe(dto.describe),
    imageUrl: new TopicImageUrl(dto.imageUrl),
    followed: true,
  })
}
export interface CreateTopicArgs {
  userId: number;
  topicDto: TopicDTO;
  tagNames: string[]
}


export class CreateTopic extends UseCase<CreateTopicArgs, Topic> {
  constructor(private topicRepository: TopicWriteRepository,
              private tagRepository: TagRepository
  ) {
    super();
  }

  protected doCall({userId, topicDto, tagNames}: CreateTopicArgs) {
    const tags = tagNames.map(this.createTag);
    return  this.createTopic(userId, topicDto).then((topic) => {
      return Promise.all([
        this.topicRepository.store(topic, tags.map(tag => tag.id)).then(() => topic),
        this.tagRepository.bulkStore(tags)])
    }).then(([topic]) => topic);
  }

  private createTag(tagName: string): Tag {
    return Tag.factory({id: new TagName(tagName), loveLevel: LoveLevel.One})
  }

  private createTopic(userId: number, topicDto: TopicDTO): Promise<Topic> {
    const topicEntity = topicDto2Entity(userId ,topicDto);
    if (topicEntity instanceof InvalidValidation) {
      return Promise.reject(topicEntity.reason);
    }
    return Promise.resolve(topicEntity);
  }
}

export interface UseCreateTopic {
  userFollowTopic: CreateTopic;
}