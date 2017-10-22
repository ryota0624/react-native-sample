import {Validation, and} from "../validations/Validateion";
/**
 * Created by ryota on 2017/10/21.
 */
export class TalkPostForm {
  constructor(
    readonly text: string
  ) {}

  static empty = new TalkPostForm("");
  validateText = and(
      Validation.require(this.text.length > 1, ["text too short"]),
      Validation.require(this.text.length <= 300, ["text too longer"])
    );

  validate = this.validateText;

  copy({text = this.text}) {
    return new TalkPostForm(text)
  }
}