import * as React from "react";
import {UserManagement} from "./chatapp/views/userManagement/UserManagement";
import {userStoreOnAsyncStorage, talkStoreOnAsyncStorage} from "./chatapp/stores/asyncStorage";
import {UserRegisterService, UserDeleteService, UserLoginService} from "./chatapp/services/UserService";
import {debugErrorView} from "./chatapp/views/general/ErrorCacheView";
import {makeRoutes} from "./routing/Router";
import {Login} from "./chatapp/views/login/Login";
import ChatRoom from "./chatapp/views/chatRoom/ChatRoom";
import {DeleteTalkService, PostTalkService} from "./chatapp/services/TalkService";
import {UserId, Password} from "./chatapp/domains/User";

(new UserRegisterService(userStoreOnAsyncStorage)).execute({
    userId: "ryota", password: "ryota", imgUrl: "http://aa.cc"
});

(new UserLoginService(userStoreOnAsyncStorage).execute(
  {
      userId: new UserId("ryota"), password: new Password("ryota")
  }));

export default class App extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        const userRegisterService = new UserRegisterService(userStoreOnAsyncStorage);
        const userDeleteService = new UserDeleteService(userStoreOnAsyncStorage);
        const userLoginService = new UserLoginService(userStoreOnAsyncStorage);
        const deleteTalkService = new DeleteTalkService(talkStoreOnAsyncStorage);
        const postTalkService = new PostTalkService(talkStoreOnAsyncStorage);
        return makeRoutes({
            users: (routingProps) => debugErrorView(() => <UserManagement
                userStore={userStoreOnAsyncStorage}
                deleteService={userDeleteService}
                registerService={userRegisterService}/>, routingProps),
            login: (routingProps) => debugErrorView(() => <Login
                loginService={userLoginService}
              />, routingProps),
            chatRoom: (routingProps) => debugErrorView(() => <ChatRoom
              userStore={userStoreOnAsyncStorage}
              talkStore={talkStoreOnAsyncStorage}
              deleteTalkService={deleteTalkService}
              postTalkService={postTalkService}
            />, routingProps)
        })
    }
}
