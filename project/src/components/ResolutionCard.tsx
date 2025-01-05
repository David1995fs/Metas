import React from 'react';
import { CheckCircle2, Circle, Edit, Trash2 } from 'lucide-react';
import { Resolution } from '../types';

interface ResolutionCardProps {
  resolution: Resolution;
  onToggleProgress: (id: string) => void;
  onEdit: (resolution: Resolution) => void;
  onDelete: (id: string) => void;
}

export function ResolutionCard({ resolution, onToggleProgress, onEdit, onDelete }: ResolutionCardProps) {
  const progress = Math.round((resolution.progress / resolution.target) * 100);
  
  const frequencyMap = {
    daily: 'Diária',
    weekly: 'Semanal',
    monthly: 'Mensal',
    yearly: 'Anual'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-turquoise-500 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{resolution.title}</h3>
          <p className="text-gray-400 text-sm">{resolution.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(resolution)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(resolution.id)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400 text-sm">{frequencyMap[resolution.frequency]}</span>
          <span className="text-turquoise-400 text-sm font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-turquoise-600 to-turquoise-400 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => onToggleProgress(resolution.id)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
      >
        {resolution.progress < resolution.target ? (
          <Circle className="w-5 h-5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-turquoise-400" />
        )}
        Marcar Progresso
      </button>
    </div>
  );
}