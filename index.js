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