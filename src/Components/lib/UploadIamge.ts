import axios from 'axios'

export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )

  return data?.data?.url
}
