"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Monitor, Shield, CheckCircle } from "lucide-react"

interface PaymentFormProps {
  isOpen: boolean
  onClose: () => void
  onPaymentComplete: (paymentData: PaymentData) => void
  amount: number
  courseTitle: string
}

interface PaymentData {
  method: string
  amount: number
}

export function PaymentModal({ isOpen, onClose, onPaymentComplete, amount, courseTitle }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    const paymentData: PaymentData = {
      method: paymentMethod,
      amount: amount
    }

    onPaymentComplete(paymentData)
    setProcessing(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Complete Payment</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100"
          >
            ×
          </Button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <Monitor className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-xl">{courseTitle}</h3>
            <p className="text-gray-600">Secure Payment Checkout</p>
          </div>

          <div className="text-2xl font-bold mb-6">${amount.toFixed(2)}</div>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-medium">Credit Card</div>
                    <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                  </div>
                </Label>
              </div>
              
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-500">Fast & Secure</div>
                  </div>
                </Label>
              </div>

              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-12 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    ₿
                  </div>
                  <div>
                    <div className="font-medium">Cryptocurrency</div>
                    <div className="text-sm text-gray-500">Bitcoin, Ethereum</div>
                  </div>
                </Label>
              </div>

              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-12 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                    $
                  </div>
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-sm text-gray-500">Direct deposit</div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>

          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
            >
              {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </Button>
          </form>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Secured by 256-bit SSL encryption</span>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Safe & Secure
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 text-blue-600" />
            <span>24/7 customer support</span>
          </div>
          <div className="text-xs">
            © 2024 CodeMaster Learning Platform. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}