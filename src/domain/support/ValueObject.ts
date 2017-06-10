/**
 * Created by ryota on 2017/06/07.
 */
export type ValueObject<T extends string, V> = {
    type: T
    value: V
}

export function valueObject<T extends string, V>(type: T, value: V): ValueObject<T, V> {
    return {type, value};
}