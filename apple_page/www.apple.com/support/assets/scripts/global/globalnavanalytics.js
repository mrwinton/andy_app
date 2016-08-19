/* global setOmnitureForquicklinksDTM */

(function(window,AC) {
	if(AC && AC.onDOMReady){
		AC.onDOMReady(function(){
			function findIndex(event) {
				var arr = document.getElementById('ac-gn-searchresults').getElementsByTagName('li');
				var count = 1;

				while (count > 0) {
					if (arr[count - 1].textContent.trim() === event.textContent) {
						break;
					} else {
						count++;
					}
				}
				return count;
			}

			var searchResults = document.getElementById('ac-gn-searchresults'),
				searchFormInput = document.getElementById('ac-gn-searchform-input'),
				locale = document.documentElement.getAttribute('lang').replace("-", "_");

			if (searchResults != null) {
				try {
					searchResults.addEventListener('mousedown', (function (event) {
						if (event.target.className.indexOf('ac-gn-searchresults-link-quicklinks') >= 0 || event.target.className.indexOf('ac-gn-searchresults-link-defaultlinks') >= 0) {
							event.preventDefault();
							var quickLinkHref = event.target.getAttribute('href');
							var quicklinkText = event.target.textContent;
							quicklinkText = quicklinkText.replace(/<(?:.|\n)*?>/gm, '');
							var index = findIndex(event.target);
							setOmnitureForquicklinks(quickLinkHref, index, locale, quicklinkText);
						}
					}));
				} catch (e) {
				}
			}

			if (searchFormInput != null) {
				try {
					searchFormInput.addEventListener('keydown', (function (e) {
						var keyCode = e.keyCode;
						if (keyCode == 13) {
							if (!(e.currentTarget.id == 'ac-gn-searchform-input')) {
								e.preventDefault();
							}
							var event = document.getElementById('ac-gn-searchresults').getElementsByTagName('li');
							for (var i = 0; i < event.length; i++) {
								if (event[i].className.indexOf("ac-gn-searchresults-link-quicklinks") >= 0 || event[i].className.indexOf('ac-gn-searchresults-link-defaultlinks') >= 0) {
									e.preventDefault();
									var quickLinkHref = event[i].getAttribute('href');
									var quicklinkText = event[i].textContent;
									quicklinkText = quicklinkText.replace(/<(?:.|\n)*?>/gm, '');
									var index = findIndex(event[i]);
									setOmnitureForquicklinks(quickLinkHref, index, locale, quicklinkText);
								}
							}
						}
					}));
				} catch (e) {
				}
			}

			window.setOmnitureForquicklinks = function (quickLinkHref, index, podLocaleValue, quicklinkText) {
				try {
					if (typeof(setOmnitureForquicklinksDTM) == "function") {
						setOmnitureForquicklinksDTM(quickLinkHref, index, podLocaleValue, quicklinkText);
					} else { // Default action if setOmnitureFoquicklinksDTM is not defined
						var resultPageType = "";

						if (quickLinkHref.indexOf("support.apple.com") != -1 || quickLinkHref.indexOf("support-it.apple.com") != -1 || quickLinkHref.indexOf("support-uat.apple.com") != -1 || quickLinkHref.indexOf("/") == 0) {
							resultPageType = "kbase";
						} else if (quickLinkHref.indexOf("discussions.apple.com") != -1) {
							resultPageType = "discussions";
						} else if (quickLinkHref.indexOf("manuals.info.apple.com") != -1) {
							resultPageType = "manuals";
						} else if (quickLinkHref.indexOf("apple.com/support") != -1) {
							resultPageType = "supportpage";
						} else if (quickLinkHref.indexOf("discussions.apple.com") != -1) {
							resultPageType = "discussions";
						} else if (quickLinkHref.indexOf("selfsolve.apple.com") != -1) {
							resultPageType = "selfsolve tool";
						} else if (quickLinkHref.indexOf("reportaproblem.apple.com") != -1) {
							resultPageType = "report a problem";
						} else if (quickLinkHref.indexOf("store.apple.com") != -1) {
							resultPageType = "aos";
						} else if (quickLinkHref.indexOf("tips.apple.com") != -1) {
							resultPageType = "tips&tricks";
						} else if (quickLinkHref.indexOf("apple.com") != -1) {
							resultPageType = "marcom";
						} else {
							resultPageType = "others";
						}

						if (podLocaleValue.indexOf('_') != -1) {
							var tempVar1 = podLocaleValue.substr(0, 2);
							var tempVar2 = podLocaleValue.substr(3, 5);
							podLocaleValue = tempVar2.toLowerCase() + '_' + tempVar1.toLowerCase();
						}
						var evar5Value = "acs::search results::quicklink::" + resultPageType + "::" + (index) + "::" + podLocaleValue;
						var prop7Value = "acs::quicklink::" + quicklinkText;

						var persist = {
							domain: "apple.com",
							cookie: {
								create: function (e, t, n) {
									var i = "";
									if (n) {
										var r = new Date;
										r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
										i = "; expires=" + r.toGMTString()
									}
									document.cookie = e + "=" + t + i + "; path=/; domain=" + persist.domain
								}, read: function (e) {
									for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
										for (var i = n[r]; " " == i.charAt(0);)i = i.substring(1, i.length);
										if (0 == i.indexOf(t))return i.substring(t.length, i.length)
									}
									return null
								}, "delete": function (e) {
									document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=" + persist.domain
								}
							}
						};
						persist.cookie.create("acs_evar5", encodeURIComponent(evar5Value), 0.005);
						persist.cookie.create("acs_prop7", encodeURIComponent(prop7Value), 0.005);

					}
				} catch (e) {
				}
				window.location.href = quickLinkHref;
			};
    	});
    }
})(window, AC);