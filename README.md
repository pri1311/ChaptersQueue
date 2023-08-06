<div id="top"></div>
<br />
<div align="center">
  <h2 align="center">ChaptersQueue</h2>
</div>



<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>
<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about-the-project">  About The Project</a></li>
    <li><a href="#screenshots">  Screenshots</a></li>
    <li><a href="#tech-stack"> Tech Stack</a></li>
    <li><a href="#run-locally">  Run Locally</a></li>
    <li><a href="#environment-variables">  Environment Variables</a></li>
    <li><a href="#references"> References</a></li>

  </ul>
</details>



![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)    

## About the Project


Bring any YouTube video which has chapters and convert it into a course, track your progress right inside of our app.


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Screenshots

![Welcome](https://github.com/pri1311/ChaptersQueue/blob/master/screenshots/hoempage.png)
![Course](https://github.com/pri1311/ChaptersQueue/blob/master/screenshots/course.png)
![MyCourses](https://github.com/pri1311/ChaptersQueue/blob/master/screenshots/mycourses.png)
![Login](https://github.com/pri1311/ChaptersQueue/blob/master/screenshots/login.png)

  ![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
## Tech Stack

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Bootstrap](https://react-bootstrap.netlify.app/)
- [Redux](https://redux.js.org/)


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png) 

## Run Locally

Clone the project

```bash
  git clone https://github.com/pri1311/ChaptersQueue
```

Install npm packages

```bash
  npm i
```

Configure Firebase

Create a project on Firestore and add relevant keys to `.env` file.

Starting Client 

```bash
  npm start
```


At the end of this, you should have

- client running at `http://localhost:3000/`

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_YOUTUBE_API_KEY : Youtube API/Consumer Key `

`REACT_APP_FIREBASE_API_KEY : Firebase API Secret `

`REACT_APP_FIREBASE_MESSAGING_SENDER_ID : Firebase Messaging Sender ID  `

`REACT_APP_FIREBASE_APP_ID : Firebase App ID `

`REACT_APP_FIREBASE_MEASUREMENT_ID : Firebase Measurement ID `

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## References

 - Core-Idea :
 	- [ytcourses](https://www.reddit.com/r/SideProject/comments/rlfqw8/i_built_an_app_that_lets_you_convert_youtube/)
 	- [ytcourses](https://ytcourses.vercel.app)


TODOs
- [x] Authentication
- [x] Get Video Details and Parse Description 
- [x] Handle Chapter End 
- [x] Persist all changes (Chapter end, video load) to Firebase
- [x] My Courses Page
- [x] Authorization for pages other than home & login/register
- [x] Login/Register and HomePage UI
- [x] Check for duplicate course - don't allow!
- [ ] Option to load Playlists too
- [ ] Create Custom Chapters (Maybe?)
- [ ] Error Handling for API calls