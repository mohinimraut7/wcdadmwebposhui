//he citizen madhal aahe

const getPhotoUrl = (photoPath) => {
  if (!photoPath) return null;
  if (photoPath.startsWith("http")) {
    // localhost असेल तर replace करा
    return photoPath.replace(
      "http://localhost:5000",
      import.meta.env.VITE_FILE_BASE_URL
    );
  }
  return `${import.meta.env.VITE_FILE_BASE_URL}${photoPath}`;
};

export default getPhotoUrl;