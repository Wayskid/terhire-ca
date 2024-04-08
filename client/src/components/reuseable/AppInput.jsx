export default function AppInput({
  label,
  placeholder,
  value,
  onChange,
  name,
  id,
  type,
  readOnly,
  htmlFor,
  onBlur,
}) {
  return (
    <div className="grid">
      <label className="font-medium mb-3" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className="px-[0.825rem] py-4 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        onBlur={onBlur}
      />
    </div>
  );
}
