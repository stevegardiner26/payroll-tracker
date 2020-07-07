# Payroll Tracker
A way for contractors/freelancers to easily track their hours in a very minimalist way. (Can use github issues for feature requests)

## Usage

### Live Heroku Build

1. Visit https://payroll-tracker.herokuapp.com/ for a live version.

### Local Usage (Faster Load Time)

1. `$ git clone https://github.com/stevegardiner26/payroll-tracker.git`
1. `$ cd payroll-tracker`
1. Make sure PHP is installed locally and run `$ php -S localhost:8085`
1. Visit http://localhost:8085/ in your browser and you are all done! It works using localStorage so there is no need to setup anything extra.

## TODO

1. Implement a way to add a custom record and place it in the proper date location (Use a datepicker) On Records Table
1. Update Current Timestamps with Tracker Button Press
1. Make UI Mobile Responsive
1. Improve Hour Calculation (Seems slightly innaccurate)
1. Fix Issue with timestamps holding UTC time vs Local time
1. Refactor CSS & JS to Minimal Code (Potentially 1 JS File?)
1. Document JS
1. Be able to seperate records table by a set amount of days
1. Save to csv files in the repo? (This would require a node server to fire api calls)
1. Make this into a vue native app?
1. Make a node application that can be easily run?
