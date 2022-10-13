import { _sleep } from '@/helpers/misc.js'
import type { ApmCanvas } from 'src/classes/canvas/ApmCanvas'
import type { Sitemap } from 'src/classes/Sitemap'
import { env } from 'src/env'

export class CanvasDownloader {
  sitemap: Sitemap
  maxWidth: number
  maxHeight: number

  constructor(sitemap: Sitemap) {
    this.sitemap = sitemap
  }

  async captureImage({ name = 'generated', bg = '#fff' }) {
    let canvas: ApmCanvas = this.sitemap.canvas
    let element = canvas.element
    const padding = 100
    let widthO = canvas.width
    let heightO = canvas.height
    let maxWidth = this.maxWidth = canvas.maxX - canvas.minX + padding
    let maxHeight = this.maxHeight = canvas.maxY - canvas.minY + padding

    canvas.setZoom(1)
    canvas.updateOrigin(0, 0)
    canvas.updateCanvasSize(maxWidth, maxHeight)

    this.sitemap.draw()

    await _sleep(600)

    let tempC = document.createElement('canvas')
    let ctx = tempC.getContext('2d')
    // adjust the width of the temp canvas
    let tempCWidth = maxWidth + padding
    let tempCHeight = maxHeight + padding
    const dpr = window.devicePixelRatio
    tempC.width = tempCWidth * dpr
    tempC.height = tempCHeight * dpr

    // draw background
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, tempC.width, tempC.height)
    ctx.drawImage(element, 0, 0)

    // watermark
    ctx.font = `italic 35px Roboto, "Helvetica Neue", Arial, sans-serif`
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    const appName = env.appName
    const textW = ctx.measureText(name).width
    ctx.fillText(appName, tempCWidth - padding - textW, tempC.height - padding)

    let img = tempC.toDataURL('image/png', 1).replace('image/png', 'image/octet-stream')

    canvas.updateCanvasSize(widthO, heightO)

    return img
  }

  downloadImage({ name = 'generated', bg = '#fff' }) {
    return this.captureImage({ name, bg }).then(dataUrl => {
      let link = document.createElement('a')
      link.download = name + '.png'
      link.href = dataUrl
      link.click()
    })
  }

  downloadPdf({ name = 'generated', bg = '#fff' }) {
    return this.captureImage({ name, bg }).then(async dataUrl => {
      let height = this.maxHeight
      let width = this.maxWidth
      const jsPdfLimit = 12000
      const heightRatio = jsPdfLimit / height
      const widthRatio = jsPdfLimit / width
      const ratio = Math.min(heightRatio, widthRatio)
      if (ratio < 1) {
        height = Math.round(this.maxHeight * ratio)
        width = Math.round(this.maxWidth * ratio)
      }

      const jsPDF = (await import('jspdf')).jsPDF

      let doc = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        hotfixes: ['px_scaling'],
        format: [width, height]
      })
      doc.addImage(dataUrl, 'png', 0, 0, width, height, '', 'NONE')
      doc.save(name + '.pdf')
    })
  }
}
