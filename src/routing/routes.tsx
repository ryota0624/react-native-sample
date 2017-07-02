import * as React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {PresenterContainer} from "../scene/presenters/PresenterContainer";
import {LoveTagsView} from "../view/userProfile/LoveTagsView";
import {LoveTagsPresenterImpl} from "../scene/presenters/userProfile/LoveTagsPresenter";
import {LoveTagsInteractorImpl} from "../scene/interactors/userProfile/LoveTagsInteractor";
const {
    NativeRouter,
    Route,
} = require('react-router-native');
import {Redirect, Switch} from "react-router";
import {TagTopicsInteractorImpl} from "../scene/interactors/tag/TagTopicsInteractor";
import {TagTopicsPresenter} from "../scene/presenters/tag/TagTopicsPresenter";
import {LoveLevel, Tag, TagName} from "../domains/tag/Tag";
const StackRoute = require('react-router-native/experimental/StackRoute').default;
import {RouteComponentProps} from 'react-router'
import {SyncleRouterReact} from "./Router";
import {TagTopicsView} from "../view/tag/TagTopicsView";
import {HeaderPresenter} from "../scene/presenters/HeaderPresenter";
import {HeaderView} from "../view/general/Header";
import {FollowedTopicsInteractorImpl} from "../scene/interactors/userProfile/FollowedTopicsInteractor";
import {FollowedTopicsPresenterImpl} from "../scene/presenters/userProfile/FollowedTopicsPresenter";
import {FollowedTopicsView} from "../view/userProfile/FollowedTopicsView";
import {CreatedTopicsInteractorImpl} from "../scene/interactors/userProfile/CreatedTopicsInteractor";
import {CreatedTopicsPresenterImpl} from "../scene/presenters/userProfile/CreatedTopicsPresenter";
import {CreatedTopicsView} from "../view/userProfile/CreatedTopicsView";
import {CreateTopicPresenter} from "../scene/presenters/CreateTopicPresenter";
import {CreateTopicInteractorImpl} from "../scene/interactors/CreateTopicInteractor";
import {CreateTopicWidgetView} from "../view/widget/CreateTopicWigetView";


const mockUserId = 10;
export const routes = (
    <NativeRouter>
        <StackRoute path="/" isRoot={true}
                    renderTitle={(props: RouteComponentProps<any>) => {
                        return <Text>syncle</Text>
                    }}
                    renderContent={(props: RouteComponentProps<any>) => {
                        const router = new SyncleRouterReact(props.history);
                        const headerPresenter = new HeaderPresenter(
                            router, HeaderView
                        );
                        const header = <PresenterContainer presenter={headerPresenter}/>;
                        return (
                            <View style={({flex: 1})}>
                                {header}
                                <Text>`syncle: ${props.location.pathname}`</Text>
                                <Switch>
                                    <Route path="/me/loveTags" render={() => {
                                        const interactor = new LoveTagsInteractorImpl();
                                        const presenter = new LoveTagsPresenterImpl(interactor, router, LoveTagsView);
                                        return <PresenterContainer presenter={presenter}/>
                                    }}/>

                                    <Route
                                        path="/me/followTopics"
                                        render={() => {
                                            const interactor = new FollowedTopicsInteractorImpl(mockUserId);
                                            const presenter = new FollowedTopicsPresenterImpl(interactor, FollowedTopicsView);
                                            return <PresenterContainer presenter={presenter}/>;
                                        }}
                                    />

                                    <Route
                                        path="/me/createdTopics"
                                        render={() => {
                                            const interactor = new CreatedTopicsInteractorImpl(mockUserId);
                                            const presenter = new CreatedTopicsPresenterImpl(interactor, CreatedTopicsView);
                                            return <PresenterContainer presenter={presenter}/>
                                        }}
                                    />


                                    <Route
                                        path="/tag/topics"
                                        render={(props: RouteComponentProps<any>) => {
                                        const interactor = new TagTopicsInteractorImpl(mockUserId);
                                        const tmpTag = Tag.factory({
                                            id: props.location.state.tagName,
                                            loveLevel: LoveLevel.Zero
                                        });
                                        const presenter = new TagTopicsPresenter(tmpTag, interactor, TagTopicsView);
                                        return <PresenterContainer presenter={presenter}/>
                                    }}/>

                                    <Route
                                        path="/createTopic"
                                        render={() => {
                                            const interactor = new CreateTopicInteractorImpl(mockUserId);
                                            const presenter = new CreateTopicPresenter(interactor, CreateTopicWidgetView);
                                            return <PresenterContainer presenter={presenter}/>
                                        }}
                                    />
                                    <Redirect from='/' to='/me/loveTags'/>
                                </Switch>
                            </View>
                        );
                    }}
        >
        </StackRoute>
    </NativeRouter>
);
