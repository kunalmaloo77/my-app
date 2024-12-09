import { Header } from "./components/header";
import { NowPlaying } from "./components/now-playing";
import { Sidebar } from "./components/sidebar";
import "./globals.css";
import { PlayerProvider } from "./utils/context/player-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <PlayerProvider>
          <div className="flex flex-col lg:flex-row h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 lg:ml-64 bg-gradient-to-b from-[#530202]">
              <Header />
              <main
                className="flex-grow p-6 overflow-auto lg:mx-12"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {children}
              </main>
            </div>

            {/* Now Playing Section */}
            <div className="w-full bg-gradient-to-b from-[#2e0101] p-4 flex flex-col justify-between lg:w-[20%] lg:p-6">
              <div className="flex-grow hidden lg:flex">
                {/* Optional content for larger screens */}
              </div>
              <NowPlaying />
            </div>
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
