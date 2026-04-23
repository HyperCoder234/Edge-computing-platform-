import "./globals.css";

export const metadata = {
  title: "Edge Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-bg text-white">
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-100 sidebar-glass p-6 flex flex-col justify-between">
            
            <div>
              <h1 className="text-xl font-semibold mb-10 tracking-wide glow-text">
                ⚡ Edge
              </h1>

              <nav className="space-y-3 text-red-400 text-bold">
                <div className="nav-item active text-red-500">Dashboard</div>
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
            
            <div className="mb-6">
              <h1 className="text-2xl font-semibold glow-text">
                Edge Dashboard
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Real-time edge network intelligence
              </p>
            </div>

            {children}

          </main>

        </div>
      </body>
    </html>
  );
}