import "./globals.css"; // 🔥 VERY IMPORTANT

export const metadata = {
  title: "Edge Dashboard",
  description: "Real-time Edge Monitoring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        {children}
      </body>
    </html>
  );
}