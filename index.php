<!DOCTYPE html>
<html>
    <head>
        <title>Payroll Tracker</title>
        <link rel="stylesheet" href="./index.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="payroll_tracker_import">
            <div class="nav row">
                <div class="logo">Payroll Tracker</div>
                <p class="current_time">Today is Tuesday July 3rd 2010 @3:30pm</p>
                <a href="./records.php">Previous Records</a>
            </div>
            <div class="main">
                <div id="status"></div>
                <div class="clock_time"><strong id="hours">-</strong><small>hrs</small><strong id="minutes">--</strong><small>min</small></div>
                <p id="timestamps" style="text-align: center;"></p>
                <div class="row button-row">
                    <button id="start" class="btn btn-success">Clock In</button>
                    <button id="pause" class="btn btn-dark">Pause Clock</button>
                    <button id="resume" class="btn btn-dark">Resume Clock</button>
                    <button id="refresh" class="btn btn-info" style="display: block;">Refresh</button>
                    <button id="stop" class="btn btn-danger">Clock Out / Save Hours</button>
                    <button class="btn btn-secondary">Quit/Clear Day</button>
                    <button class="btn btn-secondary" onclick="confirm('Are you sure? This resets all progress for today.', empty_localstorage())" style="display: block;">RESET</button>
                </div>
            </div>
        </div>
    </body>
    <script src="./index.js"></script>
</html>