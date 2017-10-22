import {Service} from "./UserService";
import {ValidationSuccess} from "../validations/Validateion";
import {TalkStore, applicationContext} from "../stores/Store";
import {Talk, TalkId, Goods} from "../domains/Talk";
/**
 * Created by ryota on 2017/10/22.
 */


export class PostTalkService extends Service<string> {
  constructor(protected talkStore: TalkStore) {
    super();
  }
  validation() {
    return ValidationSuccess
  }

  execute(text: string) {
    const talk = Talk.factory(
      new TalkId(new Date().getTime().toString()),
      text,
      this.applicationContext.loginedUser.id,
      new Date(),
      new Goods([])
    );
    this.talkStore.save(talk);
  }
}

type EditTalkServiceArgs = {
  text: string
  talkId: TalkId
}

export class EditTalkService extends Service<EditTalkServiceArgs> {
  constructor(protected talkStore: TalkStore) {
    super();
  }
  validation() {
    return ValidationSuccess
  }

  execute(args: EditTalkServiceArgs) {
    const talk = this.talkStore.findById(args.talkId);
    if (!talk) throw new Error("not found talk");
    const updatedTalk = talk.editText(args.text);
    this.talkStore.save(updatedTalk);
  }
}


export class DeleteTalkService extends Service<TalkId> {
  constructor(protected talkStore: TalkStore) {
    super();
  }
  validation() {
    return ValidationSuccess
  }

  execute(talkId: TalkId) {
    this.talkStore.deleteById(talkId);
  }
}

export class TalkToGoodService extends Service<TalkId> {
  constructor(protected talkStore: TalkStore) {
    super();
  }
  validation() {
    return ValidationSuccess
  }

  execute(talkId: TalkId) {
    const talk = this.talkStore.findById(talkId);

    if (!talk) throw new Error("not found talk");

    const updatedTalk = talk.good(applicationContext.loginedUser.id);

    this.talkStore.save(updatedTalk);
  }
}

export class TalkToRemoveGoodService extends Service<TalkId> {
  constructor(protected talkStore: TalkStore) {
    super();
  }
  validation() {
    return ValidationSuccess
  }

  execute(talkId: TalkId) {
    const talk = this.talkStore.findById(talkId);

    if (!talk) throw new Error("not found talk");

    const updatedTalk = talk.removeGood(applicationContext.loginedUser.id);

    this.talkStore.save(updatedTalk);
  }
}