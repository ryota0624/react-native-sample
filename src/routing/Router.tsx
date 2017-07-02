import * as React from 'react';
const {
    NativeRouter,
    Route,
} = require('react-router-native');
import {TagName} from "../domains/tag/Tag";
const StackRoute = require('react-router-native/experimental/StackRoute').default;
import * as H from 'history';

export enum SyncleRoute {
    TagTopics,
    CreateTag,
    LoveTags,
    FollowTopics,
    CreatedTopics
}

export interface SyncleRouter {
    moveTagTopics(tag: TagName) :void;
    moveCreateTopic(): void;
    moveLoveTags(): void;
    moveFollowTopics(): void;
    moveCreatedTopics(): void;
    goBack(): void;
}

export class SyncleRouterReact implements SyncleRouter {
    constructor(
        private history: H.History) {
    }

    moveTagTopics(tagName: TagName) {
        this.history.push("/tag/topics", {tagName});
    }

    moveCreateTopic() {
        this.history.push("/createTopic");
    }

    moveCreatedTopics() {
        this.history.push("/me/createdTopics");
    }

    moveFollowTopics() {
        this.history.push("/me/followTopics");
    }

    moveLoveTags() {
        this.history.push("/me/loveTags");
    }

    goBack() {
        this.history.goBack();
    }
}