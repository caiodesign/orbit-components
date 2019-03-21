// @flow
import * as React from "react";
import styled from "styled-components";

import { SIZE_OPTIONS } from "../InputField/consts";
import PlusCircle from "../icons/PlusCircle";
import MinusCircle from "../icons/MinusCircle";
import ButtonLink from "../ButtonLink";
import InputField, { Input, Prefix } from "../InputField";
import defaultTokens from "../defaultTokens";

import type { Props, State, ForwardedRef } from "./index";

const PrefixSuffix = styled(({ type, ...props }) => <div role="button" tabIndex="0" {...props} />)`
  flex-shrink: 0;
  z-index: 3;
  cursor: ${({ disabled }) => disabled && "not-allowed"};

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.orbit.colorTextButtonWhiteBordered},
      0 0 1px 3px rgba(1, 118, 210, 0.6); //TODO: Create token
  }

  &:focus:active {
    box-shadow: none;
  }
`;

PrefixSuffix.defaultProps = {
  theme: defaultTokens,
};

const StyledInputStepper = styled.div`
  width: 100%;
  ${Input} {
    text-align: center;
  }
  ${Prefix} {
    padding: 0;
    pointer-events: auto;
  }
`;

class InputStepper extends React.Component<Props & ForwardedRef, State> {
  state = {
    value: this.props.defaultValue || 0,
  };

  componentDidUpdate() {
    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) {
      onChange(value);
    }
  }

  incrementCounter = () => {
    const { value } = this.state;
    const { maxValue, step = 1 } = this.props;
    const newValue = value + step;
    this.setState({
      value: newValue >= +maxValue ? maxValue : newValue,
    });
  };

  decrementCounter = () => {
    const { value } = this.state;
    const { minValue, step = 1 } = this.props;
    const newValue = value - step;

    this.setState({
      value: newValue <= +minValue ? minValue : newValue,
    });
  };

  handleKeyDown = (ev: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (ev.keyCode === 40) {
      ev.preventDefault();
      this.decrementCounter();
    }
    if (ev.keyCode === 38) {
      ev.preventDefault();
      this.incrementCounter();
    }
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { minValue = Number.NEGATIVE_INFINITY, maxValue = Number.POSITIVE_INFINITY } = this.props;
    const value = ev && parseInt(ev.target.value, 10);

    if (Number.isInteger(value) && value >= minValue && value <= maxValue) {
      this.setState({ value });
    }
  };

  render() {
    const {
      label,
      error,
      onBlur,
      onFocus,
      help,
      disabled,
      name,
      dataTest,
      size = SIZE_OPTIONS.NORMAL,
      maxValue,
      minValue,
      required,
      tabIndex,
      forwardedRef,
    } = this.props;
    const { value } = this.state;
    return (
      <StyledInputStepper>
        <InputField
          dataTest={dataTest}
          size={size}
          label={label}
          disabled={disabled}
          required={required}
          name={name}
          error={error}
          help={help}
          type="number"
          onChange={this.handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          value={value || 0}
          minValue={minValue}
          maxValue={maxValue}
          tabIndex={tabIndex}
          ref={forwardedRef}
          prefix={
            <ButtonLink
              disabled={disabled || value <= +minValue}
              iconLeft={<MinusCircle color="secondary" />}
              size={size}
              onClick={this.decrementCounter}
              onKeyDown={this.decrementCounter}
              transparent
              component={PrefixSuffix}
            />
          }
          suffix={
            <ButtonLink
              disabled={disabled || value >= +maxValue}
              iconLeft={<PlusCircle color="secondary" />}
              size={size}
              onClick={this.incrementCounter}
              onKeyDown={this.incrementCounter}
              transparent
              component={PrefixSuffix}
            />
          }
        />
      </StyledInputStepper>
    );
  }
}

// $FlowExpected
const ForwardedInputStepper = React.forwardRef((props, ref) => (
  <InputStepper forwardedRef={ref} {...props} />
));

ForwardedInputStepper.displayName = "InputStepper";

export default ForwardedInputStepper;
