var Cookies;
(function (Cookies) {
    function set(name, value, days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    Cookies.set = set;
    function get(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
    Cookies.get = get;
})(Cookies || (Cookies = {}));
var Stu3TreeTable = (function () {
    function Stu3TreeTable(isRootCollapsible) {
        this.TreeFlavourCookie = "tree";
        this.eventHandlerDictionary = [];
        this.isRootCollapsible = false;
        this.hasDetailsPinned = false;
        this.hasDetails = false;
        this.parentContainerId = "";
        if (isRootCollapsible) {
            this.isRootCollapsible = true;
        }
    }
    Stu3TreeTable.prototype.init = function (containerId) {
        this.parentContainerId = containerId;
        this.initPolyfills();
        this.initEventHandlerDictionary();
        this.indentTree();
        this.registerForEvents();
        this.hasDetails = this.elementExists(".treetable-right-panel");
        this.getContext().querySelector(".treetable").setAttribute("tabindex", "0");
        var mode = this.getTreeRenderingMode();
        if (this.hasFlavourButtons() === true) {
            var buttonElement = this.getContext().querySelectorAll("[data-mode='" + mode + "']")[0];
            this.switchTreeMode(buttonElement);
        }
        else {
            this.renderTree(mode);
        }
        this.expandTree();
    };
    Stu3TreeTable.prototype.expandNode = function (currentNode, currentLevel, levelsToExpand) {
        var _this = this;
        if (currentLevel === levelsToExpand)
            return;
        var visibleElements = this.getVisibleElements(currentNode.getAttribute("data-id"));
        visibleElements.forEach(function (node, index) {
            var isCollapsed = _this.hasClass(node, "collapsed");
            if (isCollapsed) {
                var button = node.querySelector(".vjoinexpandable");
                if (button == null) {
                    button = node.querySelector(".vjoinendexpandable");
                }
                if (button != null) {
                    button.click();
                }
            }
            console.log("still rolling...");
            _this.expandNode(node, (currentLevel + 1), levelsToExpand);
        });
    };
    Stu3TreeTable.prototype.expandTree = function () {
        var levelsToExpand = parseInt(this.getContext().getAttribute("data-level"));
        if (levelsToExpand > 1) {
            var rootNode = this.getContext().querySelector("tr");
            this.expandNode(rootNode, 1, levelsToExpand);
        }
    };
    Stu3TreeTable.prototype.renderTree = function (mode) {
        this.cleanPreviousMode();
        var tree = this.getContext().querySelector(".treetable-wrapper");
        tree.className = "treetable-wrapper " + mode;
        switch (mode) {
            case "snapshot":
                this.renderSnapshotMode();
                break;
            case "diff":
                this.renderDiffMode();
                break;
            case "hybrid":
                this.renderHybridMode();
                break;
        }
        ;
        Cookies.set(this.TreeFlavourCookie, mode, 30);
    };
    Stu3TreeTable.prototype.renderSnapshotMode = function () {
        this.cleanIndentation();
        var root = this.getContext().querySelector(".treetable tr[data-id]:not([data-ParentId])");
        var childrenOfRoot = this.getVisibleElements(root.dataset["id"]);
        this.checkSnapshotRows(childrenOfRoot);
        this.indentTree();
        this.registerForEvents();
    };
    Stu3TreeTable.prototype.renderDiffMode = function () {
        this.cleanIndentation();
        var root = this.getContext().querySelector(".treetable tr[data-id]:not([data-ParentId])");
        var childrenOfRoot = this.getVisibleElements(root.dataset["id"]);
        this.checkDiffRows(childrenOfRoot);
        this.indentTree();
        this.registerForEvents();
    };
    Stu3TreeTable.prototype.renderHybridMode = function () {
        this.cleanIndentation();
        this.indentTree();
        this.registerForEvents();
    };
    Stu3TreeTable.prototype.cleanIndentation = function () {
        var children = this.getContext().querySelectorAll('.treetable tr[data-parentid]');
        for (var i = 0; i < children.length; i++) {
            children[i].style.display = "table-row";
            var tdElement = children[i].getElementsByTagName('td')[0];
            var spansToClear = tdElement.querySelectorAll("span.base");
            for (var j = 0; j < spansToClear.length; j++) {
                tdElement.removeChild(spansToClear[j]);
            }
        }
    };
    Stu3TreeTable.prototype.cleanPreviousMode = function () {
        var elements = this.getContext().querySelectorAll(".treetable tr");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "table-row";
            if (this.hasClass(elements[i], "mode-hidden")) {
                this.removeClass(elements[i], "mode-hidden");
            }
        }
    };
    Stu3TreeTable.prototype.checkSnapshotRows = function (rows) {
        for (var i = 0; i < rows.length; i++) {
            var currentRow = rows[i];
            if (this.hasClass(currentRow, "striped")) {
                currentRow.style.display = "none";
                this.addClass(currentRow, "mode-hidden");
            }
            var childRows = this.getVisibleElements(currentRow.dataset["id"]);
            this.checkSnapshotRows(childRows);
        }
    };
    Stu3TreeTable.prototype.checkDiffRows = function (rows) {
        for (var i = 0; i < rows.length; i++) {
            var currentRow = rows[i];
            if (!this.hasClass(currentRow, "constraints")) {
                currentRow.style.display = "none";
                this.addClass(currentRow, "mode-hidden");
            }
            var childRows = this.getVisibleElements(currentRow.dataset["id"]);
            this.checkDiffRows(childRows);
        }
    };
    Stu3TreeTable.prototype.getTreeRenderingMode = function () {
        var mode = null;
        if (this.hasFlavourButtons() === true) {
            mode = Cookies.get(this.TreeFlavourCookie);
        }
        if (mode == null) {
            var treetableWrapper = this.getContext().querySelector(".treetable-wrapper");
            var isDiff = this.hasClass(treetableWrapper, "diff");
            var isSnapshot = this.hasClass(treetableWrapper, "snapshot");
            if (isDiff)
                return "diff";
            if (isSnapshot)
                return "snapshot";
            return "hybrid";
        }
        return mode;
    };
    Stu3TreeTable.prototype.shouldHideElement = function (element) {
        var mode = this.getTreeRenderingMode();
        if (mode === "hybrid") {
            return false;
        }
        return this.hasClass(element, "mode-hidden");
    };
    Stu3TreeTable.prototype.addIndentation = function (children, depth, identationDictionary) {
        depth += 1;
        for (var i = 0; i < children.length; i++) {
            var localDepth = depth;
            var currentElementId = children[i].dataset.id;
            var tdElement = children[i].getElementsByTagName('td')[0];
            var currentElementChildren = this.getVisibleElements(currentElementId);
            var hasChildren = currentElementChildren.length > 0;
            var isLast = i === children.length - 1;
            if (isLast) {
                identationDictionary[depth - 1] = this.createSpan('base spacer');
            }
            else {
                identationDictionary[depth - 1] = this.createSpan('base vline');
                ;
            }
            var defaultState = null;
            var trElement = tdElement.parentElement;
            if (this.hasClass(trElement, 'collapsed')) {
                defaultState = 'collapsed';
            }
            while (localDepth - 1 >= 1) {
                localDepth = localDepth - 1;
                if (localDepth === depth - 1 && defaultState === 'collapsed' && hasChildren && !isLast) {
                    tdElement.insertBefore(this.createSpan('base vjoinexpandable'), tdElement.childNodes[0]);
                    this.hideUnderlyingElements(trElement.dataset.id);
                }
                else if (localDepth === depth - 1 && defaultState === 'collapsed' && hasChildren && isLast) {
                    tdElement.insertBefore(this.createSpan('base vjoinendexpandable'), tdElement.childNodes[0]);
                    this.hideUnderlyingElements(trElement.dataset.id);
                }
                else if (localDepth === depth - 1 && hasChildren && isLast) {
                    tdElement.insertBefore(this.createSpan('base vjoinendcollapsible'), tdElement.childNodes[0]);
                }
                else if (localDepth === depth - 1 && hasChildren && !isLast) {
                    tdElement.insertBefore(this.createSpan('base vjoincollapsible'), tdElement.childNodes[0]);
                }
                else if (localDepth === depth - 1 && !hasChildren && !isLast) {
                    tdElement.insertBefore(this.createSpan('base vjoin'), tdElement.childNodes[0]);
                }
                else if (localDepth === depth - 1 && !hasChildren && isLast) {
                    tdElement.insertBefore(this.createSpan('base vjoinend'), tdElement.childNodes[0]);
                }
                else if (identationDictionary[localDepth] !== undefined) {
                    tdElement.insertBefore(identationDictionary[localDepth].cloneNode(), tdElement.childNodes[0]);
                }
            }
            this.addIndentation(currentElementChildren, depth, identationDictionary);
        }
    };
    Stu3TreeTable.prototype.toggleActiveButton = function (element) {
        var currentlyActiveButton = this.getContext().querySelector(".treetable-buttons .tree-button.active");
        this.removeClass(currentlyActiveButton, "active");
        this.addClass(element, "active");
    };
    Stu3TreeTable.prototype.switchTreeMode = function (element) {
        if (this.hasFlavourButtons() === true) {
            var mode = element.dataset["mode"];
            this.toggleActiveButton(element);
            this.renderTree(mode);
            if (this.hasDetailsPinned === true) {
                this.pinRootNode();
            }
            this.resizeRightPanel();
        }
    };
    Stu3TreeTable.prototype.pinRootNode = function () {
        this.hasDetailsPinned = true;
        var root = this.getContext().querySelector(".treetable tr[data-id]:not([data-ParentId])");
        this.showDetails(root);
        var span = this.getContext().querySelector(".details-popup .pin-control");
        if (!this.hasClass(span, "pinned")) {
            span.classList.remove("unpinned");
            span.classList.add("pinned");
        }
        this.setTreetableWrapperHeight();
        this.resizeRightPanel();
    };
    Stu3TreeTable.prototype.getContext = function () {
        return document.getElementById(this.parentContainerId);
    };
    Stu3TreeTable.prototype.initPolyfills = function () {
        this.elementMatchesPolyfill();
    };
    Stu3TreeTable.prototype.elementMatchesPolyfill = function () {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) {
                        }
                        return i > -1;
                    };
        }
    };
    Stu3TreeTable.prototype.markRow = function (row) {
        var selected = this.getContext().querySelector("tr.selected");
        if (selected)
            this.removeClass(selected, "selected");
        if (selected != row)
            this.addClass(row, "selected");
    };
    Stu3TreeTable.prototype.initEventHandlerDictionary = function () {
        var me = this;
        me.eventHandlerDictionary['vjoinexpandable'] = function () {
            var parentId = me.getParentElementId(this);
            me.showChildren(parentId, this, 'vjoinexpandable', 'vjoincollapsible');
        };
        me.eventHandlerDictionary['vjoincollapsible'] = function () {
            var parentId = me.getParentElementId(this);
            me.hideChildren(parentId, this, 'vjoincollapsible', 'vjoinexpandable');
        };
        me.eventHandlerDictionary['vjoinendexpandable'] = function () {
            var parentId = me.getParentElementId(this);
            me.showChildren(parentId, this, 'vjoinendexpandable', 'vjoinendcollapsible');
        };
        me.eventHandlerDictionary['vjoinendcollapsible'] = function () {
            var parentId = me.getParentElementId(this);
            me.hideChildren(parentId, this, 'vjoinendcollapsible', 'vjoinendexpandable');
        };
        me.eventHandlerDictionary['selectRow'] = function (event) {
            if (me.hasClass(event.target, 'vjoinexpandable') ||
                me.hasClass(event.target, 'vjoincollapsible') ||
                me.hasClass(event.target, 'vjoinendexpandable') ||
                me.hasClass(event.target, 'vjoinendcollapsible')) {
                return;
            }
            var target = event.currentTarget != undefined ? event.currentTarget : event.target;
            me.markRow(target);
            if (me.hasDetails) {
                if (me.hasDetailsPinned &&
                    me.hasClass(target, "detailsexpanded") === false) {
                    me.changePopupContent(target);
                }
                else {
                    me.pinDetails();
                }
            }
        };
        me.eventHandlerDictionary['pin'] = function () {
            me.pinDetails();
        };
        me.eventHandlerDictionary['showpopup'] = function () {
            if (me.hasDetailsPinned) {
                me.changePopupContent(this);
            }
        };
        me.eventHandlerDictionary['popuphover'] = function () {
            if (!me.hasDetailsPinned) {
                me.showDetails(this);
            }
        };
        me.eventHandlerDictionary['switchmode'] = function () {
            me.switchTreeMode(this);
        };
        me.eventHandlerDictionary['hideDetails'] = function () {
            if (me.hasDetailsPinned === false) {
                var detailsPopup = me.getContext().querySelector(".details-popup");
                if (detailsPopup != null) {
                    var id = detailsPopup.dataset["id"];
                    var rowElement = me.getContext().querySelector('tr[data-id="' + id + '"]');
                    me.hideExpandedDetails(rowElement, detailsPopup);
                }
            }
        };
        me.eventHandlerDictionary['keydown'] = function (event) {
            if (event.target instanceof HTMLAnchorElement)
                return;
            switch (event.keyCode) {
                case 40:// arrow down
                    event.preventDefault();
                    selectNextNode();
                    break;
                case 38:// arrow up
                    event.preventDefault();
                    selectPreviousNode();
                    break;
                case 32: // space
                case 13:// enter
                    event.preventDefault();
                    toggleCurrentNode();
                    break;
            }
            function selectNextNode() {
                var currentNode = getCurrentNode();
                if (currentNode == undefined) {
                    if (me.hasDetails) {
                        me.pinRootNode();
                    }
                    var root = me.getContext().querySelector(".treetable tr[data-id]:not([data-ParentId])");
                    me.markRow(root);
                    return;
                }
                var nextNode = findNext(currentNode);
                if (nextNode != undefined) {
                    nextNode.click();
                }
            }
            function selectPreviousNode() {
                var currentNode = getCurrentNode();
                if (currentNode != null) {
                    var previousNode = findPrevious(currentNode);
                    if (previousNode != undefined) {
                        previousNode.click();
                    }
                }
            }
            function toggleCurrentNode() {
                var currentNode = getCurrentNode();
                if (currentNode != undefined) {
                    var button = currentNode.querySelector(".vjoincollapsible");
                    if (button == undefined)
                        button = currentNode.querySelector(".vjoinexpandable");
                    if (button == undefined)
                        button = currentNode.querySelector(".vjoinendexpandable");
                    if (button == undefined)
                        button = currentNode.querySelector(".vjoinendcollapsible");
                    var element = button;
                    if (element != undefined) {
                        element.click();
                    }
                }
            }
            function getCurrentNode() {
                return me.getContext().querySelector("tr.selected");
            }
            function findNext(element) {
                if (!element)
                    return;
                var next = element.nextElementSibling;
                while (next) {
                    if (isVisible(next))
                        return next;
                    next = next.nextElementSibling;
                }
            }
            function findPrevious(element) {
                if (!element)
                    return;
                var previous = element.previousElementSibling;
                while (previous) {
                    if (isVisible(previous))
                        return previous;
                    previous = previous.previousElementSibling;
                }
            }
            function isVisible(element) {
                return element.offsetWidth > 0 || element.offsetHeight > 0;
            }
        };
    };
    Stu3TreeTable.prototype.showChildren = function (parentId, element, className, newClassName) {
        var collapsibleElements = this.getVisibleElements(parentId);
        for (var i = 0; i < collapsibleElements.length; i++) {
            var currentElement = collapsibleElements[i];
            if (!this.shouldHideElement(currentElement)) {
                var currentElementId = currentElement.dataset["id"];
                var selector = '[data-id="' + currentElementId + '"] td';
                var span = currentElement.querySelector(selector + " .vjoinendcollapsible, " + selector + ' .vjoincollapsible');
                if (span !== null) {
                    this.showChildren(currentElementId, null, null, null);
                }
                currentElement.style.display = 'table-row';
                if (this.hasClass(currentElement, "detailsexpanded")) {
                    var detailsElement = this.getContext().querySelector(".details-popup");
                    detailsElement.style.display = "block";
                }
            }
        }
        if (element !== undefined && element !== null) {
            element.className = 'base ' + newClassName;
            this.registerEventSingle(element, 'click', this.eventHandlerDictionary[newClassName]);
        }
        this.setRightPanelHeightSameAsLeftPanelHeight();
        this.recalculateDetailsPopupPosition();
    };
    Stu3TreeTable.prototype.registerEventSingle = function (element, type, eventHandle) {
        switch (type) {
            case 'click': {
                element.onclick = eventHandle;
                break;
            }
            case 'hover': {
                element.onmouseover = eventHandle;
                break;
            }
            default: {
                element.addEventListener(type, eventHandle);
                break;
            }
        }
    };
    Stu3TreeTable.prototype.getVisibleElements = function (parentId) {
        var parentSelector = '[data-ParentId="' + parentId + '"]';
        var collapsibleElements = this.getContext().querySelectorAll(parentSelector);
        var visibleElements = [];
        var increment = 0;
        for (var i = 0; i < collapsibleElements.length; i++) {
            if (!this.hasClass(collapsibleElements[i], "mode-hidden")) {
                visibleElements[increment] = collapsibleElements[i];
                increment++;
            }
        }
        return visibleElements;
    };
    Stu3TreeTable.prototype.getParentElementId = function (element) {
        var parent = element.parentElement.parentElement;
        var parentId = parent.dataset.id;
        return parentId;
    };
    Stu3TreeTable.prototype.hideChildren = function (parentId, element, className, newClassName) {
        if (element !== undefined) {
            this.hideUnderlyingElements(parentId);
            element.className = 'base ' + newClassName;
            this.registerEventSingle(element, 'click', this.eventHandlerDictionary[newClassName]);
            this.setRightPanelHeightSameAsLeftPanelHeight();
            this.recalculateDetailsPopupPosition();
        }
    };
    Stu3TreeTable.prototype.hideUnderlyingElements = function (parentId) {
        var collapsibleElements = this.getVisibleElements(parentId);
        for (var i = 0; i < collapsibleElements.length; i++) {
            var currentElement = collapsibleElements[i];
            if (this.hasClass(currentElement, "detailsexpanded")) {
                var detailsElement = this.getContext().querySelector(".details-popup");
                detailsElement.style.display = "none";
            }
            var currentElementId = currentElement.dataset["id"];
            this.hideUnderlyingElements(currentElementId);
            currentElement.style.display = 'none';
        }
    };
    Stu3TreeTable.prototype.indentTree = function () {
        var selector = 'tr:not([data-parentId]):not(.mode-hidden)';
        var roots = this.getContext().querySelectorAll(selector);
        for (var i = 0; i < roots.length; i++) {
            var depth = 1;
            var parent = roots[i];
            var parentId = parent.dataset["id"];
            var children = this.getVisibleElements(parentId);
            var isParentLast = i === roots.length - 1;
            var identationDictionary = [];
            if (isParentLast) {
                identationDictionary[depth] = this.createSpan('base spacer');
            }
            else {
                identationDictionary[depth] = this.createSpan('base vline');
            }
            this.addIndentation(children, depth, identationDictionary);
        }
    };
    Stu3TreeTable.prototype.createSpan = function (className) {
        var span = document.createElement('SPAN');
        span.className = className;
        return span;
    };
    Stu3TreeTable.prototype.hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    };
    Stu3TreeTable.prototype.addClass = function (element, className) {
        var classNames = this.getCurrentClassesAsArray(element);
        classNames.push(className);
        var newClass = this.convertClassArrayNamesToString(classNames);
        element.setAttribute("class", newClass);
    };
    Stu3TreeTable.prototype.getCurrentClassesAsArray = function (element) {
        var currentClass = element.getAttribute("class");
        if (currentClass === undefined || currentClass === null) {
            currentClass = "";
        }
        var classes = currentClass.split(" ");
        return classes;
    };
    Stu3TreeTable.prototype.convertClassArrayNamesToString = function (classNames) {
        var resultClass = classNames.join(" ");
        return resultClass;
    };
    Stu3TreeTable.prototype.removeClass = function (element, className) {
        var classNames = this.getCurrentClassesAsArray(element);
        var indexOfClass = classNames.indexOf(className);
        classNames.splice(indexOfClass, 1);
        var newClassName = this.convertClassArrayNamesToString(classNames);
        element.setAttribute("class", newClassName);
    };
    Stu3TreeTable.prototype.registerForEvents = function () {
        this.registerEvent('.vjoinexpandable', 'click', this.eventHandlerDictionary['vjoinexpandable']);
        this.registerEvent('.vjoincollapsible', 'click', this.eventHandlerDictionary['vjoincollapsible']);
        this.registerEvent('.vjoinendcollapsible', 'click', this.eventHandlerDictionary['vjoinendcollapsible']);
        this.registerEvent('.vjoinendexpandable', 'click', this.eventHandlerDictionary['vjoinendexpandable']);
        this.registerEvent('.treetable-buttons .tree-control .tree-button', 'click', this.eventHandlerDictionary['switchmode']);
        this.registerEvent('.treetable', 'keydown', this.eventHandlerDictionary['keydown']);
        this.registerEvent('.treetable tr', 'click', this.eventHandlerDictionary['selectRow']);
        if (this.hasDetails) {
            this.registerEvent('.details-popup .pin-control', 'click', this.eventHandlerDictionary['pin']);
            this.registerEvent('.treetable tr', 'hover', this.eventHandlerDictionary['popuphover']);
            this.registerEvent('.treetable-wrapper', 'mouseleave', this.eventHandlerDictionary['hideDetails']);
        }
    };
    Stu3TreeTable.prototype.changePopupContent = function (element) {
        if (!this.hasDetailsPinned)
            return;
        var hasOpenedDetails = element.getAttribute("class").indexOf("detailsexpanded") !== -1;
        if (this.hasDetailsPinned && hasOpenedDetails) {
            return;
        }
        else {
            this.showDetails(element);
        }
        this.changePinIcon();
    };
    Stu3TreeTable.prototype.registerEvent = function (selector, type, eventHandle) {
        var elems = this.getContext().querySelectorAll(selector);
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            this.registerEventSingle(elem, type, eventHandle);
        }
    };
    Stu3TreeTable.prototype.pinDetails = function () {
        var detailsPopup = this.getContext().querySelector(".details-popup");
        var id = detailsPopup.dataset["id"];
        var rowElement = this.getContext().querySelector('tr[data-id="' + id + '"]');
        this.hasDetailsPinned = !this.hasDetailsPinned;
        this.showDetails(rowElement);
        this.changePinIcon();
    };
    Stu3TreeTable.prototype.changePinIcon = function () {
        var span = this.getContext().querySelector(".details-popup .pin-control");
        if (this.hasClass(span, "pinned")) {
            span.classList.remove("pinned");
            span.classList.add("unpinned");
        }
        else {
            span.classList.remove("unpinned");
            span.classList.add("pinned");
        }
    };
    Stu3TreeTable.prototype.getDetailsWrapperDiv = function () {
        var divId = "test";
        var wrapper = this.getContext().querySelector(".treetable-right-panel");
        var div = wrapper.querySelector("#" + divId);
        if (div === undefined || div === null) {
            div = document.createElement("div");
            div.setAttribute("id", divId);
            wrapper.appendChild(div);
        }
        return div;
    };
    Stu3TreeTable.prototype.hideExpandedDetails = function (tableRow, div) {
        var expandedDetails = this.getContext().querySelector(".detailsexpanded");
        if (expandedDetails !== undefined && expandedDetails !== null) {
            this.removeClass(expandedDetails, "detailsexpanded");
            div.setAttribute("class", "hidden");
            div.removeAttribute("data-id");
            this.setRightPanelHeightSameAsLeftPanelHeight();
        }
    };
    Stu3TreeTable.prototype.showDetails = function (rowElement) {
        var rowId = rowElement.getAttribute("data-id");
        var detailsElement = this.getDetailsWrapperDiv();
        var detailsElementId = detailsElement.getAttribute("data-id");
        var isNotSameRowAsBefore = rowId != detailsElementId;
        if (isNotSameRowAsBefore) {
            this.hideExpandedDetails(rowElement, detailsElement);
            var detailsContentColumn = rowElement.querySelector(".details");
            this.addClass(rowElement, "detailsexpanded");
            if (detailsContentColumn !== undefined && detailsContentColumn !== null && detailsContentColumn.innerHTML != "") {
                detailsElement.innerHTML = detailsContentColumn.innerHTML;
                detailsElement.setAttribute("data-id", rowId);
                detailsElement.setAttribute("class", "details-popup");
                detailsElement.style.display = "block";
                this.setDetailsPopupPosition(detailsElement, rowElement);
                var pin = rowElement.querySelector(".pin-control");
                pin.classList.add("unpinned");
                this.registerEvent('.details-popup .pin-control', 'click', this.eventHandlerDictionary['pin']);
            }
        }
    };
    Stu3TreeTable.prototype.setDetailsPopupPosition = function (detailsElement, rowElement) {
        if (rowElement == null)
            return;
        var rowElementBoundingBox = rowElement.getBoundingClientRect();
        var containerBoundingBox = this.getContext().querySelector(".treetable").getBoundingClientRect();
        var detailsTopPosition = rowElementBoundingBox.top - containerBoundingBox.top;
        var detailsBottomPosition = detailsTopPosition + detailsElement.getBoundingClientRect().height;
        var lastRowElement = this.getLastVisibleRowElement();
        var lastRowElementBoundingBox = lastRowElement.getBoundingClientRect();
        var lastRowPositionBottom = (lastRowElementBoundingBox.top - containerBoundingBox.top) + lastRowElementBoundingBox.height;
        while (true) {
            var isDetailsBottomPositionOutOfView = detailsBottomPosition > lastRowPositionBottom;
            if (isDetailsBottomPositionOutOfView) {
                detailsTopPosition -= 5;
                detailsBottomPosition -= 5;
                continue;
            }
            var errorMargin = 0;
            var isRowElementBellowDetailsTopPosition = (rowElementBoundingBox.top - containerBoundingBox.top) > detailsTopPosition;
            if (isRowElementBellowDetailsTopPosition) {
                errorMargin = lastRowPositionBottom - (detailsTopPosition + detailsElement.getBoundingClientRect().height);
            }
            detailsTopPosition = detailsTopPosition < 0 ? 0 : detailsTopPosition + errorMargin;
            break;
        }
        detailsElement.style.marginTop = detailsTopPosition + "px";
        this.resizeRightPanel();
    };
    Stu3TreeTable.prototype.resizeRightPanel = function () {
        var rightPanelNewHeight = this.calculateNewRightPanelHeight();
        if (rightPanelNewHeight != undefined) {
            var rightPanel = this.getContext().querySelector(".treetable-right-panel");
            rightPanel.style.height = rightPanelNewHeight + "px";
            this.setTreetableWrapperHeight();
        }
    };
    Stu3TreeTable.prototype.calculateNewRightPanelHeight = function () {
        var rightPanelNewHeight = undefined;
        var detailsElement = this.getContext().querySelector(".details-popup");
        var treeElementBoundingBox = this.getContext().querySelector(".treetable").getBoundingClientRect();
        if (detailsElement != null) {
            var detailsElementBoundingBox = detailsElement.getBoundingClientRect();
            if (detailsElementBoundingBox.height > treeElementBoundingBox.height) {
                rightPanelNewHeight = detailsElementBoundingBox.height;
            }
            else if (detailsElementBoundingBox.height < treeElementBoundingBox.height) {
                rightPanelNewHeight = treeElementBoundingBox.height;
            }
        }
        else {
            rightPanelNewHeight = treeElementBoundingBox.height;
        }
        return rightPanelNewHeight;
    };
    Stu3TreeTable.prototype.setRightPanelHeightSameAsLeftPanelHeight = function () {
        var hasRightPanel = this.elementExists(".treetable-right-panel");
        if (hasRightPanel) {
            var leftPanel = this.getContext().querySelector(".treetable-left-panel");
            var rightPanel = this.getContext().querySelector(".treetable-right-panel");
            rightPanel.style.height = leftPanel.clientHeight + "px";
            this.setTreetableWrapperHeight();
        }
    };
    Stu3TreeTable.prototype.recalculateDetailsPopupPosition = function () {
        var hasRightPanel = this.elementExists(".treetable-right-panel");
        if (hasRightPanel) {
            var detailsElement = this.getDetailsWrapperDiv();
            var element = this.getContext().querySelector(".treetable tr.detailsexpanded");
            this.setDetailsPopupPosition(detailsElement, element);
        }
    };
    Stu3TreeTable.prototype.setTreetableWrapperHeight = function () {
        var leftPanel = this.getContext().querySelector(".treetable-left-panel");
        var rightPanel = this.getContext().querySelector(".treetable-right-panel");
        var treetableWrapper = this.getContext().querySelector(".treetable-wrapper");
        var height = Math.max(leftPanel.clientHeight, rightPanel.clientHeight);
        treetableWrapper.style.height = height + "px";
    };
    Stu3TreeTable.prototype.getLastVisibleRowElement = function () {
        var lastVisibleRow;
        var rows = this.getContext().querySelectorAll("table tr");
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].style.display != 'none') {
                    lastVisibleRow = rows[i];
                }
            }
        }
        return lastVisibleRow;
    };
    Stu3TreeTable.prototype.hasFlavourButtons = function () {
        return this.getContext().querySelector(".treetable-buttons") != null;
    };
    Stu3TreeTable.prototype.elementExists = function (selector) {
        return this.getContext().querySelector(selector) != undefined;
    };
    return Stu3TreeTable;
}());
