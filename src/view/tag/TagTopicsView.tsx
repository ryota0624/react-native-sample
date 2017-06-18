import * as React from "react";
import {TagTopicsActions, TagTopicsState, TagTopics} from "../../viewModels/tag/TagTopics";
import {View, Image, TouchableOpacity, ScrollView, Text} from "react-native";
import {ViewPresenterConnector, ViewPresenterConnectorProps} from "../Container";
import TagRepositoryOnMem from "../../adaptors/Memory/TagRepositoryOnMem";
import UserRepositoryOnMem from "../../adaptors/Memory/UserRepositoryOnMem";
import {styles} from "../userProfile/styles";
import TopicRepositoryOnMem from "../../adaptors/Memory/TopicRepositoryOnMem";
import {Topic} from "../../domains/topic/Topic";

type TagTopicsViewProps = TagTopicsState & TagTopicsActions;

export function TagTopicsView(props: TagTopicsViewProps) {
    return (
        <View style={styles.timelineContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.tagHeaderContainer}>
                <TouchableOpacity style={styles.followedTopicsLabel}>
                    <Text style={styles.tagText}>{props.tagName.value}</Text>
                </TouchableOpacity>
                <Text style={styles.tagTopicsCountText}>{`${props.topics.length}トピック`}</Text>
            </View>
            <ScrollView
                style={styles.listView}
                contentContainerStyle={styles.topicsContainer}>
                {props.topics.map(topic => <TopicView key={topic.id.value} topic={topic}/>)}
            </ScrollView>
        </View>
    );
}

function TopicView({topic}: { topic: Topic }) {
    return (
        <View style={styles.topicViewContainer}>
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

export interface TagTopicsViewContainerProps extends ViewPresenterConnectorProps<TagTopicsState, TagTopicsActions> {}

export class TagTopicsViewContainer extends ViewPresenterConnector<TagTopicsState, TagTopicsActions> {
    constructor(props: TagTopicsViewContainerProps) {
        super(props);
        this.state = {
            currentElement: props.viewModel.getView()
        };
        this.props.viewModel.onChange(view => {
            this.setState({currentElement: view});
        });
    }

    render() {
        const {viewModel} = this.props;
        return this.state.currentElement;
    }
}

export class TagTopicsImpl extends TagTopics {
    userId = 10;
    tagRepository = TagRepositoryOnMem;
    userRepository = UserRepositoryOnMem;
    topicReadRepository = TopicRepositoryOnMem;
}
