import './Input.css';

function Input({ title, onChange, name, type = "text", placeholder = "" }) {
  return (
    <label className="input-label">
      {title}
      <input
        name={name}
        type={type}
        className="input"
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </label>
  );
}

export default Input;