import "./AdminControl.css";

const AdminControlItem = ({
  control,
  checked,
  handleControlChange,
}: {
  control: any;
  checked: boolean;
  handleControlChange(controlId: string): void;
}) => {
  return (
    <label>
      <input
        data-title={control.id}
        className="radio-input"
        type="radio"
        name="tutopedia"
        checked={checked}
        onChange={() => handleControlChange(control.id)}
      />
      <span className="radio-tile">
        <span className="radio-icon">
          <img className="icon-26" src={control.source} />
        </span>
        <span className="radio-label">{control.name}</span>
      </span>
    </label>
  );
};

export default AdminControlItem;
