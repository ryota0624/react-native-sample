import * as React from "react";

import {Text, View} from "react-native";
import {styles} from "./styles";
import {HeaderPresenterViewProps} from "../../scene/presenters/HeaderPresenter";


export function HeaderView(props: HeaderPresenterViewProps) {
    return (
        <View style={styles.headerContainer}>
            <Text onPress={() => props.presenter.transitionUserFollowTopics()}>followTopics</Text>
            <Text onPress={() => props.presenter.transitionUserLoveTags()}>loveTags</Text>
            <Text onPress={() => props.presenter.transitionUserCreatedTopics()}>createdTopics</Text>
            <Text onPress={() => props.presenter.transitionCreateTopic()}>createTopic</Text>
        </View>);
}