
export class Image {
    constructor(id, uid, image) {
        this.id = id;
        this.author = uid;
        this.likes;
        this.dislikes;
        this.comments = [];
        this.image = image;
    }
    //input 1 to like or -1 to unlike
    like(num) {
        if(num === 1) {
            this.likes += 1;
        } else {
            this.likes -= 1;
        }
    }
    //input 1 to dislike or -1 to undislike
    dislike(num) {
        if(num === 1) {
            this.dislikes += 1;
        } else {
            this.dislikes -= 1;
        }
    }
    //give userId then comment string
    comment(userId, s) {
        this.comments.push({uid: userId, comment: s});
    }
    //returns 1 if successful -1 if not found
    deleteComment(userId) {
        comments.forEach(comment => {
            if(comment.uid === userId) {
                let index = comments.indexOf(comment);
                this.comments.splice(index, 1);
                return 1;
            }
        });
        return -1;
    }
}