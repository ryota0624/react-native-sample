/**
 * Created by ryota on 2017/06/10.
 */
/**
 * Created by ryota on 2017/06/03.
 */
import {EventEmitter} from 'events';
export abstract class EventPublishUseCase<I, O  extends UseCaseEvent> {
    static execute<I, O extends UseCaseEvent>(args: I, EventEmitterKlass: (new() => O), useCase: EventPublishUseCase<I, O>) {
        const eventEmitter = new EventEmitterKlass();
        useCase.doCall(args, eventEmitter)
    }
    protected abstract doCall(args: I, event: O): O;
}

export abstract class UseCaseEvent extends EventEmitter {
}