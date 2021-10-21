export const convertToFormData = (data: any): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]: any) => {
    if (value) {
      if (Array.isArray(value))
        value.forEach((file: any) => {
          if (file instanceof Blob) {
            formData.append(key, file);
          }
        });
      else formData.append(key, value);
    }
  });
  return formData;
};
