import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

// Axios Public Instance
const axiosPublic = axios.create({
  baseURL: 'https://y-gold-two.vercel.app/', 
});

// Generic data fetch using query params
const useGetData = (endpoint, queryParams = {}) => {
  const queryClient = useQueryClient();

  const { refetch, data = [] } = useQuery({
    queryKey: [endpoint, queryParams],
    queryFn: async () => {
      const response = await axiosPublic.get(endpoint, { params: queryParams });
      return response.data;
    },
    enabled: !!queryParams,
  });

  return { data, refetch, queryClient };
};

// Generic data post
const usePostData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ endpoint, postData }) => {
      const response = await axiosPublic.post(endpoint, postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); 
      Swal.fire({
        title: "Success!",
        text: "Data created successfully.",
        icon: "success",
      });
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue creating data.",
        icon: "error",
      });
    },
  });

  return mutation;
};

// Generic data update using params
const useUpdateData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ endpoint, id, updateData }) => {
      const response = await axiosPublic.put(`${endpoint}/${id}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); 
      Swal.fire({
        title: "Success!",
        text: "Data updated successfully.",
        icon: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating data:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating data.",
        icon: "error",
      });
    },
  });

  return mutation;
};

// Generic data delete using params
const useDeleteData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ endpoint, id }) => {
      const response = await axiosPublic.delete(`${endpoint}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); 
      Swal.fire({
        title: "Deleted!",
        text: "Data deleted successfully.",
        icon: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting data.",
        icon: "error",
      });
    },
  });

  return mutation;
};

export {
  useGetData,
  usePostData,
  useUpdateData,
  useDeleteData,
};
