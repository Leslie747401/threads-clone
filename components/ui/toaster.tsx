"use client"

import Image from "next/image"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center gap-4">
              <Image
              src='/assets/images/toast-checkmark.png'
              width={28}
              height={28}
              alt="tick icon"
              />
              {description && (
                <ToastDescription className="text-[17px]">{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
