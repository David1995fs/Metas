import React, { useState } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import { Resolution } from './types';
import { ResolutionCard } from './components/ResolutionCard';
import { NewResolutionForm } from './components/NewResolutionForm';

function App() {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);

  const handleAddResolution = (newResolution: Omit<Resolution, 'id' | 'progress' | 'createdAt' | 'lastUpdated'>) => {
    const resolution: Resolution = {
      id: crypto.randomUUID(),
      progress: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
      ...newResolution,
    };
    setResolutions([...resolutions, resolution]);
  };

  const handleToggleProgress = (id: string) => {
    setResolutions(resolutions.map(resolution => {
      if (resolution.id === id && resolution.progress < resolution.target) {
        return {
          ...resolution,
          progress: resolution.progress + 1,
          lastUpdated: new Date(),
        };
      }
      return resolution;
    }));
  };

  const handleEdit = (updatedResolution: Resolution) => {
    setResolutions(resolutions.map(resolution =>
      resolution.id === updatedResolution.id ? updatedResolution : resolution
    ));
  };

  const handleDelete = (id: string) => {
    setResolutions(resolutions.filter(resolution => resolution.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-turquoise-400" />
              <h1 className="text-3xl font-bold text-white">Metas</h1>
            </div>
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-turquoise-600 to-turquoise-400 hover:from-turquoise-500 hover:to-turquoise-300 transition-colors text-white font-medium"
            >
              <Plus className="w-5 h-5" />
              Nova Meta
            </button>
          </div>
        </header>

        {showNewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <NewResolutionForm
                onAdd={handleAddResolution}
                onClose={() => setShowNewForm(false)}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolutions.map(resolution => (
            <ResolutionCard
              key={resolution.id}
              resolution={resolution}
              onToggleProgress={handleToggleProgress}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {resolutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Nenhuma meta ainda. Clique em "Nova Meta" para começar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;