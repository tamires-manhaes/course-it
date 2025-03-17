import { create } from "zustand";
import { PlayerState } from "../@types";
import { api } from "../lib/axios";

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,
    load: async () => {
      set({ isLoading: true })
      const response = await api.get('/courses/1')

      set({
        course: response.data,
        isLoading: false,
      })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson){
        set({ currentLessonIndex: nextLessonIndex })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if(nextModule){
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    }
  }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentModuleIndex, currentLessonIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}