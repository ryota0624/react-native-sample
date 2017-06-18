/**
 * Created by ryota on 2017/06/18.
 */
import {EventEmitter} from 'eventemitter3';
export abstract class Presenter<State extends object> extends EventEmitter {
    constructor(protected view: (props: State & {presenter: Presenter<State>}) => JSX.Element) {
        super();
        this.state = this.getInitialState;
    }
    abstract get getInitialState(): State;

    private viewUpdate = (nextState: State) => {
        this.state = nextState;
        this.emitChange();
    };
    private state: State;

    getView = () => {
        return this.view(Object.assign({}, this.state, {presenter: this}));
    };
    protected onChange = (fn: (view: JSX.Element) => void) => {
        this.addListener('onChange', fn);
    };
    protected emitChange = () => {
        this.emit('onChange', this.getView());
    };

    protected updater = (fn: (state: Readonly<State>, update: (state: State) => void) => void) => {
        fn(this.state || Object.assign({}, this.getInitialState), this.viewUpdate);
    }
}