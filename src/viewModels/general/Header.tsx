import {View} from "react-native";
import {ViewModel} from "../ViewModel";
import {SynclePage, SyncleRouter, UserProfilePage} from "../../routing/SyncleRouter";
export abstract class Header extends ViewModel {
    constructor(private syncleRouter: SyncleRouter) {
        super();
    }

    transitionUserCreateTopic() {
        this.syncleRouter.render(SynclePage.CreateTag);

    }

    transitionUserFollowTopics() {
        this.syncleRouter.render(SynclePage.Profile, UserProfilePage.FollowTopics);
    }

    transitionUserLoveTags() {
        this.syncleRouter.render(SynclePage.Profile, UserProfilePage.LoveTags);
    }

    transitionUserCreatedTopics() {
        this.syncleRouter.render(SynclePage.Profile, UserProfilePage.CreatedTopics);
    }
}