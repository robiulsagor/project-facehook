export default function Field({ label, children, htmlFor, error }) {
  return (
    <div className="form-control">
      {label && <label htmlFor={htmlFor}>{label} </label>}
      {children}
      {error && <p className="mt-1 text-red-500">{error?.message} </p>}
    </div>
  );
}
