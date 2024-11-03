export const FormField = ({ label, children }) => (
  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <span style={{ minWidth: "60px" }}>{label}:</span>
    {children}
  </label>
);
