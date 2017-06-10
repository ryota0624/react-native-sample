/**
 * Created by ryota on 2017/06/10.
 */
import * as React from "react";
import {ViewModel} from "../viewModels/ViewModel";

export abstract class ViewContainer<M extends ViewModel, P extends {viewModel: Readonly<M>}, S> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        props.viewModel.registerView(this);
    }
    componentDidUpdate(prevProps: P) {
        this.props.viewModel.registerView(this);
    }
}