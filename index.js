/*
    Most of the handling and storing of information is going to be done via localStorage
    LocalStorage DB Schema
    
    records: [
        {
            date: '',
            hours: '',
            timestamps: [
                {
                    time: ''
                    status: 'resumed',
                }
            ]
        }
    ]

    start_time: 2019-09-09
    end_time: NULL
    tracking: true;
    hours_today: 2;
*/

// Check localStorage for a start_time if there is none create one.
// Check if the time is being currently tracked and if so display hours.

var start_btn = document.getElementById("start");
var pause_btn = document.getElementById("pause");
var resume_btn = document.getElementById("resume");
var stop_btn = document.getElementById("stop");
var status_text = document.getElementsByClassName("status")[0];

if (!localStorage.tracking || localStorage.tracking == false) {
    if (!localStorage.start_time) {
        start_btn.style.display = "block";
    } else {
        resume_btn.style.display = "block";
    }
}

// Update Status Text
// Display Proper Buttons
// Set Proper LocalStorage vars
// Update display hours/mins


function before_time_start () {

}

function finish_time () {

}

function pause_time () {

}

function track_time () {

}

start_btn.addEventListener("click", function () {
    localStorage.tracking = true;
    localStorage.start_time = new Date();
});