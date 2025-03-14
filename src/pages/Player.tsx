import { MessageCircle } from "lucide-react";

import { Header } from "../components/Header";
import { VideoPlayer } from "../components/VideoPlayer";
import { Module } from "../components/Module";

export function Player(){
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4"/> 
            Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <VideoPlayer />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900 divide-y-1 divide-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            <Module moduleIndex={0} title="Fundamentos" lessonsAmount={3} />
            <Module moduleIndex={1} title="Arquitetura Flux" lessonsAmount={7} />
            <Module moduleIndex={2} title="Estados e Actions" lessonsAmount={5} />
            <Module moduleIndex={3} title="Fetch and Erro Handler" lessonsAmount={7} />
          </aside>
        </main>
      </div>
    </div>
  )
}