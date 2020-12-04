<!-- ![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png) -->

# Ironhack Final Project


#### Author:

Jordi Boronat


### Endpoints

 | Method        |  Path          | Response(200)  | Action  |
  | ------------- | ------------- | ------------- | ------------- |
  |GET| `/`  || Homepage  |
  |GET| `/recipes` || List of all recipes |
  |GET| `/recipes/:id` || Recipe details page |
  |GET| `/recipes/:id/send` || Recipe details page |
  |POST| `/recipes/:id/send` || Recipe details page |
  |GET| `/login` || Log in form  |
  |POST| `/login` || Send log in form  |
  |GET| `/signup` || Sign up form  |
  |POST| `/signup` || Send sign up form  |
  |GET| `/logout` || Send log out action  |
  |GET| `/profile` || User's profile  |
  |GET| `/profile/edit?id=` || Edit user's profile form  |
  |POST| `/profile/edit?id=` || Send edited user's profile form  |
  |GET| `/profile/delete?id=` || Delete user's profile page  |
  |POST| `/profile/delete?id=` || Confirm user delete  |
  |GET| `/profile/recipes` || User's posted recipes |
  |GET| `/profile/recipes/:id` || Recipe details page |
  |POST| `/profile/recipes/delete?id=` || Remove movie/serie from likes list  |
  |GET| `/profile/friends` || User's posted recipes |
  

<!-- 
### Models

In `models` folder we have several mdeols to be used:

- The User with these properties:

    ```bash
        - email,
        - password: to be encrypted with bcrypt
        - name,
        - img: will be the image src path
        - timestamps
    ```

- The Movie with these properties:


    ```bash
        - title,
        - overview: a small summary of the plot
        - release_date,
        - popularity,
        - vote_average,
        - poster_path: will be the image src path from the poster
        - timestamps
    ```


### API

We will be using the The Movies Data Base API.
The base URL to access all the information in this API is this:
    ```
        https://api.themoviedb.org/3
    ```

Also, at the end of every route you'd like to acces you have to include the API key in query format (`?api_key=`) with the number provided by TMDB.

To access different kinds of information we have different routes provided by TMDB which should be added after the base URL and before the API key:
THE MOVIE DATA BASE: base URLs

To access <b>movies</b>
- For a particular movie details: /movie/`<movie_id>`
- For a particular movie credits: /movie/`<movie_id>`/credits

To access <b>series</b>
- For a particular series details: /tv/`<serie_id>`
- For a particular movie credits: /tv/`<serie_id>`/credits

To access <b>actors</b> and <b>directors</b>
- For a particular person's data: /person/`<person_id>`
- For a particular person's movies credits: /person/`<person_id>`/movie_credits
- For a particular person's series credits: /person/`<person_id>`/tv_credits

To access <b>genres</b>
- For all movies possible genres: /genre/movie/list
- For all series possible genres: /genre/tv/list

To access <b>top ratings</b> (these lists update daily)
- For top rated movies: movie/top_rated
- For top rated series: tv/top_rated

To access <b>populars</b> (these lists update daily)
- For popular movies: movie/popular
- For popular series: tv/popular

To <b>discover</b> content by different type of data like average rating, number of votes, genres and certifications
- For movies: /discover/movie
- For series: /discover/tv

To access <b>images</b> a modified route is used, where the fist parameter refers to the size of the image you'd like to obtain and the second to path of the image you are looking for.
```bash
Link: https://image.tmdb.org/t/p/<w300>/<image_path>
``` -->
