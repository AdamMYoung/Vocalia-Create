export class PodcastUpload {
  uid?: string;
  name: string;
  description: string;
  imageData: string;
  fileType: string;

  constructor(
    name: string,
    description: string,
    imageData: string,
    fileType: string,
    uid?: string
  ) {
    this.name = name;
    this.description = description;
    this.imageData = imageData;
    this.fileType = fileType;
    this.uid = uid;
  }
}
