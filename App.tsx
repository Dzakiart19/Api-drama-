
import React, { useState, useCallback } from 'react';
import { Endpoint, EndpointType, ApiResponse } from './types';
import { ENDPOINTS } from './constants';
import { getSimulationResponse } from './services/geminiService';
import Sidebar from './components/Sidebar';
import ResponseViewer from './components/ResponseViewer';

const App: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint>(ENDPOINTS[0]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParamChange = (name: string, value: string) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const executeRequest = async () => {
    setIsLoading(true);
    const start = performance.now();
    
    try {
      const data = await getSimulationResponse(activeEndpoint.id, params);
      const end = performance.now();
      
      setResponse({
        status: 200,
        time: `${Math.round(end - start)}ms`,
        data: data
      });
    } catch (error: any) {
      setResponse({
        status: 500,
        time: '0ms',
        data: { error: error.message || 'Internal Server Error' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndpointSelect = (ep: Endpoint) => {
    setActiveEndpoint(ep);
    setParams({});
    setResponse(null);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar activeEndpoint={activeEndpoint} onSelect={handleEndpointSelect} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header / Info Area */}
        <div className="p-8 border-b border-slate-800 bg-slate-900/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
              {activeEndpoint.method}
            </span>
            <span className="text-lg font-mono text-slate-400">{activeEndpoint.path}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{activeEndpoint.description}</h2>

          {/* Parameters Form */}
          {activeEndpoint.params.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {activeEndpoint.params.map(p => (
                <div key={p.name} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                    {p.name}
                    {p.required && <span className="text-pink-500 font-bold">*</span>}
                  </label>
                  <input
                    type="text"
                    value={params[p.name] || ''}
                    onChange={(e) => handleParamChange(p.name, e.target.value)}
                    placeholder={p.placeholder}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={executeRequest}
              disabled={isLoading || activeEndpoint.params.some(p => p.required && !params[p.name])}
              className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all transform active:scale-95 ${
                isLoading || activeEndpoint.params.some(p => p.required && !params[p.name])
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/10'
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              )}
              {isLoading ? 'Requesting...' : 'Send Request'}
            </button>
            <span className="text-xs text-slate-500">Method: HTTP GET • Auth: None required</span>
          </div>
        </div>

        {/* Response Area */}
        <ResponseViewer response={response} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;
