<head>
    <title>Payroll Tracker Records</title>
    <link rel="stylesheet" href="./index.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body onload="renderRecords()">
    <div class="nav row">
        <div class="logo"><a href="./index.php" style="text-decoration: none; color: black;">Payroll Tracker</a></div>
        <p class="current_time"></p>
        <a href="./records.php">Previous Records</a>
    </div>
    <h1>Records</h1>
    <div class="utils">
        <p>Total Hours Worked: <strong id="total"></strong></p>
    </div>
    <div id="table">

    </div>
    <button class="btn btn-danger" onclick="clear_records()">Clear Records Table</button>
</body>
<script>
    // Handle Record Rendering

    var date = new Date();
    document.getElementsByClassName("current_time")[0].innerHTML = "Today is " + date.toDateString() + " " + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    function clear_records () {
        var input = confirm("Are you sure? This permanently deletes all records currently stored. Make sure your work week is over.");
        if (input) {
            localStorage.removeItem("records");
            renderRecords();
        }
    }

    function renderRecords () {
        var records = JSON.parse(localStorage.getItem("records"));
        var table_div = document.getElementById("table");
        if (!records) { 
            table_div.innerHTML = "Sorry there is no data stored yet. Get to work!";
            return; 
        }
        
        var table = document.createElement('table');
        var header_row = document.createElement('tr');
        header_row.innerHTML = "<th>Date</th><th>Hours</th><th>Timestamps</th>";
        table.appendChild(header_row);
        var total_hours = 0;
        for(var i = 0; i < records.length; i++) {
            var current_record = records[i];
            total_hours += parseFloat(current_record.hours);
            var row = document.createElement('tr');
            var td_date = document.createElement('td');
            td_date.innerHTML = new Date(current_record.date).toDateString();
            row.appendChild(td_date);
            var td_hours = document.createElement('td');
            td_hours.innerHTML = current_record.hours;
            row.appendChild(td_hours);
            var td_timestamps = document.createElement('td');
            td_timestamps.innerHTML = calculate_timestamps_to_string(current_record.timestamps);
            row.appendChild(td_timestamps);
            table.appendChild(row);
        }

        document.getElementById("total").innerHTML = total_hours.toFixed(2);
        table_div.appendChild(table);
    }

    function calculate_timestamps_to_string (stamps) {
        var rtn_str = "";
        for (var i = 0; i < stamps.length; i++) {
            var current = stamps[i];
            var time = new Date(current.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
            if (current.tracking == "true" || current.start) { 
                time += " -> "; 
            } else {
                time += " | ";
            }
            rtn_str += time;
        }
        return rtn_str;
    }
</script>