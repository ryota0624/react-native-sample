import * as React from "react";
import {ViewContainer} from "../Container";
import {Header} from "../../viewModels/general/Header";
import {Text, View} from "react-native";
import {styles} from "./styles";


function HeaderView(props: {viewModel: Header}) {
    return (
        <View style={styles.headerContainer}>
            <Text onPress={() => props.viewModel.transitionUserFollowTopics()}>followTopics</Text>
            <Text onPress={() => props.viewModel.transitionUserLoveTags()}>loveTags</Text>
            <Text onPress={() => props.viewModel.transitionUserCreatedTopics()}>createdTopics</Text>
        </View>);
}
interface HeaderViewContainerProps {
    viewModel: Header
}
export class HeaderViewContainer extends ViewContainer<Header, HeaderViewContainerProps, {}> {
    render() {
        return <HeaderView viewModel={this.props.viewModel} />
    }
}

export class HeaderImpl extends Header {
}