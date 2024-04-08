import "./style/appInputSelect.css";

export default function AppInputSelect({ val, selection, name, onChange }) {
  return (
    <div className="select">
      <select id="standard-select" name={name} onChange={onChange} value={val}>
        {selection?.map((selects) => (
          <option
            key={selects.option}
            value={selects.value}
          >
            {selects.option}
          </option>
        ))}
      </select>
    </div>
  );
}
