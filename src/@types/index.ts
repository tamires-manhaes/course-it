export interface CourseState {
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
  isLoading: boolean

  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}