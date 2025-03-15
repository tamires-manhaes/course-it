import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

interface CourseState {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  currentModuleIndex: number
  currentLessonIndex: number
  course: CourseState | null
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<CourseState>) => {
      state.course = action.payload
    },

    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },

    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson){
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if(nextModule){
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    }
  }
})


export const player = playerSlice.reducer
export const { play, next, start } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    const currentLesson = state.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
    const currentModule = state.player.course?.modules[currentModuleIndex]
    return {currentModule, currentLesson }
  })
}