## Description
Enchant is a D&D 5e Spell Book web application built with React-Redux, ExpressJS and MongoDB. This web application allows users to manage and track spell book spells, prepared daily spells, and daily spell slots for their D&D 5e characters and provides easy access to spell statistics.

---

## How to Use
Enchant can be accessed at this url: https://enchant-spellbook.herokuapp.com/

### Step 1 -- Logging In (Optional):
To save your Enchant activity, click on the log in link at the top right. You will be given the option to sign in with you Google or Facebook Account. *Please note that you can fully use Enchant without logging in*, but all of your activity will be gone after leaving the page.

### Step 2 -- Select Spells from All Spells:
Click on the "All Spells" tab to view all 5e D&D spells. Selecting these spells will add or remove them to your spell book. Hovering over a spell will provide the statistics for it. These spells can be sorted by level, school, alphabetically and reverse alphabetically by clicking on the "Sort" button above. These spells can be filtered by class by clicking on the "Filter" button above. Please note deselecting a spell will remove it from both your Daily Spells and Spellbook.

### Step 3 -- Select Spells from Spell Book:
Click on the "Spell Book" tab to view the spells in your spell book. Selecting these spells will add or remove them to your daily spells (prepared spells). Hovering over a spell will provide the statistics for it. These spells can be sorted by level, school, alphabetically and reverse alphabetically by clicking on the "Sort" button above. These spells can be filtered by class by clicking on the "Filter" button above.

### Step 4 -- Set Spell Slots:
Click on the "Daily Spells" tab to view your daily spell slots and spells (prepared spells). You can set your daily spell slots by filling out the table labeled "Spell Slots". Please note Cantrips do not require expense of a spell slot and thus are not in the table. To Refill your spell slots, click on the "Refill Spell Slots" button.

### Step 5 -- Cast Spells:
Click on the "Daily Spells" tab to view your daily spell slots and spells (prepared spells). Click on the spells below the Spell Slots table to view their statitics in modal view and to cast the spell. In the footer of the modal it will show you the amount of spell slots left for the associated spell level and a "Cast Spell" button. When you plan on casting a spell in D&D, click on this "Cast Spell" button to expend the associated spell slot (this change will show in the Spell Slot table). Please note when you have no more spell slots available for the spell's associated level a warning message will appear in the footer of the modal and you will not be able to click the "Cast Spell" button.

---

## Credits
- Frontend built with React and Redux: https://reactjs.org/, https://redux.js.org/
- Styling from Semantic UI: https://react.semantic-ui.com/
- Backend built with NodeJS and Express: https://nodejs.org/, https://expressjs.com/
- Authentication built with Google and Facebook Oauth with PassportJS: https://developers.google.com/,  https://developers.facebook.com/,  http://www.passportjs.org/
- Database built with MongoDB Atlas and Mongoose: https://www.mongodb.com/cloud/atlas, https://mongoosejs.com/
- Deployed with Heroku: https://heroku.com/
