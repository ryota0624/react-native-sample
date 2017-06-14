import * as React from "react";
import {FollowedTopicsImpl, FollowedTopicsViewContainer} from "../view/userProfile/FollowedTopicsView";
import {LoveTagsFImpl, LoveTagsImpl, LoveTagsViewContainer, LoveTagsViewF} from "../view/userProfile/LoveTags";
import {CreatedTopicsImpl, CreatedTopicsViewContainer} from "../view/userProfile/CreatedTopicsView";
import {HeaderImpl, HeaderViewContainer} from "../view/general/Header";
import {Animated} from "react-native";
import View = Animated.View;
import {LoveTagsF} from "../viewModels/userProfile/LoveTags";


type Component = { forceUpdate: () => void, readly: boolean }

abstract class Router<Pages> {
    protected currentPage: JSX.Element | null = null;

    constructor(private component: Component) {
    }

    registerComponent(component: Component) {
        this.component = component;
    }

    render(page: Pages, ...payloads: any[]): JSX.Element {
        this.currentPage = this._render(page, ...payloads);
        if (this.component.readly) {
            setTimeout(() => this.component.forceUpdate(), 0);
        }
        return this.currentPage;
    }

    protected abstract _render(page: Pages, ...payloads: any[]): JSX.Element;

    page() {
        return this.currentPage;
    }
}


export enum SynclePage {
    Profile,
    TagTopics
}

export class SyncleRouter extends Router<SynclePage> {
    constructor(component: Component,
                private userProfileRouter: SyncleUserProfileRouter) {
        super(component);
    }

    private renderProfile(page: UserProfilePage) {
        return this.userProfileRouter.render(page);
    }

    // renderTagTopics(tag: Tag) {
    //     if (!(tag instanceof Tag)) {
    //         throw new Error(`bad payload ${tag}`);
    //     }
    //
    //     return
    // }

    protected _render(page: SynclePage, ...payloads: any[]): JSX.Element {
        return (
            <View style={{height: 700}}>
                <HeaderViewContainer viewModel={new HeaderImpl(this)}/>
                {this.renderMainContent(page, ...payloads)}
            </View>
        );
    }

    private renderMainContent(page: SynclePage, ...payloads: any[]) {
        switch (page) {
            case SynclePage.Profile:
                return this.renderProfile(payloads[0]);
            // case SynclePage.TagTopics:
            //     return this.renderTagTopics(payloads[0]);
            default: {
                throw new Error('invalid Page')
            }
        }
    }
}

export enum UserProfilePage {
    LoveTags,
    FollowTopics,
    CreatedTopics
}

export class SyncleUserProfileRouter extends Router<UserProfilePage> {
    private renderLoveTags() {
        const viewModel = new LoveTagsFImpl();
        viewModel.getLoveTags();
        viewModel.registerView(LoveTagsViewF);
        return <LoveTagsViewContainer viewModel={viewModel}/>;
    }

    private renderFollowTopics() {
        const viewModel = new FollowedTopicsImpl();
        viewModel.getFollowedTopics();
        return <FollowedTopicsViewContainer viewModel={viewModel}/>;
    }

    private renderCreatedTopics() {
        const viewModel = new CreatedTopicsImpl();
        viewModel.getCreatedTopics();
        return <CreatedTopicsViewContainer viewModel={viewModel}/>
    }

    protected _render(page: UserProfilePage) {
        switch (page) {
            case UserProfilePage.CreatedTopics:
                return this.renderCreatedTopics();
            case UserProfilePage.FollowTopics:
                return this.renderFollowTopics();
            case UserProfilePage.LoveTags:
                return this.renderLoveTags();
            default: {
                throw new Error(`invalid page ${page}`);
            }
        }
    }
}

