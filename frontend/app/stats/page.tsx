"use client";

import { useState, useEffect } from "react";

type StatsProps = {
  totalItems: number;
  instanceId: string;
};

export default function Stats() {
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Dodany stan ładowania dla lepszego UX

  useEffect(() => {
    async function fetcher() {
      try {
        const response = await fetch("http://localhost:8000/stats");
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Statystyki aplikacji</h2>

      {isLoading ? (
        // Pokazujemy komunikat podczas pobierania danych
        <div className="text-center p-8 opacity-60 animate-pulse">
          Pobieranie statystyk...
        </div>
      ) : stats ? (
        // Wyświetlamy statystyki w formie nowoczesnych kart (Grid)
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Karta: Liczba produktów */}
          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-foreground/20 bg-foreground/5 shadow-sm transition-colors hover:bg-foreground/10">
            <span className="text-sm uppercase tracking-wider opacity-70 mb-2">
              Liczba produktów
            </span>
            <span className="text-5xl font-bold">{stats.totalItems}</span>
          </div>

          {/* Karta: ID Instancji */}
          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-foreground/20 bg-foreground/5 shadow-sm transition-colors hover:bg-foreground/10 text-center">
            <span className="text-sm uppercase tracking-wider opacity-70 mb-2">
              ID Instancji Serwera
            </span>
            <span className="text-lg font-mono opacity-90 break-all">
              {stats.instanceId}
            </span>
          </div>
        </div>
      ) : (
        // Zabezpieczenie, jeśli serwer nie odpowie
        <div className="text-center p-8 border border-red-500/20 bg-red-500/10 text-red-500 rounded-lg">
          Nie udało się załadować danych. Sprawdź, czy backend działa.
        </div>
      )}
    </div>
  );
}
