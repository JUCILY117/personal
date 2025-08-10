import { useState } from 'react'
import GameForm from './GameForm'
import ProjectUploadForm from './ProjectUploadForm'

export default function SecretForm() {
  const [activeTab, setActiveTab] = useState('game')

  return (
    <div className="pt-28 pb-12 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div
          className="flex flex-col md:flex-row bg-gradient-to-br from-[#222d24]/90 via-[#1e2524]/85 to-[#23314a]/90
                     rounded-2xl overflow-hidden shadow-2xl"
          style={{ minHeight: 460, minWidth: 340 }}
        >
          <div className="flex md:flex-col bg-neutral-900/50 border-r border-neutral-800 p-4 gap-3 md:w-48">
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer w-full text-left ${
                activeTab === 'game'
                  ? 'bg-teal-400 text-gray-900'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              Game Image
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer w-full text-left ${
                activeTab === 'project'
                  ? 'bg-teal-400 text-gray-900'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              Project Upload
            </button>
          </div>

          <div className="flex-1 p-6 md:p-8">
            {activeTab === 'game' ? <GameForm /> : <ProjectUploadForm />}
          </div>
        </div>
      </div>
    </div>
  )
}
