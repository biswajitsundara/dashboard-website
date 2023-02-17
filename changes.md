Gat Dashboard V2.0

* The Look and feel has changed, small animations are applied, better color schemes are used.
* The UI is completely extensible, it renders based on the data input

Navbar
* Navbar is fixed, so if we scroll down, it won't go out of view
* Given a G icon, so it's recognizable when multiple tabs are opened.
* The dashboard title is configured, show appd.js
* If we click on the title, it will open the GAT dashboard

Sidebar
* We can clearly see for which particular week we are seeing the results
* Also the previous week information
* If we click on the current week, it will open the corresponding GAT report

Sidebar Navs
* The card and chips are constant, we can focus on other fields using side navbar
* Click on week chart will put only the weekly chart
* Click on details table, will show only the table
* Trend chart, only the trend chart
* Home will put everything back, the default view

Week Chart
* There is a squeezed version to preview at a glance, we can capture screen shots also and we don't have to resize it
* There's an option to zoom the chart, hover on the + icon, click on it to expand, again click on it to reset
* Hover on the chart bars to display the details
* Click on the legends, it will strike out those details from the chart
* The interesting thing is chart data can be configured also
* Just go to bar-chart.js and change the keys


Table
* The table displays the data in tabular format, we can apply the filters
* The columns are of different types
* go to tabled.js, 
* add a new column to the table data, columnwidth
* The collapsible field is About, if we double click it will expand, currently it's limited to 50 characters
* The filter fields can be configured.
* Earlier the filter value was not stored, it was going out of the view, Reset button wasn't there



Card/Chip
* Go to data folder/ add few entries for card, chip and show that new card chips are displayed.
* Make sure the card data entries are unique, else it won't show
* Hover on the cards, show the animation

Runmode
* We can run it by default, with csv, with url details

V3.0
- Open the charts in a light box, 100% zoom
- Attach a log file, from the dash board users can see raw data
- We are fetching url details for the current year, so the first week Jan report doesn't get last week results
- Provide a way to fetch the GAT reports based on the date range
- Instead of downloading the report, can we fetch it using API
- On the results table, apply sub filter
- provide suggestions for the errors - Intellisence
- Tooltip for the violations column.
- Searchable textbox inside table column filters.