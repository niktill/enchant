(this.webpackJsonpenchant=this.webpackJsonpenchant||[]).push([[0],{266:function(e,t,l){e.exports=l(461)},461:function(e,t,l){"use strict";l.r(t);var a=l(0),n=l.n(a),r=l(42),s=l.n(r),o=l(16),i=l(57),p=l(235),c=l(22),u=l.n(c),m=l(30),h=l(18),d=l(19),S=l(21),b=l(20),E=l(480),v=l(476),f=l(462),y=l(45),g=l(483),k=l(484),O=l(481),L=l(479),C=l(474),_=l(33),A=l(31),j=l(32),w=l.n(j),N=w.a.create({baseURL:"https://api.open5e.com",timeout:1e4}),R=function(e){return function(){var t=Object(m.a)(u.a.mark((function t(l,a){var n,r,s,o,i,p,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a(),r=n.currentUser,s=n.spellbookSpells,o=n.dailySpells,!r){t.next=16;break}return t.prev=2,p=(i=s).some((function(t){return t.slug===e.slug}))?i.filter((function(t){return t.slug!==e.slug})):[].concat(Object(_.a)(i),[e]),t.next=7,w.a.post("/api/current_user/spellbookspells",{spellBookSpells:p.map((function(e){return e.slug}))});case 7:if(!o.some((function(t){return t.slug===e.slug}))){t.next=11;break}return c=o.filter((function(t){return t.slug!==e.slug})),t.next=11,w.a.post("/api/current_user/dailyspells",{dailySpells:c.map((function(e){return e.slug}))});case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(2),l({type:"ACTIVATE_ERROR_MESSAGE",payload:{type:"Error in selecting spell",message:"Could not save spell select to your account."}});case 16:l({type:"ALL_SPELLS_SPELL_SELECT",payload:e});case 17:case"end":return t.stop()}}),t,null,[[2,13]])})));return function(e,l){return t.apply(this,arguments)}}()},I=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"renderClassSpellFilterButtons",value:function(){var e=this;return this.props.apiData.classes.map((function(t){return n.a.createElement(f.a,{key:t.slug,active:e.props.selectedFilters[e.props.tabName].classes.includes(t.name),onClick:function(){return e.props.selectSpellFilterClass(t.name,e.props.tabName)}},t.name)}))}},{key:"render",value:function(){return n.a.createElement(v.a,{hoverable:!0,on:["click"],content:n.a.createElement(f.a.Group,{className:"stackable"},this.renderClassSpellFilterButtons()),trigger:n.a.createElement(f.a,{style:{marginLeft:"5px"}},"Filter")})}}]),l}(a.Component),T=Object(o.b)((function(e){return{apiData:e.apiData,selectedFilters:e.selectedFilters}}),{selectSpellFilterClass:function(e,t){return{type:"SPELL_FILTER_CLASS_SELECT",payload:{spellFilterClassName:e,tabName:t}}}})(I),x=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"renderClassSpellSortButtons",value:function(){var e=this;return[{name:"Level",slug:"level_int"},{name:"School",slug:"school"}].map((function(t){return n.a.createElement(f.a,{key:t.slug+e.props.tabName+"sorter",active:e.props.selectedSorter[e.props.tabName]===t.slug,onClick:function(){return e.props.selectSortSpellLevel(t.slug,e.props.tabName)}},t.name)}))}},{key:"render",value:function(){var e=this;return n.a.createElement(v.a,{hoverable:!0,on:["click"],content:n.a.createElement(f.a.Group,{className:"stackable"},this.renderClassSpellSortButtons(),n.a.createElement(f.a,{icon:!0,active:"alpha-down"===this.props.selectedSorter[this.props.tabName],onClick:function(){return e.props.selectSortSpellLevel("alpha-down",e.props.tabName)}},n.a.createElement(y.a,{name:"sort alphabet down"})),n.a.createElement(f.a,{icon:!0,active:"alpha-up"===this.props.selectedSorter[this.props.tabName],onClick:function(){return e.props.selectSortSpellLevel("alpha-up",e.props.tabName)}},n.a.createElement(y.a,{name:"sort alphabet up"}))),trigger:n.a.createElement(f.a,null,"Sort")})}}]),l}(a.Component),M=Object(o.b)((function(e){return{apiData:e.apiData,selectedSorter:e.selectedSorter}}),{selectSortSpellLevel:function(e,t){return{type:"SORT_SPELLS_SELECT",payload:{sorterName:e,tabName:t}}}})(x),P=l(477),F=l(471),D=l(482),B=l(472),H=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"render",value:function(){return n.a.createElement("p",null,n.a.createElement("br",null),n.a.createElement("b",null,this.props.spell.level," ",this.props.spell.school),n.a.createElement("br",null),n.a.createElement("b",null,"Casting Time:")," ",this.props.spell.casting_time,n.a.createElement("br",null),n.a.createElement("b",null,"Range:")," ",this.props.spell.range,n.a.createElement("br",null),n.a.createElement("b",null,"Components:")," ",this.props.spell.components,n.a.createElement("br",null),n.a.createElement("b",null,"Duration:")," ",this.props.spell.duration,n.a.createElement("br",null),n.a.createElement("br",null),this.props.spell.desc,n.a.createElement("br",null),this.props.spell.higher_level)}}]),l}(a.Component),U=Object(o.b)((function(e){return{apiData:e.apiData}}),{})(H),z=l(475),G=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){var e;Object(h.a)(this,l);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))).state={modalOpen:!1},e}return Object(d.a)(l,[{key:"setOpen",value:function(e){this.setState({modalOpen:e})}},{key:"castSpell",value:function(e){0!==e&&this.props.spellSlots[e-1][0]>0&&this.props.castSpell(e)}},{key:"render",value:function(){var e=this;return n.a.createElement(z.a,{closeIcon:!0,onClose:function(){return e.setOpen(!1)},onOpen:function(){return e.setOpen(!0)},open:this.state.modalOpen,trigger:n.a.createElement(P.a.Item,null,n.a.createElement(v.a,{wide:"very",basic:!0,size:"small",header:this.props.spell.name,disabled:this.props.isMobile,content:n.a.createElement(U,{spell:this.props.spell}),trigger:n.a.createElement("p",{className:"dailySpellName"},this.props.spell.name)}))},n.a.createElement(z.a.Header,null,this.props.spell.name),n.a.createElement(z.a.Content,null,n.a.createElement(z.a.Description,null,n.a.createElement(U,{spell:this.props.spell}))),n.a.createElement(z.a.Actions,null,0!==this.props.spell.level_int?n.a.createElement("p",{key:"-cast-message",size:"small",style:{display:"inline-block",color:0===this.props.spellSlots[this.props.spell.level_int-1][0]?"red":""}},0===this.props.spellSlots[this.props.spell.level_int-1][0]?"You have no available "+this.props.spell.level+" spell slots!":this.props.spell.level+" spell slots available: "+this.props.spellSlots[this.props.spell.level_int-1][0]):null,n.a.createElement(f.a,{key:"cast-spell",content:"Cast Spell",labelPosition:"right",icon:"magic",onClick:function(){e.setOpen(!1),e.castSpell(e.props.spell.level_int)},positive:!0,disabled:0!==this.props.spell.level_int&&this.props.spellSlots[this.props.spell.level_int-1][0]<=0})))}}]),l}(a.Component),W=Object(o.b)((function(e){return{spellSlots:e.spellSlots}}),{castSpell:function(e){return function(){var t=Object(m.a)(u.a.mark((function t(l,a){var n,r,s,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a(),r=n.currentUser,s=n.spellSlots,!r){t.next=11;break}return t.prev=2,o=s.map((function(t,l){return l+1===e?[t[0]-1,t[1]]:t})),t.next=6,w.a.post("/api/current_user/spellslots",{spellSlots:o});case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),l({type:"ACTIVATE_ERROR_MESSAGE",payload:{type:"Error in casting spell",message:"Could not save spell cast to your account."}});case 11:l({type:"CAST_SPELL",payload:{spellLevel:e}});case 12:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e,l){return t.apply(this,arguments)}}()}})(G),V=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"render",value:function(){var e=this,t=this.props.spellListMonitors.some((function(t){return t.slug===e.props.spell.slug}));return n.a.createElement(z.a,{closeIcon:!0,trigger:n.a.createElement(P.a.Item,null,this.props.spell.name,t?n.a.createElement(y.a,{className:"mobile-spell-check-icon",name:"check"}):null),header:this.props.spell.name,content:n.a.createElement("div",{className:"content"},n.a.createElement(U,{spell:this.props.spell})),actions:[{key:"select-spell",icon:t?"remove":"add",content:t?"Remove Spell":"Add Spell",labelPosition:"right",onClick:function(){return e.props.selectSpellAction(e.props.spell)},positive:!t,negative:t}]})}}]),l}(a.Component),J=Object(o.b)((function(e){return{spellbookSpells:e.spellbookSpells,dailySpells:e.dailySpells}}),{})(V),Y=!1;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(Y=!0);var K=Y,X=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"getFilteredSpells",value:function(){var e=this;return this.props.spells.filter((function(t){return e.props.selectedFilters[e.props.tabName].classes.some((function(e){return t.dnd_class.includes(e)}))}))}},{key:"sortSpells",value:function(e,t){var l="alpha-up"===e;e="alpha-down"===e||"alpha-up"===e?"slug":e;var a=t.sort((function(t,l){return t[e]<l[e]?-1:t[e]>l[e]?1:0}));return l?a.reverse():a}},{key:"renderSpellListItem",value:function(e){var t=this;return"dailySpells"===this.props.tabName?n.a.createElement(W,{isMobile:K,key:this.props.tabName+"-spells-"+e.slug,spell:e}):K?n.a.createElement(J,{key:this.props.tabName+"-spells-"+e.slug,spellListMonitors:this.props.spellListMonitors,selectSpellAction:this.props.selectSpellAction,spell:e}):n.a.createElement(P.a.Item,{key:this.props.tabName+"-spells-"+e.slug},n.a.createElement(v.a,{disabled:K,on:"hover",wide:"very",basic:!0,size:"small",header:e.name,content:n.a.createElement(U,{spell:e}),trigger:n.a.createElement(F.a,{label:e.name,checked:this.props.spellListMonitors.some((function(t){return t.slug===e.slug})),onClick:function(){return t.props.selectSpellAction(e)}})}))}},{key:"renderAllSpellsIntoColumns",value:function(){var e=this,t=this.props.selectedFilters[this.props.tabName].classes.length?this.getFilteredSpells():this.props.spells,l=t.length,a=this.props.selectedSorter[this.props.tabName];t=a.length?this.sortSpells(a,t):t;var r,s="level_int"===a||"school"===a;if(l>0){for(var o=Math.ceil(l/60),i=[],p=function(r){var o=0+60*(r-1),p=l<=60*r?l:60*r-1;i.push(n.a.createElement(D.a.Column,{key:r},n.a.createElement(P.a,{selection:"dailySpells"===e.props.tabName||K},t.slice(o,p).map((function(l,r){var i=o+r;return!s||0!==i&&t[i-1][a]===t[i][a]?e.renderSpellListItem(l):[n.a.createElement("h3",{className:"spellListHeader",key:e.tabName+"-"+a+"-header"},"level_int"===a?t[i].level:t[i][a]),e.renderSpellListItem(l)]})))))},c=1;c<o+1;c++)p(c);return n.a.createElement(D.a,{className:"spellListGrid",columns:o,stackable:!0,doubling:!0},i)}return r=this.props.spells.length&&this.props.selectedFilters[this.props.tabName].classes.length?"There are no spells defined by the selected filters.":"dailySpells"===this.props.tabName?"You have not prepared any spells! Please select your prepared spells from the Spell Book tab.":"This spell book is empty! Select spells in the All Spells tab to add to this spell book.",n.a.createElement(B.a,{textAlign:"center"},n.a.createElement(L.a,{compact:!0},n.a.createElement(L.a.Header,null,"No Spells Available"),n.a.createElement("p",null,r)))}},{key:"render",value:function(){return n.a.createElement(g.a,null,this.renderAllSpellsIntoColumns())}}]),l}(a.Component),q=Object(o.b)((function(e){return{spellbookSpells:e.spellbookSpells,selectedFilters:e.selectedFilters,selectedSorter:e.selectedSorter}}),{selectAllSpellsSpell:R})(X),Q=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"tabContent"},n.a.createElement(T,{tabName:"spellBookSpells"}),n.a.createElement(M,{tabName:"spellBookSpells"}),this.props.showHeader?n.a.createElement("h3",{style:{textAlign:"center"}},n.a.createElement(y.a,{name:"book"})," Spell Book "):null,n.a.createElement(q,{tabName:"spellBookSpells",spells:this.props.spellbookSpells,spellListMonitors:this.props.dailySpells,selectSpellAction:function(t){return e.props.selectSpellbookSpell(t)}}))}}]),l}(a.Component),Z=Object(o.b)((function(e){return{spellbookSpells:e.spellbookSpells,dailySpells:e.dailySpells}}),{selectSpellbookSpell:function(e){return function(){var t=Object(m.a)(u.a.mark((function t(l,a){var n,r,s,o,i;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a(),r=n.currentUser,s=n.dailySpells,!r){t.next=12;break}return t.prev=2,i=(o=s).some((function(t){return t.slug===e.slug}))?o.filter((function(t){return t.slug!==e.slug})):[].concat(Object(_.a)(o),[e]),t.next=7,w.a.post("/api/current_user/dailyspells",{dailySpells:i.map((function(e){return e.slug}))});case 7:t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),l({type:"ACTIVATE_ERROR_MESSAGE",payload:{type:"Error in selecting spellbook spell",message:"Could not save spellbook spell selection to your account."}});case 12:l({type:"SPELLBOOK_SPELL_SELECT",payload:e});case 13:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e,l){return t.apply(this,arguments)}}()}})(Q),$=l(478),ee=l(473),te=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){var e;return Object(h.a)(this,l),(e=t.call(this)).spellSlotHeaders=["1st Level","2nd Level","3rd Level","4th-Level","5th Level","6th Level","7th Level","8th Level","9th Level"],e}return Object(d.a)(l,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"spellSlotsTable",style:{marginBottom:"10px"}},this.props.mobileTable?n.a.createElement($.a,{unstackable:!0,definition:!0,celled:!0,style:{marginBottom:"20px"}},n.a.createElement($.a.Header,{fullWidth:!0},n.a.createElement($.a.Row,null,n.a.createElement($.a.HeaderCell,{colSpan:"2"},n.a.createElement("h3",{style:{display:"inline"}},"Spell Slots"),n.a.createElement(f.a,{size:"small",content:"Refill Spell Slots",style:{marginLeft:"10px"},onClick:function(){return e.props.refillSpellSlots()}})))),n.a.createElement($.a.Body,{className:"spellSlotNumbers"},this.props.spellSlots.map((function(t,l){return n.a.createElement($.a.Row,{key:e.spellSlotHeaders[l]},n.a.createElement($.a.Cell,null,e.spellSlotHeaders[l]),n.a.createElement($.a.Cell,{key:l},t[0]+" / ",n.a.createElement(ee.a,{size:"small",className:"setSpellSlotMax",type:"number",value:t[1].toString(),onChange:function(t,a){return e.props.setMaxSpellSlots(l+1,parseInt(a.value))}})))})))):n.a.createElement($.a,{celled:!0,style:{marginBottom:"20px"}},n.a.createElement($.a.Header,null,n.a.createElement($.a.Row,null,n.a.createElement($.a.HeaderCell,{colSpan:"9"},n.a.createElement("h3",{style:{display:"inline"}},"Spell Slots"),n.a.createElement(f.a,{size:"small",content:"Refill Spell Slots",style:{marginLeft:"10px"},onClick:function(){return e.props.refillSpellSlots()}})))),n.a.createElement($.a.Header,null,n.a.createElement($.a.Row,null,this.spellSlotHeaders.map((function(e){return n.a.createElement($.a.HeaderCell,{key:e[0]},e)})))),n.a.createElement($.a.Body,{className:"spellSlotNumbers"},n.a.createElement($.a.Row,null,this.props.spellSlots.map((function(t,l){return n.a.createElement($.a.Cell,{key:l},t[0]+" / ",n.a.createElement(ee.a,{size:"small",className:"setSpellSlotMax",type:"number",value:t[1].toString(),onChange:function(t,a){return e.props.setMaxSpellSlots(l+1,parseInt(a.value))}}))}))))))}}]),l}(a.Component),le=Object(o.b)((function(e){return{spellSlots:e.spellSlots}}),{setMaxSpellSlots:function(e,t){return function(){var l=Object(m.a)(u.a.mark((function l(a,n){var r,s,o,i,p,c;return u.a.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:if((!t||t<0)&&(t=0),r=n(),s=r.currentUser,o=r.spellSlots,!s){l.next=14;break}return l.prev=3,p=(i=o)[e-1][0]>t?t:o[e-1][0],c=i.map((function(l,a){return a+1===e?[p,t]:l})),l.next=9,w.a.post("/api/current_user/spellslots",{spellSlots:c});case 9:l.next=14;break;case 11:l.prev=11,l.t0=l.catch(3),a({type:"ACTIVATE_ERROR_MESSAGE",payload:{type:"Error in setting spell slots",message:"Could not save spell slots change to your account."}});case 14:a({type:"SET_MAX_SPELL_SLOTS",payload:{spellLevel:e,maxSpellSlots:t}});case 15:case"end":return l.stop()}}),l,null,[[3,11]])})));return function(e,t){return l.apply(this,arguments)}}()},refillSpellSlots:function(){return function(){var e=Object(m.a)(u.a.mark((function e(t,l){var a,n,r,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=l(),n=a.currentUser,r=a.spellSlots,!n){e.next=11;break}return e.prev=2,s=r.map((function(e){return[e[1],e[1]]})),e.next=6,w.a.post("/api/current_user/spellslots",{spellSlots:s});case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),t({type:"ACTIVATE_ERROR_MESSAGE",payload:{type:"Error in refilling spell slots",message:"Could not save spell slot refill to your account."}});case 11:t({type:"REFILL_SPELL_SLOTS"});case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,l){return e.apply(this,arguments)}}()}})(te),ae=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"render",value:function(){return n.a.createElement("div",{className:"tabContent dailySpells"},n.a.createElement(le,{mobileTable:this.props.windowWidth<=767}),n.a.createElement(T,{tabName:"dailySpells"}),n.a.createElement(M,{tabName:"dailySpells"}),n.a.createElement("h3",{style:{textAlign:"center"}},n.a.createElement(y.a,{name:"magic"})," Prepared Spells"),n.a.createElement(q,{tabName:"dailySpells",spells:this.props.dailySpells}))}}]),l}(a.Component),ne=Object(o.b)((function(e){return{dailySpells:e.dailySpells}}))(ae),re=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){return Object(h.a)(this,l),t.apply(this,arguments)}return Object(d.a)(l,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"tabContent"},n.a.createElement(T,{tabName:"allSpells"}),n.a.createElement(M,{tabName:"allSpells"}),this.props.showHeader?n.a.createElement("h3",{style:{textAlign:"center"}},n.a.createElement(y.a,{name:"list"})," All Spells "):null,n.a.createElement(q,{tabName:"allSpells",spells:this.props.apiData.spells,spellListMonitors:this.props.spellbookSpells,selectSpellAction:function(t){return e.props.selectAllSpellsSpell(t)}}))}}]),l}(a.Component),se=Object(o.b)((function(e){return{apiData:e.apiData,spellbookSpells:e.spellbookSpells,selectedFilters:e.selectedFilters}}),{selectAllSpellsSpell:R})(re),oe=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){var e;Object(h.a)(this,l);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))).handleDismiss=function(){e.props.closeErrorMessage()},e}return Object(d.a)(l,[{key:"render",value:function(){var e=this;return this.props.errorMessage.active?n.a.createElement("div",{className:"error-message-container popout",style:{textAlign:"center"}},n.a.createElement(L.a,{onDismiss:function(){return e.handleDismiss()},negative:!0},n.a.createElement(L.a.Header,null,this.props.errorMessage.type),n.a.createElement("p",null,this.props.errorMessage.message))):null}}]),l}(a.Component),ie=Object(o.b)((function(e){return{errorMessage:e.errorMessage}}),{closeErrorMessage:function(){return{type:"CLOSE_ERROR_MESSAGE"}}})(oe),pe=function(e){Object(S.a)(l,e);var t=Object(b.a)(l);function l(){var e;Object(h.a)(this,l);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))).state={activeItem:"Prepared Spells",windowWidth:document.documentElement.clientWidth,mobileSidebarVisible:!1},e.handleItemClick=function(t,l){var a=l.name;e.setState({activeItem:a,mobileSidebarVisible:!1})},e}return Object(d.a)(l,[{key:"componentDidMount",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.props.fetchAPIData();case 3:return e.next=5,this.props.checkLogInStatus();case 5:return e.next=7,this.props.getCurrentUser();case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:window.addEventListener("resize",(function(){t.setState({windowWidth:document.documentElement.clientWidth})})),this.props.appReadytoRender();case 14:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderActiveTab",value:function(){return"Prepared Spells"===this.state.activeItem?n.a.createElement(ne,{windowWidth:this.state.windowWidth}):"Spell Book"===this.state.activeItem?n.a.createElement(Z,{showHeader:this.state.windowWidth<=767}):"All Spells"===this.state.activeItem?n.a.createElement(se,{showHeader:this.state.windowWidth<=767}):n.a.createElement(ne,{windowWidth:this.state.windowWidth})}},{key:"renderLoginMenuItem",value:function(){return this.props.currentUser?n.a.createElement(E.a.Item,{name:"Log Out",icon:"log out",href:"/api/logout"}):n.a.createElement(v.a,{on:"click",position:"bottom right",trigger:n.a.createElement(E.a.Item,{icon:"user circle",content:"Log In",disabled:!this.props.loginStatus}),content:n.a.createElement("div",{className:"login-container"},n.a.createElement(f.a,{style:{marginTop:"10px"},color:"red",href:"/auth/google"},n.a.createElement(y.a,{name:"google"}),"Sign in with Google"),n.a.createElement(f.a,{style:{marginTop:"10px"},color:"blue",href:"/auth/facebook"},n.a.createElement(y.a,{name:"facebook"}),"Sign in with Facebook"))})}},{key:"renderDesktopApp",value:function(){var e=this.state.activeItem;return n.a.createElement("div",null,n.a.createElement(E.a,{size:"large",attached:"top",tabular:!0},n.a.createElement(E.a.Item,{name:"Prepared Spells",icon:"magic",active:"Prepared Spells"===e,onClick:this.handleItemClick}),n.a.createElement(E.a.Item,{name:"Spell Book",icon:"book",active:"Spell Book"===e,onClick:this.handleItemClick}),n.a.createElement(E.a.Item,{name:"All Spells",icon:"list",active:"All Spells"===e,onClick:this.handleItemClick}),n.a.createElement(E.a.Item,{style:{marginLeft:"auto",marginRight:"auto"}},n.a.createElement("img",{alt:"wizard hat",src:"wizard-hat.png",style:{height:"30px",width:"30px",marginRight:"10px"}}),n.a.createElement("h3",{style:{margin:"0"}},"Enchant")),n.a.createElement(E.a.Menu,{position:"right"},n.a.createElement(E.a.Item,{icon:"help circle",href:"https://github.com/niktill/enchant",target:"_blank",link:!0}),this.renderLoginMenuItem())),n.a.createElement(g.a,{attached:"bottom"},this.renderActiveTab()))}},{key:"renderMobileApp",value:function(){var e=this,t=this.state.activeItem;return n.a.createElement(k.a.Pushable,{as:g.a,style:{marginTop:"0"}},n.a.createElement(k.a,{as:E.a,animation:"overlay",onHide:function(){return e.setState({mobileSidebarVisible:!1})},vertical:!0,visible:this.state.mobileSidebarVisible},n.a.createElement(E.a.Item,{name:"Prepared Spells",icon:"magic",active:"Prepared Spells"===t,onClick:this.handleItemClick}),n.a.createElement(E.a.Item,{name:"Spell Book",icon:"book",active:"Spell Book"===t,onClick:this.handleItemClick}),n.a.createElement(E.a.Item,{icon:"list",name:"All Spells",active:"All Spells"===t,onClick:this.handleItemClick}),n.a.createElement(E.a.Item,{content:"Help",icon:"help circle",href:"https://github.com/niktill/enchant",target:"_blank",link:!0})),n.a.createElement(k.a.Pusher,{dimmed:this.state.mobileSidebarVisible},n.a.createElement(E.a,{className:"mobileNav",borderless:!0},n.a.createElement(E.a.Item,{position:"left"},n.a.createElement(y.a,{size:"large",name:"bars",onClick:function(){return e.setState({mobileSidebarVisible:!0})}})),n.a.createElement(E.a.Item,{style:{marginLeft:"auto",marginRight:"auto"}},n.a.createElement("img",{alt:"wizard hat",src:"wizard-hat.png",style:{height:"30px",width:"30px",marginRight:"10px"}}),n.a.createElement("h3",{style:{margin:"0"}},"Enchant")),n.a.createElement(E.a.Menu,{position:"right"},this.renderLoginMenuItem())),this.renderActiveTab()))}},{key:"renderAppOnFetchComplete",value:function(){return this.props.appReady&&!this.props.apiData.error?this.state.windowWidth<=767?this.renderMobileApp():this.renderDesktopApp():null}},{key:"render",value:function(){return n.a.createElement(O.a.Dimmable,null,n.a.createElement(O.a,{active:!this.props.appReady||this.props.apiData.error},n.a.createElement("div",{className:"popout"},n.a.createElement("img",{alt:"wizard hat",className:"wizard-hat-img",src:"/wizard-hat.png",style:{position:"relative",bottom:this.props.apiData.error?"0":"120px"}}),this.props.apiData.error?n.a.createElement(L.a,{size:"large",negative:!0},n.a.createElement(L.a.Header,null,"Error in loading Enchant"),n.a.createElement("p",null,"We had issues preparing our spells. Please refresh page to try again.")):n.a.createElement(C.a,{style:{whiteSpace:"nowrap"},size:"massive",content:"Loading Enchant"}))),this.renderAppOnFetchComplete(),n.a.createElement(ie,{className:"enchant-error-message"}))}}]),l}(a.Component),ce=Object(o.b)((function(e){return{apiData:e.apiData,currentUser:e.currentUser,errorMessage:e.errorMessage,loginStatus:e.loginStatus,appReady:e.appReady}}),{fetchAPIData:function(){return function(){var e=Object(m.a)(u.a.mark((function e(t){var l,a,n,r,s,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l=["Barbarian","Fighter","Monk","Rogue"],a={spells:[],classes:[]},n=1,r=7,e.prev=4;case 6:if(!(n<r+1)){e.next=14;break}return e.next=9,N.get("/spells/?page="+n.toString());case 9:200===(s=e.sent).status&&(a.spells=[].concat(Object(_.a)(a.spells),Object(_.a)(s.data.results)));case 11:n++,e.next=6;break;case 14:return e.next=16,N.get("/classes");case 16:return 200===(o=e.sent).status&&(a.classes=o.data.results.filter((function(e){return!l.includes(e.name)}))),t({type:"API_DATA_FETCHED",payload:a}),e.abrupt("return",!0);case 22:throw e.prev=22,e.t0=e.catch(4),console.log(e.t0),t({type:"API_DATA_ERROR"}),e.t0;case 27:case"end":return e.stop()}}),e,null,[[4,22]])})));return function(t){return e.apply(this,arguments)}}()},getCurrentUser:function(){return function(){var e=Object(m.a)(u.a.mark((function e(t,l){var a,n,r,s,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=l(),n=a.apiData,e.next=4,w.a.get("/api/current_user");case 4:return r=e.sent,s=n.spells.filter((function(e){return r.data.spellBookSpells.includes(e.slug)})),o=n.spells.filter((function(e){return r.data.dailySpells.includes(e.slug)})),t({type:"FETCH_USER",payload:Object(A.a)(Object(A.a)({},r.data),{},{spellBookSpells:s,dailySpells:o})}),e.abrupt("return",!0);case 11:return e.prev=11,e.t0=e.catch(0),t({type:"FETCH_USER",payload:""}),e.abrupt("return",!1);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,l){return e.apply(this,arguments)}}()},checkLogInStatus:function(){return function(){var e=Object(m.a)(u.a.mark((function e(t,l){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/status");case 3:return t({type:"LOG_IN_STATUS_SUCCESS"}),e.abrupt("return",!0);case 7:throw e.prev=7,e.t0=e.catch(0),t({type:"LOG_IN_STATUS_FAIL"}),t({type:"ACTIVATE_ERROR_MESSAGE",payload:{type:"Log in currently unavailable",message:"We are currently facing an issue with our log in service. Sorry!"}}),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,l){return e.apply(this,arguments)}}()},appReadytoRender:function(){return{type:"APP_READY"}}})(pe),ue=l(105),me={dailySpells:{classes:[],level:[]},spellBookSpells:{classes:[],level:[]},allSpells:{classes:[],level:[]}},he={dailySpells:"level_int",spellBookSpells:"level_int",allSpells:"level_int"},de=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],Se=Object(i.c)({apiData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return"API_DATA_FETCHED"===t.type?(e=t.payload).complete=!0:"API_DATA_ERROR"===t.type&&(e=Object(A.a)(Object(A.a)({},e),{},{error:!0})),e},spellbookSpells:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;if("FETCH_USER"===t.type){if(t.payload.spellBookSpells)return Object(_.a)(t.payload.spellBookSpells)}else if("ALL_SPELLS_SPELL_SELECT"===t.type)return e.some((function(e){return e.slug===t.payload.slug}))?e.filter((function(e){return e.slug!==t.payload.slug})):[].concat(Object(_.a)(e),[t.payload]);return e},dailySpells:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;if("FETCH_USER"===t.type){if(t.payload.dailySpells)return Object(_.a)(t.payload.dailySpells)}else{if("SPELLBOOK_SPELL_SELECT"===t.type)return e.some((function(e){return e.slug===t.payload.slug}))?e.filter((function(e){return e.slug!==t.payload.slug})):[].concat(Object(_.a)(e),[t.payload]);if("ALL_SPELLS_SPELL_SELECT"===t.type)return e.filter((function(e){return e.slug!==t.payload.slug}))}return e},selectedFilters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0;if("SPELL_FILTER_CLASS_SELECT"===t.type){var l=JSON.parse(JSON.stringify(e)),a=l[t.payload.tabName].classes;return a.includes(t.payload.spellFilterClassName)?(l[t.payload.tabName].classes=a.filter((function(e){return e!==t.payload.spellFilterClassName})),l):(l[t.payload.tabName].classes=[].concat(Object(_.a)(a),[t.payload.spellFilterClassName]),l)}return e},selectedSorter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;return"SORT_SPELLS_SELECT"===t.type?Object(A.a)(Object(A.a)({},e),{},Object(ue.a)({},t.payload.tabName,t.payload.sorterName)):e},spellSlots:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;if("FETCH_USER"===t.type){if(t.payload.spellSlots)return t.payload.spellSlots}else{if("REFILL_SPELL_SLOTS"===t.type)return e.map((function(e){return[e[1],e[1]]}));if("CAST_SPELL"===t.type)return e.map((function(e,l){return l+1===t.payload.spellLevel?[e[0]-1,e[1]]:e}));if("SET_MAX_SPELL_SLOTS"===t.type){var l=e[t.payload.spellLevel-1][0]>t.payload.maxSpellSlots?t.payload.maxSpellSlots:e[t.payload.spellLevel-1][0];return e.map((function(e,a){return a+1===t.payload.spellLevel?[l,t.payload.maxSpellSlots]:e}))}}return e},currentUser:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"FETCH_USER"===t.type?t.payload||!1:e},errorMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return"ACTIVATE_ERROR_MESSAGE"===t.type?{type:t.payload.type,message:t.payload.message,active:!0}:"CLOSE_ERROR_MESSAGE"===t.type?Object(A.a)(Object(A.a)({},e),{},{active:!1}):Object(A.a)({},e)},loginStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return"LOG_IN_STATUS_SUCCESS"===t.type||"LOG_IN_STATUS_FAIL"!==t.type&&e},appReady:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;return"APP_READY"===t.type||e}}),be=Object(i.d)(Se,Object(i.a)(p.a));s.a.render(n.a.createElement(o.a,{store:be},n.a.createElement(ce,null)),document.getElementById("root"))}},[[266,1,2]]]);
//# sourceMappingURL=main.d642197d.chunk.js.map