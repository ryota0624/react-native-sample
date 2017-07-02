import * as React from "react";
import {routes} from "./routing/routes";

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