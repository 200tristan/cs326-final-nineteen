# Team Name
Team NineTeen
# Application Name
ScribblGram
# Class
Spring 2022
# Overview
Social platform with an emphasis on creative drawing and minimalism in tools.
# Team Overview
Ashwin Randhir - 200tristan

Caleb Russell - Crussell3

Raine Troubetaris - GuardKiwi

Julia Kazmer - jkazmer

# PART 0
# APIs implemented
(x) - implemented 

**Endpoints:**

- Images
  - Get Image   (get)(x)
  - Get Likes    (get)
  - Update Likes   (put)
  - Get Artist    (get)
  - Create   (post)
  - Delete   (delete)

- Users
  - Create (post)(x)
  - Delete (delete)
  - Update (put)
  - Username (get)(x)
  - Password (get)(x)
  - Image Create (post)
  - Liked Images (put)
  - Unlike (delete)

## Part 1  **Back-end Skeleton Code**

## Part 2 **Front-end Implementation**

![ScribblGram Studio](https://github.com/200tristan/cs326-final-nineteen/blob/main/src/demoAssets/canvasRich.jpg)
Drawing app page allows for creation of in browser drawings using HTML Canvas.

![ScribblGram Login](https://github.com/200tristan/cs326-final-nineteen/blob/main/src/demoAssets/login.jpg)

The login page allows for the same form to be used for login and registration; simply put in a username and password and press register to create an account, do the same to login. 

![ScribblGram Homepage](https://github.com/200tristan/cs326-final-nineteen/blob/main/src/demoAssets/ImplementedHomePage(rough).jpg)

The homepage allows for created artwork to be read/displayed. When a user is logged in, the "Login" button is replaced with two other buttons. "Create!" takes the user to the canvas page, and "Logout" logs the user out.

![ScribblGram Homepage Logged In](https://github.com/200tristan/cs326-final-nineteen/blob/main/src/demoAssets/homepage-logged-in.PNG)

We are currently working on the updating and deleting aspects; they will be implemented when we get user profile pages working. (delete post, account and update likes and the homepage)

## Part 3 Deployment 
Heroku Deployment Link: https://scribblgram-final-project.herokuapp.com/

## **Group Contributions (Division of Labor)** 

200tristan(Ashwin Randhir) - Wrote style, gui and script for drawing app using canvas. Pushed project to Heroku and wrote the second half of the markdown file. Small miscellaneous modifications and fixes. 

jkazmer (Julia Kazmer) - Reformatted the bootstrap in index.html. Added index.js and fixed some script dependencies. Added logout and a few other front-end tweaks.

Crussell3 (Caleb Russell) - created server and client CRUD for comunication between server and client. Implemented user login and creation using client CRUD. Small modifications to front-end and fixes across to application.