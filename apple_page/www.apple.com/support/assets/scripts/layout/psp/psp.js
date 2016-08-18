/*psp.js*/

Event.observe(window, "load", function() {
	var supportIndex = location.pathname.indexOf("/support");
	var query = supportIndex>-1?location.pathname.substring(supportIndex):"";
	query = query.replace("index.html","");
	var navId = document.getElementById(query);
	
	if(navId){
		navId.className = "selected";
		/* Add WAI-ARIA Accessibility Feature */
		var navLink = navId.getElementsByTagName("a")[0];
		navLink.setAttribute("aria-disabled","true");
		navLink.setAttribute("tabindex","-1");
		navLink.setAttribute("cursor","pointer");
	}
});

