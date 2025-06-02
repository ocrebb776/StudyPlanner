# Study Planner Application Documentation

## Table of Contents
1. [Overview](#overview)
2. [Core Modules](#core-modules)
3. [Classes](#classes)
4. [Utility Functions](#utility-functions)
5. [Global Variables](#global-variables)
6. [PHP Backend](#php-backend)
7. [Event Handling](#event-handling)
8. [Data Flow](#data-flow)
9. [Security](#security)
10. [Performance](#performance)
11. [Browser Support](#browser-support)

## Overview

The Study Planner is a web-based application that helps users manage their study sessions, track progress, and organize educational content. It provides features for managing topics, subjects, events, and notes with an intuitive calendar interface.

## Core Modules

### Homepage Module
**File:** `js/homepage.js`

Primary interface module providing calendar views, quick access buttons, and overall navigation.

**Features:**
- Calendar views (week/day)
- Quick access buttons
- Topic and subject management
- Study session tracking
- Search functionality

### Study Module
**File:** `js/study.js`

Manages study sessions with configurable work/break intervals and progress tracking.

**Features:**
- Topic selection
- Configurable work/break intervals
- Timer controls (pause/resume)
- Progress tracking
- Break reminders

### Todo Module
**File:** `js/todo.js`

Manages todo items with due dates and completion status.

**Features:**
- Real-time updates
- Due date tracking
- Completion status
- List management

### Notes Module
**File:** `js/notes.js`

Handles creation and management of notes throughout the application.

**Features:**
- Note creation/editing
- Visit record support
- Rich text formatting
- Link detection

### Events Module
**File:** `js/events.js`

Manages calendar events and scheduling.

**Features:**
- Event creation/editing
- Time conflict detection
- Color coding
- Duration tracking

### Topics Module
**File:** `js/topics.js`

Handles topic management and study progress tracking.

**Features:**
- Topic creation/editing
- Difficulty ratings
- Study visit tracking
- Progress monitoring

## Classes

### HomeScreen
**Extends:** Screen

Main interface controller class.

**Methods:**
- `show()`: Displays main interface
  - Initializes calendar
  - Sets up navigation buttons
  - Configures study tracking

**Properties:**
- `calendar`: Current calendar view instance
- `buttonList`: Quick access button container
- `selectedDate`: Currently selected calendar date

### TopicAndSubjectSection
**Extends:** Screen

Manages topic and subject display.

**Methods:**
- `show()`: Displays topic/subject interface
- `topics()`: Calculates topic rankings
  - Parameters: None
  - Returns: Array of sorted topics with ratings
- `displayTopics()`: Shows ranked topics in UI

**Properties:**
- `rankedTopics`: Array of sorted topics
- `topicListElement`: Topic display container

### HomeScreenCalendarWeek
**Extends:** Screen

Weekly calendar view controller.

**Methods:**
- `show()`: Displays weekly view
- `GetCalendarData()`: Retrieves calendar data
  - Returns: Calendar data object or false
- `daysList()`: Creates daily view elements
- `processWeekDay(today)`: Processes daily events
  - Parameters:
    - today: Array of daily events
  - Returns: [elementOrder, displayRatios]
- `updateCurrentDay()`: Updates current day selection
- `changeSelectedDate()`: Handles date selection

### HomeScreenDayView
**Extends:** HomeScreenCalendarWeek

Daily calendar view controller.

**Methods:**
- `daysList()`: Creates detailed daily view
  - Shows timeline of events
  - Handles event interactions

### Search
Global search functionality controller.

**Methods:**
- `constructor()`: Initializes search instance
- `getData()`: Retrieves/caches search data
  - Returns: Processed search data
- `show()`: Displays search interface
- `updateTables()`: Updates result tables
- `createTable(columns, display, data, id, btn)`: Creates searchable table
  - Parameters:
    - columns: Column identifiers
    - display: Column display names
    - data: Table data
    - id: Table ID
    - btn: Click handler
  - Returns: Table container element

### Study
**Extends:** Screen

Study session manager.

**Methods:**
- `constructor(topics)`: Creates study manager
- `show()`: Displays topic selection
- `studyWithThisTopic(topic)`: Starts topic setup
- `startStudying(formData)`: Begins study session
- `cancelStudy()`: Cancels current session
- `endStudy()`: Ends current session
- `markTopicAsVisited()`: Records visit
- `startCalmScreen()`: Shows break screen

## Utility Functions

### Calendar Utilities
- `getStartAndEndTimesCalendar(data)`: Processes event times
  - Parameters: Array of calendar events
  - Returns: Combined times/events array

- `createElementOrder(data)`: Orders calendar elements
  - Parameters: Array of times/events
  - Returns: Ordered display array

- `getRatios(data)`: Calculates display ratios
  - Parameters: Array of times/events
  - Returns: CSS grid template string

### View Management
- `calendarDayView()`: Switches to day view
- `calendarWeekView()`: Switches to week view
- `openOptionsView()`: Opens options modal
- `viewAllAjax()`: Shows debug information

### Data Processing
- `whiteList(string, allowNewLine)`: Validates input strings
- `hr_minToMin(timeString)`: Converts time to minutes
- `convertToReadableFormat(time)`: Formats time display

## Global Variables

### Configuration
- `weightings`: Topic ranking factors
  - timeSince: 0.4
  - diffRating: 0.8
  - mood: 0.3

### State Management
- `STUDY`: Current study session instance
- `homeScreen`: Main interface instance
- `search`: Global search instance
- `CURRENTPOPUPOBJECT`: Active modal reference

## Event Handling

The application uses event delegation and custom event handlers for:
- Calendar interactions
- Form submissions
- Real-time updates
- Timer management
- Search filtering

## Data Flow

1. User interactions trigger UI events
2. Events are processed by respective controllers
3. Data is retrieved/updated via AJAX calls
4. UI is updated with new data
5. State is maintained across components

## Security

- Input validation using `whiteList` function
- AJAX requests require authentication
- Session management via stored credentials
- XSS prevention in text display

## Performance

- Search data caching (10-second interval)
- Debounced updates for todo items
- Efficient DOM updates
- Optimized calendar rendering

## Browser Support

The application uses modern JavaScript features and requires:
- ES6 support
- DOM manipulation capabilities
- AJAX functionality
- CSS Grid support

## PHP Backend

### Core Utilities

#### SQL Handler (`SQL.php`)
Core database interaction module providing secure database operations.

**Features:**
- Prepared statement handling
- Connection management
- Query execution
- Result processing

#### Utils (`utils.php`)
Common utility functions for backend operations.

**Features:**
- Input validation
- Authentication checking
- Error handling
- Response formatting

### API Endpoints

#### Notes Management
- `createNote.php`: Creates new notes
  - Parameters: text, frTable (foreign table), frID (foreign ID)
  - Returns: Note ID

- `editNote.php`: Updates existing notes
  - Parameters: id, text
  - Returns: Success status

- `deleteNote.php`: Removes notes
  - Parameters: id
  - Returns: Success status

- `getNotes.php`: Retrieves notes for an item
  - Parameters: id, table
  - Returns: Array of notes

- `getAllNotes.php`: Retrieves all user notes
  - Parameters: None
  - Returns: Array of all notes

#### Calendar Management
- `createCalendarEvent.php`: Creates new events
  - Parameters: Title, Date, StartTime, EndTime, EventType
  - Returns: Event ID

- `editCalendarEvent.php`: Updates events
  - Parameters: id, Title, Date, StartTime, EndTime, EventType
  - Returns: Success status

- `deleteEvent.php`: Removes events
  - Parameters: eventID
  - Returns: Success status

- `getAllEvents.php`: Retrieves all calendar events
  - Parameters: None
  - Returns: Array of events by date

- `getCalendarInfo.php`: Gets calendar data for specific period
  - Parameters: date
  - Returns: Structured calendar data

- `getEventInfo.php`: Gets detailed event information
  - Parameters: eventID
  - Returns: Event details

#### Todo Management (`/homepage/todo/`)
- `addItem.php`: Creates todo items
- `deleteItem.php`: Removes todo items
- `editItem.php`: Updates todo items
- `getItem.php`: Retrieves todo items
- `markAsDone.php`: Toggles completion status
- `updateTodoDate.php`: Updates due dates

#### Topics Management (`/homepage/topics/`)
- `createTopic.php`: Creates new topics
- `deleteTopic.php`: Removes topics
- `editTopic.php`: Updates topics
- `getTopic.php`: Retrieves topics
- `markTopicAsVisited.php`: Records study visits
- `getVisit.php`: Retrieves visit records

#### Subjects Management (`/homepage/subjects/`)
- `createSubject.php`: Creates new subjects
- `deleteSubject.php`: Removes subjects
- `editSubject.php`: Updates subjects
- `getSubjects.php`: Retrieves subjects

#### Study Management (`/study/`)
- `getTotalStudyTime.php`: Retrieves study statistics
- Additional endpoints for session management

### Database Schema

#### Main Tables
1. **Users**
   - ID (Primary Key)
   - Username
   - Password (Hashed)
   - Settings

2. **Subjects**
   - ID (Primary Key)
   - UserID (Foreign Key)
   - Name
   - CreatedDate

3. **Topics**
   - ID (Primary Key)
   - SubjectID (Foreign Key)
   - Name
   - DifficultyRating
   - LastVisited
   - CreatedDate

4. **Events**
   - ID (Primary Key)
   - UserID (Foreign Key)
   - Title
   - Date
   - StartTime
   - EndTime
   - Type

5. **Notes**
   - ID (Primary Key)
   - ForeignID
   - ForeignTable
   - Text
   - CreatedDate

6. **Visits**
   - ID (Primary Key)
   - TopicID (Foreign Key)
   - Type
   - Duration
   - DifficultyRating
   - Date
   - Notes

7. **Todo**
   - ID (Primary Key)
   - UserID (Foreign Key)
   - Text
   - DueDate
   - Completed
   - CreatedDate

### Authentication Flow

1. Login Process:
   - Client sends credentials
   - Server validates and creates session
   - Returns authentication token

2. Request Authentication:
   - Each request includes UserID and Password
   - Server validates credentials
   - Returns appropriate response or error

### Error Handling

The backend implements a consistent error handling approach:

1. **Validation Errors**
   - Input validation
   - Data type checking
   - Required field verification

2. **Database Errors**
   - Connection issues
   - Query failures
   - Constraint violations

3. **Authentication Errors**
   - Invalid credentials
   - Session expiration
   - Permission issues

4. **Response Format**
   ```php
   {
     "status": "success|error",
     "message": "Error description",
     "data": {} // Optional response data
   }
   ```

### Security Measures

1. **Input Validation**
   - All user input is sanitized
   - Prepared statements for SQL
   - Type checking and validation

2. **Authentication**
   - Password hashing
   - Session management
   - Request validation

3. **Database Security**
   - User isolation
   - Prepared statements
   - Connection pooling

4. **Error Handling**
   - Sanitized error messages
   - Logging system
   - Fail-safe defaults

### Performance Optimizations

1. **Database**
   - Indexed key fields
   - Optimized queries
   - Connection pooling

2. **Caching**
   - Query results caching
   - Session data caching
   - Static resource caching

3. **Response Optimization**
   - Compressed responses
   - Minimized payload size
   - Structured data format

## JavaScript Functions Reference

### Homepage Module (`homepage.js`)

#### HomeScreen Class Methods
```javascript
/**
 * Displays the main application interface
 * @method show
 * @memberof HomeScreen
 */
show() {
  // Initializes calendar
  // Sets up navigation buttons
  // Configures study tracking
}
```

#### TopicAndSubjectSection Class Methods
```javascript
/**
 * Displays topic/subject interface
 * @method show
 * @memberof TopicAndSubjectSection
 */
show() {
  // Creates subject/topic buttons
  // Initializes display containers
}

/**
 * Calculates and ranks topics based on study metrics
 * @method topics
 * @memberof TopicAndSubjectSection
 * @returns {Array<Object>} Sorted topics with ratings
 */
topics() {
  // Calculates time since last visit
  // Processes difficulty ratings
  // Applies weighting factors
  // Returns sorted list
}

/**
 * Displays ranked topics in the UI
 * @method displayTopics
 * @memberof TopicAndSubjectSection
 */
displayTopics() {
  // Creates topic cards
  // Shows study metrics
  // Handles click events
}
```

#### Calendar View Methods
```javascript
/**
 * Processes calendar event times
 * @function getStartAndEndTimesCalendar
 * @param {Array<Object>} data - Calendar events
 * @returns {Array} Combined times/events array
 */
getStartAndEndTimesCalendar(data)

/**
 * Creates element order for calendar grid
 * @function createElementOrder
 * @param {Array} data - Times and events
 * @returns {Array} Ordered display array
 */
createElementOrder(data)

/**
 * Calculates display ratios for calendar
 * @function getRatios
 * @param {Array} data - Times and events
 * @returns {string} CSS grid template value
 */
getRatios(data)
```

### Study Module (`study.js`)

#### Study Class Methods
```javascript
/**
 * Creates new study session manager
 * @constructor
 * @param {Array} topics - Available topics
 */
constructor(topics)

/**
 * Displays topic selection screen
 * @method show
 */
show()

/**
 * Initiates study session for topic
 * @method studyWithThisTopic
 * @param {Object} topic - Selected topic
 */
studyWithThisTopic(topic)

/**
 * Starts study session with timings
 * @method startStudying
 * @param {Object} formData - Session configuration
 */
startStudying(formData)

/**
 * Cancels current study session
 * @method cancelStudy
 */
cancelStudy()

/**
 * Ends current study session
 * @method endStudy
 */
endStudy()

/**
 * Records study visit
 * @method markTopicAsVisited
 */
markTopicAsVisited()

/**
 * Shows break screen
 * @method startCalmScreen
 */
startCalmScreen()
```

### Todo Module (`todo.js`)

#### Todo Object Methods
```javascript
/**
 * Displays todo list
 * @method show
 * @param {boolean} disp - Display mode
 * @returns {HTMLElement|undefined} Todo list element
 */
show(disp = true)

/**
 * Gets todo items as HTML
 * @method getTodoDISP
 * @param {boolean} disp - Display mode
 * @returns {Array<HTMLElement>} Todo item elements
 */
getTodoDISP(disp = true)

/**
 * Converts todo to HTML
 * @method convertTodoToHTML
 * @param {Object} data - Todo data
 * @param {boolean} disp - Display mode
 * @returns {HTMLElement} Todo card element
 */
convertTodoToHTML(data, disp = true)

/**
 * Retrieves todo items
 * @method getToDo
 * @param {number|boolean} id - Optional item ID
 * @returns {Array|Object} Todo items
 */
getToDo(id = false)

/**
 * Makes API request for todos
 * @method getList
 * @param {number|boolean} id - Optional item ID
 * @returns {Array|Object} Raw todo data
 */
getList(id = false)

/**
 * Debounces text updates
 * @method triggerUpdate
 * @param {Event} triggerData - Input event
 * @param {Object} todoData - Todo item
 */
triggerUpdate(triggerData, todoData)

/**
 * Updates todo text
 * @method update
 * @param {number} id - Todo ID
 * @param {string} newText - Updated text
 */
update(id, newText)

/**
 * Deletes todo item
 * @method deleteTodo
 * @param {number} id - Todo ID
 */
deleteTodo(id)

/**
 * Creates new todo item
 * @method addTodo
 */
addTodo()

/**
 * Toggles completion status
 * @method complete
 * @param {number} id - Todo ID
 */
complete(id)

/**
 * Updates due date
 * @method updateDueDate
 * @param {number} id - Todo ID
 * @param {string} newDate - New due date
 */
updateDueDate(id, newDate)
```

### Notes Module (`notes.js`)

```javascript
/**
 * Converts note to HTML element
 * @function convertNoteToHTML
 * @param {Object} data - Note data
 * @param {Function} pageRefresh - Refresh callback
 * @returns {HTMLElement} Note container
 */
convertNoteToHTML(data, pageRefresh)

/**
 * Creates/edits note
 * @function createNote
 * @param {number} id - Parent item ID
 * @param {string} table - Parent table
 * @param {boolean} newNote - Is new note
 * @param {number|boolean} noteID - Note ID for editing
 * @param {string} oldNote - Previous content
 * @param {Function} pageRefresh - Refresh callback
 */
createNote(id, table, newNote, noteID, oldNote, pageRefresh)

/**
 * Deletes note
 * @function deleteNote
 * @param {Object} note - Note data
 * @param {Function} pageRefresh - Refresh callback
 */
deleteNote(note, pageRefresh)
```

### Events Module (`events.js`)

```javascript
/**
 * Creates/edits calendar event
 * @function createNewEventForm
 * @param {Object} inputData - Event data
 * @param {string} startText - Form title
 * @param {string} endText - Submit button text
 * @param {boolean} newEvent - Is new event
 * @param {number|boolean} id - Event ID for editing
 */
createNewEventForm(inputData, startText, endText, newEvent, id)

/**
 * Displays event list
 * @function manageEvents
 * @param {Object} modal - Modal instance
 */
manageEvents(modal)

/**
 * Shows event details
 * @function viewEvent
 * @param {number} id - Event ID
 * @param {Object} callBack - Return modal
 * @param {Function} closeFtn - Close callback
 */
viewEvent(id, callBack, closeFtn)

/**
 * Deletes event
 * @function deleteEvent
 * @param {number} id - Event ID
 */
deleteEvent(id)

/**
 * Opens event edit form
 * @function editEvent
 * @param {number} id - Event ID
 */
editEvent(id)
```

### Topics Module (`topics.js`)

```javascript
/**
 * Creates/edits topic
 * @function createTopic
 * @param {string} name - Topic name
 * @param {string|number} subject - Subject ID
 * @param {string} startText - Form title
 * @param {string} endText - Submit button text
 * @param {boolean} newTopic - Is new topic
 * @param {number|boolean} id - Topic ID for editing
 * @param {Function} pageRefresh - Refresh callback
 */
createTopic(name, subject, startText, endText, newTopic, id, pageRefresh)

/**
 * Displays topic list
 * @function viewTopics
 * @param {number|boolean} subjectID - Optional subject filter
 * @param {boolean} disp - Display mode
 * @param {Function} forceCallback - Click handler
 * @returns {HTMLElement|undefined} Topic list
 */
viewTopics(subjectID, disp, forceCallback)

/**
 * Shows topic details
 * @function viewTopic
 * @param {Object} data - Topic data
 * @param {Function} closeFtn - Close callback
 * @param {number|boolean} subjectID - Subject context
 */
viewTopic(data, closeFtn, subjectID)

/**
 * Deletes topic
 * @function deleteTopic
 * @param {number} id - Topic ID
 */
deleteTopic(id)

/**
 * Opens topic edit form
 * @function editTopic
 * @param {number} id - Topic ID
 */
editTopic(id)

/**
 * Records/edits study visit
 * @function visit
 * @param {number} topicID - Topic ID
 * @param {number|boolean} visitID - Visit ID for editing
 * @param {boolean} onHome - Return to home
 */
visit(topicID, visitID, onHome)

/**
 * Deletes visit record
 * @function deleteVisit
 * @param {number} id - Visit ID
 */
deleteVisit(id)

/**
 * Calculates study totals
 * @function getStudyTotals
 * @param {Array} data - Visit records
 * @returns {Object} Time totals
 */
getStudyTotals(data)

/**
 * Shows study statistics
 * @function studyPage
 */
studyPage()
```

### Utility Functions

```javascript
/**
 * Validates string input
 * @function whiteList
 * @param {string} string - Input string
 * @param {boolean} allowNewLine - Allow line breaks
 * @returns {boolean|Array} True if valid or array of invalid chars
 */
whiteList(string, allowNewLine)

/**
 * Converts time to minutes
 * @function hr_minToMin
 * @param {string} timeString - Time in HH:MM
 * @returns {number} Minutes
 */
hr_minToMin(timeString)

/**
 * Formats time display
 * @function convertToReadableFormat
 * @param {number} time - Time in minutes
 * @param {boolean} showSeconds - Include seconds
 * @returns {string} Formatted time
 */
convertToReadableFormat(time, showSeconds)

/**
 * Creates button element
 * @function createButton
 * @param {string} text - Button text
 * @param {string} style - Button style
 * @param {Function} call - Click handler
 * @returns {HTMLElement} Button element
 */
createButton(text, style, call)

/**
 * Sets multiple attributes
 * @function setManyAttributes
 * @param {HTMLElement} Item - Target element
 * @param {...Array} attrs - Attribute pairs
 * @returns {HTMLElement} Modified element
 */
setManyAttributes(Item, ...attrs)
``` 