# OOP-game-show-app

Major Style Changes:

1. Removed the <h2> element with the "header" class in index.html since it was conflicting with the color changes of the win and/or lose overlay layouts. Every time the "Start Game" button is clicked, it creates a new <h2> element inside the same parent (#banner). Once a game is won or lost, the reset() method is called on the game object and removes the <h2> element of the #banner parent. Doing this prevents the <h2> element to be shown whenever the #overlay element is displayed. Since it was earlier being disguised by having the same color as #overlay.
   The <h2> element created has an animation which scales the element from 0 to 1 and an opacity from 0% to 100% giving it a nice popup effect.

2. Gradient Effects (Animation and Changing of colors) were added on to the .win, .lose, .start and body.
   .win: Gradient effect colors represents a winning color - which is usually associated with green and other similar shades.
   .lose: Gradient effect colors represents a losing color - which is usually associated with red and other similar shades.
   .start and body element: Gradient effect colors are a combination of colors which I find appealing to the eyes without too much effect.

3. Box shadow animation is added to all buttons (the onscreen keyboard and "Start Game" button) to somehow represent an actual keyboard making it more life-like.

4. A "heartbeat" effect was added to the final heart image. If a user only has one try or life left for the game, the last heart img which shows (images/liveHeart.png) shows a heartbeat animation emphasizing that it is only the last try for the user. Common effect found in some games. This is called on the game object's removeLife() method by adding the .lastLife class name to the element.

Minor Style Changes:

1. Added a border around the list items containing the .letter class. This is to be able to provide more visibility for the user since the background image is light.

2. <h1> added a text-shadow style property and changed the color to a more darker shade.
3. Changed the background color of the .show class to a more darker shade.
4. Changed the color of the .title class. Since the background colors are in a lighter shade, I decided to change the text-color of .title class to a darker color to be more visible.
