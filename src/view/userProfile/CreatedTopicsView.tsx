/**
 * Created by ryota on 2017/06/10.
 */
import * as React from "react";
import {CreatedTopics} from "../../viewModels/userProfile/CreatedTopics";
import {
    View, Text, Image, TouchableOpacity, ScrollView,
} from "react-native";
import {styles} from "./styles";
import {Topic} from "../../domains/topic/Topic";
import UserRepositoryOnMem from "../../adaptors/Memory/UserRepositoryOnMem";
import TopicRepositoryOnMem from "../../adaptors/Memory/TopicRepositoryOnMem";
import {ViewContainer} from "../Container";


interface CreatedTopicsViewProps {
    viewModel: Readonly<CreatedTopics>
}
export function CreatedTopicsView(props: CreatedTopicsViewProps) {
    return (
        <View style={styles.timelineContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.tagHeaderContainer}>
                <TouchableOpacity style={styles.createdTopicsLabel}>
                    <Text style={styles.tagText}>{"投稿トピック"}</Text>
                </TouchableOpacity>
                <Text style={styles.tagTopicsCountText}>{`${props.viewModel.topics.length}トピック`}</Text>
            </View>
            <ScrollView
                style={styles.listView}
                contentContainerStyle={styles.topicsContainer}>
                {props.viewModel.topics.map(topic =>
                    <TopicView
                        followAction={() => topic.followed ?  props.viewModel.unFollowTopic(topic.id.value) : props.viewModel.followTopic(topic.id.value)}
                        key={topic.id.value}
                        topic={topic}
                    />)}
            </ScrollView>
        </View>
    );
}

export function TopicView({topic, followAction}: { topic: Topic, followAction: () => void }) {
    return (
        <View onTouchStart={followAction} style={styles.topicViewContainer}>
            <Image style={styles.topicImage} source={{uri: topic.imageUrl.value}}>
                <Text style={styles.topicTitle}>{topic.title.value}</Text>
                <Text style={styles.topicTitle}>{topic.followed ? "followed" : "none follow"}</Text>
                <View style={styles.topicMetaDataContainer}>
                    <Image style={styles.heartIcon} source={require('../icons/talk_heart_count_icon.png')}/>
                    <Text style={styles.heartCount}>"10"</Text>
                    <Image style={styles.talkIcon} source={require('../icons/talk_comment_count_icon.png')}/>
                    <Text style={styles.talkCount}>"10"</Text>
                </View>
            </Image>
        </View>
    );
}

interface CreatedTopicsViewContainerProps {
    viewModel: Readonly<CreatedTopics>
}

export class CreatedTopicsViewContainer extends ViewContainer<CreatedTopics, CreatedTopicsViewContainerProps, {}> {
    render() {
        const {viewModel} = this.props;
        return (
            <CreatedTopicsView viewModel={viewModel}/>
        );
    }
}

export class CreatedTopicsImpl extends CreatedTopics {
    userId = 10;
    userRepository = UserRepositoryOnMem;
    topicRepository = TopicRepositoryOnMem
}