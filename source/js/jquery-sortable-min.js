!function(e,w,j){function s(a,b){var c=Math.max(0,a[0]-b[0],b[0]-a[1]),d=Math.max(0,a[2]-b[1],b[1]-a[3]);return c+d}function t(a,b,c){for(var d=a.length,c=c?"offset":"position";d--;){var o=a[d].el?a[d].el:e(a[d]),g=o[c]();b[d]=[g.left,g.left+o.outerWidth(!0),g.top,g.top+o.outerHeight(!0)]}}function k(a,b){var c=b.offset();return{left:a.left-c.left,top:a.top-c.top}}function u(a,b,c){for(var b=[b.left,b.top],c=c&&[c.left,c.top],d,e=a.length,g=[];e--;)d=a[e],g[e]=[e,s(d,b),c&&s(d,c)];g=g.sort(function(a,
b){return a[1]-b[1]||a[2]-b[2]||a[0]-b[0]});return g[0]}function l(a,b,c,d){a=a.find(b);for(b=a.length;b--;){var e=a.eq(b).data(h);if(e)e[c](d)}}function m(a){this.options=e.extend({},n,a);this.containers=[];this.childGroups=[];this.scrollProxy=e.proxy(this.scrolled,this);this.dragProxy=e.proxy(this.drag,this);this.dropProxy=e.proxy(this.drop,this);this.options.parentGroup?this.options.parentGroup.childGroups.push(this):this.placeholder=e(this.options.placeholder)}function p(a,b){this.el=a;this.childGroups=
[];this.floatRight=!1;this.dragInitProxy=e.proxy(this.dragInit,this);this.options=e.extend({},x,b);this.group=m.get(this.options);this.rootGroup=this.options.rootGroup=this.options.rootGroup||this.group;this.parentGroup=this.options.parentGroup=this.options.parentGroup||this.group;this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector;this.enable(!0)}var h="sortable",i=e(w.document),x={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},n={afterMove:function(){},containerSelector:"ol, ul",
handle:"",itemSelector:"li",onDrag:function(a,b){a.css(b)},onDragStart:function(a){a.css({height:a.height(),width:a.width()});a.addClass("dragged");e("body").addClass("dragging")},onDrop:function(a){a.removeClass("dragged").attr("style","");e("body").removeClass("dragging")},placeholder:'<li class="placeholder"/>',pullPlaceholder:!0},q={},v=0;Array.prototype.remove=function(a,b){var c=this.slice((b||a)+1||this.length);this.length=0>a?this.length+a:a;return this.push.apply(this,c)};m.get=function(a){q[a.group]||
(a.group||(a.group=v++),q[a.group]=new m(a));return q[a.group]};m.prototype={dragInit:function(a,b){i.on("mousemove",this.dragProxy);i.on("mouseup",this.dropProxy);this.item=e(a.target).closest(this.options.itemSelector);this.itemContainer=b;this.setPointer(a)},drag:function(a){a.preventDefault();this.dragging||(l(this.item,this.options.containerSelector,"disable",!0),this.options.onDragStart(this.item,this.itemContainer,n.onDragStart),this.dragging=!0);if(this.setPointer(a)){this.options.onDrag(this.item,
k(this.pointer,this.item.offsetParent()),n.onDrag);var b=a.pageX,a=a.pageY,c=this.sameResultBox;(!c||c.top>a||c.bottom<a||c.left>b||c.right<b)&&this.processMove()}},drop:function(a){a.preventDefault();i.off("mousemove",this.dragProxy);i.off("mouseup",this.dropProxy);this.dragging&&(this.getContainer(this.placeholder).receiveDrop(),l(this.item,this.options.containerSelector,"enable",!0),this.deleteDimensions(),this.lastAppendedItem=this.sameResultBox=j,this.dragging=!1)},processMove:function(a,b){a||
(a=this.relativePointer||this.pointer,b=this.lastRelativePointer||this.lastPointer);var c=u(this.getContainerDimensions(),a,b);if(c&&(!c[1]||this.options.pullPlaceholder)){c=this.containers[c[0]];if(!this.getOffsetParent())var d=c.getItemOffsetParent(),a=k(a,d),b=k(b,d);c.processMove(a,b)}},movePlaceholder:function(a,b,c,d){var e=this.lastAppendedItem;if(d||!(e&&e[0]===b[0]))b[c](this.placeholder),this.lastAppendedItem=b,this.sameResultBox=d,this.options.afterMove(this.placeholder,a)},getContainerDimensions:function(){this.containerDimensions||
t(this.containers,this.containerDimensions=[],!this.getOffsetParent());return this.containerDimensions},getContainer:function(a){return a.closest(this.options.containerSelector).data(h)},getOffsetParent:function(){if(this.offsetParent===j){for(var a=this.containers.length-1,b=this.containers[a].getItemOffsetParent();a--;)if(b[0]!=this.containers[a].getItemOffsetParent()[0]){i.on("scroll",this.scrolledProxy);b=!1;break}this.offsetParent=b}return this.offsetParent},setPointer:function(a){a={left:a.pageX,
top:a.pageY};if(this.getOffsetParent()){var b=k(a,this.getOffsetParent());this.lastRelativePointer=this.relativePointer;this.relativePointer=b}this.lastPointer=this.pointer;this.pointer=a;return!0},addContainer:function(a){this.containers.push(a);delete this.containerDimensions},removeContainer:function(a){this.containers.remove(this.containers.indexOf(a));delete this.containerDimensions},scrolled:function(){delete this.containerDimensions},deleteDimensions:function(){delete this.containerDimensions;
for(var a=this.containers.length;a--;)delete this.containers[a].itemDimensions;for(a=this.childGroups.length;a--;)this.childGroups[a].deleteDimensions()}};p.prototype={dragInit:function(a){1!==a.which||!this.options.drag||e(a.target).is(this.options.exclude)||(a.preventDefault(),a.stopPropagation(),this.rootGroup.dragInit(a,this))},receiveDrop:function(){var a=this.rootGroup,b=a.item;a.placeholder.before(b).detach();a.options.onDrop(b,this,n.onDrop)},processMove:function(a,b){var c=u(this.getItemDimensions(),
a,b),d=this.rootGroup;c?(d=c[0],!c[1]&&this.options.nested&&this.getContainerGroup(d)?this.getContainerGroup(d).processMove(a,b):this.movePlaceholder(d,a)):d.movePlaceholder(this.el,"append")},movePlaceholder:function(a,b){var c=e(this.items[a]),d=this.itemDimensions[a],h="after",g=c.outerWidth(),i=c.outerHeight(),f=c.offset(),f={left:f.left,right:f.left+g,top:f.top,bottom:f.top+i};this.options.vertical?b.top<=(d[2]+d[3])/2?(h="before",f.bottom-=i/2):f.top+=i/2:b.left<=(d[0]+d[1])/2!=this.floatRight?
(h="before",f.right-=g/2):f.left+=g/2;this.rootGroup.movePlaceholder(this,c,h,f)},getItemDimensions:function(){this.itemDimensions||(this.items=this.el.children(this.rootGroup.options.itemSelector).filter(":not(.dragged)").toArray(),t(this.items,this.itemDimensions=[]));return this.itemDimensions},getItemOffsetParent:function(){var a=this.el;return"relative"===a.css("position")||"absolute"===a.css("position")?a:a.offsetParent()},getContainerGroup:function(a){var b=e.data(this.items[a],"subContainer");
if(b===j){var c=e(this.items[a]).children(this.rootGroup.options.containerSelector),b=!1;c[0]&&(b=e.extend({},this.options,{parentGroup:this.group,group:v++}),b=c[h](b).data(h).group);e.data(this.items[a],"subContainer",b)}return b}};var r={enable:function(a){this.options.drop&&this.group.addContainer(this);a||l(this.el,this.options.containerSelector,"enable",!0);this.el.on("mousedown",this.handle,this.dragInitProxy)},disable:function(a){this.options.drop&&this.group.removeContainer(this);a||l(this.el,
this.options.containerSelector,"disable",!0);this.el.off("mousedown",this.handle,this.dragInitProxy)}};e.extend(p.prototype,r);e.fn[h]=function(a){var b=Array.prototype.slice.call(arguments,1);return this.each(function(){var c=e(this),d=c.data(h);d&&r[a]?r[a].apply(d,b):!d&&(a===j||"object"===typeof a)&&c.data(h,new p(c,a))})}}(jQuery,window);
