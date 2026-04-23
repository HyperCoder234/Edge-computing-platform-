import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-bg text-white p-6 max-w-7xl mx-auto">
        {children}
      </body>
    </html>
  );
}