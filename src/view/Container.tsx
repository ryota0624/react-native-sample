/**
 * Created by ryota on 2017/06/10.
 */
import * as React from "react";
import {ViewModel, ViewStateModel} from "../viewModels/ViewModel";

export abstract class ViewContainer<M extends ViewModel, P extends { viewModel: Readonly<M> }, S> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        props.viewModel.registerView(this);
    }

    componentDidUpdate(prevProps: P) {
        this.props.viewModel.registerView(this);
    }
}

export interface ViewPresenterConnectorProps<S extends object, A extends object> {
    viewModel: ViewStateModel<S, A>
}

export abstract class ViewPresenterConnector<S extends object, A extends object> extends React.Component<ViewPresenterConnectorProps<S, A>, { currentElement: JSX.Element }> {
    constructor(props: {viewModel: ViewStateModel<S, A>}) {
        super(props);
        this.state = {
            currentElement: props.viewModel.getView()
        };
        this.props.viewModel.onChange(view => {
            this.setState({currentElement: view});
        });
    }

    render() {
        return this.state.currentElement;
    }
}