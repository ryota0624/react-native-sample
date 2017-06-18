/**
 * Created by ryota on 2017/06/10.
 */
import * as React from "react";
import {FollowedTopics} from "../../viewModels/userProfile/FollowedTopics";
import {
    View, Text, StyleSheet, TextInput, Button, Picker, ListView, ListViewDataSource,
    Dimensions, Animated, TouchableOpacity, ScrollView,
} from "react-native";
import {styles} from "./styles";
import Image = Animated.Image;
import {Topic} from "../../domains/topic/Topic";
import UserRepositoryOnMem from "../../adaptors/Memory/UserRepositoryOnMem";
import TopicRepositoryOnMem from "../../adaptors/Memory/TopicRepositoryOnMem";
import {ViewContainer} from "../Container";


interface FollowedTopicsViewProps {
    viewModel: Readonly<FollowedTopics>
}
export function FollowedTopicsView(props: FollowedTopicsViewProps) {
    return (
        <View style={styles.timelineContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.tagHeaderContainer}>
                <TouchableOpacity style={styles.followedTopicsLabel}>
                    <Text style={styles.tagText}>{"❤️トピック"}</Text>
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

interface FollowedTopicsViewContainerProps {
    viewModel: Readonly<FollowedTopics>
}

export class FollowedTopicsViewContainer extends ViewContainer<FollowedTopics, FollowedTopicsViewContainerProps, {}> {
    render() {
        const {viewModel} = this.props;
        return (
            <FollowedTopicsView viewModel={viewModel}/>
        );
    }
}

export class FollowedTopicsImpl extends FollowedTopics {
    userId = 10;
    userRepository = UserRepositoryOnMem;
    topicRepository = TopicRepositoryOnMem
}