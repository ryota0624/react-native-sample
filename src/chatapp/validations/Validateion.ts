/**
 * Created by ryota on 2017/10/21.
 */
export class Validation {
  constructor(
    readonly messages: string[] = []
  ) {}

  isSuccess() {
    return this.messages.length === 0;
  }

  hasError() {
    return !this.isSuccess();
  }

  static require(bool: boolean, messages?: string[]): Validation {
    if (bool) {
      return ValidationSuccess;
    } else {
      return new Validation(messages);
    }
  }
}

export function and(...validations: Validation[]): Validation {
  return new Validation(validations.reduce((p, c) => p.concat(c.messages), [] as string[]));
}

export const ValidationSuccess: Validation = new Validation([]);
