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
