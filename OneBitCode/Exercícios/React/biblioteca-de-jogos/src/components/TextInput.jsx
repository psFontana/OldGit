import PropTypes from "prop-types";

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function TextInput({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={label}>Capa</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
