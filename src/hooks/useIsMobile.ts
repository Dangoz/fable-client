import { useEffect, useState, useCallback } from 'react'

/**
 * Hook to detect if the user is on a mobile device.
 * Uses a combination of screen width and optional user agent detection.
 * @param breakpoint - The width threshold in pixels (default: 768px)
 * @returns boolean indicating if the device is mobile
 */
export default function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Helper function to check if the device is mobile
  const checkIsMobile = useCallback(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return false
    }

    // Primary check: screen width
    const isMobileByWidth = window.innerWidth < breakpoint

    // Secondary check: user agent (optional additional check)
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isMobileByUserAgent = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)

    // Combined check (prioritizing width for responsive design)
    return isMobileByWidth || isMobileByUserAgent
  }, [breakpoint])

  useEffect(() => {
    // Set initial value
    setIsMobile(checkIsMobile())

    // Add resize event listener
    const handleResize = () => {
      setIsMobile(checkIsMobile())
    }

    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [checkIsMobile])

  return isMobile
}
