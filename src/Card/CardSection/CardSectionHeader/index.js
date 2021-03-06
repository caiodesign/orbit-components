// @flow
import React from "react";
import styled from "styled-components";

import { CardSectionContext } from "../index";
import { getSize } from "../../../Icon/index";
import { ICON_SIZES } from "../../../Icon/consts";
import defaultTokens from "../../../defaultTokens";
import ChevronDown from "../../../icons/ChevronDown";
import { left } from "../../../utils/rtl/index";

import type { Props } from "./index";

const StyledCardSectionIconRight = styled(ChevronDown)`
  align-self: center;
  transition: ${({ theme }) => theme.orbit.durationFast};
`;

StyledCardSectionIconRight.defaultProps = {
  theme: defaultTokens,
};

export const StyledCardSectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: margin ${({ theme }) => theme.orbit.durationFast} linear;
  cursor: ${({ expandable }) => expandable && "pointer"};
  position: relative;
  min-height: ${({ expandable }) => expandable && getSize(ICON_SIZES.MEDIUM)};
  margin: ${({ theme }) => `-${theme.orbit.spaceLarge}`};
  padding: ${({ theme }) => theme.orbit.spaceLarge};
  margin-bottom: ${({ expanded }) => expanded && 0};

  &:hover {
    background: ${({ theme, expandable }) => expandable && theme.orbit.paletteWhiteHover};
  }

  ${StyledCardSectionIconRight} {
    transform: ${({ expanded }) => expanded && "rotate(-180deg)"};
    margin-${left}: ${({ theme }) => theme.orbit.spaceMedium};
  }
  &:focus {
    background: ${({ theme, expandable }) => expandable && theme.orbit.paletteWhiteHover};
    outline: none;
  }

 
`;

StyledCardSectionHeader.defaultProps = {
  theme: defaultTokens,
};

const StyledCardSectionButtons = styled.div`
  margin-${left}: ${({ theme }) => theme.orbit.spaceLarge};
`;

StyledCardSectionButtons.defaultProps = {
  theme: defaultTokens,
};

const StyledCardSectionHeaderContent = styled.div`
  flex: 1;
`;

StyledCardSectionHeaderContent.defaultProps = {
  theme: defaultTokens,
};

const CardSectionHeader = ({ children, actions }: Props) => (
  <CardSectionContext.Consumer>
    {({ expandable, expanded, handleToggleSection, onKeyDownHandler }) => (
      <StyledCardSectionHeader
        expandable={expandable}
        expanded={expanded}
        onClick={expandable && handleToggleSection}
        aria-expanded={expandable && expanded}
        role={expandable && "button"}
        tabIndex={expandable && "0"}
        onKeyDown={onKeyDownHandler}
      >
        <StyledCardSectionHeaderContent expandable={expandable}>
          {children}
        </StyledCardSectionHeaderContent>
        {actions && <StyledCardSectionButtons>{actions}</StyledCardSectionButtons>}
        {!actions && expandable && <StyledCardSectionIconRight size="medium" color="secondary" />}
      </StyledCardSectionHeader>
    )}
  </CardSectionContext.Consumer>
);

export default CardSectionHeader;
