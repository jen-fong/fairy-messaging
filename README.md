## Running the app

In the project directory, you can run:

`nvm use` (if you do not use nvm, this project was built with node v13.14.0)

`npm install`

`npm start`

Then go to localhost:3000 to see the app

## Technologies

- React with redux for state management (hooks were used for local state that wasn't shared throughout the app)
- react-bootstrap - for basic styling and a few components such as buttons, cards, and forms
- React router for routing
- node sass - this wasn't really needed since bootstrap already provided nearly everything we needed but for more complicated stylings, this would be very useful
- uuid for generation of the post and comment ids. In reality, when we save posts and comments to a server, we would get these ids and we wouldn't need to generate them on the frontend.
- immer for immutability handling in the reducers

## Architecture

Since the project was quite small, I just followed the splitting code by tech functionality. In larger apps, we could separate the code by feature or something similar. I think it would also be a good idea to normalize our state a little more using normalizr for the posts and comments.

Things I would like to add if there was time would be a typing library such as Typescript or flow.

### Extra credit

I added unit testing for the actions, components, and reducers since tests are an important part of development and it allows us to detect broken functionality early on. It's also very useful during refactoring and for documentation purposes
