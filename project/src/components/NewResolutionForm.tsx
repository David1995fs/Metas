import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Resolution } from '../types';

interface NewResolutionFormProps {
  onAdd: (resolution: Omit<Resolution, 'id' | 'progress' | 'createdAt' | 'lastUpdated'>) => void;
  onClose: () => void;
}

export function NewResolutionForm({ onAdd, onClose }: NewResolutionFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [target, setTarget] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      frequency,
      target,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Nova Meta</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-turquoise-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-turquoise-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-1">
              Frequência
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-turquoise-500"
            >
              <option value="daily">Diária</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
              <option value="yearly">Anual</option>
            </select>
          </div>

          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">
              Meta
            </label>
            <input
              type="number"
              id="target"
              min="1"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-turquoise-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-turquoise-600 to-turquoise-400 hover:from-turquoise-500 hover:to-turquoise-300 transition-colors text-white font-medium"
      >
        <Plus className="w-5 h-5" />
        Adicionar Meta
      </button>
    </form>
  );
}