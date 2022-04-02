// Variables
const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let api = "https://twitch-proxy.freecodecamp.rocks/helix";

// Function that shows the channel Info
const channelInfo = () => {
    users.forEach((user) => {
        function makeURL(type, name) {
            return 'https://twitch-proxy.freecodecamp.rocks/twitch-api/' + type + '/' + name + '?callback=?';
        };
        $.getJSON(makeURL("streams", user), (data) => {
            let status;
            if (data.stream === null) {
                status = "offline";
            } else if (data.stream === undefined) {
                status = "offline";
            } else {
                status = "online";
            };
            $.getJSON(makeURL("channels", user), (data) => {
                let src = data.logo !== null ? data.logo : `https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`;
                let userName = data.display_name != null ? data.display_name : user;
                let userStatus = status === "online" ? data.status:  "offline" ;

                const row = `<div class = "row ${status}">
                                <img src=${src} alt="" class="user-img">
                                <a href = ${data.url} class="name">${userName}</a>
                                <span class="status">${userStatus}</span>
                            </div>`;
                status === "online" ? $('#display').prepend(row) : $("#display").append(row);
            })
        })
    })
}

// FilterData to show users on the basis of their status
const filterData = () => {
    $("#users-status").change(function(){
        let selectedOption = $(this).children("option:selected").val();
        switch(selectedOption){
            case "All": 
                $(".offline, .online").removeClass("hidden");
                break;
            case "Online": 
                $(".online").removeClass("hidden");
                $(".offline").addClass("hidden");
                break;
            case "Offline": 
                $(".offline").removeClass("hidden");
                $(".online").addClass("hidden");
                break;
        }   
    });
}

// Makes the function calls only when the document is ready
$(document).ready(() => {
    channelInfo();
    filterData();
})