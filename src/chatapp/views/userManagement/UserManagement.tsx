import * as React from "react";
import {UserRegisterForm as UserRegisterFormState} from "../../viewModels/UserRegisterForm";
import {UserRegisterForm} from "./UserRegisterForm";
import {View} from "react-native";
import {UserStoreOnAsyncStorage} from "../../stores/asyncStorage";
import {User, UserId} from "../../domains/User";
import {Text, Button} from "react-native";
import {UserList} from "./UserList";
import {ServiceExecutorComponent} from "../general/ErrorCacheView";
import {UserDeleteService, UserRegisterService} from "../../services/UserService";

interface State {
  users: User[]
  userRegisterFormState: UserRegisterFormState
}

interface Props extends ServiceExecutorComponent  {
  userStore: UserStoreOnAsyncStorage,
  registerService: UserRegisterService,
  deleteService: UserDeleteService
}

export class UserManagement extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      users: props.userStore.findAll(),
      userRegisterFormState: UserRegisterFormState.empty
    }
  }

  componentWillMount() {
    this.props.userStore.addChangeListener(this.userStorageChangeListener);
  }

  componentWillUnmount() {
    this.props.userStore.removeChangeListener(this.userStorageChangeListener);
  }

  userStorageChangeListener = () => {
    const users = this.props.userStore.findAll();
    this.setState({users});
  };

  errorMessages() {
    const validationResult = this.state.userRegisterFormState.validate;
    return validationResult.hasError() ?
      <Text>
        {validationResult.messages.map(message => message).join("\n")}
      </Text>
      :
      null;
  }

  submitDisabled = () => {
    return this.state.userRegisterFormState.validate.hasError()
  };

  render() {
    const {userRegisterFormState} = this.state;

    return (
      <View style={{margin: 30}}>
        {this.errorMessages()}
        <UserRegisterForm
          onChangeUserId={this.onChangeUserId}
          onChangePassword={this.onChangePassword}
          onChangeImgUrl={this.onChangeImgUrl}
          password={userRegisterFormState.maskedPassword()}
          imgUrl={userRegisterFormState.imgUrl}
          userId={userRegisterFormState.userId}
        />
        <Button disabled={this.submitDisabled()} title="登録" onPress={this.submitUser}></Button>
        <UserList users={this.state.users} onPressDelete={this.deleteUser}/>
      </View>
    );
  }

  setUserRegisterFormState(userRegisterFormState: UserRegisterFormState) {
    this.setState({userRegisterFormState});
  }

  onChangeUserId = (userId: string) => {
    this.setUserRegisterFormState(
      this.state.userRegisterFormState.copy({userId})
    );
  };
  onChangePassword = (password: string) => {
    this.setUserRegisterFormState(
      this.state.userRegisterFormState.copy({password})
    );
  };
  onChangeImgUrl = (imgUrl: string) => {
    this.setUserRegisterFormState(
      this.state.userRegisterFormState.copy({imgUrl})
    );
  };

  submitUser = () => {
    const {userId, password, imgUrl} = this.state.userRegisterFormState;
    this.props.serviceExecute!(this.props.registerService)({
      userId,
      password,
      imgUrl
    });
  };

  deleteUser = (userId: UserId) => {
    this.props.serviceExecute!(this.props.deleteService)(userId);
  }

}