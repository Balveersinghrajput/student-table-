export default function SearchBar({ value, onChange, placeholder = "🔍 Search..." }) {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ flex: 1, minWidth: 200 }}
    />
  );
}