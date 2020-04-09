# CalendarApp
EndOfYearProject

The Calendar Month-View page:
  
  
  Initial Goal: 																																	
    The original plan was to create a working calendar in the monthly view setting. In this calendar the user could add and remove events to and from the calendar. The user could also see their "friends" events as well, this was so they could see if they had any free days at the same time and could therefore meet up.                                                                                                                                                                                                                                                                             
    Final Page:                                                                                              																						 
    The calendar can add and remove the user's own personal events, as well as display all the events on a certain date on a pop up. The user can trigger this pop up when they click on the day's number. Regarding the addition and removal of events, there are two seperate dropdowns for each option. The addition of an event is completed by clicking the dropdown, entering in the details of the event, such as the date and the event name. The removal of the event is accomplished by clicking the remove dropdown and entering the date of the event the user wants to delete. Then, they must click the search events button which will display an options list that will contain all the event that the user has written to that day. The user may then select the event they want to remove and it will be removed from the database.                                                                                                                                                                                                                                                                                    
    Unfortuanetly due to unforseen circumstances, the team could not accomplish the idea of linking the friend's events with the user's events on the calendar view. However; fortunately this allows the calendar to have a simple and clear appearance which can be easily operated.
  
       
The Friends Page:
  
  
  Intial Goal: 
  
  
  The plan was to allow the user to add and remove "Friends" to their account via friend requests. By adding a friend, their new friend's events would appear on their monthly view calendar page, and if the friend was remove from the user's friends list the friend's events would disappear from the calendar also. All of this would also be true for the friend as they would be able to see the user's events too.
 
 
 Final Page: 
  
  
  Due to unforeseen change of hands for this part of the project, the task had to completed last minute and the team ran out of time trying to ensure nearly finished tasks and bugs got completed or fixed, whilst also trying to make sure that this page exists. The final page shows the user's account along with some of the other users in the database. 
  
  
  By pressing the add friend button, the friend should get added to the user's friends array in the database. If it went according to the Initial goal, since each username is  unique, it will allow the database to easily find the friends' document and information. Alas, due to some bugs, explained more throughly in the final report, the information gets passed from the web page to the server but doesn't make it to the database. Similarly, the remove friends button suffers from the same bug. The remove friends button, takes the username of the "friend" finds them in the friends array and deletes them from it, but due to the bug it finds the friend and trys to get to the database to delete them but doesn't. All bugs will be explained in detail in the final report for this project. 


The Weekly Timetable:

This part of the project let users input their timetable, which they could use to compare to other users when planning events. For this two versions were created a function to create a timetable with javascript, one modifiable table and one unmodifiable for the comparisons. 

The modifiable table is on its own page. It takes data stored in the database, initially set to always available, and generates a table using a loop. It uses the bootstrap warning colour to represent busy and none to represent available. Event handlers are then applied to each cell, so that when the user clicks on a cell it changes the colour of the cell and updates the position in the array corresponding to that cell. There is a save button which when clicked sends the updated table data to the database.

The comparative table gets the timetable data of the user and each friend they have added to an event and logical OR’s each cells position. Then the table is drawn with the same colouring as the editable table. This will let the user know what times if any that everyone added to the event is free. 

The timetable assumes people have a set weekly schedule and stores only one week between the hours of 9:00 and 20:00. It is stored as an array of 1’s or 0’s (initially 0’s).

The Database:

When first deciding on how to go about designing the web application, it was decided that MongoDB would be used to store information on the users. Mongoose was used to model the data structure and manage the data. 

The events are saved in the database as a month id, a day id and a name for the event. Each of these attributes are pushed into their own document, this means that a user can save multiple events onto their calendar, in other words several documents to their collection. When the monthly Calendar page loads, it will search the database for all the events saved for that chosen month and display them on the calendar. When the month on the calendar is changed, the database is searched for all events with the new month’s id, the calendar is then refreshed, and the events displayed. 

On the homepage there is also a customizable timetable for the user that lets them know what hours they are free on an average week. This timetable is created with a loop that adds a segment to the table each time it loops. Depending on whether the user is busy or not for an hour slot, an image will be added to the corresponding segment showing that they are free or busy. For this to work there was a need to store an array of booleans. 
Initially, this array will have a default value (not busy) and the timetable will be completely free. The user can then customize their timetable, switching certain slots to busy. Each time a slot is changed the new array is sent to the database and the old timetable that is stored there is updated to the new one and will be loaded in whenever the user logs in.

 The web application also has the ability to share your calendar and timetable with your friends. When each user first signs up, they create a unique username. Searching your friend’s username on the homepage will send a query to the database searching for your friend’s account. If it is found, it will return with an option to add that user to your friend list. Once permission is granted by your friend, you will be able to view your friend’s calendar and timetable. If in the event that the user would like to block someone that has permission to view their page, they can search their username and remove them as a friend, this will send a query to the database searching for the username of the person being blocked and will then delete the user’s username from their friends list, making it impossible for that person to view the user’s calendar and timetable.
