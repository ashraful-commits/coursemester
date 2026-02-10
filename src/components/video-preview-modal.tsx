"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, Pause, Volume2, Maximize, Settings } from "lucide-react"
import React, { useRef, useState, useEffect } from "react"

interface VideoPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: {
    id: string
    title: string
    description?: string
    duration?: number
    videoUrl?: string
    isFree: boolean
  }
  courseTitle: string
}

export function VideoPreviewModal({ isOpen, onClose, lesson, courseTitle }: VideoPreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [isOpen])

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  console.log('VideoPreviewModal rendering:', { isOpen, lesson, courseTitle })

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="relative">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {lesson.videoUrl ? (
              <video
                ref={videoRef}
                className="w-full h-full"
                src={lesson.videoUrl}
                poster="/covers/video-placeholder.jpg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                <div className="text-center">
                  <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg font-medium">Video Preview</p>
                  <p className="text-gray-500 text-sm mt-2">Premium content - Enroll to access</p>
                </div>
              </div>
            )}
            
            {/* Custom Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Play button overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlay}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-6 backdrop-blur-sm"
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Video Information */}
        <div className="bg-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <DialogTitle className="text-xl font-bold mb-2">{lesson.title}</DialogTitle>
              <DialogDescription className="text-base">
                {courseTitle} • {Math.round((lesson.duration || 0) / 60)} minutes
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {lesson.isFree ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Free Preview
                </Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  Premium Content
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-gray-300"
              >
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
          
          {lesson.description && (
            <p className="text-gray-600 mb-4">{lesson.description}</p>
          )}
          
          {!lesson.isFree && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-900">Unlock Full Course</h4>
                  <p className="text-blue-700 text-sm">Get instant access to all lessons and materials</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Enroll Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}