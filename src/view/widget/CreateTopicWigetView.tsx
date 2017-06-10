import * as React from "react";
import {View, Text, StyleSheet, TextInput, Button, Picker, ListView, ListViewDataSource,} from "react-native";
import {CreateTopicWidget, TopicTitleTemplate} from "../../viewModels/widget/CreateTopicWidget";
import TagRepositoryOnMem from "../../adaptors/Memory/TagRepositoryOnMem";
import TopicRepositoryOnMem from "../../adaptors/Memory/TopicRepositoryOnMem";
import {TagName} from "../../domains/tag/Tag";
import {ViewContainer} from "../Container";

const style = StyleSheet.create({
    inputTitleContainer: {
        padding: 30
    },
    inputTitle: {
        height: 40
    },
    buttonContainer: {
        padding: 30,
        width: 100,
        backgroundColor: "#898899"
    },
    button: {}
});
interface CreateTopicWidgetViewProps {
    viewModel: Readonly<CreateTopicWidget>,
    tagDataSource: ListViewDataSource,
}

export function CreateTopicWidgetView(props: CreateTopicWidgetViewProps): JSX.Element {
    if (props.viewModel.visible) {
        const viewModel = props.viewModel;
        return (<View style={style.inputTitleContainer}>
            <TextInput placeholder="タイトルを入力してください" style={style.inputTitle} onChangeText={props.viewModel.setTopicTitle}/>
            <Picker
                selectedValue={viewModel.selectTitleTemplate}
                onValueChange={viewModel.setTopicTitleTemplate}>
                {
                    CreateTopicWidget.TopicTitleTemplateNumbers.map(num => {
                        return <Picker.Item key={num.toString()} label={TopicTitleTemplate[num]}
                                            value={TopicTitleTemplate[num]}/>
                    })
                }
            </Picker>
            <TextInput placeholder="説明文を入力してください" style={style.inputTitle} onChangeText={viewModel.setTopicDescribe}/>
            <TextInput placeholder="画像URLを入力してください" style={style.inputTitle} onChangeText={viewModel.setImageUrl}/>
            <TagEditor {...props}/>
            <Button onPress={viewModel.createTopic} title="作成" />
            <Button onPress={viewModel.hide} title="閉じる" />

        </View>);
    } else {
        return (
            <View>
                <Button
                    title="+"
                    color="#841584"
                    onPress={props.viewModel.show}/>
            </View>
        );
    }
}

export function TagEditor(props: CreateTopicWidgetViewProps): JSX.Element {
    const {viewModel} = props;
    function renderTag(tag: TagName) {
        return (
            <View onTouchStart={() => viewModel.appendSelectTags(tag.value)}>
                <Text>{tag.value}</Text>
            </View>
        );
    }
    function renderSeparator(sectionID: number, rowID: number) {
        if (props.viewModel.inputFormTagName.value.length > 0 && rowID === 0) {
            return <View><Text>既存のタグから選ぶ</Text></View>
        }
        return <Text></Text>
    }
    function renderHeader() {
        if (props.viewModel.inputFormTagName.value.length > 0) {
            return <Text>新しくタグを作る</Text>
        }
        return  <Text>既存のタグから作る</Text>
    }
    const selectTagsNames = viewModel.selectTags.map(tagName => tagName.value).join('|');
    return (
        <View>
            <TextInput placeholder="タグを追加してね" style={style.inputTitle} onChangeText={viewModel.setTagName}/>
            <Text>{selectTagsNames}</Text>
            <ListView enableEmptySections={true} renderHeader={renderHeader} renderSeparator={renderSeparator} renderRow={renderTag} dataSource={props.tagDataSource}/>
        </View>
    );
}

interface CreateTopicWidgetViewContainerProps {
    viewModel: CreateTopicWidget
}
interface CreateTopicWidgetViewContainerState {
    tagDataSource: ListViewDataSource
}
export class CreateTopicWidgetViewContainer extends ViewContainer<CreateTopicWidget, CreateTopicWidgetViewContainerProps, CreateTopicWidgetViewContainerState> {
    constructor(props: CreateTopicWidgetViewContainerProps) {
        super(props);
        const ds = new ListView.DataSource({
           rowHasChanged: (r1: TagName, r2: TagName) => r1.value !== r2.value
        });

        this.state = {
           tagDataSource: ds
        }
    }

    render() {
        const {viewModel} = this.props;
        const suggestTags = [this.props.viewModel.inputFormTagName]
            .concat(this.props.viewModel.suggestTags.alreadyTags)
            .concat(this.props.viewModel.suggestTags.recentlySeeTags);
        return (
            <CreateTopicWidgetView
                viewModel={viewModel}
                tagDataSource={this.state.tagDataSource.cloneWithRows(suggestTags)}
            />
        );
    }
}

export class CreateTopicWidgetImpl extends CreateTopicWidget {
    userId = 10;
    tagRepository = TagRepositoryOnMem;
    topicRepository = TopicRepositoryOnMem;
}

