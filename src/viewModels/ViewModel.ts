/**
 * Created by ryota on 2017/06/10.
 */
import {EventEmitter} from 'eventemitter3';
export enum Loading {
    Fulfill,
    Initial
}
export abstract class ViewModel {
    protected viewUpdate: () => void;

    registerView = (view: {forceUpdate: () => void}) => {
        this.viewUpdate = () => view.forceUpdate();
    }
}

export abstract class ViewStateModel<State extends object, Actions extends object> extends EventEmitter {
    onChange = (fn: (view: JSX.Element) => void) => {
        this.addListener('onChange', fn);
    };
    emitChange = () => {
        const view = this.view;
        this.emit('onChange', view);
    };
    getView = () => {
        return this.view as JSX.Element
    };
    private viewUpdate: (state: State) => void = () => {
        console.log('yet set update')
    };
    private state: State;
    abstract get initialState(): State;
    abstract get viewActions() : Actions;
    private actions: Actions;
    private view: JSX.Element|null = null;
    registerView = (view: (state: State & Actions) => JSX.Element) => {
        this.viewUpdate = (nextState: State) => {
            this.state = nextState;
            const props: any = this.state;
            this.view = view(props);
            this.emitChange();
        };
    };

    updater = (fn: (state: Readonly<State>, update: (state: State) => void) => void) => {
        fn(this.state || Object.assign({}, this.initialState, this.viewActions), this.viewUpdate);
    }
}