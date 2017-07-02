/**
 * Created by ryota on 2017/06/18.
 */
import {EventEmitter} from 'eventemitter3';
export abstract class Presenter<State extends object> extends EventEmitter {
    constructor(protected view: (props: State & {presenter: Presenter<State>}) => JSX.Element) {
        super();
        this._state = this.getInitialState;
    }
    abstract get getInitialState(): State;

    private viewUpdate = (nextState: State) => {
        this._state = Object.assign({}, this._state, nextState);
        this.emitChange();
    };
    private _state: State;

    get state(): Readonly<State> {
        return this._state;
    }

    getView = () => {
        return this.view(Object.assign({}, this._state, {presenter: this}));
    };

    onChange = (fn: (view: JSX.Element) => void) => {
        this.addListener('onChange', fn);
    };

    removeChange = (fn: (view: JSX.Element) => void) => {
      this.removeListener('onChange', fn);
    };
    protected emitChange = () => {
        this.emit('onChange', this.getView());
    };

    protected updater = (fn: (state: Readonly<State>, update: (state: Partial<State>) => void) => void) => {
        fn(this._state || Object.assign({}, this.getInitialState), this.viewUpdate);
    };

    onViewAppear?: () => void;
}