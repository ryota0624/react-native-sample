import {TopicReadRepository} from "../../domains/topic/TopicRepository";
import {GetUserCreatedTopicUseCase} from "../../usecases/GetUserCreatedTopicUseCase";
import {UserRepository} from "../../domains/user/UserRepository";
import {UseCase} from "../../usecases/UseCase";
import {Loading, ViewModel} from "../ViewModel";
import {Topic} from "../../domains/topic/Topic";
import {UserFollowTopicUseCase} from "../../usecases/UserFollowTopicUseCase";
import {UserUnFollowTopicUseCase} from "../../usecases/UserUnFollowTopicUseCase";

export abstract class CreatedTopics extends ViewModel {
    abstract topicRepository: TopicReadRepository;
    abstract userRepository: UserRepository;
    abstract userId: number;
    topics: Topic[] = [];
    loading: Loading = Loading.Initial;
    followTopic = (topicIdNum: number) => {
        const useCase = new UserFollowTopicUseCase(this.topicRepository, this.userRepository);
        UseCase.execute({userId: this.userId, topicId: topicIdNum} ,useCase);
        useCase.onResult(updatedTopicId => {
            this.topics  = this.topics.map(topic => {
               if (topic.id.equals(updatedTopicId)) {
                   return Topic.factory({...topic, followed: true});
               }
               return topic;
            })as any;

            this.viewUpdate();
        });
    };

    unFollowTopic = (topicIdNum: number) => {
        const useCase = new UserUnFollowTopicUseCase(this.topicRepository, this.userRepository);
        UseCase.execute({userId: this.userId, topicId: topicIdNum} ,useCase);
        useCase.onResult(updatedTopicId => {
            this.topics = this.topics.map(topic => {
                if (topic.id.equals(updatedTopicId)) {
                    return Topic.factory({...topic, followed: false});
                }
                return topic;
            })as any;

            this.viewUpdate();
        });
    };

    getCreatedTopics = () => {
        const useCase = new GetUserCreatedTopicUseCase(this.userRepository ,this.topicRepository);
        UseCase.execute({userId:this.userId} ,useCase);
        useCase.onStart(() => {
            this.loading = Loading.Initial;
            this.viewUpdate()
        });

        useCase.onResult(topics => {
           this.topics = topics;
           this.loading = Loading.Fulfill;
           this.viewUpdate();
        });
    }
}