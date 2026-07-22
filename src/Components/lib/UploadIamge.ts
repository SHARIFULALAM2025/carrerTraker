import axios from 'axios'

export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData()

  formData.append('file', imageFile)

  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  )

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  )

  return data.secure_url
}
