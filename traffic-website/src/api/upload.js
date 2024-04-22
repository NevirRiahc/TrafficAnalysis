import request from '@/api/request'

const base = '/file'

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return request.post(base + "/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  idRecognize(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return request.post("/baidu/idRecognize", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  recogizePlant(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return request.post("/baidu/recogizePlant", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return request.get("/files");
  }
}

export default new UploadFilesService();
