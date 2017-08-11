import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Picker,
  Item,
  Label,
  Input,
  Button,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option } from '../../constants';

class RegisterEmail extends Component {

  /*
     * initialize some state
     */
  componentWillMount() {
    this.props.updateInputFields('role', 'attendee');
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  handleButtonClick = (value) => {
    this.props.updateRegisterMethod(value);
  }

    submitRegistration = () => {
      if (this.isFieldError()) {
        Alert.alert('Warning', 'Field is not complete');
      } else {
        this.props.register();
      }
    }

    /*
     * validate all fields before submission
     */
    isFieldError = () => {
      const { errorFields } = this.props;
      const {
        error_first_name,
        error_last_name,
        error_username,
        error_email,
        error_password,
        error_phone
      } = errorFields;

      return (
        error_first_name ||
        error_last_name ||
        error_email ||
        error_username ||
        error_password ||
        error_phone
      );
    }

    render() {
      if (this.props.isRegistering) {
        console.log('isregistering...');
        return;
      }
      if (this.props.isRegistered) {
        Alert.alert('Status', 'user registered successfully');
      }

      // destructure state
      const { registerMethod, inputFields, errorFields } = this.props || {};
      const {
        first_name,
        last_name,
        username,
        email,
        password,
        phone,
        role
      } = inputFields || '';

      const {
        error_first_name,
        error_last_name,
        error_username,
        error_email,
        error_password,
        error_phone
      } = errorFields || false;

      return (
        <Container style={styles.container}>
              <Content>
                <Form>
                  <Item floatingLabel error={error_first_name}>
                    <Label>First Name</Label>
                    <Input onChangeText={text => this.handleInputChange('first_name', text)} value={first_name} />
                  </Item>
                  <Item floatingLabel error={error_last_name}>
                    <Label>Last Name</Label>
                    <Input onChangeText={text => this.handleInputChange('last_name', text)} value={last_name} />
                  </Item>
                  <Item floatingLabel error={error_email}>
                    <Label>Email</Label>
                    <Input onChangeText={text => this.handleInputChange('email', text)} value={email} />
                  </Item>
                  <Item floatingLabel error={error_username}>
                    <Label>Username</Label>
                    <Input onChangeText={text => this.handleInputChange('username', text)} value={username} />
                  </Item>
                  <Item floatingLabel error={error_password}>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={text => this.handleInputChange('password', text)} value={password} />
                  </Item>
                  <Picker
                    style={styles.picker}
                    placeholder="Role"
                    mode="dropdown"
                    selectedValue={role}
                    onValueChange={value => this.handleInputChange('role', value)}
                  >
                    {role_option.map(component => (
                      <Item key={component.value} label={component.label} value={component.label} />
                    ))}
                  </Picker>
                </Form>
                <Button
                  primary
                  block
                  style={styles.button}
                  onPress={() => this.submitRegistration()}
                >
                  <Text style={styles.buttomText}>Register with Email</Text>
                </Button>
              </Content>
        </Container>
      );
    }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  registerMethod: selectors.getRegisterMethod(),
  isRegistering: selectors.getIsRegistering(),
  isRegistered: selectors.getRegisterStatus()
});

export default connect(mapStateToProps, actions)(RegisterEmail);