import { FailedIcon, PendingIcon, SuccessIcon } from "assets/icons";
import styled from "styled-components";
import { Container } from "./WidgetCss";

interface Props {
  status: string;
  message?: string;
}

const PaymentStatus = (props: Props) => {
  const { status } = props;
  return (
    <>
      <StatusLoader>
        <StatusContent>
          {status == "successful" ? <SuccessIcon /> : null}
          {status == "successful" ? <h2 style={{ color: "#519F6C" }}>Payment Successful</h2> : null}

          {status == "error" ? <FailedIcon /> : null}
          {status == "error" ? <h2 style={{ color: "#D54E40" }}>Payment Failed</h2> : null}

          {status == "pending" ? <PendingIcon /> : null}
          {status == "pending" ? <h2 style={{ color: "#DDA125" }}>Payment Pending</h2> : null}

          {status == "error" ? <h6>Not enough funds in the wallet</h6> : null}
        </StatusContent>
        {status != "pending" ? <button>Continue</button> : null}
      </StatusLoader>
    </>
  );
};

const StatusLoader = styled(Container)`
  min-height: 295px;
  display: flex;
  flex-direction: column;
  align-items: Center;
  justify-content: center;
  button {
    background: #f2f2f2;
    border: 1px solid rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    padding: 4px 18px;
    margin-top: 20px;
  }
`;

const StatusContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: Center;
  justify-content: center;
  h2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 34px;
    margin-top: 8px;
    margin-bottom: 0;
  }
  h6 {
    font-size: 14px;
    font-weight: 300;
  }
`;

export default PaymentStatus;
