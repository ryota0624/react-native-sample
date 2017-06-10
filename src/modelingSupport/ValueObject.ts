export class Value<T extends number|string|boolean> {
  constructor(public value: T) {
  }

  get(): T {
    return this.value;
  }

  equals(other: Value<T>) {
    return other.value === this.value;
  }

}

interface ValueObjectInterface<T> {
  copy<C>(args: Partial<T>): C;
}

export function valueObject<T>(defaultValue: T): new(args: T) => Readonly<T&ValueObjectInterface<T>> {
   const Klass = (class {
    copy(args: Partial<this>): this {
      let instance = new Klass(Object.assign({}, this, args)) as any;
      instance.__proto__ = (this as any).__proto__;
      return instance;
    }
    constructor(args: T) {
      Object.keys(args).forEach(key => {
        ((this as any)[key]) = (args as any)[key];
      });
    }

  }) as any;
  return Klass;
}