"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Lock, Play, Pause } from "lucide-react"

interface VideoPlayerProps {
  lessonId: string
  title: string
  courseId: string
  chapterId: string
  nextChapterId?: string
  nextLessonId?: string
  videoUrl: string
  isLocked: boolean
  completeOnEnd: boolean
}

export function VideoPlayer({
  lessonId,
  title,
  courseId,
  chapterId,
  nextChapterId,
  nextLessonId,
  videoUrl,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setIsReady(true)
      setDuration(video.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const handleEnded = async () => {
      setIsPlaying(false)
      if (completeOnEnd) {
        await markAsCompleted()
      }
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [completeOnEnd])

  const markAsCompleted = async () => {
    try {
      await fetch(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: true }),
      })

      // Auto-advance to next lesson if available
      if (nextLessonId) {
        setTimeout(() => {
          router.push(`/courses/${courseId}/learn/${nextLessonId}`)
        }, 2000)
      } else if (nextChapterId) {
        setTimeout(() => {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }, 2000)
      }
    } catch (error) {
      console.error("Failed to update progress:", error)
    }
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (parseFloat(e.target.value) / 100) * video.duration
    video.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(parseFloat(e.target.value))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        {!isReady && !isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
            <Lock className="h-8 w-8" />
            <p className="text-sm">This lesson is locked</p>
          </div>
        )}
        {!isLocked && (
          <video
            ref={videoRef}
            className="w-full h-full"
            src={videoUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
          />
        )}
        
        {/* Video Controls Overlay */}
        {!isLocked && isReady && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4 text-white">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white/80"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${progress}%, rgba(255,255,255,0.3) ${progress}%, rgba(255,255,255,0.3) 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Video Title */}
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        {completeOnEnd && !isLocked && (
          <p className="text-sm text-gray-600 mt-1">
            This lesson will be marked as complete when you finish watching
          </p>
        )}
      </div>
    </div>
  )
}