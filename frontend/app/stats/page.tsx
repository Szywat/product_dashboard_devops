"use client";

import { useState, useEffect } from "react";

type StatsProps = {
  totalItems: number;
  instanceId: string;
  serverTime: number;
  requestCount: number;
};

export default function Stats() {
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetcher() {
      try {
        const response = await fetch("/api/stats");
        const data: StatsProps = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Błąd pobierania danych", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetcher();
  }, []);

  const uptime = () => {
    const t: number = stats?.serverTime ?? 0;

    if (Math.floor(t / 3600) > 0) {
      return `${Math.floor(t / 3600)}h ${Math.floor(t / 60) % 60}m ${Math.floor(t) % 60}s`;
    } else if (Math.floor(t / 60) > 0) {
      return `${Math.floor(t / 60) % 60}m ${Math.floor(t) % 60}s`;
    } else {
      return `${Math.floor(t) % 60}s`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Statystyki aplikacji</h2>

      {isLoading ? (
        <div className="text-center p-8 opacity-60 animate-pulse">
          Pobieranie statystyk...
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-foreground/20 bg-foreground/5 shadow-sm transition-colors hover:bg-foreground/10">
            <span className="text-sm uppercase tracking-wider opacity-70 mb-2">
              Liczba produktów
            </span>
            <span className="text-5xl font-bold">{stats.totalItems}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-foreground/20 bg-foreground/5 shadow-sm transition-colors hover:bg-foreground/10 text-center">
            <span className="text-sm uppercase tracking-wider opacity-70 mb-2">
              ID Instancji Serwera
            </span>
            <span className="text-lg font-mono opacity-90 break-all">
              {stats.instanceId}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-foreground/20 bg-foreground/5 shadow-sm transition-colors hover:bg-foreground/10 text-center">
            <span className="text-sm uppercase tracking-wider opacity-70 mb-2">
              Czas
            </span>
            <span className="text-lg font-mono opacity-90 break-all">
              {uptime()}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-foreground/20 bg-foreground/5 shadow-sm transition-colors hover:bg-foreground/10 text-center">
            <span className="text-sm uppercase tracking-wider opacity-70 mb-2">
              Liczba obsłużonych żądań
            </span>
            <span className="text-5xl font-bold">{stats.requestCount}</span>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border border-red-500/20 bg-red-500/10 text-red-500 rounded-lg">
          Nie udało się załadować danych. Sprawdź, czy backend działa.
        </div>
      )}
    </div>
  );
}
