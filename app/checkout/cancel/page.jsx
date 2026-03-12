export default function CheckoutCancelPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#EBEBDF",
        color: "#080844",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          background: "white",
          borderRadius: 20,
          border: "1px solid rgba(8,8,68,0.08)",
          padding: 28,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 28, marginBottom: 10 }}>Payment not completed</h1>
        <p style={{ color: "#666" }}>
          Your checkout was canceled or failed. You can return to the site and try again.
        </p>
      </div>
    </main>
  );
}
