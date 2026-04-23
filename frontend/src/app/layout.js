import "./globals.css";

export const metadata = {
  title: "EdgeNet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white">
        <div className="min-h-screen">

          {/* Top Navbar */}
          <div className="flex justify-between items-center px-8 py-4 border-b border-white/10 bg-[#111]">
            <h1 className="text-xl font-bold text-orange-400">⚡ EdgeNet</h1>

            <div className="flex gap-6 text-gray-300">
              <span className="hover:text-white cursor-pointer">Dashboard</span>
              <span className="hover:text-white cursor-pointer">Nodes</span>
              <span className="hover:text-white cursor-pointer">Analytics</span>
              <span className="hover:text-white cursor-pointer">Settings</span>
            </div>
          </div>

          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}