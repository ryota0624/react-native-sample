import * as React from "react";
import {Presenter} from "../presenters/Presenter";

export class PresenterContainer extends React.Component<{presenter: Presenter<any>}, {currentView: JSX.Element}> {
    constructor(props: any) {
        super(props);
    }

    handleChangeView = (view: JSX.Element) => {
        this.setState({currentView: view});
    };
    componentDidMount() {
        this.props.presenter.onChange(this.handleChangeView);
        if (this.props.presenter.onViewAppear) {
            this.props.presenter.onViewAppear();
        }
    }

    componentWillUnmount() {
        this.props.presenter.removeChange(this.handleChangeView);
    }

    render() {
        return this.props.presenter.getView();
    }
}