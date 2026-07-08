import { useState } from 'react';
import { GraduationCap, Menu, X, Lock, FileText, CheckCircle2, Info, LayoutDashboard, PlusCircle, Search } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setActiveReportId: (id: string | null) => void;
}

export default function Navbar({ currentTab, setCurrentTab, setActiveReportId }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: LayoutDashboard },
    { id: 'reportar', label: 'Reportar', icon: PlusCircle },
    { id: 'muro', label: 'Reportes', icon: Search },
    { id: 'seguimiento', label: 'Seguimiento', icon: FileText },
    { id: 'mejoras', label: 'Mejoras', icon: CheckCircle2 },
    { id: 'sobre', label: 'Sobre el Proyecto', icon: Info },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setActiveReportId(null);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#FFEAA7]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('inicio')}
              className="flex items-center space-x-3 text-left focus:outline-none group"
              id="nav-logo"
            >
              <div className="p-2 bg-[#FFE3E3] text-[#D45D5D] rounded-xl border border-[#FFC6C6] flex items-center justify-center transform group-hover:scale-105 transition-all">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-sans font-black text-sm sm:text-base tracking-tight text-slate-900 uppercase leading-none">
                  Fe y Alegría <span className="text-[#D45D5D] font-extrabold">Reportes</span>
                </span>
                <span className="block font-mono text-[9px] uppercase font-black text-[#826A00] tracking-widest mt-1.5 leading-none bg-[#FFF9DB] px-1.5 py-0.5 rounded-md border border-[#FFEAA7]/60 inline-block">
                  ✦ Colegios Seguros ✦
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FFE3E3] text-[#D45D5D] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFF9DB]/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <button
              id="nav-item-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="block h-6 h-6" /> : <Menu className="block h-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base font-medium text-left transition-all ${
                    isActive
                      ? 'bg-[#FFE3E3] text-[#D45D5D] font-bold border-l-4 border-[#D45D5D] pl-3'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFF9DB]/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-px bg-slate-200 my-2"></div>

            <button
              id="mobile-nav-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base font-bold text-left transition-all ${
                currentTab === 'admin'
                  ? 'bg-[#FFE3E3] text-[#D45D5D]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FFF9DB]/50'
              }`}
            >
              <Lock className="w-5 h-5 text-slate-500" />
              <span>Panel de Administración</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
