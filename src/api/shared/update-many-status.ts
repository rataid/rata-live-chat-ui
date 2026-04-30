import { ApiResponse } from "@/model/shared/query"
import axiosInstance from "../axiosInstance"

export const UpdateStatusMany = async (type: string, payload: {ids: string[], isActive: boolean}) => {
  const res = await axiosInstance.post<ApiResponse>(`/v1/${type}/update-many`, payload)

  if (typeof res.data.status !== 'string' || res.data.status !== 'success') {
    throw new Error('Failed to fetch location data')
  }

  return {
    data: res.data.data,
  }
}