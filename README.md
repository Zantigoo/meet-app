**FEATURE 1: FILTER EVENTS BY CITY**

*User-Story: As a user I should be able to filter events by the city they take place in.*

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

- Given a city hasn't been searched for.
- When the user opens the app
- Then the user should see all upcoming events.


Scenario 2: User should see a list of suggestions when they search for a city.

- Given the main page is open
- When the user begins typing in the city search
- Then a list should populate with suggestions that match the search entry


Scenario 3: User can select a city from the suggested list.

- Given a list of suggested entries is showing
- When the user selects a city from the list
- Then their city should be changed to the city and show upcoming events

---

**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

*User-Story: As a user, I should be able to toggle details on each event to view more or less information.*

Scenario 1: An event element is collapsed by default

- Given the user hasn't interacted with a event.
- When the user looks at the event.
- Then it's details should appear collapsed.

Scenario 2: User can expand an event to see its details

- Given the user wants to see further event details
- When the user interacts with the event
- Then the event should expand to show it's full details.

Scenario 3: User can collapse an event to hide its details

- Given the user is finished checking an event's details.
- When the user interacts with the expanded event.
- Then the event should collapse back and show less details.

---

**FEATURE 3: SPECIFY NUMBER OF EVENTS**

*User-Story: As a user, I should be able to adjust the number of events I see at a time.*

Scenario 1: When user hasn’t specified a number, 32 is the default number

- Given nothing has been changed
- When the user opens the events for a city
- Then the maximum shown is 32 Events by default

Scenario 2: User can change the number of events they want to see

- Given the user attempted to view additional or less events for a city
- When the user interacts with a counter for the number of events
- Then the user can modify the count changing the number of events shown. 

---

**FEATURE 4: USE THE APP WHEN OFFLINE**

*User-Story: As a user, even if i'm not connected to the internet I should still be able to check events for dates and locations I've searched.*

Scenario 1: Show cached data when there’s no internet connection

- Given there is no internet connection
- When the user attempts to use the application
- Then the application will display the data cached from earlier connection.

Scenario 2: Show error when user changes the settings (city, time range)

- Given the cached data is displaying and application is offline
- When the user attempts to change date range or city
- Then the application will throw an error alerting them the data cannot be retrieved.

---

**FEATURE 5: DATA VISUALIZATION**

*User-Story: As as user, I should be able to check on upcoming events and see them them per city.*

Scenario 1: Show a chart with the number of upcoming events in each city

-Given the user is on the main page
-When viewing the main page
-Then a chart section will display the number of events in a city.

---
