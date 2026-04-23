import "./globals.css";

export const metadata = {
  title: "Edge Monitor",
  description: "Real-time Edge Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-[#0b0f1a] text-white">

          {/* Sidebar */}
          <aside className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:block">
            <h1 className="text-xl font-bold text-cyan-400 mb-6">
              ⚡ Edge Monitor
            </h1>

            <nav className="space-y-4 text-gray-300">
              <div className="hover:text-white cursor-pointer">Dashboard</div>
              <div className="hover:text-white cursor-pointer">Nodes</div>
              <div className="hover:text-white cursor-pointer">Control</div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}