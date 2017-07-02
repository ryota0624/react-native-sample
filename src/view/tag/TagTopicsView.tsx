import * as React from "react";
import {View, Image, TouchableOpacity, ScrollView, Text} from "react-native";
import {styles} from "../userProfile/styles";
import {Topic} from "../../domains/topic/Topic";
import {TagTopicsPresenterViewProps, TagTopicsViewType} from "../../scene/presenters/tag/TagTopicsPresenter";

export function TagTopicsView(props: TagTopicsPresenterViewProps) {
    if (props.tag === null) {
        return <View/>
    }
    return (
        <View style={styles.timelineContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.tagHeaderContainer}>
                <TouchableOpacity style={styles.followedTopicsLabel}>
                    <Text style={styles.tagText}>{props.tag.id.value}</Text>
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
