import { ChangeEvent } from 'react'

export const uploadNewImage = (
  e: ChangeEvent<HTMLInputElement>
): { rawImage: File[]; preview: string } => {
  const target = e.currentTarget as HTMLInputElement
  const file = target.files as unknown as File[]

  const objectUrl = URL.createObjectURL(file[0])

  return {
    rawImage: file,
    preview: objectUrl
  }
}
