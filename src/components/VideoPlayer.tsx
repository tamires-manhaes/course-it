import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { next, useCurrentLesson } from '../store/slices/player'

export function VideoPlayer(){
  const dispatch = useDispatch()
  const { currentLesson } = useCurrentLesson()

  function handlePlayerNext(){
    dispatch(next())
  }

  if(!currentLesson){
    return null
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer 
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handlePlayerNext}
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
      />
    </div>
  )
}