(function (window, undefined, document) {
    function getText(elem) {
        var node,
            ret = '',
            i = 0,
            nodeType = elem.nodeType;
        if ( !nodeType ) { // If no nodeType, this is expected to be an array
            while ( (node = elem[i++]) ) { // Do not traverse comment nodes
                ret += this.text( node );
            }
        } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
            // Use textContent for elements innerText usage removed for consistency of new lines (jQuery #11153)
            if ( typeof elem.textContent === 'string' ) {
                return elem.textContent;
            } else { // Traverse its children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    ret += this.text( elem );
                }
            }
        } else if ( nodeType === 3 || nodeType === 4 ) {
            return elem.nodeValue;
        }
        return ret;
    }
    function getContains(selector, wrapper) {
        var selector = selector.replace(/(^\s*)|(\s*$)/g, ''),
            _colon = selector.indexOf(':contains'),
            _bracketRight = selector.indexOf(')'),
            _content = selector.substring(_colon + 10, _bracketRight),
            _containsLeft = selector.substr(0, _colon),
            wrapper = wrapper || document,
            eles = wrapper.querySelectorAll(_containsLeft), 
            arr = [];
        eles = [].slice.call(eles);
        eles.forEach(function(item) {
            var _text = getText(item);
            if (_text.indexOf(_content) > -1) {
                if (_bracketRight === selector.length - 1) {
                    arr.push(item);
                } else {
                    var extraSelector = selector.substr(_bracketRight + 1);
                    var extra = item.querySelectorAll(extraSelector);
                    extra = [].slice.call(extra);
                    arr = arr.concat(extra);
                }
            }
        });
        return arr;
    }
    function Q_uery(selector) {
        this.elements = [];
        switch (typeof selector) {
            case 'function':
                window.addEventListener('load', selector, false);
                break;
            case 'string':
                if (selector.indexOf(':contains') > -1) {
                    this.elements = getContains(selector);
                } else {
                    this.elements = document.querySelectorAll(selector);
                }
                break;
            case 'object':
                switch (Object.prototype.toString.call(selector)) {
                    case '[object HTMLDocument]':
                        this.elements.push(window);
                        break;
                    default:
                        this.elements.push(selector); 
                }
        }
        return this === window && new Q_uery(selector);
    }
    function checkIsMatchSelector(elem, selector) {
        var nodeType = elem.nodeType;
        if (nodeType !== 1) return false;
        var eleSelector = selector;
        if (selector.indexOf(':contains(') > -1) {
            var _colon = selector.indexOf(':contains'),
                _bracketRight = selector.indexOf(')'),
                _content = selector.substring(_colon + 10, _bracketRight),
                _text = getText(elem);
            eleSelector = selector.substr(0, _colon);
        }
        var _type = eleSelector.charAt(0);
        if (_type === '#' && eleSelector !== ('#' + elem.id)) {
            return false;
        }
        if (_type === '.') {
            var clsList = [].slice.call(elem.classList),
                hasClass = false,
                className = eleSelector.substr(1);
            clsList.forEach(function(item) {
                if (item === className) hasClass = true;
            });
            if (!hasClass) return false;
        }
        if (_type !== '#' && _type !== '.' && eleSelector !== elem.tagName.toLowerCase()) {
            return false;
        }
        if (selector.indexOf(':contains(') > -1) {
            if (_text.indexOf(_content) > -1) return true;
            return false;
        }
        return true;
    }
    Q_uery.prototype = {
        eq: function(n) {
            if (this.elements.length === 0) return undefined;
            return CQ(this.elements[n]);
        },
        find: function(selector) {
            if (this.elements.length === 0) return undefined;
            var aResult = [],
                this_elements = [].slice.call(this.elements);
            this_elements.forEach(function(item) {
                var arr;
                if (selector.indexOf(':contains(') > -1) {
                    arr = getContains(selector, item);
                } else {
                    arr = item.querySelectorAll(selector);
                }
                aResult = aResult.concat([].slice.call(arr));
            });
            var queryObj = new f_n();
            queryObj.elements = aResult;
            return queryObj;
        },
        parent: function() {
            if (this.elements[0] === undefined) return undefined;
            return CQ(this.elements[0].parentNode);
        },
        siblings: function(selector) {
            if (this.elements[0] === undefined) return undefined;
            var currEle = this.elements[0],
                arr = [];
            var siblings = this.elements[0].parentNode.children;
            siblings = [].slice.call(siblings);
            siblings.forEach(function(item) {
                if (selector) {
                    var isMatch = checkIsMatchSelector(item, selector);
                    if (!isMatch) return;
                }
                if (item !== currEle && item.tagName.toLowerCase() !== 'script') {
                    arr.push(item);
                }
            })
            var queryObj = new f_n();
            queryObj.elements = arr;
            return queryObj;
        },
        next: function(selector) {
            if (this.elements[0] === undefined) return undefined;
            var next = this.elements[0].nextSibling;
            if (!next) return undefined;
            if (!selector) {
                while (next.nodeType !== 1) {
                    next = next.nextSibling;
                }
                var queryObj = new f_n();
                queryObj.elements = [next];
                return queryObj;
            }
            while(!checkIsMatchSelector(next, selector)) {
                if (!next.nextSibling) {
                    return undefined;
                } else {
                    next = next.nextSibling;
                }
            }
            var queryObj = new f_n();
            queryObj.elements = [next];
            return queryObj;
        },
        val: function() {
            if (!this.elements.length) return undefined;
            if (arguments.length == 0) {
                return this.elements[0].value;
            } else {
                var this_elements = [].slice.call(this.elements);
                var _arguments = arguments;
                this_elements.forEach(function(item, i) {
                    this_elements[i].value = _arguments[0];
                });
                var queryObj = new f_n();
                queryObj.elements = this.elements;
                return queryObj;
            }
        },
        html: function() {
            if (!this.elements.length) return undefined;
            if (arguments.length == 0) {
                return this.elements[0].innerHTML;
            } else {
                var this_elements = [].slice.call(this.elements);
                var _arguments = arguments;
                this_elements.forEach(function(item, i) {
                    this_elements[i].innerHTML = _arguments[0];
                });
                var queryObj = new f_n();
                queryObj.elements = this.elements;
                return queryObj;
            }
        },
        text: function() {
            return getText(this.elements[0]);
        },
        trigger: function(bubble, type) {
            if (!this.elements || this.elements.length === 0) return;
            var eles = [].slice.call(this.elements),
                bubble = bubble || false,
                type = type || 'click';
            eles.forEach(function(el) {
                try {
                    if (el.dispatchEvent) {
                        var evt = document.createEvent('Event');
                        evt.initEvent(type, bubble, true);
                        el.dispatchEvent(evt);
                    } else if (el.fireEvent) {
                        el.fireEvent('on' + type);
                    }
                } catch(e) {};
            });
        }
    }
    window.f_n = function() {};
    window.$ = window.CQ = Q_uery;
    f_n.prototype = Q_uery.prototype;
    f_n.prototype.constructor = f_n;
})(window, undefined, document);