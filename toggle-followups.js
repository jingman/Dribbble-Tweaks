// We'll hold the followup groups here
var followupGroups = {};

// Collect the followup items
var $followups = $('li.comment-followup.group');

// If there are followups
if ($followups.length > 0) {
	
	var numFollowups = 0;
	
	// For each followup comment...
	$followups.each(function() {
		var $shot = $('div.act-shot a', this);
		var shot = {url: $shot.attr('href'), title: $shot.find('img').attr('alt'), el: this};
		// If we haven't collected a followup for this shot
		if (followupGroups[shot.url] === undefined) {
			// Initialize a grouping array for this shot
			followupGroups[shot.url] = [];
		}
		// Add this followup to the group for this shot
		followupGroups[shot.url].push(shot);
		// Hide this followup
		$(this).hide();
		// Increment
		numFollowups++;
	});

	// Prep the html we'll put at the bottom, under the current activity listing
	var followupsHtml = '<div class="brd-followups"><h2 class="section">' + numFollowups + ' Followups</h2>';

	// For each of the followup groups, make an ordered list
	for (var shot in followupGroups) {
		followupsHtml += '<ol class="brd-followups activity">';
		// For each of the followups, make a list item
		for (var comment in followupGroups[shot]) {
			// Add the same classes to the li so it gets styled correctly
			followupsHtml += '<li class="comment-followup group">' + $(followupGroups[shot][comment].el).html() + '</li>';
		}
		followupsHtml += '</ol>';
	}
	followupsHtml += '</div>';

	$section = $(followupsHtml).find('ol').hide().last().addClass('last').end().end();
	
	// Toggle when section title is clicked
	$('h2', $section).click(function() {
		$('ol', $section).toggle();
	});

	$section.insertAfter('div#main ol.activity');
}