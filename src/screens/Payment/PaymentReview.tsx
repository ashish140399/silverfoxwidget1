import { WalletIcon } from "assets/icons";
import styled from "styled-components";
import { CancelButton, GradButton, OutlineButton, PriceBlock } from "./WidgetCss";
import { BlkHeading, DisplayBlock, FlexText, ButtonControls, Row, UpperRow, InputBx } from "./Widgetsettings";
interface Props {}

const PaymentReview = (props: Props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <UpperRow>
        <Row className="orgprice">
          <BlkHeading>Orignal Price: 0.045 ETH</BlkHeading>
          <div className="flexchain">
            <OutlineButton>
              <img alt="" src="/logos/chains/binance.png" />
              Binance Smart Chain
            </OutlineButton>
            <OutlineButton>
              <img alt="" src="/logos/chains/binance.png" />
              Binance Coin
            </OutlineButton>
          </div>
        </Row>
      </UpperRow>
      <UpperRow className="reviewdetails">
        <Row className="orgprice">
          <BlkHeading>Details:</BlkHeading>
          <div className="rowOuter">
            <FlexText>
              <div>Network fees</div>
              <div>5GWei</div>
            </FlexText>
            <FlexText>
              <div>Relayer fees</div>
              <div>0.005675 BNB</div>
            </FlexText>
            <FlexText>
              <div>Rate conversion</div>
              <div>1 ETH = 5.29 BNB</div>
            </FlexText>
            <FlexText>
              <div>Slippage</div>
              <div>0.01%</div>
            </FlexText>
            <FlexText>
              <div>Slippage</div>
              <div>0.01%</div>
            </FlexText>
          </div>
        </Row>
      </UpperRow>

      <DisplayBlock>
        <BlkHeading>Final Price:</BlkHeading>
        <PriceBlock>
          <h2>
            <img alt="" src="/logos/chains/binance.png" />1 BNB
          </h2>
          <h5>($34.34)</h5>
        </PriceBlock>
        <ButtonControls className="paymentreview">
          <CancelButton>Cancel</CancelButton>
          <GradButton>
            <WalletIcon />
            Buy Now
          </GradButton>
        </ButtonControls>
      </DisplayBlock>
    </>
  );
};

export default PaymentReview;
