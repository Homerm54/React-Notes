/**
 * Form Component, to be used with MUI tabs
 */
export default function TabPanel(props) {
  const { children, value, index, onSubmit, ...other } = props;

  return (
    <form
      role="auth-form"
      hidden={value !== index}
      id={`auth-form-${index}`}
      aria-labelledby={`auth-form-tab-${index}`}
      onSubmit={onSubmit}
      {...other}
    >
      {value === index && (children)  /* Render only if selected */}
    </form>
  );
}