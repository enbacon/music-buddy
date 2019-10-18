# Music Buddy:  An easy way for musicians to track their repertoire and performances!

## Setup Steps
Sign up for the application using an email address and password.
This application allows a musician to keep track of the pieces they have learned, also known as their repertoire.

This application also allows them to enter in performance details and populate the performances from their repertoire list.

### Links for Music Buddy Full Stack Project
#### Front-end
* https://enbacon.github.io/music-buddy/
* https://github.com/enbacon/music-buddy

#### Back-end
* https://lit-cliffs-90523.herokuapp.com/
* https://github.com/enbacon/music-buddy-back-end

## Front-end Technologies Used
* React
* HTML5
* CSS
* SASS
* Bootstrap
* AJAX
* jQuery
* Moment.js

## Back-end Technologies Used
* Express
* Mongoose
* MongoDB
* JavaScript

## Catalog of Routes
### Repertoire

|  Verb  | URI Pattern |
|:------:|:-----------:|
|   GET  | /pieces     |
|   GET  | /pieces/:id |
|  POST  | /pieces     |
|  PATCH | /pieces/:id |
| DELETE | /pieces/:id |

### Performances

|  Verb  |    URI Pattern    |
|:------:|:-----------------:|
|   GET  |   /performances   |
|   GET  | /performances/:id |
|  POST  |   /performances   |
|  PATCH | /performances/:id |
| DELETE | /performances/:id |

# Planning:
## Front-end Repository
### Wireframes:
<img width="948" alt="piece-input-form" src="https://user-images.githubusercontent.com/52134116/67061602-cce72200-f12e-11e9-9670-38eeddde0029.png">

<img width="711" alt="performance-builder" src="https://user-images.githubusercontent.com/52134116/67061619-d4a6c680-f12e-11e9-8ddc-139609e58234.png">

<img width="919" alt="performance-view" src="https://user-images.githubusercontent.com/52134116/67061612-d07aa900-f12e-11e9-9452-4c721f127d12.png">



## Back-end Repository
### ERDs:
![user-pieces](https://user-images.githubusercontent.com/52134116/67061541-a45f2800-f12e-11e9-8d98-cf0bb1e68e3b.png)

![user-pieces-performances](https://user-images.githubusercontent.com/52134116/67061547-a88b4580-f12e-11e9-935e-8245200fea40.png)

## User Stories:
* As a user, I want to sign up for an account.
* As a user, I want to login to my account.
* As a user, I want the app to automatically sign me in after signing up for an account.
* As a user, I want to be able to change my password.
* As a user, I want to be able to log out of my account.
* As a user, I want to be able to add pieces to my repertoire.
* As a user, I want to be able to update my pieces.
* As a user, I want to be able to look at all of the the pieces in my repertoire.

* As a user, I want to be able to delete one of my pieces.
* As a user, I want to be able to create a performance of pieces from my repertoire.
* As a user, I want to be able to edit a performance.
* As a user, I want to be able to delete a performance.

# Development Process and Problem Solving
The idea for this project came to me about 6 years ago when I was applying to graduate schools for my Master's in Cello Performance. Preparing for auditions, keeping track of the repertoire, the dates, etc. was so exhausting that I would lose hours to double checking my repertoire, performances, dates, and requirements. I wished that one day I or someone would be able to create a program that would help with the process. Now, after 11 weeks of training, I have built the essentials (plus some) of the dream project, and it can help me, my students, my friends, colleagues, and other musicians, better organize and track their repertoire and performing schedules.

For all of the problems that came up during the development of the app, they were tackled in the same manner that I would tackle learning a piece of music. I took large problems, broke, them down in to medium sized ones, and broke those down as small as they would go. I then tried to solve each mini problem until the bigger ones were resolved.

## Screenshots
<img width="1432" alt="Music-Buddy" src="https://user-images.githubusercontent.com/52134116/67057557-f730e380-f11e-11e9-8f1e-0e8710d17f8a.png">

<img width="1428" alt="Music-buddy-2" src="https://user-images.githubusercontent.com/52134116/67058057-1af52900-f121-11e9-9ad0-746e197ade02.png">


### Difficulties Faced
* Radio buttons.
  - Handling the state of the button.
  - Having the proper buttons pre-selected when editing a piece.
* Date & Times
  - Formating dates and times to be most helpful to the user.
* Dropdown selector.
  - Populating the dropdown selector for creating a performance.
  - Populating the dropdown selector with matching pieces when editing a performance.
* Edit capabilities.
  - Getting the Edit Piece and the Edit Performances pages to be pre-populated with the information already stored was a challenge.
    - The biggest part of the challenge seemed to be switching between the data formats the user would see and the data formats required by the server.
* Getting the user's timezone and offsetting it to make sure the dates were accurate.

## Goals for Future Versions and Unsolved Issues
### Goals
* Allow user to add the movements pieces.
* Allow user to add length of piece to the pieces.
* Have the performance display the length of the performance including intermission.
* Add the ability to mark a performance as 'past' or 'completed.'
* Add the ability to click a button for a printable version of a performance's information.
* Sort pieces by composer's last name.
* Sort pieces by type (i.e. Concerto, Sonata, Suite, etc.)
* Send performance dates to iCal, Google Calendars, etc.
* Have the ability to send the 'printable version' to friends via e-mail.
* With some small reworking, this could become a template for things such as groceries and shopping lists.

### Unsolved Issues
* No styling/ not intuitive user experience.
* The selector in the performance form does not pre-populate.
