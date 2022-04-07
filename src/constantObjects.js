

export class User {
    constructor(name, password) {
      this.name = name;
      this.password = password;
      this.likes;
    }
    changeName(name){
        this.name = name;
    }
    changePassword(password){
        this.password = password;
    }
}

export class Images {
    constructor(user) {
        this.author = user.name;
        this.likes;
        this.dislikes;
    }
    //input 1 to like or -1 to unlike
    like(num) {
        if(num === 1) {
            this.likes += 1;
        }else{
            this.likes -= 1;
        }
    }
    //input 1 to dislike or -1 to undislike
    dislike(num) {
        if(num === 1){
            this.dislikes += 1;
        }else{
            this.dislikes -= 1;
        }
    }

}