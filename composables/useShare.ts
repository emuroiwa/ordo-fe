export interface ShareData {
  title: string
  text?: string
  url?: string
  image?: string
}

export interface ShareOptions {
  fallbackToClipboard?: boolean
  showSuccessMessage?: boolean
}

export const useShare = () => {
  const shareViaWebAPI = async (data: ShareData): Promise<boolean> => {
    if (!navigator.share) return false
    
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url || window.location.href
      })
      return true
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.warn('Share failed:', error)
      }
      return false
    }
  }

  const shareViaWhatsApp = (data: ShareData) => {
    const text = encodeURIComponent(`${data.title}\n${data.text || ''}\n${data.url || window.location.href}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareViaTwitter = (data: ShareData) => {
    const text = encodeURIComponent(data.text || data.title)
    const url = encodeURIComponent(data.url || window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareViaFacebook = (data: ShareData) => {
    const url = encodeURIComponent(data.url || window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareViaLinkedIn = (data: ShareData) => {
    const url = encodeURIComponent(data.url || window.location.href)
    const title = encodeURIComponent(data.title)
    const summary = encodeURIComponent(data.text || '')
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank')
  }

  const copyToClipboard = async (data: ShareData): Promise<boolean> => {
    const shareText = `${data.title}\n${data.text || ''}\n${data.url || window.location.href}`
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = shareText
        document.body.appendChild(textArea)
        textArea.select()
        const success = document.execCommand('copy')
        document.body.removeChild(textArea)
        return success
      }
    } catch (error) {
      console.warn('Copy to clipboard failed:', error)
      return false
    }
  }

  const share = async (data: ShareData, options: ShareOptions = {}) => {
    const { fallbackToClipboard = true, showSuccessMessage = true } = options

    // Try Web Share API first
    const webShareSuccess = await shareViaWebAPI(data)
    if (webShareSuccess) {
      if (showSuccessMessage) {
        // You can integrate with your notification system here
        console.log('Shared successfully!')
      }
      return
    }

    // Show share options modal or directly copy to clipboard
    if (fallbackToClipboard) {
      const copySuccess = await copyToClipboard(data)
      if (copySuccess && showSuccessMessage) {
        // You can integrate with your notification system here
        console.log('Link copied to clipboard!')
      }
    }
  }

  const getShareOptions = () => [
    { name: 'WhatsApp', icon: 'whatsapp', action: shareViaWhatsApp, color: 'text-green-500' },
    { name: 'Twitter', icon: 'twitter', action: shareViaTwitter, color: 'text-blue-400' },
    { name: 'Facebook', icon: 'facebook', action: shareViaFacebook, color: 'text-blue-600' },
    { name: 'LinkedIn', icon: 'linkedin', action: shareViaLinkedIn, color: 'text-blue-700' },
    { name: 'Copy Link', icon: 'copy', action: copyToClipboard, color: 'text-gray-600' }
  ]

  return {
    share,
    shareViaWhatsApp,
    shareViaTwitter,
    shareViaFacebook,
    shareViaLinkedIn,
    copyToClipboard,
    getShareOptions
  }
}