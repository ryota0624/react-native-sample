import * as React from "react";
import {LoveTagsImpl, LoveTagsViewContainer} from "./view/userProfile/LoveTags";
import {SynclePage, SyncleRouter, SyncleUserProfileRouter, UserProfilePage} from "./routing/SyncleRouter";
import {routes} from "./routing/Router";

export default class App extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return routes;
    }
}

{/*<CreateTopicWidgetViewContainer viewModel={new CreateTopicWidgetImpl}/>*/}
{/*<CreatedTopicsViewContainer viewModel={new CreatedTopicsImpl}/>*/}
{/*<FollowedTopicsViewContainer viewModel={new FollowedTopicsImpl}/>*/}
{/*<LoveTagsViewContainer viewModel={new LoveTagsImpl}/>*/}