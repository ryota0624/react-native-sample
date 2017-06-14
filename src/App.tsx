import * as React from "react";
import {LoveTagsImpl, LoveTagsViewContainer} from "./view/userProfile/LoveTags";
import {SynclePage, SyncleRouter, SyncleUserProfileRouter, UserProfilePage} from "./routing/SyncleRouter";

export default class App extends React.Component<any, {router: SyncleRouter}> {
    readly: boolean = false;
    constructor() {
        super();
        const router = new SyncleRouter(this ,new SyncleUserProfileRouter(this));
        router.render(SynclePage.Profile ,UserProfilePage.LoveTags);
        this.state = {
            router
        };
    }

    componentDidMount() {
        this.readly = true;
    }

    componentDidUpdate() {
        this.state.router.registerComponent(this);
    }

    render() {
        return (
            this.state.router.page()
            );
    }
}
{/*<CreateTopicWidgetViewContainer viewModel={new CreateTopicWidgetImpl}/>*/}
{/*<CreatedTopicsViewContainer viewModel={new CreatedTopicsImpl}/>*/}
{/*<FollowedTopicsViewContainer viewModel={new FollowedTopicsImpl}/>*/}
{/*<LoveTagsViewContainer viewModel={new LoveTagsImpl}/>*/}