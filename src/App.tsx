import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import {
    CreateTopicWidgetImpl, CreateTopicWidgetView,
    CreateTopicWidgetViewContainer
} from "./view/widget/CreateTopicWigetView";
import {CreatedTopicsImpl, CreatedTopicsViewContainer} from "./view/userProfile/CreatedTopicsView";

export default class App extends React.Component<any, any> {
    render() {
        return (
                <CreatedTopicsViewContainer viewModel={new CreatedTopicsImpl}/>
            );
    }
}
{/*<CreateTopicWidgetViewContainer viewModel={new CreateTopicWidgetImpl}/>*/}
