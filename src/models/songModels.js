import { nanoid } from "nanoid";

class SongModel {
  constructor(id_user, title, artists, url) {
    this.id_user = id_user;
    this.id = nanoid(12);
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

export default SongModel;
