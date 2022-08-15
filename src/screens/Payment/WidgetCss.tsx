import styled from "styled-components";

export const Container = styled.div`
  padding: 14px 18px;
`;

export const GradButton = styled.button`
  background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);
  border-radius: 5px !important;
  color: #fff;
  border: 0 !important;
`;
export const CancelButton = styled.button`
  background: rgba(235, 59, 90, 0.1);
  border: 0.5px solid #eb3b5a !important;
  border-radius: 5px !important;
  color: #eb3b5a;
`;

export const OutlineButton = styled.button`
  background: transparent;
  border: 0.5px solid rgba(0, 0, 0, 0.5) !important;
  border-radius: 5px !important;
  color: #000;
  display: flex;
  align-items: Center;
  justify-content: center;
`;
export const FibpalWidget = styled.div`
  width: 100%;
  height: 400px;
  font-size: 16px;
  color: #000;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 18px;
  overflow: hidden;
  * {
    font-family: "General Sans", sans-serif !important;
  }
`;
export const WidgetHeader = styled.div`
  margin-bottom: 0px;
  display: flex;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  align-items: Center;
  height: 60px;
`;
export const WidgetContent = styled.div`
  min-height: 296px;
`;
export const WidgetFooter = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  margin-top: 0px;
  font-size: 14px;
  padding: 10px 18px;
  .powered {
    opacity: 0.75;
  }
  .feeblock {
    background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

// widget header
export const LeftHeader = styled.div``;
export const HeaderName = styled(Container)`
  font-weight: 400;
  font-size: 25px;
  line-height: 34px;
  color: rgba(0, 0, 0, 0.8);
`;
export const RightHeader = styled.div`
  display: flex;
`;

export const Settings = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: Center;
  justify-content: Center;
  border-left: 0.5px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
export const Close = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: Center;
  justify-content: Center;
  cursor: pointer;
`;

export const PriceBlock = styled.div`
  display: flex;
  align-items: center;
  ${Container} {
    display: flex;
    align-items: center;
  }
  h2,
  h5 {
    margin: 0;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;
  }
  img {
    height: 25px;
    margin-right: 8px;
  }
  h5 {
    margin-left: 8px;
    font-weight: 300;
    opacity: 0.8;
    font-size: 16px;
    line-height: unset;
    margin-top: 2px;
  }
`;

// widget content

export const ChooseTokenOuter = styled.div`
  // max-height: 300px;
  // overflow: hidden;
  .searchboxOuter {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.5) !important;
    padding: 10px 16px;
  }
  .select_searchBox {
    background: #f2f2f2;
    border: 0.5px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;

    input {
      background: transparent;
      border: 0;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .select_options {
    margin-top: 0px !important;
    .select_item {
      color: #000 !important;
      margin-bottom: 0 !important;
      padding: 10px 16px !important;
      &.active {
        background: linear-gradient(
          89.74deg,
          rgba(226, 126, 172, 0.2) 0.06%,
          rgba(163, 92, 227, 0.2) 99.09%
        ) !important;
      }
    }
  }
`;
export const CoinSelectorDD = styled(Container)`
  .tokeninner {
    border: 0.5px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    height: 36px;
    min-width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 100%;
    .select_control {
      min-width: 100%;
    }
    * {
      font-size: 15px;
    }
    .select_control {
      width: 100%;
      img {
        margin-top: -3px;
      }
    }
  }
  .valueconverted {
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
  }
`;

export const TotalPrice = styled(Container)`
  padding-top: 0;
  padding-bottom: 0;
  .tokenimg {
    height: 28px;
    margin-right: 8px;
  }
  h6 {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    margin: 0;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 34px;
    margin: 0;
    margin-top: 6px;
    display: flex;
    align-items: center;
  }
`;

export const StatusButtons = styled(Container)`
  button {
    margin: 0 !important;
    width: 100% !important;
    background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);
    border-radius: 5px;
    border: 0;
    color: #fff;
    p {
      font-weight: 400 !important;
    }
  }
`;
