import PropTypes from "prop-types";

Input.propTypes = {
  customSize: PropTypes.number.isRequired,
  setCustomSize: PropTypes.func.isRequired,
};

export default function Input(props) {
  return (
    <input
      type="number"
      id="passwordSize"
      min={1}
      value={props.customSize}
      onChange={(ev) => props.setCustomSize(+ev.target.value)}
    />
  );
}
