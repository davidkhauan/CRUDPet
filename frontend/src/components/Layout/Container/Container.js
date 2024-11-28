function Container({ children }) {
  return (
    <main
      className="container my-4 p-3"
      style={{ minHeight: "60vh", maxWidth: "1200px" }}
    >
      {children}
    </main>
  );
}

export default Container;
