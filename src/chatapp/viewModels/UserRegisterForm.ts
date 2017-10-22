import {Validation, and} from "../validations/Validateion";
/**
 * Created by ryota on 2017/10/21.
 */

export class UserRegisterForm {
  constructor(
    readonly userId: string,
    readonly password: string,
    readonly imgUrl: string
  ) {}
  static empty = new UserRegisterForm("", "", "");
  copy(
    {
      userId = this.userId,
      password = this.password,
      imgUrl = this.imgUrl
    }
  ) {
    return new UserRegisterForm(userId, password, imgUrl);
  }

  validateUserId = validateUserId(this.userId);


  validatePassword = validatePassword(this.password);


  validateImgUrl = validateUrl(this.imgUrl);


  validate = and(
      this.validateUserId,
      this.validatePassword,
      this.validateImgUrl
    );


  maskedPassword(): string {
    return maskedString(this.password);
  }
}

export function validateUserId(userId: string) {
  return and(
    Validation.require(userId.length > 0, ["too short"])
  )
}

export function validateUserName(userName: string) {
  return Validation.require(userName.length > 0, ["too short"]);
}

export function validatePassword(password: string) {
  return Validation.require(password.length > 0, ["too short"]);
}

export function validateUrl(url: string) {
  return Validation.require(url.length > 0, ["too short"]);
}

export function maskedString(password: string): string {
  return Array.from({length: password.length}).map(() => "*").join("");
}