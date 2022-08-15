import IconImage from "components/IconImage";

export default function SelectNetwork(props) {
  return (
    <div className={`selectsqitem select_item  mb-3 ${props.active && "active"}`} onClick={props.selectItem}>
      <div className="select_item_img">
        {props.item.image && (
          <IconImage src={props.item.image} className="w-full" alt={props.item.symbol} width={20} height={20} />
        )}
      </div>
      <div className="chname">{props.item.name}</div>
    </div>
  );
}
