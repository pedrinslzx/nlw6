import { ReactNode, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { analytics } from "./firebase";

interface AnalyticsProps {
  children: ReactNode
}

export function Analytics({ children }: AnalyticsProps) {
  const history = useHistory()

  useEffect(() => {
    const unsubscribe = history.listen((location) => {
      analytics.setCurrentScreen(location.pathname)
    })
    return () => unsubscribe()
  })

  return (
    <>
      {children}
    </>
  )
}
