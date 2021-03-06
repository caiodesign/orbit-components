// @flow
import * as React from "react";
import styled from "styled-components";

import defaultTokens from "../../defaultTokens";
import { rtlSpacing } from "../../utils/rtl";

import type { Props } from "./index";

const StyledTripLayover = styled.div`
  margin: ${({ theme }) =>
    rtlSpacing(`${theme.orbit.spaceSmall} 0 ${theme.orbit.spaceSmall}
    ${theme.orbit.spaceLarge}`)};
`;

StyledTripLayover.defaultProps = {
  theme: defaultTokens,
};

const TripLayover = ({ children, dataTest }: Props) => (
  <StyledTripLayover data-test={dataTest}>{children}</StyledTripLayover>
);

export default TripLayover;
