import "./globals.css";

export const metadata = {
  title: "Edge Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0b] text-white">
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col justify-between">
            
            <div>
              <h1 className="text-xl font-semibold mb-10 tracking-wide">
                ⚡ Edge
              </h1>

              <nav className="space-y-3 text-gray-400">
                <div className="nav-item active">Dashboard</div>
                <div className="nav-item">Nodes</div>
                <div className="nav-item">Analytics</div>
                <div className="nav-item">Control</div>
                <div className="nav-item">Settings</div>
              </nav>
            </div>

            <div className="text-xs text-gray-500">
              © Edge System
            </div>

          </aside>

          {/* MAIN */}
          <main className="flex-1 p-8">
            
            {/* HEADER FIXED */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-white">
                Edge Dashboard
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Monitor and control your edge network
              </p>
            </div>

            {children}

          </main>

        </div>
      </body>
    </html>
  );
}