import * as React from "react";
import {FollowedTopicsImpl, FollowedTopicsViewContainer} from "../view/userProfile/FollowedTopicsView";
import {LoveTagsFImpl, LoveTagsImpl, LoveTagsViewContainer, LoveTagsViewF} from "../view/userProfile/LoveTags";
import {CreatedTopicsImpl, CreatedTopicsViewContainer} from "../view/userProfile/CreatedTopicsView";
import {HeaderImpl, HeaderViewContainer} from "../view/general/Header";
import {TagName} from "../domains/tag/Tag";
import {TagTopicsImpl, TagTopicsView, TagTopicsViewContainer} from "../view/tag/TagTopicsView";
import {View} from "react-native";
import {CreateTopicWidgetImpl, CreateTopicWidgetViewContainer} from "../view/widget/CreateTopicWigetView";
import {LoveTagsInteractorImpl} from "../interactors/LoveTagsInteractor";
import {LoveTagsPresenterImpl} from "../presenters/LoveTagsPresenter";
import {LoveTagsView} from "../presenterViews/LoveTagsView";

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
    TagTopics,
    CreateTag
}

export class SyncleRouter extends Router<SynclePage> {
    constructor(component: Component,
                private userProfileRouter: SyncleUserProfileRouter) {
        super(component);
    }

    private renderProfile(page: UserProfilePage) {
        return this.userProfileRouter.render(page);
    }

    private renderCreateTag() {
        const viewModel = new CreateTopicWidgetImpl();
        return <CreateTopicWidgetViewContainer viewModel={viewModel}/>
    }

    private renderTagTopics(tagName: TagName) {
        if (!(tagName instanceof TagName)) {
            throw new Error(`bad payload ${tagName}`);
        }
        const viewModel = new TagTopicsImpl(tagName);
        viewModel.registerView(TagTopicsView);
        viewModel.getTagTopics();
        return <TagTopicsViewContainer viewModel={viewModel} />
    }

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
            case SynclePage.TagTopics:
                return this.renderTagTopics(payloads[0]);
            case SynclePage.CreateTag:
                return this.renderCreateTag();
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
    constructor(component: Component) {
        super(component);
    }

    parent: any;
    registerParent(parent: any) {
        this.parent = parent;
    }
    private renderLoveTags() {
        const viewModel = new LoveTagsFImpl(this.parent);
        viewModel.getLoveTags();
        viewModel.registerView(LoveTagsViewF);
        return <LoveTagsViewContainer viewModel={viewModel}/>;
    }

    private renderLoveTags_() {
        const interactor = new LoveTagsInteractorImpl();
        const presenter = new LoveTagsPresenterImpl(this.parent, interactor, LoveTagsView);
        return presenter.getView();
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

