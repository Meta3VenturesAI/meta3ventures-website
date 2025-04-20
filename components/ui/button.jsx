export function Button({ children, variant = 'primary', ...props }) {
  const base = 'px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring';
  const styles = {
    primary: `${base} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300`,
    outline: `${base} border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-300`,
    link: `${base} text-blue-600 hover:underline focus:ring-blue-300 bg-transparent`,
  };
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}
