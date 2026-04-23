import "./globals.css";

export const metadata = {
  title: "Edge Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col justify-between">
            
            <div>
              <h1 className="text-xl font-bold mb-8">⚡ Edge</h1>

              <nav className="space-y-4 text-gray-400">
                <div className="nav-item active">Dashboard</div>
                <div className="nav-item">Nodes</div>
                <div className="nav-item">Analytics</div>
                <div className="nav-item">Control</div>
                <div className="nav-item">Settings</div>
              </nav>
            </div>

            <div className="text-sm text-gray-500">
              © Edge System
            </div>

          </aside>

          {/* MAIN */}
          <main className="flex-1 p-8 bg-[#050505]">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}