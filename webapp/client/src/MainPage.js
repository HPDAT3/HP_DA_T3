import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithInput.js";

export default () => {
  return (
    <AnimationRevealPage>
      <Hero roundedHeaderButton={true} />
    </AnimationRevealPage>
  );
}
