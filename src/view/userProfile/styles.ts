/**
 * Created by ryota on 2017/06/10.
 */
import {
    StyleSheet,
    Dimensions,
} from "react-native";
export const styles = StyleSheet.create({
    timelineContainer: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    statusBar: {
        height: 20
    },
    tagHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        height: 44,
    },
    tagText: {
        fontSize: 16,
        color: "#ffffff"
    },
    createdTopicsLabel: {
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 28,
        backgroundColor: "#dd6fa1"
    },
    followedTopicsLabel: {
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        height: 28,
        backgroundColor: "#dd6fa1"
    },
    tagContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 28,
        backgroundColor: "#dd6fa1"
    },
    tagTopicsCountText: {
        fontSize: 12,
        color: "#7687a2"
    },
    listView: {
        flex: 1,
        backgroundColor: "#dddddd"
    },
    topicsContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    loveTagLevelZeroContainer: {
        fontSize: 10,
        height: 30,
    },

    loveTagLevelOneContainer: {
        fontSize: 15,
        height: 30,
    },
    loveTagLevelTwoContainer: {
        fontSize: 30,
        height: 30,
    },

    loveTagLevelThreeContainer: {
        fontSize: 45,
        height: 30,
    },

    topicViewContainer: {
        margin: 2,
        width: (Dimensions.get("window").width - 8) / 2,
        height: 100,
    },
    topicImage: {
        flex: 1
    },
    topicTitle: {
        margin: 20,
        fontSize: 12,
        fontWeight: "600",
        color: "white",
        backgroundColor: "transparent",
    },
    topicMetaDataContainer: {
        position: "absolute",
        marginTop: 78,
        flexDirection: "row",
        backgroundColor: "transparent"
    },
    heartIcon: {
        marginLeft: 12,
        width: 16,
        height: 14,
    },
    heartCount: {
        marginLeft: 4,
        fontSize: 12,
        color: "white",
    },
    talkIcon: {
        marginLeft: 6,
        width: 14,
        height: 14,
    },
    talkCount: {
        marginLeft: 2,
        fontSize: 12,
        color: "white",
    },
});
