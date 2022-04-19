import { Image } from './image.js';

export class User {
    constructor(uid, name, password) {
      this.name = name;
      this.uid = uid;
      this.password = password;
      this.images = [];
      this.likes = [];
    }
    changeName(name) {
        this.name = name;
    }
    changePassword(password) {
        this.password = password;
    }
    likeImage(image) {
        this.likes.push(image);
    }
    //returns 1 if successful, -1 if not found
    unlikeImage(image) {
        this.likes.forEach(element => {
            if(image.id === element.id) {
                let index = this.likes.indexOf(element);
                this.likes.splice(index, 1);
                return 1;
            }
        });
        return -1;
    }
    //returns image for input to database
    createImage(id, image) {
        this.images.push({id: id});
        return new Image(id, this.uid, image);
    }
}