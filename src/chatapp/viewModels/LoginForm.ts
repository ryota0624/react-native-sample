import {Validation, and} from "../validations/Validateion";
import {validatePassword, validateUserId, maskedString} from "./UserRegisterForm";
/**
 * Created by ryota on 2017/10/21.
 */

export class LoginForm {
  constructor(
    readonly userId: string,
    private password: string
  ) {
  }

  static initial = new LoginForm("", "");

  validateUserId = validateUserId(this.userId);

  validatePassword = validatePassword(this.password);

  validate = and(
    this.validateUserId,
    this.validatePassword
  );

  maskedPassword = maskedString(this.password);

  copy({
    userId = this.userId,
    password = this.password
  }) {
    return new LoginForm(userId, password);
  }
}

