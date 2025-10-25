import { useAxiosInterceptors } from '../services/axiosInstance';
import { API_PATHS } from './apipath';

const uploadImage = async image => {
  const axiosInstance = useAxiosInterceptors();
  try {
    const formData = new FormData();

    // React Native FormData needs explicit 'uri', 'type', and 'name'
    formData.append('image', {
      uri: image.uri, // required — local file path or camera URI
      name: image.fileName || 'upload.jpg', // give a name if missing
      type: image.type || 'image/jpeg', // MIME type
    });

    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

export default uploadImage;
