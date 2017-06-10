/**
 * Created by ryota on 2017/06/10.
 */

export abstract class ViewModel {
    protected viewUpdate: () => void;

    registerView = (view: {forceUpdate: () => void}) => {
        this.viewUpdate = () => view.forceUpdate();
    }
}