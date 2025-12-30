
import React from 'react';
import { ApiResponse } from '../types';

interface ResponseViewerProps {
  response: ApiResponse | null;
  isLoading: boolean;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-500 space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <p className="animate-pulse">Scraping DramaBox server in real-time...</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl m-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 opacity-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
        <p className="text-center">Select an endpoint and hit <span className="text-purple-400 font-bold">Send Request</span> to see the response.</p>
      </div>
    );
  }

  const isError = response.status >= 400;

  return (
    <div className="flex-1 flex flex-col overflow-hidden m-6 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl">
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold px-2 py-1 rounded ${isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {response.status} {response.status === 200 ? 'OK' : 'ERROR'}
          </span>
          <span className="text-xs text-slate-500 mono">{response.time}</span>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))}
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          Copy JSON
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6 font-mono text-sm">
        <pre className="text-purple-300">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResponseViewer;
