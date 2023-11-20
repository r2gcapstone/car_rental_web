export const uploadNewImage = (e) => {
  const target = e.currentTarget
  const file = target.files

  const objectUrl = URL.createObjectURL(file[0])

  return {
    rawImage: file,
    preview: objectUrl
  }
}
