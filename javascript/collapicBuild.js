/**
 * Requires Jquery
 *
 */


/**
 * Base Element for all elements
 * 
 * @author petteritorssonen
 * @version $Rev$
 */

var BaseElement = function  (options, jQueryObject) {
	var that = {};
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	init(options);
	function init (options) {
		if(typeof options.type !== 'undefined'){
			that.element = jQuery(options.type);
		}else{
			that.element = jQuery('<div></div>');
		}
		
		if(typeof options.id !== 'undefined'){
			that.element.attr('id', options.id);
		}
		
		if(typeof options.text !== 'undefined'){
			that.element.text(options.text);
		}
		
		if(typeof options.className !== 'undefined'){
			that.element.attr('class', options.className);
		}
	};
	
	that.bind = function  (type, fn) {
		that.element.bind(type, fn);
	};
	
	that.setAttribute = function  (attr, value) {
		that.element.attr(attr, value);
	};
	
	that.setHtml = function (args) {
		that.element.html(args);
	};
	
	that.getElement = function () {
		return that.element;
	};
	
	that.setClassName = function (className) {
		that.element.attr('class', className);
	};
	
	that.append = function  (ele) {
		that.element.append(ele);
	};
	
	that.getClassName = function  () {
		return that.element.attr('class');
	};
	
	that.setId = function (attr) {
		that.element.attr('id', attr);
	};
	
	that.getId = function  () {
		return that.element.attr('id');
	};
	
	that.hide = function  () {
		that.element.hide();
	};
	
	that.show = function  () {
		that.element.show();
	};
	
	
	return that;
	
};/**
 * Creates inputElement class with 
 * promopt. 
 * 
 * Todo: Test for ie  
 *
 * @author petteritorssonen
 * @version $Rev$
 * @requires OtherClassName
 */
var DivElement = function  (idName, className) {
	var that = {},
	options = {type: '<div></div>', id: idName, className: className};
	that = BaseElement(options);
	
	return that;
	
};/**
 * Creates inputElement class with 
 * promopt. 
 * 
 * Todo: Test for ie  
 *
 * @author petteritorssonen
 * @version $Rev$
 * @requires OtherClassName
 */
var LinkElement = function  (options) {
	var that = {};
	options.type = '<a></a>';
	that = BaseElement(options);
	
	init();
	function init () {
		
		if(typeof options.href !== 'undefined'){
			that.element.attr('href', options.href);
		}
		if(typeof options.text !== 'undefined'){
			that.element.text(options.text);
		}
		if(typeof options.title !== 'undefined'){
			that.element.attr(title, options.title);
		}
	
	}
	
	that.setOnClick = function  (fn) {
		that.element.bind('onclick', fn);
	}
	
	that.bind = function  (type, fn) {
		that.element.bind(type, fn)
	}
	
	return that;
	
};/**
 * Creates inputElement class with 
 * promopt. 
 * 
 * Todo: Test for ie  
 *
 * @author petteritorssonen
 * @version $Rev$
 * @requires OtherClassName
 */
var TextareaElement = function  (idName, className) {
	var that = {},
	options = {type: '<textarea></textarea>', id: idName, className: className};
	that = BaseElement(options);
	
	init();
	function init () {
		that.getElement().bind('keyup.collapick', function  (event) {
			autoResize(event);
		});
	}
	
	
	/**
	 * Sampled from autoresize for jquery
	 * @private
	 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
	 * @returns Describe what it returns
	 * @type String|Object|Array|Boolean|Number
	 */
	function autoResize (event) {
		var textarea = that.getElement();
		var height = textarea.css('height');
		height = textarea.height();
		var scrollTop = Math.max(textarea.scrollTop());
		if(scrollTop > 0){
			height = height + scrollTop;
		}
		if (event.keyCode == '13' ){
			textarea.css('height', height+4);
		}
	}
	
	that.setText = function  (args) {
		that.getElement().val(args);
	};
	
	that.getText = function  () {
		return that.getElement().val();
	};
	
	that.clearText = function  () {
		that.setText("");
	};
	
	that.bind = function  (type, fn) {
		that.getElement().bind(type, fn);
	};
	
	return that;
	
};/**
 * Main Container is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var MainContainer = function  (options, jQueryObject) {
	var that = {},
	className = "collapick";
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	
	init(options);
	function init (options) {
		that.element = DivElement("wrapper", className).getElement();
		that.content = DivElement("content", className); //base elements dosen't need remove wrapping
		
		
		
		that.element.append(that.content.getElement());
	};
	
	//Overrides
	that.setHtml = function (args) {
		that.content.setHtml(args);
	};
	
	//Overrides
	that.getElement = function  () {
		return that.element;
	};
	
	that.getContent = function  () {
		return that.content.getElement();
	}
	
	//Overrides 
	that.show = function  (pageX, pageY) {
		var x = parseInt(pageX)-24;
		var y = parseInt(pageY)+12;
		that.element.css('position','absolute');
		that.element.css('top', y);
		that.element.css('left',x);
		that.element.show();
	}
	
	//Overrides 
	that.hide = function  () {
		that.element.hide();
	}
	
	/**
	 * <h3> Be Careful When Wrapping Things</h3>
	 * The wrapping makes javascript slow
	 *
	 * @private
	 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
	 * @returns Describe what it returns
	 * @type String|Object|Array|Boolean|Number
	 */
	that.append = function  (element) {
		return that.content.getElement().append(element);
	};
	
	
	return that;
	
};/**
 * Main Container is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var Navigation = function  (jQueryObject) {
	var that = {},
	className = "collapick";
	
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	init();
	function init () {
		that = DivElement("navigation", className);
		collapickLink = LinkElement({id: 'collapickLink', className: "icon", href: "http://www.collapick.com"});
		sendCollapick = LinkElement({id: "sendCollapick", className: "icon", href: "#sendCollapick", text: 'Send Collapick'});

		
		closeCollapick = LinkElement({id: "closeCollapick", className: "icon", href: "#closeCollapick", text: 'Close Collapick'});

		that.append(collapickLink.getElement());
		//that.append(sendCollapick.getElement());
		that.append(closeCollapick.getElement());
	};
	
	that.bindSend = function  (type, fn) {
		sendCollapick.bind(type, fn);
	};
	
	that.bindClose = function  (type, fn) {
		closeCollapick.bind(type, fn);
	};
	
	
	
	
	return that;
	
};/**
 * Main Container is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var ElementContainer = function  (options, jQueryObject) {
	var that = {},
	elements = [];
	className = "collapick";
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	
	init(options);
	function init (options) {
		that.container = BaseElement({type: '<ul></ul>', id: 'elementContainer'});
		that.container.getElement().sortable();
	};
	
	function getLi () {
		return jQuery('<li></li>');
	}
	
	function removeByIndex (index) {
		elements.splice(index,1);
		Logger.log(elements);
	}
	
	function getX (element, i) {
		var span = jQuery('<span class="removeX">X</span>');
		span.data('removeData', {index: i, element: element});
		span.bind('click', function  () {
			var that = $(this),
			li = jQuery(that.parent('li').get(0)),
			index = that.data('removeData').index;
			Logger.log(index);
			removeByIndex(index-1);
			li.remove();
		
		})
		
		return span;
	}
	
	function makeBubble (element) {
		var div = jQuery('<div class="clearfix"></div>'),
		left = jQuery('<div style="float:left;"></div>'),
		right = jQuery('<div id="right" style="float:left;"></div>'),
		rightContent = jQuery('<div id="rightContent"></div>'),
		src = false;
		
		element.css({width: "56px", height: "56px", margin: '0 auto'});
		if(element.is('img')){
			src = element.attr('src');
			image1 = new Image();
			image1.src = src;
			src =  image1.src;
			element.attr('src', src);
		}
	
		left.append(element);
		rightContent.text('No license for image')
		right.append(rightContent);
		div.append(left).append(right);
		
		return div;
	}
	
	function loopContainer (callbackFn) {
		that.container.getElement().children('li').each(callbackFn);
	}
	
	that.add = function  (element, adjustSize) {
		var li = getLi(),
		i = false,
		div = jQuery('<div class="elementContainer"></div>');
		if(typeof adjustSize !== 'udefined' && adjustSize === true){
			div = makeBubble(element);
		}else{
			div.append(element);
		}
		
		i = elements.push(element); // if we are saving only element it much easierc
		li.data('elementData', {element: element, index: i});
		li.html(div);
		

	
		li.append(getX(element, i));
		li.hover(function () {
		    var remove = $(this).find(".removeX");
			remove.stop();
			remove.animate({opacity: 1}, 700);
		  },
		  function () {
		    var remove = $(this).find(".removeX");
			remove.stop();
			remove.animate({opacity: 0}, 700);
		  }
		);
		that.container.getElement().append(li);
	};
	
	that.addToFirst = function  (element) {
		alert('todo addToFirs ElementContainer');
	};
	
	that.removeElement = function  (element) {
		alert('todo remove ElementContainer');
	};
	
	that.removeElementByIndex = function  (index) {
		removeByIndex(index);
	};
	
	that.removeEmptys = function  () {
		alert('todo remove emptys EC');
	};
	
	that.getElement = function  () {
		return that.container.getElement();
	};
	
	// TODO: Think what is the best solution own array or looping each element
	that.getElements = function  () {
		var elementsArray = [];
		loopContainer(function  () {
			elementsArray.push($(this).data('elementData').element)
		});
		return elementsArray;
		
	};
	
	return that;
	
};/**
 * Base Ajax Class
 * 
 * @author petteritorssonen
 * @version $Rev$
 * @requires OtherClassName
 */

var AjaxService = function(options, jQueryObject){
	
	var that = {},
	url = false,
	method = false;
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	init(options);
	function init (options) {
		if(typeof options !== 'undefined'){
			url = options.url;
		}else{
			alert('Define options');
		}
	}
	
	
	that.sendRequest = function (data, fallbackFn) {
		jQuery.getJSON(url, data, fallbackFn);
	}
	
	that.sendJsonpRequest = function (data, fallbackFn) {
		jQuery.getJSON(url+'?jsoncallback=?', data, fallbackFn);
	}
	
	that.getUrl = function  () {
		return url;
	}
	
	that.setUrl = function  (newUrl) {
		url = newUrl;
	}
	
	
	
	return that;
};/**
 * Range Service for rangy implementation
 * @author petteritorssonen
 * @version $Rev$
 * @requires All Rangy classes
 */
var RangeService = function  (options, jQueryObject) {
	var that = {},
	rangyObject = false,
	cssApplier = false,
	_WORD_COUNT = 2,
	selectionObject = {
		selection: false
	};
	
	
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	
	init();
	function init () {
		if(typeof rangy === 'undefined'){
			alert('fatal error when initing rangy object')
			return;
		}
		
		rangy.init();
		rangyObject = rangy;
		cssApplier = rangyObject.createCssClassApplier("highlight", true);
	};
	
	function validateWordCount (word) {
		return word.length > _WORD_COUNT;
	}
	
	that.fetchSelection = function  () {
		var saved = false,
		selection = rangyObject.getSelection();
		if(validateWordCount(selection.toString())){
			selectionObject.selection = selection;
			saved = true;
		}
		
		return saved;
	};
	
	that.fetchSelectionAndHighlight = function  () {
		var result = false;
		if(selectionObject.selection !== false){
			that.undoHighlight(selectionObject.selection.getRangeAt(0));
		}
		if(that.fetchSelection()){
			that.highlight(selectionObject.selection.getRangeAt(0));
			result = true;	
		}
	
		return result;
	};
	
	that.highlight = function  (rangeObject) {
		if(typeof rangeObject !== 'undfined'){
			cssApplier.applyToRange(rangeObject);
		}else{
			cssApplier.applyToSelection();
		}
		
	};
	
	that.undoHighlight = function  (rangeObject) {
		if(typeof rangeObject !== 'undfined'){
			cssApplier.undoToRange(rangeObject);
		}else{
			cssApplier.undoToSelection();
		}
		
	};
	
	that.saveSelectionToCookie = function  () {
	
	};
	
	that.getSelection = function  () {
		return selectionObject.selection;
	};
	
	that.getRange = function  () {
		return selectionObject.selection.getRangeAt(0);
	};
	
	that.getSerializedRange = function  () {
		return rangyObject.serializeRange(that.getRange());
	};
	
	that.getText = function  () {
		return selectionObject.selection.toString();
	};
	
	that.getWordCount = function  () {
		selection = rangyObject.getSelection();
		return selection.toString().length;
	};
	

	
	return that;
	
};/**
 * Mouse Service
 * @author petteritorssonen
 * @version $Rev$
 * @requires Jquery
 */
var MouseService = function  (options, jQueryObject) {
	var that = {},
	mouseUpEvent = false,
	mouseData = {
		mouseDown: {x: false, y: false, element: false},
		mouseUp: {x: false, y: false, element: false}
	};

	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	
	init();
	function init () {
		$(document).bind("mousedown", function (e) {
			mouseData.mouseDown.x = e.pageX;
			mouseData.mouseDown.y = e.pageY;
			mouseData.mouseDown.element = e.target;
		});
		$(document).bind("mouseup", function (e) {
			mouseData.mouseUp.x = e.pageX;
			mouseData.mouseUp.y = e.pageY;
			mouseData.mouseUp.element = e.target;
			fireMouseUpEvent();
		});
	};
	
	function fireMouseUpEvent () {
		if(mouseUpEvent !== false){
			mouseUpEvent();
		}
	}
	
	that.setMouseUpEvent = function  (eventFn) {
		mouseUpEvent = eventFn;
	};
	
	that.getMouseData = function  () {
		return mouseData;
	};
	
	
	return that;
	
};var CollapickUtils = function(){
	return {
		copy: function(object) {
	  		var newObject = jQuery.extend(true, {}, object);
			return newObject;
		}
	};
}();/**
 * Find Images and Add license information
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var ImageBadge = function  (options, jQueryObject) {
	var that = {},
	className = "collapick",
	mainContainer = false,
	navigation = false,
	textare = false,
	containerElement = false,
	limit = {
		height: 40,
		width: 100
	},
	containerCss = {
		height: "40px",
		width: "100px",
		opacity: "0.8",
		position: "absolute"
	};
	
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	
	init(options);
	function init (options) {
		if(typeof options !== 'undefined'){
			if(typeof options.containerElement !== 'undefined'){
				containerElement = options.containerElement;
			}
			if(typeof options.height !== 'undefined' && typeof options.width !== 'undefined'){
				containerCss.height = options.height;
				containerCss.width = options.width;
			}
		}
	
	};
	
	function validateImage (image) {
		var result = false;
		
		if(image.height() > limit.height && image.width() > limit.width){
			result = true;
		}
		
		return result;
	}
	
	function countHeightAndWidth (image) {
		var height = image.height(),
		width = image.width();
		
		
	}
	
	function getImageInfoContainer (image) {
		var container = $('<div>');
		
		countHeightAndWidth(image);
		
		container.css(containerCss);
		container.css({left: image.position().left, top: image.position().top});
		if(containerElement !== false){
			container.append(containerElement);
		}
		return container;
	}
	
	that.attatchToAllImages = function  () {
		var body = $('body');
		jQuery('img').each(function  () {
			var image = $(this);
			if(validateImage(image) === true){
				var container = getImageInfoContainer(image);
				container.attr('image-src', image.attr('src'));
				container.attr('image-license', 'none');
				body.append(container);
			}
			
		});
	};
	
	that.attatchToImage = function(image) {
		var body = $('body');
		if(validateImage(image) === true){
			container = getImageInfoContainer(image);
			body.append(container);
		}
	
	};
	
	return that;
	
};/**
 * Reads CC license
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var LicenseReader = function  (options, jQueryObject) {
	
	var that = {},
	manyLicenses = false,
	licenseElements = false;
	
	
	
	/**
	 * There should be always only one license per site
	 * TODO find all elements with attrib xmlns:cc="http://creativecommons.org/ns#"
	 * Empty returns false 
	 *
	 * @author petteritorssonen
	 * @version $Rev$
	 * @requires OtherClassName
	 */
	function findLicense () {
		if(licenseElements === false){
			licenseElements = jQuery('[rel^="license"]');
		}
		if(licenseElements.length > 1){
			Logger.log('too many license elements');
		}
		if(licenseElements.length == 0){
			licenseElements = false;
		}
		
		
		return licenseElements;	
	}
	
	/**
	 * Reads license from Creative Commons Site
	 * @private
	 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
	 * @returns Describe what it returns
	 * @type String|Object|Array|Boolean|Number
	 */
	function readLicenseFromSite (site) {
		//http://api.creativecommons.org/rest/1.5/license/standard/
		//http://api.creativecommons.org/rest/1.5/details?license-uri=http://creativecommons.org/licenses/by/3.0/ cool
	}
	
	function loopElements (loopFN) {
		jQuery(licenseElements).each(function  () {
			loopFN($(this));
		});
	}
	
	

	that.findLicenseRels = function  () {
		return findLicense();
	};
	
	that.getPageLicenseType = function  () {
		var result = false;
		if(licenseElements !== false){
			jQuery(licenseElements).each(function  () {
				var element = $(this);
				result = element.text();
			});
		}
	
		return result;
	};
	
	/**
	 * This is critical part of license information.
	 * Here we need to parse those doubled elements
	 *
	 * @public
	 * 
	 * @returns Returns text of license or duplicated
	 * @type String
	 */	
	that.getLicenseInformation = function  () {
		var text = "",
		count = 0;
		
		loopElements(function  (element) {
			if(text !== element.text() && element.text() !== ""){
				count = count + 1;
				text = element.text();
				if(count > 1){
					manyLicenses = true;
					text = 'This page contains many licenses';
				}
				
			}
		});
		
		return text;
	};
	
	that.getLicenseSearcherElements = function  () {
			var containerElement = jQuery('<div>');
			loopElements(function  (element) {
				var span = jQuery('<span class="licenseSpan"></span>').text(element.text());	
				span.data('licenseElement', element);	
				span.bind('click', function  () {
					Logger.log(span.data('licenseElement'));
				})		
				containerElement.append(span);
			});
			
			return containerElement;
	}
	
	that.getLicenseInformationElement = function  () {
		var text = that.getLicenseInformation();
		return jQuery('<div>'+text+'</div>');
	}
	
	that.getLicenseUrlArray = function  () {
		var licenseArray = [];
		loopElements(function  (element) {
				licenseArray.push(element.attr('href'));
		});
		
		return licenseArray;
	}
	
	that.getLicenseUrls = function  () {
		var url = "";
		jQuery(licenseElements).each(function  () {
			var element = $(this);
			url = url+element.attr('href')+";";
		});
		
		return url;
	};
	
	that.hasManyLicense = function  () {
		return manyLicenses;
	}
	
	that.highlightLicenses = function  () {
		loopElements(function  (element) {
				element.bind('click', function  () {
					alert('this license will be used');
					return false;
				});
				element.addClass('collapickHighlight');
		});
	}
	
	
	
	return that;
	
};var Logger = function(){
	
	return{
		log: function  (argument) {
			if(typeof console !== 'undefined' && typeof console.log !== 'undefined'){
				console.log(argument);
			}else{
				alert(argument);
			}
		}
	};
}();/**
 * Main Container is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var CollapickContainer = function  (options, jQueryObject) {
	var that = {},
	className = "collapick",
	mainContainer = false,
	mouseover = false,
	navigation = false,
	textarea = false,
	elementContainer = false;
	
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	
	init(options);
	function init (options) {
		var sendButton = BaseElement({id: 'sendCollapickButton', type: '<button>', text: 'Publish'});
		mainContainer = MainContainer();
		navigation = Navigation();
		elementContainer = ElementContainer();
		textarea = TextareaElement('commentArea', className);
		
		//adding textarea
		elementContainer.add(textarea.getElement());
		
		//adding dropable
		mainContainer.getElement().droppable({
				accept: 'img',
				drop: function(event, ui){
					var element = $(ui.draggable).clone();
					addElement(element, true);
					adjustHeight();
				}
			});

		//adding functionatily
		mainContainer.append(navigation.getElement());
		mainContainer.append(elementContainer.getElement());
		mainContainer.append(sendButton.getElement());
		mainContainer.getElement().hide();
		mainContainer.getElement().bind('mouseover.container', function  () {
			//Logger.log('mouseover');
			mouseover = true;
		});
		
		mainContainer.getElement().bind('mouseout.container',function  () {
			//Logger.log('mouseout');
			mouseover = false;
		});
		
		
		initNavigations();
		sendButton.getElement().bind('click', function  () {
			CollapickApp.sendData();
			//Logger.log('called click for sendbutton');
			//Logger.log(elementContainer.getElements());
		});
		
		that.element = mainContainer.getElement();
	};
	
	function initNavigations () {
		navigation.bindSend('click', function  () {
			CollapickApp.sendCollapick(); //Calling singleton class
		})
		
		navigation.bindClose('click', function  () {
			CollapickApp.close();
		})
	}
	
	function adjustHeight () {
		var height = mainContainer.getContent().height()+40;
		mainContainer.getElement().height(height);
		
	}
	
	function addElement (element, adjustSize) {
		elementContainer.add(element, adjustSize);
		adjustHeight();
	}
	
	/**
	 * Returns jQuery element containaer
	 * @public
	 * 
	 * @returns Describe what it returns
	 * @type Objcet 
	 */
	that.getElement = function  () {
		return that.element;
	};
	
	/* TODO: This is performance issue */
	that.getContainerElementsHtml = function  () {
		var html = "<ul>",
		eleArray = elementContainer.getElements();
		for (var i=0; i < eleArray.length; i++) {
			var element = eleArray[i].clone(),
			htmlTmp = false;
			if(element.is('textarea')){
				var value = eleArray[i].val();
				Logger.log("value is" +value);
				element = jQuery('<p>'+value+'</p>');
			}else{
				element.removeAttr('id');
				element.removeAttr('class');
				element.removeAttr('style');
			}

			//todo add if input or textarea read value
			htmlTmp = jQuery('<div>').append(element.clone()).remove().html();//this is trigy thing
			html = html + '<li>' + htmlTmp + '</li>';
		};
		html = html + '</ul>';
		return html;
	}
	
	that.hide  = function  () {
		that.element.hide();
	};
	
	that.adjustHeight = function  () {
		adjustHeight();
	};
	
	that.hideWithBounce  = function  () {
		that.element.effect('bounce', 150, function () {
			that.element.hide();
		});
	};
	
	that.show = function  (pageX, pageY) {
		mainContainer.show(pageX, pageY);
		textarea.getElement().focus();
	};
	
	that.getComment = function  () {
		return textarea.getText();
	};
	
	that.getNavigation = function  () {
		return navigation;
	};
	
	that.isMouseOver = function  () {
		return mouseover;
	};
	
	that.addElement = function  (element) {
		addElement(element);
	};
	
	that.addCitaText = function  (text) {
		var element = jQuery('<div>'+text+'</div>');
		addElement(jQuery('<div class="cita">'+element.text()+'</div>'));
	};
	
	
	
	return that;
	
};/**
 * Main Container is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var ConfigBar = function  (optionsTmp) {
	var that = {},
	loginController = false,
	globalInterval = false,
	intervalCount = 0,
	loginInfo = false,
	options = {type: '<div></div>', id: 'configBar', className: 'collapick'};
	that = BaseElement(options);
	
	
	init(optionsTmp)
	function init (optionsTmp) {
		//initing login controller
		loginController = LoginController(optionsTmp);
		checkLoginInterval();
		loginInfo = jQuery('<div id="loginInfo" class="collapick">loading...</div>');
		append(loginInfo);
		
		
	
		that.bind('mouseover', function  () {
			that.getElement().animate({opacity: "1"},500);
		});
		that.bind('mouseout', function  () {
			that.getElement().animate({opacity: "0.8"},500);
		});
		
	}
	
	/**
	 * Interval for waiting response for ajax. This need to be much better
	 * TODO Check how jquery do things 
	 *
	 * @private
	 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
	 * @returns Describe what it returns
	 * @type String|Object|Array|Boolean|Number
	 */
	function checkLoginInterval () {
		//Logger.log('login interval check');
		if(intervalCount > 5){
			clearInterval(globalInterval);
			login();
			return;
		}if((loginController.hasRequestInited() === false )){
			Logger.log('check');
			Logger.log(intervalCount);
			intervalCount = intervalCount + 1;
			if(globalInterval == false){
				globalInterval = setInterval(function  () {
					checkLoginInterval();
				}, 1000 );
			}
		}else{
			clearInterval(globalInterval);
			globalInterval = false;
			if(loginController.hasSession() === true){
				welcome();
			}else{
				login();
			}
		}
	}
	
	function welcome () {
		var username = loginController.getUsername();
		loginInfo.html('<h3>'+username+'</h3>');
	}
	
	function login () {
		var username = loginController.getUsername(),
		url = loginController.getLoginUrl();
		loginInfo.html('<a href="'+url+'">Login here</a>');
	}
	
	function append (element) {
		that.getElement().append(element);
		//if needed add adjust height function
	}
	
	that.append = function  () {
		append(element);
	}
	
	that.getLoginController = function  () {
		return loginController;
	}
	
	
	return that;
};/**
 * LoginController is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var LoginController = function  (options) {
	var that = {},
	session = false,
	apikey = false,
	username = false,
	checked = false,
	loginUrl = false,
	ajaxService = false;
	
	
	
	init(options)
	function init (options) {
		Logger.log(options);
		ajaxService = AjaxService({url: options.sessionUrl});
		checkSessionFromServer();
	}
	
	function checkSessionFromServer () {
		ajaxService.sendJsonpRequest({}, function  (data) {
			if(data.session === false){
				session = false;
				loginUrl = data.login_url;
			}
			if(data.session === true){
				session = true;
				apikey = data.apikey;
				username = data.username;
				url = data.url;
				//Calling Global Object
				CollapickApp.updateUrl(url);
				
			}
			checked = true;
			Logger.log(data);
		});
	}
	
	that.hasSession = function () {
		return session;
	};
	
	that.getUsername = function  () {
		return username;
	};
	
	that.getApikey = function  () {
		return apikey;
	};
	
	that.getLoginUrl = function  () {
		return loginUrl;
	};
	
	that.hasRequestInited = function  () {
		Logger.log('checked '+ checked);
		return checked;
	};
	
	
	
	return that;
};/**
 * LoginController is place holder for all stuffs
 * 
 * @author petteritorssonen
 * @version $Rev$
 */
var ImageController = function  () {
	var that = {},
	dragging = false,
	imageBadge = false;

	
	
	
	init();
	function init () {
		imageBadge = ImageBadge({
			containerElement: function  () {
				var element = $('<div>');
				element.css({backgroundColor: "#ff0000", color: "#ccc"});
				element.text('Collapick');
				return element;
			},
			height: '100px',
			width: '200px'});
		//imageBadge.attatchToAllImages();
		
		//this is faster then to loops
		loopImages();
	}
	
	function loopImages () {
		jQuery('img').each(function  () {
			var image = $(this);
			//imageBadge.attatchToImage(image); DON*T want THIS
			image.draggable({
				helper: function(){
					//FIX THIS
					var element = jQuery(this).clone(),
					width = this.clientWidth,
					height = this.clientHeight;
					if((width > 200) || (height > 200)){
						width = width * 0.4;
						height = height * 0.4;
						element.width(width);
						element.height(height);
					}
				
					return element;
				},
				start: function (event, ui) { 
					dragging = true;
				},
				stop: function  (event, ui) {
					dragging = false;
				}
				//grid: [150, 150]
				
			});
		});
	}
	
	that.isDragging = function  () {
		return dragging;
	};
	
	
	
	
	return that;
};var CollapickApp = function(){
	
	var collapickContainer = false,
	mouseService = false,
	rangeService = false,
	licenseReader = false,
	licenseElement = false,
	feedbackAjaxService = false,
	configBar = false,
	imageController = false,
	containerIsShown = false,
	dragging = false;
	
	
	//TODO: Refactory this, add collapickContainer get show status
	//FIXME: Refactory those to ifs and make it better check
	function bindMouseEvents () {
		mouseService.setMouseUpEvent(function  () {
			if(collapickContainer.isMouseOver() === false && isDragging() === false){//this was good solutio
				if(rangeService.fetchSelectionAndHighlight() && containerIsShown === false){
					collapickContainer.show(mouseService.getMouseData().mouseUp.x, mouseService.getMouseData().mouseUp.y);
					collapickContainer.addCitaText(rangeService.getText());
					containerIsShown = true;
				}else if(rangeService.fetchSelectionAndHighlight()){
					collapickContainer.hide();
					collapickContainer.show(mouseService.getMouseData().mouseUp.x, mouseService.getMouseData().mouseUp.y);
					collapickContainer.addCitaText(rangeService.getText());
					containerIsShown = true;
				}else if(rangeService.getWordCount() < 2){
					collapickContainer.hide();
					containerIsShown = false;
				}
			}
		});
	}
	
	
	function hide () {
		rangeService.undoHighlight(rangeService.getRange());
		collapickContainer.hide();
	}
	
	function hideWithBounce () {
		rangeService.undoHighlight(rangeService.getRange());
		collapickContainer.hideWithBounce();
	}
	
	function isDragging () {
		if(dragging === false){
				if(imageController.isDragging() === true && dragging == false){
					dragging = true
				}
		}
		
		return dragging;
	
	}
	
	
	//TODO test if seleciton in init
	function hasSelection () {
		Logger.log('todo');
	}
	
	function addDraggableToHighlight () {
		/*jQuery('.highlight').each(function  () {
			var element = $(this);
			element.draggable({
				helper: function () {
					var element = jQuery(this).clone();
					return element;
				},
				start: function (event, ui) { 
					dragging = true;
				},
				stop: function  (event, ui) {
					dragging = false;
				}
			});
		});*/
	}
	
	return{
		init: function  (options) {
			var licenseTextContainer = jQuery('<div id="licenseText" class="collapick"></div>')
			//Initing classes
			collapickContainer = CollapickContainer();
			configBar = ConfigBar(options);
			rangeService = RangeService();
			mouseService = MouseService();
			feedbackAjaxService = AjaxService({url: options.feedbackUrl});
			licenseReader = LicenseReader();
			imageController = ImageController();
		
			//finding license
			licenseElement = licenseReader.findLicenseRels();
			var licenseH4 = jQuery('<h4>License of Site</h4>');
			licenseTextContainer.append(licenseH4)
			if(licenseElement !== false){
				licenseTextContainer.append(licenseReader.getLicenseInformationElement());
			}else{
				licenseTextContainer.text('No license founded!');
			}
			
			if(licenseReader.hasManyLicense() === true){
				licenseTextContainer.append(licenseReader.getLicenseSearcherElements());
				
				//licenseReader.highlightLicenses();
			}
			
			configBar.getElement().append(licenseTextContainer);
			
			//adding functionatily 
			collapickContainer.getElement().draggable();
			
			
			bindMouseEvents();
			$('body').append(collapickContainer.getElement()).append(configBar.getElement());
			hasSelection();
			addDraggableToHighlight();
		},
		
		
		/**
		 * This is function for Navigation Class
		 * 
		 * @private
		 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
		 * @returns Describe what it returns
		 * @type String|Object|Array|Boolean|Number
		 */	
		sendCollapick: function  () {
			data = {
				range_object: rangeService.getSerializedRange(),
				content: rangeService.getText(),
				comment: collapickContainer.getComment(),
				apikey: configBar.getLoginController().getApikey(),
				username: configBar.getLoginController().getUsername(),
				//feedback_type: "common", NOT IMPLEMENTED YET
				www: window.location.toString()
			};
			feedbackAjaxService.sendJsonpRequest(data, function  (returnedData) {
				Logger.log(returnedData);
			});
			hideWithBounce();
			
		},
		
		/**
		 * Send Data
		 * @public
		 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
		 * @returns Describe what it returns
		 * @type String|Object|Array|Boolean|Number
		 */
		sendData: function  () {
			data = {
				range_object: rangeService.getSerializedRange(),
				content: rangeService.getText(),
				comment: collapickContainer.getComment(),
				apikey: configBar.getLoginController().getApikey(),
				username: configBar.getLoginController().getUsername(),
				license_urls: licenseReader.getLicenseUrls(),
				license_information: licenseReader.getLicenseInformation(),
				elements: unescape(collapickContainer.getContainerElementsHtml()),
				//feedback_type: "common", NOT IMPLEMENTED YET
				www: window.location.toString()
			};
			feedbackAjaxService.sendJsonpRequest(data, function  (returnedData) {
				Logger.log(returnedData);
			});
			hideWithBounce();
		},
		
		
		/**
		 * This is function for Navigation Class
		 * 
		 * @private
		 * @param {String|Object|Array|Boolean|Number} paramName Describe this parameter
		 * @returns Describe what it returns
		 * @type String|Object|Array|Boolean|Number
		 */
		close: function  () {
			hide();
		},
		
		isInited: function  () {
			return collapickContainer !== false;
		},
		
		/**
		 * TODO: Can we use observer pattern?
		 *
		 * @public
		 * @param {String} URL If url is change from login controller
		 * @returns Describe what it returns
		 * @type 
		 */
		updateUrl: function  (url) {
			feedbackAjaxService.setUrl(url);
		}
	};
}();