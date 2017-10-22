import {LoginForm as LoginFormState} from "../../viewModels/LoginForm";
import {UserLoginService} from "../../services/UserService";
import {View, Text, TextInput, Button} from "react-native";
import * as React from "react";
import {ServiceExecutorComponent} from "../general/ErrorCacheView";
import {Password, UserId} from "../../domains/User";
import {applicationContext} from "../../stores/Store";
import {InjectionRouterProps} from "../../../routing/Router";
/**
 * Created by ryota on 2017/10/22.
 */

interface Props extends ServiceExecutorComponent, InjectionRouterProps {
  loginService: UserLoginService;
}

interface State {
  loginFormState: LoginFormState
}

export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loginFormState: LoginFormState.initial
    }
  }

  componentDidMount() {
    if (applicationContext.isLogin()) {
      this.redirectChatRoom()
    }
    applicationContext.onLogin(this.redirectChatRoom);
  }

  componentWillUnmount() {
    applicationContext.removeOnLogin(this.redirectChatRoom);
  }

  redirectChatRoom = () => {
    this.props.history!.push("/chat_room")
  };

  render() {
    const {loginFormState: {userId, password}} = this.state;

    return (
      <View>
        <Text>ろぐいん</Text>

        <Text>userId</Text>
        <TextInput style={style}
                   value={userId}
                   onChangeText={this.onChangeUserId}
                   editable={true}
        />
        <Text>password</Text >
        <TextInput style={style}
                   value={password}
                   onChangeText={this.onChangePassword}
                   editable={true}
        />
        <Button title="login" onPress={() => this.login(this.state.loginFormState)}/>
      </View>
    )
  }

  login = ({userId, password}: LoginFormState) => {
    this.props.serviceExecute!(this.props.loginService)({
      userId: new UserId(userId),
      password: new Password(password)
    });
  };
  setLoginFormState = (loginFormState: LoginFormState) => {
    this.setState({loginFormState});
  };

  onChangeUserId = (userId: string) => {
    this.setLoginFormState(
      this.state.loginFormState.copy({userId})
    );
  };

  onChangePassword = (password: string) => {
    this.setLoginFormState(
      this.state.loginFormState.copy({password})
    );
  };
}

const style = {
  borderColor: "gray",
  height: 20,
  borderWidth: 1
};