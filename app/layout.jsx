import "./globals.css";

export const metadata = {
  title: "ZUCCESS — Smart Digital Business Cards",
  description: "Create your QR card in minutes using WhatsApp. Powered by NFC + AI.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
