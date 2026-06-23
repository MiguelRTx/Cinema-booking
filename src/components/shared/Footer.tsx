import { Link } from 'react-router-dom';
import { RiFilmLine, RiGithubLine, RiTwitterXLine, RiInstagramLine } from 'react-icons/ri';

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/60 mt-auto pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-white mb-4">
              <div className="bg-red-600/10 p-1.5 rounded-lg">
                <RiFilmLine className="w-6 h-6 text-red-500" />
              </div>
              <span className="tracking-tight">CineBook</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Tu plataforma definitiva para descubrir las mejores películas y reservar tus asientos favoritos de manera rápida y segura.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Cartelera</Link></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Próximos estrenos</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Promociones</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-400 transition-colors">Términos de servicio</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800/60">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} CineBook. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
              <RiTwitterXLine className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
              <RiInstagramLine className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
              <RiGithubLine className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}