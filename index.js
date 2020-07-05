/*
    Most of the handling and storing of information is going to be done via localStorage
    LocalStorage DB Schema
    
    records: [
        {
            date: '',
            hours: '',
            timestamps: [
                {
                    time: '',
                    tracking: true,
                    start: true
                },
                {
                    time: ''
                    tracking: '',
                },
                {
                    time: '',
                    tracking: false,
                    end: true
                }
            ]
        }
    ]

    start_time: 2019-09-09
    end_time: NULL
    tracking: true;
    hours_today: 2;
    timestamps: [
        {
            time: '',
            tracking: '', // Tracking set to true means it resumed tracking hours
        }
    ];
*/

var start_btn = document.getElementById("start");
var pause_btn = document.getElementById("pause");
var resume_btn = document.getElementById("resume");
var stop_btn = document.getElementById("stop");
var refresh_btn = document.getElementById("refresh");
var hours_text = document.getElementById("hours");
var minutes_text = document.getElementById("minutes");
var status_text = document.getElementById("status");
var main_box = document.getElementsByClassName("main")[0];

// Check localStorage for a start_time if there is none create one.
// Check if the time is being currently tracked and if so display hours.

// TODO: Display Breaks/Timestamps on UI for current day

// TODO: Add Documentation for js code

// We assume that time moves forward
if (localStorage.getItem("start_time") && new Date(localStorage.getItem("start_time")).getDate() != new Date().getDate()) {
    if (localStorage.getItem("end_time")) {
        empty_localstorage();
    } else {
        var prefilled_time;
        if (localStorage.getItem("tracking") == "true") {
            prefilled_time = new Date(localStorage.getItem("start_time"));
        } else {
            var tmp = JSON.parse(localStorage.getItem("timestamps"));
            prefilled_time = new Date(tmp[tmp.length - 1].time);
        }
        var input = prompt("It seems that time has gotten away from you since the last time you tracked your hours. Enter the proper date/time you stopped working: (We prefill the field with your start time so you ideally only need to edit the hours/mins)", prefilled_time);
        if (input) {
            localStorage.setItem("end_time", new Date(input));
            localStorage.setItem("tracking", false);
            calculate_hours(true);
            set_ui_finish();
            save_data_to_records();
        }
    }
}

if (!localStorage.getItem("tracking") || localStorage.getItem("tracking") == "false") {
    if (!localStorage.getItem("start_time")) {
        set_ui_before_start();
    } else if (localStorage.getItem("end_time")) {
        set_ui_finish();
    } else {
        set_ui_paused();
        calculate_hours();
    }
} else {
    if (!localStorage.getItem("end_time")) {
        set_ui_tracking();
        calculate_hours();
    } else {
        set_ui_finish();
    }
}

document.getElementsByClassName("current_time")[0].innerHTML = "Today is " + new Date();

start_btn.addEventListener("click", function () {
    localStorage.setItem("hours_today", 0.0);
    update_ui_time(0.0);
    localStorage.setItem("start_time", new Date());
    localStorage.setItem("tracking", true);
    set_ui_tracking();
});

pause_btn.addEventListener("click", function () {
    localStorage.setItem("tracking", false);
    update_timestamps();
    calculate_hours();
    set_ui_paused();
});

resume_btn.addEventListener("click", function () {
    localStorage.setItem("tracking", true);
    update_timestamps();
    calculate_hours();
    set_ui_tracking();
});

refresh_btn.addEventListener("click", function () {
    if (!localStorage.getItem("start_time")) return;
    calculate_hours();
});

stop_btn.addEventListener("click", function () {
    localStorage.setItem("tracking", false);
    localStorage.setItem("end_time", new Date());
    calculate_hours();
    set_ui_finish();
    save_data_to_records();
});

function empty_localstorage () {
    localStorage.removeItem("hours_today");
    localStorage.removeItem("tracking");
    localStorage.removeItem("timestamps");
    localStorage.removeItem("start_time");
    localStorage.removeItem("end_time");
}

function resetUI () {
    start_btn.style.display = "none";
    pause_btn.style.display = "none";
    resume_btn.style.display = "none";
    stop_btn.style.display = "none";
    status_text.removeAttribute("class");
    main_box.style.border = "1px solid rgba(0,0,0,.2)";
}

function set_ui_before_start () {
    resetUI();
    start_btn.style.display = "block";
    status_text.innerHTML = "Ready. Set. Go!";
}

function set_ui_finish () {
    resetUI();
    update_ui_time(localStorage.getItem("hours_today"));
    status_text.innerHTML = "Hard Day's work is Done!";
}

function set_ui_paused () {
    resetUI();
    resume_btn.style.display = "block";
    stop_btn.style.display = "block";
    status_text.innerHTML = "On Break";
    status_text.classList.add("text-danger");
    main_box.style.border = "1px solid rgba(200,0,0,.8)";
}

function set_ui_tracking () {
    resetUI();
    pause_btn.style.display = "block";
    stop_btn.style.display = "block";
    status_text.innerHTML = "Tracking...";
    status_text.classList.add("text-success");
    main_box.style.border = "1px solid rgba(0,200,0,.8)";
}

function update_ui_time (time) {
    var hours = Math.floor(time);
    var minutes = Math.round((time % 1) * 60);
    minutes_text.innerHTML = minutes;
    hours_text.innerHTML = hours;
}

function update_timestamps () {
    var current_tracking = localStorage.getItem("tracking");
    var current_time = new Date();
    var current_timestamps = localStorage.getItem("timestamps") ? JSON.parse(localStorage.getItem("timestamps")) : [];
    current_timestamps.push({
        time: new Date(),
        tracking: current_tracking,
    });
    localStorage.setItem("timestamps", JSON.stringify(current_timestamps));
}

function calculate_hours (set_custom_end=false) {
    // TODO: Timestamp tracking seems slightly inaccurate (Also why are timestamps in UTC time)
    if (localStorage.getItem("end_time") && !set_custom_end) return;
    var start = localStorage.getItem("start_time");
    var hours = localStorage.getItem("hours_today");
    var timestamps = JSON.parse(localStorage.getItem("timestamps"));
    var minutes_added = Math.round(((new Date()) - (new Date(start))) / 1000 / 60);
    if (timestamps) {
        minutes_added = 0;
        var ending_time, starting_time;
        for(var i = 0; i < timestamps.length; i++) {
            if (i == 0) {starting_time = new Date(start)}
            if (timestamps[i].tracking == "false") {
                ending_time = new Date(timestamps[i].time);
            } else {
                starting_time = new Date(timestamps[i].time);
            }
            if (i == timestamps.length - 1) {
                ending_time = new Date();
                if (set_custom_end) {
                    ending_time = new Date(localStorage.getItem("end_time"));
                }
            }
            var temp_time = Math.round(((ending_time) - (starting_time)) / 1000 / 60);;
            minutes_added += temp_time;
        }
    }
    if (set_custom_end && !timestamps) {
        var end_time = new Date(localStorage.getItem("end_time"));
        minutes_added = Math.round(((end_time - (new Date(start))) / 1000 / 60));
    }
    var time = (minutes_added / 60).toFixed(2);
    localStorage.setItem("hours_today", time);
    update_ui_time(time);
}

function save_data_to_records () {
    var records = localStorage.getItem("records") ? JSON.parse(localStorage.getItem("records")) : [];
    var start = localStorage.getItem("start_time");
    var end = localStorage.getItem("end_time");
    var hours = localStorage.getItem("hours_today");
    var timestamps = localStorage.getItem("timestamps") ? JSON.parse(localStorage.getItem("timestamps")) : [];
    timestamps.unshift({
        start: true,
        tracking: true,
        time: start
    });
    timestamps.push({
        end: true,
        tracking: false,
        time: end
    });
    records.unshift({
        date: start,
        hours: hours,
        timestamps: timestamps
    })
    localStorage.setItem("records", JSON.stringify(records));
}