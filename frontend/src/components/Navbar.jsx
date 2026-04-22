export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        ⚡ Edge Monitor
      </h1>

      <div className="text-sm text-gray-400">
        Real-time System Dashboard
      </div>
    </div>
  );
}