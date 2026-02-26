"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Download, Heart, Star, ShoppingBag, ArrowRight, Gift } from 'lucide-react'

export function ButtonShowcase() {
  const [loadingButtons, setLoadingButtons] = useState<Set<string>>(new Set())

  const simulateLoading = (buttonId: string) => {
    setLoadingButtons(prev => new Set(prev).add(buttonId))
    setTimeout(() => {
      setLoadingButtons(prev => {
        const next = new Set(prev)
        next.delete(buttonId)
        return next
      })
    }, 2000)
  }

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Button Variants
        </h1>
        <p className="text-muted-foreground text-lg">
          Professional button styles for your application
        </p>
      </div>

      {/* Main Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Main Variants</CardTitle>
          <CardDescription>Core button styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="lg">
              Default
            </Button>
            <Button variant="outline" size="lg">
              Outline
            </Button>
            <Button variant="secondary" size="lg">
              Secondary
            </Button>
            <Button variant="ghost" size="lg">
              Ghost
            </Button>
            <Button variant="link" size="lg">
              Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Action Variants</CardTitle>
          <CardDescription>Common action buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="success" size="default" icon={<Download className="w-4 h-4" />}>
              Download
            </Button>
            <Button variant="warning" size="default" icon={<Gift className="w-4 h-4" />}>
              Claim Offer
            </Button>
            <Button variant="destructive" size="default">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variations</CardTitle>
          <CardDescription>Different button sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="default" size="xs">Tiny</Button>
            <Button variant="default" size="sm">Small</Button>
            <Button variant="default" size="default">Default</Button>
            <Button variant="default" size="lg">Large</Button>
            <Button variant="default" size="xl">Extra Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Icon Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Buttons</CardTitle>
          <CardDescription>Buttons with icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="default" size="icon">
              <Play className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon-lg">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>Buttons with loading animations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="default" 
              size="lg"
              loading={loadingButtons.has('load1')}
              onClick={() => simulateLoading('load1')}
            >
              Loading Button
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              loading={loadingButtons.has('load2')}
              onClick={() => simulateLoading('load2')}
            >
              Outline Loading
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              loading={loadingButtons.has('load3')}
              onClick={() => simulateLoading('load3')}
            >
              Secondary Loading
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Button with Badges</CardTitle>
          <CardDescription>Buttons combined with badges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Button variant="default" size="lg">
                <Star className="w-4 h-4 mr-2" />
                Featured
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                HOT
              </Badge>
            </div>
            <div className="relative">
              <Button variant="default" size="lg">
                <Gift className="w-4 h-4 mr-2" />
                Special Offer
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                NEW
              </Badge>
            </div>
            <div className="relative">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Badge className="absolute -top-2 -right-2" variant="secondary">
                PRO
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
