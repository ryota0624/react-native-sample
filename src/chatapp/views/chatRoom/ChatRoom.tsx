/**
 * Created by ryota on 2017/10/22.
 */


import * as React from "react";
import {TalkPostForm} from "../../viewModels/TalkPostForm";
import {PostTalkService, DeleteTalkService} from "../../services/TalkService";
import {ServiceExecutorComponent, ServiceExecutorComponentKlass} from "../general/ErrorCacheView";
import {View, Text, FlatList, TextInput, Button, Image} from "react-native";
import {TalkId, Talk} from "../../domains/Talk";
import {TalkStore, UserStore, applicationContext} from "../../stores/Store";


interface Props extends ServiceExecutorComponent, LoadingIndicatorController {
  deleteTalkService: DeleteTalkService
  postTalkService: PostTalkService
  talkStore: TalkStore
  userStore: UserStore
}

interface State {
  talkPostForm: TalkPostForm,
  talks: Talk[]
}

type LoadingIndicatorController = {
  hideLoading?: () => void;
  showLoading?: (message?: string) => void;
}
export class LoadingIndicator extends React.Component<{element: JSX.Element}, {showLoading: boolean, message: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLoading: false,
      message: ""
    }
  }

  render() {
    if (this.state.showLoading) {
      return <Text>Loading.. {`${this.state.message}`}</Text>
    } else {
      return React.cloneElement(this.props.element, {
        showLoading: this.showLoading,
        hideLoading: this.hideLoading,
        ...this.props
      });
    }
  }

  hideLoading = () => {
    this.setState({showLoading: false});
  };

  showLoading = (message?: string) => {
    this.setState({showLoading: true, message: message || "" });
  }
}

export class ChatRoom extends React.Component<Props, State> implements ServiceExecutorComponentKlass {
  constructor(props: Props) {
    super(props);
    this.state = {
      talkPostForm: TalkPostForm.empty,
      talks: props.talkStore.findAll(),
    }
  }

  removeServiceListeners: (() => void)[] = [];

  onStartServiceExecution(serviceType: any): void {
    this.props.showLoading!(`${serviceType.name}`);
  }
  onFinishServiceExecution(serviceType: any): void {
    this.props.hideLoading!();
  }


  componentDidMount() {
    this.props.talkStore.addChangeListener(this.onChangeTalkStore);
    const postTalkServiceListener = this.props.postTalkService.addExecuteListener(this);
    const deleteTalkServiceListener = this.props.deleteTalkService.addExecuteListener(this);

    this.removeServiceListeners.push(postTalkServiceListener);
    this.removeServiceListeners.push(deleteTalkServiceListener);
  }
  componentWillUnmount() {
    this.props.talkStore.removeChangeListener(this.onChangeTalkStore);

    this.removeServiceListeners.forEach(r => r());
    this.removeServiceListeners = [];
  }

  onChangeTalkStore = () => {
    this.setState({
      talks: this.props.talkStore.findAll()
    });
  };

  onChangeText = (text: string) => {
    this.setState({
      talkPostForm: this.state.talkPostForm.copy({
        text
      })
    });
  };

  submitTalkPost = () => {
    this.props.serviceExecute!(this.props.postTalkService)(this.state.talkPostForm.text);
  };

  submitDeleteTalk = (talkId: TalkId) => {
    this.props.serviceExecute!(this.props.deleteTalkService)(talkId);
  };


  render() {
    return (
      <View>
        <View>
          <TextInput />
          <Text>
            {`${this.state.talkPostForm.validate.messages.join("\n")}`}
          </Text>
          <Button title="投稿" onPress={this.submitTalkPost}/>
        </View>
        <FlatList
          data={this.state.talks}
          keyExtractor={(talk, _) => talk.id.value}
          renderItem={({item: talk}) => (
            <View>
              <Image source={userIconUrlFromTalk(this.props.userStore, talk)} />
              <Text>{talk.createdUserId.value}</Text>
              <Text>{talk.createdAt.toDateString()}</Text>
              <Text>{talk.text}</Text>
              { applicationContext.loginedUser.id.equals(talk.createdUserId) ?
                <Button title="削除" onPress={() => this.submitDeleteTalk(talk.id)}/>
                : null
              }
            </View>
          )}
        >

        </FlatList>
      </View>
    )
  }
}

function userIconUrlFromTalk(userStore: UserStore, talk: Talk): string {
  try {
    return userStore.findById(talk.createdUserId)!.imageUrl.value;
  } catch (err) {
    return "";
  }
}
export default function (props: Props) {
  return (<LoadingIndicator
    element={<ChatRoom {...props}/>}
  />)
}