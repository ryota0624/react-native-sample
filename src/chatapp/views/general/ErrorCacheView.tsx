
import * as React from "react";
import {Text, View, Button} from "react-native";
import {Service} from "../../services/UserService";
interface Props {
  normalView: JSX.Element
  errorView: (errors: Error[], reset: () => void) => JSX.Element
  otherNormalProps: any
}
interface State {
  errors: Error[]
}

export interface ServiceExecutorComponentKlass {
  onStartServiceExecution(serviceType: any): void;
  onFinishServiceExecution(serviceType: any): void;
}


export interface ServiceExecutorComponent {

  serviceExecute?<Input>(service: Service<Input>): (input: Input) => void;
}
export class ErrorCacheComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errors: []
    }
  }
  render() {
    if(this.state.errors.length === 0) {
      return React.cloneElement(this.props.normalView, {serviceExecute: this.executeService.bind(this), ...this.props.otherNormalProps});
    } else {
      return this.props.errorView(this.state.errors, this.reset.bind(this));
    }
  }

  reset() {
    this.setState({
      errors: []
    });
  }

  executeService<Input>(service: Service<Input>) {
    return (input: Input) => {
      const maybeServiceError = service.start(input);
      if (maybeServiceError) {
        this.setState({
          errors: this.state.errors.concat(maybeServiceError)
        });
      }
    }
  }
}

function DebugView(errors: Error[], reset: () => void) {
  return <View>
    <Button title={"reset"} onPress={reset} />
    <Text>{(errors.map(error => `${error.name}\n${error.message}\n${error.stack}`).join("\n"))}</Text>
  </View>
}

export function debugErrorView(normalView: () => JSX.Element, otherProps?: any) {
  return <ErrorCacheComponent
    otherNormalProps={otherProps}
    normalView={normalView()}
    errorView={DebugView}
  />
}