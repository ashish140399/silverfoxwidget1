import styled from "styled-components";
import { Container, GradButton, OutlineButton } from "./WidgetCss";

import Switch from "@mui/material/Switch";

export const UpperRow = styled(Container)`
  &.reviewdetails {
    border-top: 0.5px solid rgba(0, 0, 0, 0.5);
    .orgprice {
      max-height: 36px;
      overflow-y: Scroll;
      overflow-x: hidden;
    }
    .rowOuter {
      font-size: 14px;
    }
  }
`;

export const InputBx = styled.input`
  background: #f2f2f2;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 4px 8px;
`;
export const BlkHeading = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;
`;
export const Row = styled.div`
  padding-bottom: 10px;
  &.orgprice {
    padding-bottom: 0;
    ${BlkHeading} {
      font-size: 16px;
    }
    .flexchain {
      display: flex;
      flex-flow: wrap;
      ${OutlineButton} {
        margin-top: 4px;
        margin-right: 10px;
        font-size: 13px;
        img {
          height: 18px;
          margin-right: 5px;
        }
      }
    }
  }
  &.transaction {
    margin-top: 10px;
    ${InputBx} {
      width: 100%;
    }
  }
  &.slippage {
    .flexslip {
      display: flex;
      align-items: center;
      ${GradButton} {
        background: linear-gradient(
          89.74deg,
          rgba(226, 126, 172, 0.2) 0.06%,
          rgba(163, 92, 227, 0.2) 99.09%
        ) !important;
        color: #000000;
        border: 1px solid rgba(163, 92, 227, 0.2) !important;
        padding: 5px 18px !important;
        margin-right: 12px !important;
        display: flex;
        align-items: Center;
        svg {
          margin-left: 12px;
        }
      }
    }
  }
  ${GradButton} {
    background: linear-gradient(89.74deg, rgba(226, 126, 172, 0.2) 0.06%, rgba(163, 92, 227, 0.2) 99.09%);
    color: #000000;
    border: 0;
    padding: 6px 18px !important;
    margin-right: 12px;
  }
  ${InputBx} {
    width: 100%;
  }
`;
export const DisplayBlock = styled(Container)`
  border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  margin-top: 0px;
  .txt {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  }
`;

export const FlexText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  button {
    border: 0;
    min-width: 120px;
    margin: 0 5px;
  }
  &.paymentreview {
    justify-content: flex-start;

    margin: 0 -5px;
    margin-top: 8px;
    button {
      &:last-child {
        width: 100%;
      }
    }
  }
`;

// @ts-ignore
export const DisplaySwitch = styled(Switch)(({ theme }) => ({
  width: "28px !important",
  height: "16px !important",
  padding: "0 !important",
  display: "flex",

  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#000",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "white",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    background: "#000",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: 200,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    border: "0.5px solid #000",
    backgroundColor: "white",
    boxSizing: "border-box",
  },
}));
