import * as React from "react";
import {View, Text, StyleSheet, TextInput, Button, Picker, ListView, ListViewDataSource,} from "react-native";
import {TagName} from "../../domains/tag/Tag";
import {
    CreateTopicPresenterViewProps, TopicTitleTemplate,
    TopicTitleTemplateNumbers
} from "../../scene/presenters/CreateTopicPresenter";

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


export function CreateTopicWidgetView(props: CreateTopicPresenterViewProps): JSX.Element {
    if (props.visible) {
        const suggestTags = [props.inputFormTagName]
            .concat(props.suggestTags.alreadyTags)
            .concat(props.suggestTags.recentlySeeTags);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1: TagName, r2: TagName) => r1.value !== r2.value
        });

        const tagEditorProps = {...props, ds: dataSource.cloneWithRows(suggestTags)};
        return (<View style={style.inputTitleContainer}>
            <TextInput placeholder="タイトルを入力してください" style={style.inputTitle}
                       onChangeText={props.presenter.setTopicTitle}/>
            <Picker
                selectedValue={props.selectTitleTemplate}
                onValueChange={props.presenter.setTopicTitleTemplate}>
                {
                    TopicTitleTemplateNumbers.map(num => {
                        return <Picker.Item key={num.toString()} label={TopicTitleTemplate[num]}
                                            value={TopicTitleTemplate[num]}/>
                    })
                }
            </Picker>
            <TextInput placeholder="説明文を入力してください" style={style.inputTitle}
                       onChangeText={props.presenter.setTopicDescribe}/>
            <TextInput placeholder="画像URLを入力してください" style={style.inputTitle}
                       onChangeText={props.presenter.setImageUrl}/>
            <TagEditor {...tagEditorProps}/>
            <Button onPress={props.presenter.createTopic} title="作成"/>
            <Button onPress={props.presenter.hide} title="閉じる"/>

        </View>);
    } else {
        return (
            <View>
                <Button
                    title="+"
                    color="#841584"
                    onPress={props.presenter.show}/>
            </View>
        );
    }
}

export function TagEditor(props: CreateTopicPresenterViewProps & { ds: ListViewDataSource }): JSX.Element {
    function renderTag(tag: TagName) {
        return (
            <View onTouchStart={() => props.presenter.appendSelectTags(tag.value)}>
                <Text>{tag.value}</Text>
            </View>
        );
    }

    function renderSeparator(sectionID: number, rowID: number) {
        if (props.inputFormTagName.value.length > 0 && rowID === 0) {
            return <View><Text>既存のタグから選ぶ</Text></View>
        }
        return <Text></Text>
    }

    function renderHeader() {
        if (props.inputFormTagName.value.length > 0) {
            return <Text>新しくタグを作る</Text>
        }
        return <Text>既存のタグから作る</Text>
    }

    const selectTagsNames = props.selectTags.map(tagName => tagName.value).join('|');
    return (
        <View>
            <TextInput placeholder="タグを追加してね" style={style.inputTitle} onChangeText={props.presenter.setTagName}/>
            <Text>{selectTagsNames}</Text>
            <ListView enableEmptySections={true} renderHeader={renderHeader} renderSeparator={renderSeparator}
                      renderRow={renderTag} dataSource={props.ds}/>
        </View>
    );
}
