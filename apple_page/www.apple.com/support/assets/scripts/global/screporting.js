var SCReporting={metacontent:"",metaroot:"acs::web::",pagepath:location.pathname?location.pathname:"",pagetitle:document.title?document.title:"",subdir:"",title:"",map:{},prop1:"",prop2:"",prop7:"",eVar5:"",init:function(){this.setSubdir(),this.normalizeTitle(),this.mapPage(),this.clearCookies(),this.insertMetaTag()},clearCookies:function(){this.deleteCookie("acs_prop7"),this.deleteCookie("acs_evar5")},deleteCookie:function(e){null!==this.getCookie(e)&&(document.cookie=e+"=; path=/; domain=.apple.com; expires=Thu, 01 Jan 1970 00:00:00 UTC")},insertMetaTag:function(){var e=document.getElementsByTagName("head").item(0),i=document.createElement("meta");i.setAttribute("name","omni_page"),i.setAttribute("content",this.metaroot+this.metacontent),e.appendChild(i)},getCookie:function(e){var i=document.cookie.match(new RegExp("(^|;)\\s*"+escape(e)+"=([^;\\s]*)"));return i?unescape(i[2]):null},getProp1:function(){var e=/\/support\/([^\/]*)/.exec(window.location.pathname);return null!==e?e[1]:""},getProp2:function(){var e=/\/support\/[^\/]+\/([^\/]*)/.exec(window.location.pathname);return null!==e&&e[1]?e[1]:"support"},getProp7:function(){return null!==this.getCookie("acs_prop7")?this.getCookie("acs_prop7"):""},getEvar5:function(){return null!==this.getCookie("acs_evar5")?this.getCookie("acs_evar5"):""},hasSCode:function(){return"undefined"!=typeof s_gi&&"undefined"!=typeof s_account},mapPage:function(){""===this.subdir?(this.metacontent="homepage",this.prop1="acs::homepage"):this.map.psp[this.subdir+"/thankyou"]&&window.location.search.search("thankyou=true")>0?(this.metacontent="psp::"+this.map.psp[this.subdir+"/thankyou"]+"::"+this.title,this.prop1=this.getProp1()?"acs::psp::"+this.getProp1():""):this.map.psp[this.subdir]?(this.metacontent="psp::"+this.map.psp[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::psp::"+this.getProp1():""):this.map.ta[this.subdir]?(this.metacontent="ta::"+this.map.ta[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::ta::"+this.getProp1():""):this.map.faq[this.subdir]?(this.metacontent="faq::"+this.map.faq[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::faq::"+this.getProp1():""):this.map.qp[this.subdir]?(this.metacontent="qp::"+this.map.qp[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::qp::"+this.getProp1():""):this.map.price[this.subdir]?(this.metacontent="price::"+this.map.price[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::price::"+this.getProp1():""):this.map.survey[this.subdir]?(this.metacontent="survey::"+this.map.survey[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::survey::"+this.getProp1():""):this.map.family[this.subdir]?(this.metacontent="family::"+this.map.family[this.subdir]+"::"+this.title,this.prop1=this.getProp1()?"acs::family::"+this.getProp1():""):(this.metacontent=this.title,this.prop1=this.getProp1()),this.prop2=this.getProp2(),this.prop7=this.getProp7(),this.eVar5=this.getEvar5()},normalizeTitle:function(){this.title=this.pagetitle,this.title=this.title.replace(/\&mdash;/g,"-"),this.title=this.title.replace(/\&ndash;/g,"-"),this.title=this.title.replace(/\—/g,"-"),this.title=this.title.replace(/\–/g,"-"),this.title=this.title.replace(/\&nbsp;/g," "),this.title=this.title.replace(/\s+/g," "),this.title=this.title.replace(/\"/g,"'"),this.title=this.title.replace(/\„/g,""),this.title=this.title.replace(/\“/g,""),this.title=this.title.replace(/^\s+(.+)/,"$1"),this.title=this.title.replace(/(.+)\s+$/,"$1"),/^Apple \- /.test(this.title)?(this.title=this.title.split(" - "),this.title.length>2?(this.title.shift(),this.title.shift(),this.title=this.title.join(" - ")):this.title=this.title.toString()):/\- [^\-]*Apple[^\-]*$/.test(this.title)&&(this.title=this.title.split(" - "),this.title.length>1?(this.title.pop(),this.title=this.title.join(" - ")):this.title=this.title.toString())},setSubdir:function(){-1!=this.pagepath.indexOf("/support/")?(this.subdir=this.pagepath.match(/\/support\/(.*)$/)[1],this.subdir=this.subdir.replace(/(.+)(\/|\/index\.html)$/,"$1"),this.subdir=this.subdir.replace(/^index\.html$/,"")):this.subdir="undefined"},trackClick:function(e,i,o,a){if(this.hasSCode()&&void 0!==e){var t=s_gi(s_account),s=t.pageName,p=s.match(/\([^\(\)]+\)$/),r=null!==p&&p.length>0?" "+p[0]:"",c=void 0===a||a===!0?this.metacontent:"",n=void 0===o||o===!0?" - ":"";t.pageName=this.metaroot+c+n+e+r,t.prop4=void 0!==i?i:document.URL,t.getQueryParam&&t.getQueryParam("cp")&&(t.prop6=t.getQueryParam("cp")+": "+this.metaroot+c+e+r),void t.t()}}};SCReporting.map={psp:{accessibility:"accessibility","accessibility/getstarted":"accessibility::get started","accessibility/vision":"accessibility::vision","accessibility/hearing":"accessibility::hearing","accessibility/physicalmotorskills":"accessibility::physical and motor skills","accessibility/learning":"accessibility::learning","accessibility/accessories":"accessibility::accessories","accessibility/developer":"accessibility::developer","accessibility/resources":"accessibility::resources","accessibility/contact":"accessibility::contact support",airport:"airport + wi-fi","airport/backtomac":"airport + wi-fi::back to my mac","airport/basestations":"airport + wi-fi::airport base stations","airport/contact":"airport + wi-fi::contact support","airport/downloads":"airport + wi-fi::recent software updates","airport/getstarted":"airport + wi-fi::get started","airport/printing":"airport + wi-fi::wireless printing","airport/timecapsule":"airport + wi-fi::time capsule","airport/wifi":"airport + wi-fi::general wi-fi","airport/windows":"airport + wi-fi::windows",aperture:"aperture","apple-pay":"apple pay","apple-pay/overview":"apple pay::overview & setup","apple-pay/accept":"apple pay::accept apple pay",applecare:"applecare","applecare/contact":"applecare::contact","applecare/manage":"applecare::manage","applecare/purchase":"applecare::purchase","applecare/register":"applecare::register","applecare/resources":"applecare::resources","applecare/view":"applecare::view","applecare/welcome":"applecare::welcome","applecare/ww":"applecare::worldwide",appleid:"apple id","appleid/create-signin":"apple id::create & sign in","appleid/manage-account":"apple id::manage account","appleid/password-security":"apple id::password & security",appletv:"appletv","appletv/1st_generation":"appletv 1st generation","appletv/airplay":"appletv::airplay","appletv/av":"appletv::audio & video","appletv/basics":"appletv::basics","appletv/contact":"appletv::contact support","appletv/essentials":"appletv::essentials","appletv/getstarted":"appletv::get started","appletv/homesharing":"appletv::home sharing","appletv/itunes-appstore":"appletv::itunes & app store","appletv/moviestv":"appletv::movies & tv shows","appletv/remote":"appletv::remote","appletv/service":"appletv::hardware service","appletv/service/faq":"appletv::service faq","appletv/sharing":"appletv::sharing","appletv/troubleshooting":"appletv::troubleshooting","appletv/using":"appletv::using appletv","appletv/wifi":"appletv::wifi + networking",bluetooth:"bluetooth",bonjour:"bonjour",bootcamp:"boot camp","bootcamp/contact":"boot camp::contact","bootcamp/downloads":"boot camp::recent software updates","bootcamp/getstarted":"boot camp::get started","bootcamp/usingbootcamp":"boot camp::using boot camp","business-education":"business & education","business-education/deployment-overview":"business & education::deployment overview","business-education/dep":"business & education::device enrollment program","business-education/vpp":"business & education::volume purchase program","business-education/appleid-for-students":"business & education::apple id for students","business-education/mdm":"business & education::mobile device management","business-education/apple-configurator":"business & education::apple configurator","business-education/security":"business & education::networking & security","business-education/osxserver":"os x server","business-education/resources":"business & education::resources","business-education/contact":"business & education::contact","business-education/software-updates":"business & education::recent software updates",color:"color",compressor:"compressor",compressor3:"compressor3",displays:"displays","displays/cables":"displays::cables, ports, and adapters","displays/contact":"displays::contact support","displays/downloads":"displays::recent software updates","displays/getstarted":"displays::get started","displays/topics":"displays::featured topics",dvdstudiopro:"dvd studio pro",emac:"emac",finalcutexpress:"final cut express",finalcutpro:"final cut pro",finalcutpro7:"final cut pro 7",finalcutserver:"final cut server",hardware:"hardware",headset:"headset",homesharing:"home sharing","homesharing/getstarted":"home sharing::get started","homesharing/howto":"home sharing::how to","homesharing/troubleshooting":"home sharing::troubleshooting",iadworkbench:"iad workbench",ibook:"ibook",icloud:"icloud","icloud/setup-signin":"icloud::set up & sign in","icloud/backup-storage":"icloud::backup & storage","icloud/icloud-drive":"icloud::icloud drive","icloud/photos":"icloud::photos","icloud/find-my-iphone-ipad-ipod-mac":"icloud::find my iphone ipad ipod mac","icloud/icloud-for-windows":"icloud::icloud for windows","icloud/more-features":"icloud::more features","icloud/contact":"icloud::contact support",idvd:"idvd","imac/g3":"imac g3","imac/g4":"imac g4","imac/g5":"imac g5","imac/intel":"intel-based imac","imac/intel/accessories":"intel-based imac::accessories","imac/intel/applications":"intel-based imac::applications","imac/intel/backup":"intel-based imac::backup","imac/intel/contact":"intel-based imac::contact support","imac/intel/downloads":"intel-based imac::recent software updates","imac/intel/mail":"intel-based imac::mail","imac/intel/memory_storage":"intel-based imac::memory and storage","imac/intel/migration":"intel-based imac::moving files to a new mac","imac/intel/new_user":"intel-based imac::new to mac","imac/intel/power":"intel-based imac::power","imac/intel/topics":"intel-based imac::featured topics","imac/intel/wifi":"intel-based imac::wi-fi","imac/intel/windowsmac":"intel-based imac::windows on a mac",ios:"ios apps","ios/apps":"ios apps","ios/contact":"ios apps::contact","ios/garageband":"ios apps::garageband","ios/ibooks":"ios apps::ibooks","ios/imovie":"ios apps::imovie","ios/iphoto":"ios apps::iphoto","ios/itunes-u":"ios apps::itunes u","ios/keynote":"ios apps::keynote","ios/numbers":"ios apps::numbers","ios/other":"ios apps::other apps","ios/pages":"ios apps::pages","ios/podcasts":"ios apps::podcasts",ios9:"ios9",ipad:"ipad","ipad/airprint-airplay":"ipad::airprint & airplay","ipad/apple-pay":"ipad::apple pay","ipad/business":"ipad::business and education","ipad/contact":"ipad::contact","ipad/repair":"ipad::repair","ipad/repair/battery-power":"ipad::repair::battery-power","ipad/repair/other":"ipad::repair::other","ipad/repair/screen-damage":"ipad::repair::screen-damage","ipad/setup":"ipad::setup","ipad/using":"ipad::using ipad",iphone:"iphone","iphone/setup":"iphone::setup","iphone/using":"iphone::using iphone","iphone/messages":"iphone::messages & mail","iphone/backup":"iphone::backup","iphone/repair":"iphone::repair","iphone/repair/battery-power":"iphone::repair::battery-power","iphone/repair/other":"iphone::repair::other","iphone/repair/screen-damage":"iphone::repair::screen-damage","iphone/contact":"iphone::contact","ipod/earlier":"ipod::ipod earlier",ipodclassic:"ipod::ipod classic","ipodclassic/contact":"ipod::ipod classic::contact","ipodclassic/getstarted":"ipod::ipod classic::get started","ipodclassic/how-to":"ipod::ipod classic::how to","ipodclassic/troubleshooting":"ipod::ipod classic::troubleshooting",ipodhifi:"ipod accessories::ipod hi-fi","ipodhifi/contact":"ipod accessories::ipod hi-fi::contact","ipodhifi/getstarted":"ipod accessories::ipod hi-fi::get started","ipodhifi/service":"ipod accessories::ipod hi-fi::service","ipodhifi/troubleshooting":"ipod accessories::ipod hi-fi::troubleshooting",ipodmini:"ipod::ipod mini",ipodnano:"ipod::ipod nano","ipodnano/3rd_generation":"ipod::ipod nano 3rd gen","ipodnano/4th_5th_generation":"ipod::ipod nano 4th and 5th gen","ipodnano/6th_generation":"ipod::ipod nano 6th gen","ipodnano/6th_generation/contact":"ipod::ipod nano 6th gen::contact","ipodnano/6th_generation/getstarted":"ipod::ipod nano 6th gen::get started","ipodnano/6th_generation/how-to":"ipod::ipod nano 6th gen::how to","ipodnano/6th_generation/syncing":"ipod::ipod nano 6th gen::syncing","ipodnano/6th_generation/troubleshooting":"ipod::ipod nano 6th gen::troubleshooting","ipodnano/accessories":"ipod::ipod nano::accessories","ipodnano/contact":"ipod::ipod nano::contact","ipodnano/earlier":"ipod::ipod nano earlier","ipodnano/getstarted":"ipod::ipod nano::get started","ipodnano/how-to":"ipod::ipod nano::how to","ipodnano/service":"ipod::ipod nano::service","ipodnano/syncing":"ipod::ipod nano::syncing","ipodnano/troubleshooting":"ipod::ipod nano::troubleshooting",ipodshuffle:"ipod::ipod shuffle","ipodshuffle/3rd_generation":"ipod::ipod shuffle 3rd gen","ipodshuffle/battery":"ipod::ipod shuffle::battery","ipodshuffle/contact":"ipod::ipod shuffle::contact","ipodshuffle/earlier":"ipod::ipod shuffle earlier","ipodshuffle/getstarted":"ipod::ipod shuffle::get started","ipodshuffle/how-to":"ipod::ipod shuffle::how to","ipodshuffle/service":"ipod::ipod shuffle::service","ipodshuffle/syncing":"ipod::ipod shuffle::syncing","ipodshuffle/troubleshooting":"ipod::ipod shuffle::troubleshooting",ipodtouch:"ipod::ipod touch","ipodtouch/accessories":"ipod::ipod touch::accessories","ipodtouch/applications":"ipod::ipod touch::applications","ipodtouch/apps":"ipod::ipod touch::apps","ipodtouch/basics":"ipod::ipod touch::basics","ipodtouch/contact":"ipod::ipod touch::contact","ipodtouch/essentials":"ipod::ipod touch::essentials","ipodtouch/facetime":"ipod::ipod touch::facetime","ipodtouch/find-my-device":"ipod::ipod touch::find my device","ipodtouch/getstarted":"ipod::ipod touch::get started","ipodtouch/ibooks":"ipod::ipod touch::ibooks","ipodtouch/imovie":"ipod::ipod touch::imovie","ipodtouch/mail":"ipod::ipod touch::mail","ipodtouch/morefeatures":"ipod::ipod touch::features","ipodtouch/service":"ipod::ipod touch::service","ipodtouch/syncing":"ipod::ipod touch::syncing","ipodtouch/wifi":"ipod::ipod touch::wifi",isight:"isight",itunes:"itunes","itunes-u":"itunes-u","itunes-u/course-manager":"itunes-u::course manager","itunes-u/public-site-manager":"itunes-u::public site manager","itunes-u/using":"itunes-u::using itunes-u","itunes/account":"itunes::account and billing","itunes/apps":"itunes::apps","itunes/authorization":"itunes::authorize your computer","itunes/books":"itunes::books","itunes/cards-codes":"itunes::itunes cards and codes","itunes/contact":"itunes::contact support","itunes/contact.html":"itunes::contact support::form","itunes/contact.html/thankyou":"itunes::contact support::form::thankyou","itunes/devices":"itunes::devices","itunes/downloading":"itunes::downloading content","itunes/getstarted":"itunes::get started","itunes/in-the-cloud":"itunes::itunes in the cloud","itunes/install":"itunes::install and update","itunes/itunes-match":"itunes::itunes match","itunes/itunes-u":"itunes::itunes u and podcasts","itunes/library":"itunes::manage and share your library","itunes/media":"itunes::move your media","itunes/movies":"itunes::movies and tv","itunes/music":"itunes::music","itunes/purchases":"itunes::purchases and downloads","itunes/sharing":"itunes::sharing & managing content","itunes/store":"itunes::itunes store","itunes/syncing":"itunes::syncing and transferring content","itunes/troubleshooting":"itunes::itunes troubleshooting","itunes/vpp":"itunes::volume purchase program::form","itunes/vpp/thankyou":"itunes::volume purchase program::form::thankyou","itunes/vpp-edu":"itunes::volume purchase program::edu::form","itunes/vpp-edu/thankyou":"itunes::volume purchase program::edu::form::thankyou",iweb:"iweb","iwork-for-icloud":"iwork for icloud","iwork-for-icloud/pages":"iwork for icloud::pages for icloud","iwork-for-icloud/numbers":"iwork for icloud::numbers for icloud","iwork-for-icloud/keynote":"iwork for icloud::keynote for icloud","iwork-for-icloud/contact":"iwork for icloud::contact support",keyboard:"keyboard","latino/itunes":"itunes::latino itunes",leopard:"mac os x 10.5",lion:"lion","lion/applications":"lion::applications","lion/basics":"lion::basics","lion/contact":"lion::contact","lion/howto":"lion::howto","lion/installrecovery":"lion::installation and recovery","lion/internetnetworking":"lion::internet and networking","lion/mail":"lion::mail","lion/printingscanning":"lion::printing and scanning","lion/safari":"lion::safari","lion/security":"lion::security","lion/troubleshooting":"lion::troubleshooting",lionserver:"lion server","lionserver/advancedtopics":"lion server::advanced topics","lionserver/clientmanagement":"lion server::client management","lionserver/collaboration":"lion server::collaboration","lionserver/contact":"lion server::contact","lionserver/directoryservices":"lion server::directory services","lionserver/filesharing":"lion server::file sharing","lionserver/otherservices":"lion server::other services","lionserver/podcast":"lion server::podcast","lionserver/profilemanager":"lion server::profile manager","lionserver/setupadministration":"lion server::setup and administration","lionserver/systemimaging":"lion server::system imaging",livetype:"livetype",logicexpress:"logic express 8",logicpro:"logic pro 8",logicpro9:"logic pro 9",logicremote:"logic remote","mac-apps":"mac apps support","mac-apps/safari":"mac apps::safari","mac-apps/quicktime":"mac apps::quicktime","mac-apps/photos":"mac apps::photos","mac-apps/garageband":"mac apps::garageband","mac-apps/imovie":"mac apps::imovie","mac-apps/mail":"mac apps::mail, contacts and calendar","mac-apps/messages":"mac apps::messages","mac-apps/facetime":"mac apps::facetime for mac","mac-apps/pages":"mac apps::pages","mac-apps/numbers":"mac apps::numbers","mac-apps/keynote":"mac apps::keynote","mac-apps/ibooks":"mac apps::ibooks","mac-apps/ibooksauthor":"mac apps::ibooks author","mac-apps/contact":"mac apps::contact support","mac/app-store":"mac app store","mac/app-store/applications":"mac app store::applications","mac/app-store/contact":"mac app store::contact support","mac/app-store/contact.html":"mac app store::contact support::form","mac/app-store/contact.html/thankyou":"mac app store::contact support::form::thankyou","mac/app-store/getstarted":"mac app store::get to know mac app store","mac/app-store/manage":"mac app store::managing purchases","mac/app-store/family-sharing":"mac app store::family sharing","mac/facetime":"mac facetime","mac/facetime/contact":"mac facetime::contact support","mac/facetime/getstarted":"mac facetime::get started","mac/facetime/troubleshooting":"mac facetime::troubleshooting",macbasics:"mac basics","macbasics/tour":"mac basics::tour the mac interface","macbasics/applications":"mac basics::using applications","macbasics/connect":"mac basics::connecting accessories","macbasics/internet":"mac basics::internet + wifi","macbasics/migration":"mac basics::transferring files","macbasics/windowsmac":"mac basics::windows on a mac","macbasics/pctomac":"mac basics::switching pc habits","macbasics/contact":"mac basics::contact support",macbook:"macbook","macbook/accessories":"macbook::accessories","macbook/applications":"macbook::applications","macbook/batteries_power":"macbook::batteries and power","macbook/bootcamp":"macbook::boot camp","macbook/contact":"macbook::contact","macbook/downloads":"macbook::downloads","macbook/mail":"macbook::mail","macbook/migration":"macbook::migration","macbook/new_user":"macbook::new to mac","macbook/service":"macbook::hardware service","macbook/topics":"macbook::featured topics","macbook/wifi":"macbook::wi-fi",macbookair:"macbook air","macbookair/accessories":"macbook air::accessories","macbookair/applications":"macbook air::applications","macbookair/backup":"macbook air::backup","macbookair/batteries_power":"macbook air::batteries and power","macbookair/bootcamp":"macbook air::boot camp","macbookair/contact":"macbook air::contact","macbookair/downloads":"macbook air::downloads","macbookair/mail":"macbook air::mail","macbookair/memory_storage":"macbook air::memory and storage","macbookair/migration":"macbook air::migration","macbookair/new_user":"macbook air::new to mac","macbookair/service":"macbook air::hardware service","macbookair/topics":"macbook air::featured topics","macbookair/wifi":"macbook air::wi-fi",macbookpro:"macbook pro","macbookpro/accessories":"macbook pro::accessories","macbookpro/applications":"macbook pro::applications","macbookpro/backup_recovery":"macbook pro::backup and recovery","macbookpro/batteries_power":"macbook pro::batteries and power","macbookpro/bootcamp":"macbook pro::boot camp","macbookpro/cables":"macbook pro::cables, ports, and adapters","macbookpro/contact":"macbook pro::contact","macbookpro/downloads":"macbook pro::downloads","macbookpro/mail":"macbook pro::mail","macbookpro/memory_storage":"macbook pro::memory and storage","macbookpro/migration":"macbook pro::migration","macbookpro/new_user":"macbook pro::new to mac","macbookpro/topics":"macbook pro::featured topics","macbookpro/wifi":"macbook pro::wi-fi",macmini:"mac mini","macmini/accessories":"mac mini::accessories","macmini/applications":"mac mini::applications","macmini/bootcamp":"mac mini::boot camp","macmini/contact":"mac mini::contact support","macmini/downloads":"mac mini::recent software updates","macmini/mail":"mac mini::mail","macmini/migration":"mac mini::moving files to a new mac","macmini/new_user":"mac mini::new to mac","macmini/power":"mac mini::power and memory","macmini/topics":"mac mini::featured topics","macmini/wifi":"mac mini::wi-fi","macosx/mailassistant":"mac os x::mail setup assistant",macosxleopardserver:"mac os x server 10.5",macpro:"mac pro","macpro/accessories":"mac pro::accessories","macpro/applications":"mac pro::applications","macpro/bootcamp":"mac pro::boot camp","macpro/contact":"mac pro::contact support","macpro/displays_storage":"mac pro::displays and storage","macpro/downloads":"mac pro::recent software updates","macpro/mail":"mac pro::mail","macpro/migration":"mac pro::moving files to a new mac","macpro/new_user":"mac pro::new to mac","macpro/topics":"mac pro::featured topics","macpro/wifi":"mac pro::wi-fi",mainstage:"mainstage",motion:"motion",motion4:"motion 4",music:"music","music/getstarted":"music::get started","music/manage":"music::manage your music","music/connect":"music::apple music connect","music/contact":"music::contact support",networking:"networking",nikeplus:"ipod accessories::nikeplus","nikeplus/contact":"ipod accessories::nikeplus::contact","nikeplus/getstarted":"ipod accessories::nikeplus::get started","nikeplus/troubleshooting":"ipod accessories::nikeplus::troubleshooting",osx:"os x support","osx/get_started":"os x::get started with os x","osx/using":"os x::using os x","osx/mail":"os x::mail, contacts and calendar","osx/passwords":"os x::passwords and security","osx/wifi":"os x::wi-fi, airplay, and airdrop","osx/printing":"os x::airprint and printing","osx/contact":"os x::contact support",osxserver:"os x server","osxserver/setupadministration":"os x server::setup and administration","osxserver/profilemanager":"os x server::profile manager","osxserver/xcodeserver":"os x server::xcode server","osxserver/cachingservice":"os x server::caching service","osxserver/filesharing":"os x server::file sharing","osxserver/collaboration":"os x server::collaboration","osxserver/directoryservices":"os x server::directory services","osxserver/systemimaging":"os x server::system imaging","osxserver/advancedtopics":"os x server::advanced topics","osxserver/contact":"os x server::contact support","osxserver/xsan":"os x server::xsan",photoservices:"photo services",powerbook:"powerbook g4",powerbookg3:"powerbook g3",powermac:"power mac g5","powermac/g3":"power mac g3","powermac/g4":"power mac g4","proapps/serialnumbers":"pro apps::serial numbers::form",printing:"printing","products/enterprise/onsite.html":"applecare for enterprise service",programs:"service programs","programs/ids":"service programs::ios direct service","programs/ssa":"service programs::self-servicing account","programs/aasp":"service programs::apple authorized service provider",remotedesktop:"remote desktop",shake:"shake",snowleopard:"mac os x 10.6 snow leopard::snow leopard","snowleopard/accessibility":"mac os x 10.6 snow leopard::accessibility","snowleopard/addressbookical":"mac os x 10.6 snow leopard::address book and ical","snowleopard/contact":"mac os x 10.6 snow leopard::contact support","snowleopard/finderdock":"mac os x 10.6 snow leopard::finder and dock","snowleopard/ichat":"mac os x 10.6 snow leopard::ichat","snowleopard/installation":"mac os x 10.6 snow leopard::installation","snowleopard/internetnetworking":"mac os x 10.6 snow leopard::internet and networking","snowleopard/isync":"mac os x 10.6 snow leopard::isync","snowleopard/mail":"mac os x 10.6 snow leopard::mail","snowleopard/printingscanning":"mac os x 10.6 snow leopard::printing and scanning","snowleopard/quicktime":"mac os x 10.6 snow leopard::quicktime","snowleopard/safari":"mac os x 10.6 snow leopard::safari","snowleopard/timemachine":"mac os x 10.6 snow leopard::time machine",snowleopardserver:"mac os x server 10.6","snowleopardserver/advancedtopics":"mac os x server 10.6::advanced topics","snowleopardserver/clientmanagement":"mac os x server 10.6::client management","snowleopardserver/collaboration":"mac os x server 10.6::collaboration","snowleopardserver/contact":"mac os x server 10.6::contact","snowleopardserver/directoryservices":"mac os x server 10.6::directory services","snowleopardserver/filesharing":"mac os x server 10.6::file sharing","snowleopardserver/networkservices":"mac os x server 10.6::network services","snowleopardserver/podcastproducer":"mac os x server 10.6::podcast producer","snowleopardserver/setupadministration":"mac os x server 10.6::setup administration",soundtrackpro:"soundtrack pro",timemachine:"time machine",watch:"apple watch","watch/setup":"apple watch::setup & pairing","watch/using":"apple watch::using apple watch","watch/communicating":"apple watch::communicating","watch/health":"apple watch::health & fitness","watch/care":"apple watch::care & handling","watch/contact":"apple watch::contact support","watch/apple-watch-edition":"apple watch edition","watch/edition":"apple watch edition::country selector","watch/replacement-letter":"apple watch replacement letter","watch/replacement-letter/country":"apple watch replacement letter::country selector",waveburner:"waveburner",webobjects:"webobjects",xserve:"xserve",xserveraid:"xserve raid","adp/ww":"adp country selector","asm/ww":"asm country selector","complimentary/ww":"complimentary country selector",country:"country selector","downloads/ww":"downloads country selector","ent/ww":"enterprise country selector","icloud/ww":"icloud country selector","iphone/ww":"iphone country selector","itunes/ww":"itunes country selector","mac/app-store/ww":"app store country selector","manuals-ww":"manuals country selector","specs/ww":"specs country selector","watch/ww":"watch country selector"},ta:{"ipad/assistant":"ipad","ipad/assistant/mail":"ipad::mail","ipad/assistant/itunes":"ipad::itunes","ipad/assistant/applications":"ipad::applications","ipad/assistant/wifi":"ipad::wifi","ipad/assistant/airprint":"ipad::airprint","iphone/assistant":"iphone","iphone/assistant/airprint":"iphone::airprint","iphone/assistant/application":"iphone::application","iphone/assistant/calls":"iphone::calls","iphone/assistant/itunes":"iphone::itunes","iphone/assistant/mail":"iphone::mail","iphone/assistant/notrecognized":"iphone::notrecognized::redirect","iphone/assistant/phone":"iphone::phone","iphone/assistant/receivemail":"iphone::receivemail","iphone/assistant/restore":"iphone::restore","iphone/assistant/sendmail":"iphone::sendmail","iphone/assistant/voicemail":"iphone::voicemail","iphone/assistant/wifi":"iphone::wifi","iphone/chit/assistant":"ch-it::iphone","iphone/chit/assistant/airprint":"ch-it::iphone::airprint","iphone/chit/assistant/application":"ch-it::iphone::application","iphone/chit/assistant/calls":"ch-it::iphone::calls","iphone/chit/assistant/itunes":"ch-it::iphone::itunes","iphone/chit/assistant/mail":"ch-it::iphone::mail","iphone/chit/assistant/phone":"ch-it::iphone::phone","iphone/chit/assistant/restore":"ch-it::iphone::restore","iphone/chit/assistant/voicemail":"ch-it::iphone::voicemail","iphone/chit/assistant/wifi":"ch-it::iphone::wifi","iphone/troubleshooting/calls":"iphone::calls::redirect","iphone/troubleshooting/itunes":"iphone::itunes::redirect","iphone/troubleshooting/mail":"iphone::mail::redirect","iphone/troubleshooting/phone":"iphone::phone::redirect","ipodtouch/assistant":"ipod::ipod touch","ipodtouch/assistant/application":"ipod::ipod touch::application","ipodtouch/assistant/ipodtouch":"ipod::ipod touch","ipodtouch/assistant/itunes":"ipod::ipod touch::itunes","ipodtouch/assistant/receivemail":"ipod::ipod touch::mail","ipodtouch/assistant/restore":"ipod::ipod touch::restore","ipodtouch/assistant/sendmail":"ipod::ipod touch::mail","ipodtouch/assistant/wifi":"ipod::ipod touch::wifi","ipodtouch/troubleshooting":"ipod::ipod touch","ipodtouch/troubleshooting/ipodtouch":"ipod::ipod touch","ipodtouch/troubleshooting/itunes":"ipod::ipod touch::itunes","ipodtouch/troubleshooting/mail":"ipod::ipod touch::mail","ipod/five_rs":"ipod","ipod/five_rs/classic":"ipod::ipod classic","ipod/five_rs/ipod":"ipod::ipod family","ipod/five_rs/ipod5gen":"ipod::ipod 5th gen","ipod/five_rs/mini":"ipod::ipod mini","ipod/five_rs/nano":"ipod::ipod nano","ipod/five_rs/nano2gen":"ipod::ipod nano 2nd gen","ipod/five_rs/nano3gen":"ipod::ipod nano 3rd gen","ipod/five_rs/nano4gen":"ipod::ipod nano 4th gen","ipod/five_rs/photo":"ipod::ipod photo","ipod/five_rs/shuffle":"ipod::ipod shuffle","ipod/five_rs/shuffle2gen":"ipod::ipod shuffle 2nd gen","ipod/five_rs/shuffle3gen":"ipod::ipod shuffle 3rd gen","ipod/five_rs/wheel":"ipod::ipod w/click wheel"},faq:{"airport/service":"airport::service","emac/service":"emac::service","ibook/service":"ibook::service","imac/service":"imac::service","ipad/service":"ipad::service","ipad/service/battery":"ipad::battery replacement","ipad/service/exchange":"ipad::advance replacement","ipad/service/faq":"ipad::service faq","iphone/service/battery":"iphone::battery replacement","iphone/service/exchange":"iphone::replacement service","iphone/service/faq":"iphone::service","ipod/service/faq":"ipod::service","ipod/service/battery":"ipod::battery replacement","ipodhifi/service/faq":"ipod::ipod hi-fi::service","macbook/service":"macbook::service","macbookair/service":"macbook air::service","macbookair/service/battery":"macbook air::battery replacement","macbookpro/service":"macbook pro::service","macbookpro/service/battery":"macbook pro::battery replacement","macmini/service":"mac mini::service","nikeplus/service/faq":"ipod::nike plus::service","powerbook/service":"powerbook g4::service","powerbookg3/service":"powerbook g3::service","powermac/service":"power mac::service","xserve/service":"xserve::service"},qp:{"ac-wallplug-adapter":"wallplug-adapter-exchange","ac-wallplug-adapter/other_countries.html":"wallplug-adapter-exchange::other countries","beats-pillxl-recall":"recall program::beats pill xl","beats-pillxl-recall/request":"recall program::beats pill xl::form","beats-pillxl-recall/request/thankyou":"recall program::beats pill xl::form::thankyou","beats-pillxl-recall/other_countries.html":"recall program::beats pill xl::other countries","beats-pillxl-recall/request/other_countries.html":"recall program::beats pill xl::form::other countries","imac-harddrive":"replacementprogram::imac 1tb seagate hard drive replacement::program page","imac-harddrive-3tb":"imac 3tb hard drive replacement program",ipodnano_replacement:"ipod nano 1st generation replacement","iphone5-battery":"iphone 5 battery replacement program","iphone5-battery/country":"iphone 5 battery replacement program::country selector","iphone5-battery/locate":"iphone 5 battery replacement program::locator","iphone5-battery/other_countries.html":"iphone 5 battery replacement program::other countries","iphone5-sleepwakebutton":"iphone 5 sleep wake button replacement program","iphone5-sleepwakebutton/country":"iphone 5 sleep wake button replacement program::country selector","iphone5-sleepwakebutton/locate":"iphone 5 sleep wake button replacement program::locator","iphone5-sleepwakebutton/other_countries.html":"iphone 5 sleep wake button replacement program::other countries","iphone6plus-isightcamera":"iphone 6 plus isight camera replacement","iphone6plus-isightcamera/country":"iphone 6 plus isight camera replacement::country selector","iphone6plus-isightcamera/locate":"iphone 6 plus isight camera replacement::locator","iphone6plus-isightcamera/other_countries.html":"iphone 6 plus isight camera replacement::other countries","macbook-bottomcase":"repair extension::macbook bottom case replacement::program page","macbookair-flashdrive":"replacement program:: macbookair flash drive::program page","macbookpro-videoissues":"repair extension::macbookpro for video issues","usbadapter/exchangeprogram":"adapter exchange::iphone usb adapter","usbadapter-european":"5w european usb power adapter exchange","usbadapter-european/country":"5w european usb power adapter exchange::country selector","usbadapter-european/locate":"5w european usb power adapter exchange::locator","usbadapter-takeback":"adapter takeback::usb power adapter::program page","usbadapter-takeback/other_countries.html":"adapter takeback::usb power adapter::other countries page","usbc-chargecable":"usb-c charge cable replacement program",validation:"mountain lion::imessage registration"},price:{"ipod/service/price":"ipod::repair + battery replacement"},survey:{"survey/applecareweb":"applecareweb","survey/accs":"","survey/accs/thankyou":""},family:{finalcutstudio:"final cut studio",ilife:"ilife",ipod:"ipod",iwork:"iwork",logicstudio:"logic studio",mac:"mac","pro-apps":"pro applications","server-enterprise":"server enterprise",software:"software"},version:"20160615"},SCReporting.init();
