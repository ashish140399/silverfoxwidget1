import { GradtickIcon } from "assets/icons";
import styled from "styled-components";
import { CancelButton, GradButton } from "./WidgetCss";
import {
  BlkHeading,
  DisplayBlock,
  FlexText,
  DisplaySwitch,
  ButtonControls,
  Row,
  UpperRow,
  InputBx,
} from "./Widgetsettings";
interface Props {}

const SettingsWidget = (props: Props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <UpperRow>
        <Row className="slippage">
          <BlkHeading>Slippage</BlkHeading>
          <div className="flexslip">
            <GradButton>
              Auto
              <GradtickIcon />
            </GradButton>
            <InputBx placeholder="40 minutes" />
          </div>
        </Row>
        <Row className="transaction">
          <BlkHeading>Transaction Details</BlkHeading>
          <InputBx placeholder="40 minutes" />
        </Row>
      </UpperRow>
      <DisplayBlock>
        <BlkHeading>Display Settings</BlkHeading>
        <FlexText>
          <div className="txt">Dark Mode</div>
          <DisplaySwitch {...label} defaultChecked color="default" />
        </FlexText>
        <ButtonControls>
          <CancelButton>Cancel</CancelButton>
          <GradButton>Save</GradButton>
        </ButtonControls>
      </DisplayBlock>
    </>
  );
};

export default SettingsWidget;
