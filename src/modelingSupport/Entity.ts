import {Value} from "./ValueObject";
export interface Entity<Identity extends Value<number|string>> {
  id: Identity;
}

export type EntityObject<T> = {
  [P in keyof T]: T[P];
  };


export class InvalidValidation {
  constructor(public reason: string) {}
}

export type ValidationResult<E> = InvalidValidation | E;
export abstract class Validation<E extends Entity<Value<number|string>>> {
  static doCall<T extends Entity<Value<number|string>>>(entity: T, ...validations: Validation<T>[]): T | InvalidValidation {
    const validationResults = validations.map((validation) => {
      return validation.doCall(entity);
    });
    const isFail = validationResults.some(result => result instanceof InvalidValidation);
    if (isFail) {
      const validationResultReason = validationResults.reduce((invalidReasonStrings, invalidValidation) => {
        if (invalidValidation instanceof InvalidValidation) {
          return `${invalidReasonStrings}\n${invalidValidation.reason}`;
        }
        return "";
      }, "");

      return new InvalidValidation(validationResultReason);
    }
    return entity;
  }
  protected abstract doCall(entity: E): InvalidValidation | E;
  protected fail(reason: string) {
    return new InvalidValidation(reason);
  }
}