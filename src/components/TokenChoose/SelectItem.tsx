import IconImage from "components/IconImage";

export default function SelectItem(props) {
  return (
    <div className={`select_item  mb-3 ${props.active && "active"}`} onClick={props.selectItem}>
      <div className="select_item_img">
        {props.item.image && (
          <IconImage src={props.item.image} className="w-full" alt={props.item.symbol} width={20} height={20} />
        )}
      </div>
      <div className="ms-2 flex-grow-1">
        <h4 className=" mb-0">{props.item.symbol}</h4>
        {/* <p className="fs-7 opacity-75 mb-0 mt-0">{props.item.name}</p> */}
      </div>

      <div className="select_item_circle"></div>
    </div>
  );
}
