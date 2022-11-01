export const FileHelper = {
  downloadBlob(blob, filename) {
    this.downloadDataUrl(URL.createObjectURL(blob), filename)
  },
  downloadDataUrl(dataUrl, filename) {
    let a = document.createElement('a')
    a.href = dataUrl
    a.setAttribute('download', filename)
    a.click()
  }
}
