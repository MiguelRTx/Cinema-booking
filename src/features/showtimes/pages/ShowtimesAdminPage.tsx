import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddLine, RiCalendarScheduleLine, RiHistoryLine } from 'react-icons/ri';
import { useShowtimes } from '../hooks/useShowtimes';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { EmptyState } from '../../../components/ui/EmptyState';
import { SkeletonRow } from '../../../components/ui/SkeletonCard';
import { Badge } from '../../../components/ui/Badge';
import { formatDateTime, formatCurrency } from '../../../utils/date.utils';
import { cn } from '../../../utils/cn';

export function ShowtimesAdminPage() {
  const navigate = useNavigate();
  const { data: showtimes, isLoading } = useShowtimes();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const now = new Date();
  const activeShowtimes = showtimes?.filter(s => new Date(s.startTime) >= now) || [];
  const pastShowtimes = showtimes?.filter(s => new Date(s.startTime) < now) || [];
  const displayedShowtimes = activeTab === 'active' ? activeShowtimes : pastShowtimes;

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Funciones"
        subtitle="Gestiona las funciones programadas en las distintas salas"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/admin/showtimes/create')}
            id="create-showtime-btn"
          >
            <RiAddLine className="w-5 h-5" />
            Nueva función
          </Button>
        }
      />

      {/* Sistema de Pestañas (Tabs) */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-800/60 px-2">
        <button
          onClick={() => setActiveTab('active')}
          className={cn(
            'flex items-center gap-2 py-3 px-2 text-sm font-semibold transition-all border-b-2 -mb-px',
            activeTab === 'active'
              ? 'text-red-400 border-red-500'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-700'
          )}
        >
          <RiCalendarScheduleLine className="w-5 h-5" />
          Disponibles
          <Badge variant={activeTab === 'active' ? 'danger' : 'ghost'} className="ml-1.5 px-2 py-0.5 text-xs">
            {activeShowtimes.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={cn(
            'flex items-center gap-2 py-3 px-2 text-sm font-semibold transition-all border-b-2 -mb-px',
            activeTab === 'past'
              ? 'text-white border-gray-400'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-700'
          )}
        >
          <RiHistoryLine className="w-5 h-5" />
          Finalizadas
          <Badge variant={activeTab === 'past' ? 'default' : 'ghost'} className="ml-1.5 px-2 py-0.5 text-xs">
            {pastShowtimes.length}
          </Badge>
        </button>
      </div>

      <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800/60 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
        {isLoading ? (
          <div className="divide-y divide-gray-800/50">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : displayedShowtimes.length === 0 ? (
          <div className="py-12 animate-scale-in">
            <EmptyState
              icon={activeTab === 'active' ? 'inbox' : 'film'}
              title={activeTab === 'active' ? 'Sin funciones activas' : 'Sin historial'}
              description={
                activeTab === 'active' 
                  ? 'No hay funciones programadas para los próximos días.' 
                  : 'Aún no hay funciones que hayan terminado.'
              }
              action={
                activeTab === 'active' && (
                  <Button variant="outline" onClick={() => navigate('/admin/showtimes/create')}>
                    <RiCalendarScheduleLine className="w-4 h-4" />
                    Programar la primera
                  </Button>
                )
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800/60 bg-gray-800/20">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Película</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Sala</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Fecha y Hora</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Precio</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {displayedShowtimes.map((showtime) => {
                  const isPast = activeTab === 'past';
                  
                  return (
                    <tr key={showtime.id} className="hover:bg-gray-800/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-14 rounded-lg bg-gray-800 overflow-hidden shrink-0 shadow-md">
                            {showtime.movie?.imageUrl && (
                              <img 
                                src={showtime.movie.imageUrl} 
                                alt={showtime.movie.title} 
                                className={cn("w-full h-full object-cover transition-transform group-hover:scale-105", isPast && "grayscale opacity-80")} 
                              />
                            )}
                          </div>
                          <span className={cn("font-bold text-sm", isPast ? "text-gray-300" : "text-white")}>
                            {showtime.movie?.title || 'Película eliminada'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                        {showtime.room?.name || 'Sala eliminada'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 capitalize-first">
                        {formatDateTime(showtime.startTime)}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-red-400">
                        {formatCurrency(showtime.price)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge variant={isPast ? 'ghost' : 'default'} className={cn(isPast && "border-gray-700 text-gray-400")}>
                          {isPast ? 'Finalizada' : 'Programada'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}