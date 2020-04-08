var myUserId = "5e8dd9b45c7825662bc811dd";
var checkUsername = "";
var newFriend = "";
var nameOfFriend = "";
var friends= [];
var checkButton = "";
var clicked = '';

$(document).ready(function () {
    window.onload = getFriends();

    function getFriends() {

        $.ajax({
            url: 'http://danu7.it.nuigalway.ie:8642/getFriends',
            type: 'GET',
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    friends[i] = data[i].username;
                    if (myUserId != data[i]._id) {
                        if(data[i].verifyFriendShip == 0){
                            var friendCardArea = "";
                            var addFriendBut = "#addFriendButton" + i;
                            var fUsername = '#otherUserName' + (i);
                            friendCardArea += "<div class = 'col-md-6 d-flex align-items-stretch aos-init aos-animate' data-aos='fade-left'>" +
                                "<div class='card' style='width: 40rem;'> <img src='//live.staticflickr.com/8581/28087159512_2bec0c4fd4_k.jpg' class='card-img-top' alt='...'>" +
                                "<div class='card-body'> <h5 class='card-title' id = 'otherUserName";
                            friendCardArea += i;
                            friendCardArea += "'></h5> <a class='btn btn-primary' role = 'button' id = '";
                            friendCardArea += addFriendBut;
                            friendCardArea += "'";
                            friendCardArea += ">Add Friend</a> <a role = 'button' class='buttonR btn btn-danger' id = 'removeFriendButton";
                            friendCardArea += i;
                            friendCardArea += "'>Remove Friend</a>" +
                                "</div>" +
                                "</div>" +
                                "</div>";
                        }
                    }
                }
            }
        })
    }


    $('.buttonR').on('click',function(){
        var removeClick = $(this).attr('id');
        console.log(removeClick);
        for (var l = 0; l < friends.length; l++) {
            var checkButtonR = "removeFriendButton" + l;
            var checkUs = "#otherUserName"+l;
            var holdL = 0;
            if (removeClick == checkButtonR) {
                console.log(checkButtonR);

                console.log(holdL);
                holdL = l;

            }
        }
        var checkUsernameR = friends[holdL];
        removeFriends(checkUsernameR);
    })

    $('.button').on('click', function() {
        var clicked = $(this).attr('id');
        console.log(clicked);

        for (var l = 0; l < friends.length; l++) {
            checkButton = "addFriendButton" + l;
            var checkUs = "#otherUserName"+l;
            console.log(checkButton);
            if (clicked == checkButton) {
                var checkUsername = friends[l];
                console.log(checkUsername);

                addFriends(checkUsername);
            }
        }
    });

///////////////////////////////////////////////////////////////////
    function addFriends(checkUsername){
        $.ajax({
            url: 'http://danu7.it.nuigalway.ie:8642/putFriends',
            type: 'PUT',
            data: {"_id" :  myUserId, 'Friends_username': checkUsername, 'username': "Olly" },
            success: function (data) {
                console.log(data);
                window.alert("Friend: "+checkUsername+" added!");
            }
        });
    }

///////////////////////////////////////////////////////////////////////
    function removeFriends(checkUsernameR){
        $.ajax({
            url: 'http://danu7.it.nuigalway.ie:8642/deleteFriends',
            type: 'PUT',
            data: { "_id" :  myUserId ,'Friends_username': checkUsernameR, 'username': "Olly"},
            success: function (data) {
                window.alert("Friend: "+checkUsernameR+" removed!");
            }
        });
    }

});
