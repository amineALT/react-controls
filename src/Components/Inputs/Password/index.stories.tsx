import * as React from "react";

import UpPassword from "./UpPassword";

import { getRootContainer } from "../../../Common/stories";
import { withKnobs } from "@storybook/addon-knobs";
import {  rulesMatch } from "../../../Common/utils";
import UpLabel from '../../Display/Label';

export default { 
  title: 'Components/Inputs/UpPassword',
  decorators : [withKnobs, getRootContainer('UpPassword')]
};

const ControlledPassword = props => {
  const [value, setValue] = React.useState("");

  return (
    <UpLabel text="Password">
        <UpPassword
        value={value}
        onChange={(e, v) => setValue(v)}
        showPasswordOnClick={true}
      />
    </UpLabel>
  );
};

const PasswordWithFloatingLabelComponent = props => {
  const [value, setValue] = React.useState("");
  
  return (
    <div>
      <UpPassword
        value={value}
        floatingLabel={"Password"}
        onChange={(e, v) => setValue(v)}
        showPasswordOnClick={true}
      />
    </div>
  );
};

const PasswordWithRules = props => {
  const [value, setValue] = React.useState("");

  const [focused, setFocused] = React.useState(false)
  const [touched, setTouched] = React.useState(false)
  const rules = [
    { text: 'Au moins 8 caractères', regex: /^.{8,}$/ },
    { text: 'Au moins une majuscule', regex: /.*[A-Z]/ },
    { text: 'Au moins une minuscule', regex: /.*[a-z]/ },
    { text: 'Au moins 1 chiffre', regex: /.*[0-9].*/ }
  ]
  const rulesAreValid = rulesMatch(value,rules)

  return (
    <UpPassword
      value={value}
      onChange={(e, v) => setValue(v)}
      showPasswordOnClick={false}
      rules={rules}
      onFocus={(e)=>{
        setFocused(true)
        setTouched(true)
      }}
      onBlur={(e)=> setFocused(false)}
      focused={focused}
      showError={touched && !rulesAreValid}
      hasError={touched && !rulesAreValid}
      touched={touched}
    />
  );
}

export const General =
  () => (
    <div style={{ padding: "30px" }}>
      <ControlledPassword />
    </div>
  )

export const WithRules = () =>
  <div style={{ padding: "30px" }}>
    <PasswordWithRules />
  </div>;

export const PasswordWithFloatingLabel = () =>
  <div style={{ padding: "30px" }}>
    <PasswordWithFloatingLabelComponent />
  </div>;

