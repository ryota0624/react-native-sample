import * as React from "react";
import {LoveTagsPresenter, LoveTagsViewProps} from "../presenters/LoveTagsPresenter";
import {LoveLevel, Tag} from "../domains/tag/Tag";
import {styles} from "../view/userProfile/styles";
import {Animated, Button, FlatList, TouchableOpacity, View, Text} from "react-native";


export function LoveTagsView({presenter, tags}: LoveTagsViewProps): JSX.Element {
    function renderTag({item: {tag}}: { item: { tag: Tag } }) {
        const style = (function (loveLevel: LoveLevel) {
            switch (loveLevel) {
                case LoveLevel.One:
                    return styles.loveTagLevelOneContainer;
                case LoveLevel.Two:
                    return styles.loveTagLevelTwoContainer;
                case LoveLevel.Three:
                    return styles.loveTagLevelThreeContainer;
                default: {
                    return styles.loveTagLevelZeroContainer;
                }
            }
        })(tag.loveLevel);
        return (
            <View>
                <View onTouchStart={() => presenter.transitionToTagTopics(tag.id)}>
                    <Text style={style}>{tag.id.value}</Text>
                </View>
                <Button
                    title="love"
                    onPress={() => presenter.changeLoveLevel(tag.id)} />
            </View>
        );
    }

    const flatListData = tags.map((tag) => {
        return {key: tag.id.value, tag}
    });
    return (
        <View style={styles.timelineContainer}>
            {/*<View style={styles.statusBar}/>*/}
            <View style={styles.tagHeaderContainer}>
                <TouchableOpacity style={styles.followedTopicsLabel}>
                    <Text style={styles.tagText}>{"❤️タグ"}</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={flatListData} renderItem={renderTag}>
            </FlatList>
        </View>
    )
}