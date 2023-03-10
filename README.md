Hello! Here is my Take Home Assignment for Univers Tech. Here is a short document laying out my though process on how I built the app.

# Design & Theme

-I decided to utilize the component structure from React Native Paper. Their "card" components are very versitile and allow you to implement unconventional component designs with a contained area.
-For legibility and to avoid eye-strain, I went with a dark color scheme with colorful highlights to accent the different categories of posts.

# App Flow & Functionality

-The app opens with a loading animation built with Lottie JSON. This doesn't have much functionality, I just thought it would look nice!
-Once the homescreen renders, we trigger an Axios API call to the primary link listed in the challenge.
-Our JSON response is passed into a FlatList; these are wonderful and include great features like automatic Key Extraction and Refresh Control. You can pull-to-refresh on the list (even though it just re-runs the same function.)

-We render our FlatList items as "ListItems" which offer a number of features:
-You can click the ListItem to be taken to the coorelated url.
-You can choose to "upvote" or "downvote" the post: \*\*PLEASE NOTE this only changes the button design and shows an alert at the bottom of the screen.

-I implemented some Menu components on both the List Header and on each of the List Items.
-For the Header, you'll see a list of available categories; when you click one, it changes the post rendered in the FlatList. These menu options are listed in the "Constants" folder as API_ROUTES.
-On The List Items, you'll notice 3 horizontal dots; Press these to see options for managing that post.

# Additional

-I added a "Scroll To Top" FAB (floating action button) which stays in an absolute position on the bottom-right part of the screen.
-I utilize TimeFormatter functions listed in the utils folder to help format dates on the LineItems.
-The welcome message on the top of the screen changes based on the time of day.
-After fixing the sort functionality of the dataset, I added a menu button to allow the user to toggle between sorting between most recent posts and latest posts.
