import * as React from "react";
import {LoveTags, LoveTagsAction, LoveTagsF, LoveTagsState} from "../../viewModels/userProfile/LoveTags";
import {View, Animated, Button, FlatList, TouchableOpacity} from "react-native";
import Text = Animated.Text;
import {Tag, name, LoveLevel} from "../../domains/tag/Tag";
import {ViewContainer, ViewPresenterConnector, ViewPresenterConnectorProps} from "../Container";
import TagRepositoryOnMem from "../../adaptors/Memory/TagRepositoryOnMem";
import UserRepositoryOnMem from "../../adaptors/Memory/UserRepositoryOnMem";
import {styles} from "./styles";


export function LoveTagsViewF(props: LoveTagsState & LoveTagsAction) {
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
                <View onTouchStart={() => props.transitionToTagTopics(tag.id.value)}>
                    <Text style={style}>{tag.id.value}</Text>
                </View>
                <Button
                    title="love"
                    onPress={() => props.loveTag(tag.id.value)} />
            </View>
        );
    }

    const flatListData = props.tags.map((tag) => {
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

export interface LoveTagsViewContainerProps extends ViewPresenterConnectorProps<LoveTagsState, LoveTagsAction> {}
export class LoveTagsViewContainer extends ViewPresenterConnector<LoveTagsState, LoveTagsAction> {
}

export class LoveTagsImpl extends LoveTags {
    userId = 10;
    tagRepository = TagRepositoryOnMem;
    userRepository = UserRepositoryOnMem;
}

export class LoveTagsFImpl extends LoveTagsF {
    userId = 10;
    tagRepository = TagRepositoryOnMem;
    userRepository = UserRepositoryOnMem;
}