export default function DateSelector({ value, onChange }){
  return (
    <input type="date" value={value}
      onChange={e => onChange(e.target.value)} />
  )
}
