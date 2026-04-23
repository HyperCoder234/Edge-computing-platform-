export const metadata = {
  title: "Edge Monitor",
  description: "Real-time Edge Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f1a] text-white font-sans">
        {children}
      </body>
    </html>
  );
}