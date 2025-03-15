import { useAppSelector } from "../store"

export function Header() {
   const {currentLesson, currentModule} = useAppSelector(state => {
      const { currentLessonIndex, currentModuleIndex } = state.player
      const currentLesson = state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]
      const currentModule = state.player.course.modules[currentModuleIndex]
      return {currentModule, currentLesson }
    })
  return (
    <div className="flex flex-col gap-1 ">
      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">Modulo - {currentModule.title}</span>
    </div>
  )
}