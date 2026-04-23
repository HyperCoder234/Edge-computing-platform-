import "./globals.css";

export const metadata = {
  title: "Edge Control Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}