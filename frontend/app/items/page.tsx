"use client";

import { useState, useEffect } from "react";

type ItemsProps = {
  id: number;
  item: string;
};

export default function Items() {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data: ItemsProps[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Błąd pobierania danych", error);
      }
    };
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItemName.trim()) return;

    const newItem = {
      id: Date.now(),
      item: newItemName,
    };

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setItems((prev) => [...prev, addedItem]);
        setNewItemName("");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania produktu", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Lista produktów:</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Wpisz nazwę produktu..."
          className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg font-medium transition-colors bg-foreground text-background hover:opacity-90"
        >
          Dodaj produkt
        </button>
      </form>
      
      <div className="overflow-x-auto rounded-lg border border-foreground/20 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-foreground/20 bg-foreground/5">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Nazwa produktu</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-foreground/10 last:border-0 hover:bg-foreground/5 transition-colors"
                >
                  <td className="p-4 text-sm opacity-80">{item.id}</td>
                  <td className="p-4 font-medium">{item.item}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-8 text-center opacity-60">
                  Brak produktów na liście. Dodaj pierwszy!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
