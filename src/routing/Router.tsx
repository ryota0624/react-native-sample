import * as React from 'react';
import {View, StyleSheet, Text} from "react-native";

const {
  NativeRouter,
  Route,
  Redirect,
  ...rest
} = require('react-router-native');
import {Switch} from "react-router";
import {ApplicationContext, applicationContext} from "../chatapp/stores/Store";


const StackRoute = require('react-router-native/experimental/StackRoute').default;

export enum ChatAppRoute {
  Users,
  ChatRoom
}
type route = (routingProps: RouterProps) => JSX.Element
export const makeRoutes = (routes: {
  users: route
  login: route
  chatRoom: route
}) => {
  const loginUserAcceptPage = loginUserAcceptPageCreator("/", applicationContext);
  return (
    <NativeRouter>
      <StackRoute path="/" isRoot={true}
                  renderTitle={() => (<Text>chatApp</Text>)}
                  renderContent={(props: RouterProps) => {

                        return (
                          <View>
                            <Switch>
                                <Route path="/users" render={() => loginUserAcceptPage(props, routes.users)}/>
                                <Route path="/chat_room" render={() => loginUserAcceptPage(props, routes.chatRoom)} />
                                <Route path="/" render={routes.login} />
                            </Switch>
                            {applicationContext.isLogin() ? <Footer {...props}/> : null}
                          </View>
                        );
                    }}
      />

    </NativeRouter>
  )
};


interface RouterProps {
  history: {
    length: number,
    action: string,
    push: (a: any) => void,
    go: (a: any) => void,
    location: {
      pathname: string
    },
    listen: (a: any) => void
  }
  location: {
    hash: string,
    key: string,
    pathname: string,
    search: string
  }
  match: {
    params: any,
    path: string,
    url: string
  }
}

export type InjectionRouterProps = Partial<RouterProps>

export interface RouterComponent {
  router?: RouterProps
}

function Footer(props: RouterProps): JSX.Element {
  function push(location: string) {
    if (location === props.history.location.pathname) {
      return;
    }
    else {
      props.history.push(location);
    }
  }

  return (
    <View>
      <Text onPress={() => push("/chat_room")}>chatRoom</Text>
      <Text onPress={() => push("/users")}>users</Text>
      <Text onPress={() => {
        applicationContext.logout();
        push("/")
      }}>logout</Text>
    </View>
  );
}


function loginUserAcceptPageCreator(redirectPath: string, applicationContext: ApplicationContext) {
  return (routerProps: RouterProps, element: (routerProps: RouterProps) => JSX.Element) => {
    if (applicationContext.isLogin()) {
      return element(routerProps);
    } else {
      return <Redirect to={redirectPath}/>
    }
  }
}