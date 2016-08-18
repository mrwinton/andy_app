/*
 * KmLoader functions for dynamic portlets
 */

/* make https request if page is https */
if (window.location.protocol === "https:") {
	KmLoader.akamaiUrl = "https://km.support.apple.com.edgekey.net";
}
KmLoader.origCallback = KmLoader.callback;
KmLoader.retryCallList = new Object();
KmLoader.retryAttempts = new Object();
KmLoader.retryMax = 3;
KmLoader.retryCallback = new Object();
KmLoader.nextRequestId = {
	'portlet': { 'start': 0, 'end': 99 },
	'downloads': { 'start': 100, 'end': 199 },
	'drawers': { 'start': 200, 'end': 399 }
};

/*
 * Wrapper function for KmLoader.sendKmCall that checks if element
 * with id=portlet_[n] exists in DOM before making the API call.
 * wrap() is a Prototype function.
 */
KmLoader.sendKmCall = KmLoader.sendKmCall.wrap(
	function(origSendKmCall) {
		var args = Array.prototype.slice.call(arguments);
		args = args.slice(1);
		if (args[5] != undefined) { args[5] = args[5].toUpperCase(); }  /* send uppercase KB IDs */
		if (args[8] != undefined && args[8] == 50) { args[8] = 49; }  /* set maxRecords */
		var requestId = args[1];
		if (requestId != undefined && !isNaN(requestId)) {
			KmLoader.retryCallback[requestId] = KmLoader.callback;
			if (KmLoader.type == 'kmrecord') {
				return origSendKmCall.apply(this, args);
			}
			else if (KmLoader.type == 'kmdata') {
				/* 0-99: dynamic portlets */
				if (requestId >= KmLoader.nextRequestId.portlet.start && requestId <= KmLoader.nextRequestId.portlet.end && $('portlet_' + requestId) != null) {
					KmLoader.callback = KmLoader.origCallback;
					return origSendKmCall.apply(this, args);
				}
				
				/* 100-199: downloads module */
				else if (requestId >= KmLoader.nextRequestId.downloads.start && requestId <= KmLoader.nextRequestId.downloads.end) {
					return origSendKmCall.apply(this, args);
				}
				
				/* 200-399: drawer-based psps */
				else if (requestId >= KmLoader.nextRequestId.drawers.start && requestId <= KmLoader.nextRequestId.drawers.end) {
					return origSendKmCall.apply(this, args);
				}
			}
		}
	}
);

/*
 * Wrapper function for KmLoader.sendCall that appends a "retry"
 * argument to the URL, if a request returns no results.
 */
KmLoader.sendCall = KmLoader.sendCall.wrap(
	function(origSendCall) {
		var args = Array.prototype.slice.call(arguments);
		args = args.slice(1);
		var requestId = args[0].match(/requestid=(\d+)/)[1];
		if (KmLoader.retryCallList[requestId] == undefined) {
			KmLoader.retryCallList[requestId] = args[0];
		}
		if (KmLoader.retryAttempts[requestId] != undefined) {		
			args[0] = args[0] + '&retry=' + KmLoader.retryAttempts[requestId];
		}
		origSendCall.apply(this, args);
	}
);

/*
 * KmLoader.receiveSuccess override, since it reorders redirected articles
 */
KmLoader.receiveSuccess = function(json, requestId) {
	KmLoader.success(json, requestId);
}

/*
 * as long as KmLoader.js is included in this page, the 
 * success() function will execute when data is received from the HTTP portlet call
 */	
KmLoader.success = function(json, requestId) {
	
	if ($('portlet_'+requestId) != null) {
		
		$('portlet_'+requestId).innerHTML = '';

		// fix spacing for manually coded linked lists above/below portlet
		if ($('portlet_' + requestId).previous() != undefined && $('portlet_' + requestId).previous().match('ul')) {
			$('portlet_' + requestId).previous().setStyle({paddingBottom: '0px'}); 
		}
		if ($('portlet_' + requestId).next() != undefined && $('portlet_' + requestId).next().match('ul')) {
			$('portlet_' + requestId).setStyle({paddingBottom: '0px'}); 
		}

		if(json==undefined || json==null) {
			alert('Something went wrong. Please try again!') 
		}
		else {
			var portletData = '';

			for(i=0;i<json['results'].length;i++) {
				if (json.results[i] != null) {
					var displayItem = true;
					if(KmLoader.ignoreArticles!==undefined && json.results[i].url.indexOf("support.apple.com/kb/")!=-1) {
						// if kb article, omit if it's in the ignoreArticles list
						var endIndex = json.results[i].url.indexOf("?")!=-1 ? json.results[i].url.indexOf("?") : json.results[i].url.length;
						var artId = json.results[i].url.substring(json.results[i].url.lastIndexOf("/")+1, endIndex);
						if(KmLoader.ignoreArticles.indexOf(artId)!=-1) {
							displayItem = false;
						}
					}
					var portletResultUrl = json.results[i].url;
					var videoThumbnail = json.results[i].thumbnail;
					if(displayItem) {
						if (typeof(KmLoader.showPortletIconsAndExcerpt) != 'undefined' && KmLoader.showPortletIconsAndExcerpt == true) {
							/* portlet with icon, linked title, and excerpt */
							var iconStyle = '';
							switch (json.results[i].documentid.substr(0,2)) {
								case 'HT':
									iconStyle = "dt-howto-articles";
									break;
								case 'TS':
									iconStyle = "dt-troubleshooting-articles";
									break;
								case 'HE':
									iconStyle = "dt-help-articles";
									break;
								case 'PH':
									iconStyle = "dt-howto-articles";
									break;									
								case 'VI':
									iconStyle = "dt-videos";
									break;
								default:
									iconStyle = "dt-document";
									break;
							}
							/* get excerpt, truncate if necessary */
							var excerpt = json.results[i].excerpt;
                            if (excerpt.length > 200) {
								excerpt = excerpt.substring(0, 200);
								excerpt = excerpt.replace(/\w+$/, '');
								excerpt += "...";
							}
							portletData += "<li class=\"portlet-results " + iconStyle + "\" data-hires-portlet=\"true\">";
							portletData += "<a class=\"block\" href=\"" + portletResultUrl + "\" onclick=\"s_objectID='" +  portletResultUrl + "_p" + requestId + "-" + i + "';\"><h3><span>" + json.results[i].title + "</span></h3>";
							portletData += "<div class=\"excerpt\">" + excerpt + "</div></a></li>";
						}
						else {
							/* portlet with linked title and thumbnail */
							portletData += "<li><a href=\"" + portletResultUrl + "\" onclick=\"s_objectID='" +  portletResultUrl + "_p" + requestId + "-" + i + "';\">";
							if (json.results[i].thumbnail != undefined) {
								portletData += "<span class=\"thumbnail\"><img src=\"" + json.results[i].thumbnail + "\" /></span>";
							}
							portletData += json.results[i].title + "</a></li>";
						}
					}
				}
			}
			$('portlet_' + requestId).innerHTML = portletData;
			if (typeof AC !== "undefined" && AC.Retina !== undefined && AC.Retina.devicePixelRatio() > 1) { 
				new AC.Retina({"attribute":"data-hires-portlet"}); 
			}
		}
	}
}

/*
 * Handle error or no results.
 */	
KmLoader.error = function(errorMsg, requestId) {
	if ($('portlet_'+requestId) != null) {
		$('portlet_'+requestId).innerHTML = '';
	}
	KmLoader.retry(requestId);
};

/*
 * If no results are returned, retry the request with a different argument
 * in the URL, and repeat [maxRetries] times until there are results.
 */
KmLoader.retry = function(requestId) {
	if (KmLoader.retryAttempts[requestId] == undefined) {
		KmLoader.retryAttempts[requestId] = 1;
	}
	else {
		KmLoader.retryAttempts[requestId] += 1;
	}
	if (KmLoader.retryAttempts[requestId] <= KmLoader.retryMax) {
		KmLoader.callback = KmLoader.retryCallback[requestId];
		KmLoader.sendCall(KmLoader.retryCallList[requestId]);
		KmLoader.callback = KmLoader.origCallback;
	}
};


/*
 * Name
 * 	DownloadsModule
 *
 * Description
 * 	An object that makes requests for Downloads content only. 
 * 	Used on product support pages to display the dynamic Downloads module.
 *
 * Dependencies
 * 	Javascript : prototype.js, scriptaculous.js, support.global.js
 * 	HTML : <div id="downloads_module" class="module"></div>
 * 
 */
var DownloadsModule = {

	'container': 'downloads_module',
	'default_locale': 'en_US',
	'dm_results': [],
	'hard_list_top': [],
	'hard_list_bottom': [],
	'has_downloads': false,
	'initialized': false,
	'intro_link': '',
	'links_container': 'downloads_module_links',
	'loaderid': KmLoader.nextRequestId.downloads.start,
	'load_order': [],
	'locale_api': {},
	'overridelinks': '',
	'see_all_link': '',
	'urlpath': {},
	'vars': {},
	'showDateAndExcerpts': false,
	
	'buildLinks': function(listsize, productids, loaderid, showenglish) {
		new PeriodicalExecuter(function(pe) {
			if ($(this.links_container) && !isNaN(listsize) && productids != '' && this.load_order[0] == loaderid && this.locale_api[productids] != undefined) {
				if ($('intro_link').readAttribute('href') == null || $('intro_link').readAttribute('href') == '') {
					this.createDownloadsLinks(productids);
				}
				if ($(this.links_container + '_mid')) {
					$(this.links_container + '_mid').insert(new Element('ul', {
						'class': 'square',
						'id': this.links_container + '_' + loaderid
					}));
				}
				if ($(this.links_container + '_top')) {
					this.hard_list_top.each(function(el) {
						if ($('dm_spinner').visible()) { $('dm_spinner').hide(); }
						$(this.links_container + '_top').insert(el.addClassName('square').show()).appear({'duration': 0.3});
					}.bind(this)).shift();
				}
				if ($(this.links_container + '_bottom')) {
					this.hard_list_bottom.each(function(el) {
						if ($('dm_spinner').visible()) { $('dm_spinner').hide(); }
						$(this.links_container + '_bottom').insert(el.addClassName('square').show()).appear({'duration': 0.3});
					}.bind(this)).shift();
				}
				this.load_order.shift();
				this.requestLinks(listsize, productids, loaderid, showenglish);
				pe.stop();
			}
		}.bind(this), 0.3);
	},
	
	'buildModule': function() {
		new PeriodicalExecuter(function(pe) {
			if ($(this.container).immediateDescendants().length == 0 && this.vars.hed != undefined && this.vars.intro != undefined && this.vars.subhed != undefined && this.vars.see_all != undefined) {
				var h2 = new Element('h2');
				var div = new Element('div').update(this.vars.hed);
				h2.insert(div);
				$(this.container).insert(h2);
				var div_sidebar = new Element('div').addClassName('sidebar pad10');
				var a_icon = new Element('a', {'id': 'icon_link'});
				var img_icon = new Element('img', {
					'src': 'https://www.apple.com/support/assets/images/layout/psp/icons/icon_downloads.png', 
					'data-hires-downloadsmodule': 'true',
					'id': 'dm_icon'
				}).addClassName('lefticon');
				a_icon.insert(img_icon);
				var div_desc1 = new Element('div').addClassName('desc').update(this.vars.intro);
				var div_desc2 = new Element('div').addClassName('desc').update(this.vars.subhed + ':');
				var div_links = new Element('div', {'id': 'downloads_module_links'});
				var img_spinner = new Element('img', {
					'src': 'https://www.apple.com/support/assets/images/global/loading_2x.gif', 
					'id': 'dm_spinner',
					'width': '28',
					'height': '28'
				});
				var div_links_top = new Element('div', {'id': 'downloads_module_links_top'});
				var div_links_mid = new Element('div', {'id': 'downloads_module_links_mid'}).hide();
				var div_links_bot = new Element('div', {'id': 'downloads_module_links_bottom'}).hide();
				div_links.insert(img_spinner);
				div_links.insert(div_links_top);
				div_links.insert(div_links_mid);
				div_links.insert(div_links_bot);
				var div_padtop10 = new Element('div').addClassName('padtop10');
				var a_seeall = new Element('a', {'id': 'see_all_link'}).addClassName('arrowlink').update(this.vars.see_all);
				div_sidebar.insert(a_icon);
				div_sidebar.insert(div_desc1);
				div_sidebar.insert(div_desc2);
				div_sidebar.insert(div_links);
				div_sidebar.insert(div_padtop10);
				div_sidebar.insert(a_seeall);
				$(this.container).insert(div_sidebar);
				if (typeof AC !== "undefined" && AC.Retina !== undefined && AC.Retina.devicePixelRatio() > 1) { 
					new AC.Retina({"attribute":"data-hires-downloadsmodule"}); 
				}
				pe.stop();
			}
		}.bind(this), 0.1);
	},
	
	'createDownloadsLinks': function(productids) {
		if ($('intro_link')) {
			$('intro_link').writeAttribute({
				'href': this.getIntroLink(productids), 
				'onclick': 's_objectID=\'' + this.getIntroLink(productids) + '_dm_intro\''
			});
		}
		if ($('icon_link')) {
			$('icon_link').writeAttribute({
				'href': this.getIntroLink(productids), 
				'onclick': 's_objectID=\'' + this.getIntroLink(productids) + '_dm_icon\''
			});
		}
		if ($('see_all_link')) {
			$('see_all_link').writeAttribute({
				'href': this.getSeeAllLink(productids), 
				'onclick': 's_objectID=\'' + this.getSeeAllLink(productids) + '_dm_see_all\''
			});
		}
	},
	
	'getCategoryKey' : function () {
		return (typeof(ACCategoryKey) == 'undefined' || ACCategoryKey.empty()) ? false : ACCategoryKey;
	},
	
	'getIntroLink': function(productid) {
		if (this.intro_link === "") {
			var locale = "";
			if (this.overridelinks !== "") {
				var override = this.overridelinks.split("#");
				if (override[0] && override[0] !== "en_US") { 
					locale = "/" + override[0]; 
				}
			}
			else if (this.has_downloads) {
				var catkey = this.getCategoryKey();
				if (this.locale_api[catkey] && this.locale_api[catkey] !== "en_US") {
					locale = "/" + this.locale_api[catkey];
				}
				else if (this.locale_api[productid] && this.locale_api[productid] !== "en_US") {
					locale = "/" + this.locale_api[productid];
				}
			}
			this.intro_link = "https://support.apple.com" + locale + "/downloads/";
		}
		return this.intro_link;
	},
	
	'getLocaleForApi' : function () {
		/* languages with multiple countries that are specific to inquira */
		/* these fall into the default group: pt_BR pt_PT zh_CN zh_TW */
		if (ACWPod.getLang() == 'de') { return 'de_DE'; }
		else if (ACWPod.getLang() == 'en') { return 'en_US'; }
		else if (ACWPod.getLocale() == 'es_LA' || ACWPod.getLocale() == 'es_MX') { return ACWPod.getLocale(); }
		else if (ACWPod.getLang() == 'es') { return 'es_ES'; }
		else if (ACWPod.getLang() == 'fr') { return 'fr_FR'; }
		else if (ACWPod.getLang() == 'nl') { return 'nl_NL'; }
		else if (ACWPod.getLocale() == 'zh_HK') { return 'zh_TW'; }
		else { return ACWPod.getLocale(); }
	},
	
	'getSeeAllLink': function(productid) {
		if (this.see_all_link === "") {
			var locale = "";
			var urlpath = "";
			if (this.overridelinks !== "") {
				var override = this.overridelinks.split("#");
				if (override[0] && override[0] !== "en_US") { 
					locale = "/" + override[0]; 
				}
				if (override[1]) { 
					urlpath = "#" + override[1]; 
				}
			}
			else {
				var catkey = this.getCategoryKey();
				if (this.locale_api[catkey] && this.locale_api[catkey] !== "en_US") {
					locale = "/" + this.locale_api[catkey];
				}
				else if (this.locale_api[productid] && this.locale_api[productid] !== "en_US") {
					locale = "/" + this.locale_api[productid];
				}
				if (this.urlpath[catkey]) {
					urlpath = "#" + this.urlpath[catkey];
				}
				else if (this.urlpath[productid]) {
					urlpath = "#" + this.urlpath[productid];
				}
			}
			this.see_all_link = "https://support.apple.com" + locale + "/downloads/" + urlpath;
		}
		return this.see_all_link;
	},
	
	'getHostForKmLoader': function() {
		return KmLoader.akamaiUrl;
	},
	
	'load': function(listsize, ids, showenglish, overridelinks) {
		var loaderid = this.loaderid;
		this.load_order.push(loaderid);
		
		if (!this.initialized) {
			if ($(this.container)) {
				this.loadCSS();
				this.loadVars();
				this.storeHardcodedLists();
				this.buildModule();
			}
			this.initialized = true;
		}
		
		var productids = '';
		if (ids != undefined && ids != '') {
			productids = ids;
		}
		else if (this.getCategoryKey() != false) {
			productids = this.getCategoryKey();
		}
		else if (this.getCategoryKey() == false) {
			alert('DownloadsModule: ACCategoryKey not defined.');
			return;
		}
		else {
			alert('DownloadsModule: Product ID not defined.');
			return;
		}
		
		if (showenglish != undefined && showenglish == true) {
			showenglish = 'y';
		}
		else {
			showenglish = 'n';
		}
		
		if (overridelinks !== undefined && overridelinks !== "") {
			this.overridelinks = overridelinks;
		}
		
		this.requestCheckProduct(productids, loaderid);
		this.buildLinks(listsize, productids, loaderid, showenglish);
		this.loaderid++;
	},
	
	'loadCSS': function() {
		$$('head').first().insert(new Element('link', {
			'rel': 'stylesheet',
			'href': 'https://www.apple.com/support/scripts/portlet/DownloadsModule/css/styles.css',
			'type': 'text/css',
			'charset': 'utf-8'
		}));
	},
	
	'loadScript': function(url) {
		$$('head').first().insert(new Element('script', {
			'src': url,
			'type': 'text/javascript',
			'charset': 'utf-8'
		}));
	},
	
	'loadVars': function() {
		var varslang = ACWPod.getLang();
		/* locale-specific languages */
		if (ACWPod.getLocale() == 'es_LA' || ACWPod.getLocale() == 'es_MX' || ACWPod.getLocale() == 'pt_BR' || ACWPod.getLocale() == 'pt_PT' || ACWPod.getLocale() == 'zh_CN' || ACWPod.getLocale() == 'zh_TW') {
			varslang = ACWPod.getLocale();
		}
		/* force hk lang to zh_TW */
		else if (ACWPod.getLocale() == 'zh_HK') {
			varslang = 'zh_TW';
		}
		this.loadScript('/support/assets/scripts/shared/downloadsmodule/vars/' + varslang + '.js');
	},
	
	'requestCheckProduct': function(productids, loaderid) {
		KmLoader.callback = 'DownloadsModule.successCheckProduct';
		KmLoader.sendCall(KmLoader.akamaiUrl + '/kb/index?page=categorydata&requestid=' + loaderid + '&productid=' + productids + '&locale=' + this.getLocaleForApi());
	},
	
	'requestLinks': function(listsize, productids, loaderid, showenglish) {
		KmLoader.callback = 'DownloadsModule.successLinks';
		new KmLoader(loaderid, 'DOWNLOADS', productids + '-HIDE_IN_PSP', undefined, undefined, 'published', this.locale_api[productids], listsize, undefined, undefined, true, undefined, undefined, 'y');
	},
	
	'storeHardcodedLists': function() {
		/* hold onto any hard-coded lists for display later */
		var hardcoded = $(this.container).immediateDescendants();
		hardcoded.each(function(el) {
			if (el.readAttribute('position') != null && el.readAttribute('position') != '') {
				if (el.readAttribute('position') == 'top') {
					this.hard_list_top.push(el);
				}
				else if (el.readAttribute('position') == 'bottom') {
					this.hard_list_bottom.push(el);
				}
			}
			else {
				this.hard_list_top.push(el);
			}
		}.bind(this));
		$(this.container).immediateDescendants().invoke('remove');
	},
	
	'successLinks': function(json, requestId) {
		var has_results = false;
		var request_container = this.links_container + '_' + requestId;
		new PeriodicalExecuter(function(pe) {
			if ($(request_container) != null) {
				if (json != undefined && json != null) {
					if ($('dm_spinner').visible()) { $('dm_spinner').hide(); }
					for (i = 0; i < json['results'].length; i++) {
						if (json.results[i] != null) {
							if (this.dm_results.indexOf(json.results[i].url) == -1) {
								var dm_result_url = json.results[i].url;
								var ahref = new Element('a', {
									'class': 'block',
									'href': dm_result_url,
									'onclick': 's_objectID=\'' + json.results[i].url + '_dm_' + requestId + '-' + i + '\';'
								});
								var title = new Element('span').update(json.results[i].title);
								
							
								ahref.update(title);
								portletData = new Element('li');
								portletData.insert(ahref);
								if (DownloadsModule.showDateAndExcerpts === true) {
									var divdate = new Element('div', { 'class': 'date' });
									divdate.update(json.results[i].datepublished.split(' ')[0]);
									//portletData.insert(divdate);
									ahref.insert(divdate);
								}
								$(request_container).insert(portletData);
								this.dm_results.push(json.results[i].url);
								has_results = true;
							}
						}
					}
					if (has_results) {
						$(this.links_container + '_mid').appear({'duration': 0.3});
					}
				}
				pe.stop();
			}
		}.bind(this), 0.1);
	},
	
	'successCheckProduct': function(json) {
		if (json.hasdownloads != undefined && json.hasdownloads == true && json.id != undefined && json.urlpath != undefined) {
			this.locale_api[json.id] = this.getLocaleForApi();
			this.urlpath[json.id] = json.urlpath;
			this.has_downloads = true;
		}
		else {
			this.locale_api[json.id] = this.default_locale;
			this.urlpath[json.id] = '';
		}
		this.createDownloadsLinks(json.id);
	}
	
};

Event.observe(window, 'load', function() {
	/* New PSPs: sidebar and section only exist in new PSPs */
	if ($('sidebar') && $('section')) {
		$$('ul.portlet').each(function(port) { port.innerHTML = '<img src="https://www.apple.com/support/assets/images/global/loading_2x.gif" width="28" height="28" class="portlet-spinner">'; });
	}
	/* Old PSPs */
	else {
		$$('ul.portlet').each(function(port) { port.innerHTML = '<img src="https://www.apple.com/support/assets/images/global/loading_2x.gif" width="28" height="28" class="portlet-spinner">'; });
	}
});