/**
 * Created by ryota on 2017/06/10.
 */
import * as React from "react";
import {FollowedTopicsViewProps} from "../../scene/presenters/userProfile/FollowedTopicsPresenter";
import {
    Image, View, Text, StyleSheet, TextInput, Button, Picker, ListView, ListViewDataSource,
    Dimensions, Animated, TouchableOpacity, ScrollView,
} from "react-native";
import {styles} from "./styles";

import {Topic} from "../../domains/topic/Topic";


export function FollowedTopicsView(props: FollowedTopicsViewProps) {
    return (
        <View style={styles.timelineContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.tagHeaderContainer}>
                <TouchableOpacity style={styles.followedTopicsLabel}>
                    <Text style={styles.tagText}>{"❤️トピック"}</Text>
                </TouchableOpacity>
                <Text style={styles.tagTopicsCountText}>{`${props.topics.length}トピック`}</Text>
            </View>
            <ScrollView
                style={styles.listView}
                contentContainerStyle={styles.topicsContainer}>
                {props.topics.map(topic =>
                    <TopicView
                        followAction={() => topic.followed ?
                            props.presenter.unFollowTopic(topic.id.value) :
                            props.presenter.followTopic(topic.id.value)}
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
