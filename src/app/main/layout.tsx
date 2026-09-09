import { Sidebar } from '@/components/layout/Sidebar';
import { PlayerBar } from '@/components/player/PlayerBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { AudioProvider } from '@/context/AudioContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudioProvider>
      <div className="flex flex-col h-screen bg-[#121212] text-white overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-64 bg-black p-4 gap-6">
            <div className="text-[#1DB954] font-bold text-2xl tracking-tighter">
              Carlinho Music
            </div>
            
            <nav className="flex flex-col gap-4 font-semibold text-gray-300">
              <a href="/" className="hover:text-white transition">Início</a>
              <a href="/search" className="hover:text-white transition">Buscar</a>
            </nav>
            <div className="mt-4 flex-1 overflow-y-auto">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Suas Playlists
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Eletrônica Fina</li>
                <li className="hover:text-white cursor-pointer">Treino Monstro</li>
                <li className="hover:text-white cursor-pointer">Relaxamento</li>
              </ul>
            </div>
          </aside>
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#181818] to-[#121212] pb-24 md:pb-0 relative">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
        <BottomNav className="md:hidden fixed bottom-[72px] w-full bg-black/90 backdrop-blur-md z-40" />
        <div className="fixed bottom-0 w-full h-[72px] md:h-24 bg-[#181818] border-t border-[#282828] z-50">
          <PlayerBar />
        </div>
      </div>
    </AudioProvider>
  );
}
