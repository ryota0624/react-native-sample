import * as React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {PresenterContainer} from "../presenterViews/PresenterContainer";
import {LoveTagsView} from "../presenterViews/LoveTagsView";
import {LoveTagsPresenterImpl} from "../presenters/LoveTagsPresenter";
import {LoveTagsInteractorImpl} from "../interactors/LoveTagsInteractor";
const {
    NativeRouter,
    Route,
    Router,
    ...rest
} = require('react-router-native');
import {Switch} from "react-router";


const StackRoute = require('react-router-native/experimental/StackRoute').default;

export enum SyncleRoute {
    TagTopics,
    CreateTag,
    LoveTags,
    FollowTopics,
    CreatedTopics
}

export const routes = (
    <NativeRouter>
        <StackRoute path="/" isRoot={true}
                    renderTitle={() => (<Text>hoghoge</Text>)}
                    renderContent={(props: any) => {
                        return (
                            <Switch>
                                <Route path="/" render={(props: any) => {
                                    const interactor = new LoveTagsInteractorImpl();
                                    const presenter = new LoveTagsPresenterImpl({} as any, interactor, LoveTagsView);
                                    return <PresenterContainer presenter={presenter}/>
                                }}/>

                                <Route path="/" render={(props: any) => {
                                    const interactor = new LoveTagsInteractorImpl();
                                    const presenter = new LoveTagsPresenterImpl({} as any, interactor, LoveTagsView);
                                    return <PresenterContainer presenter={presenter}/>
                                }}/>

                            </Switch>
                        );
                    }}
        >
        </StackRoute>
    </NativeRouter>
);
