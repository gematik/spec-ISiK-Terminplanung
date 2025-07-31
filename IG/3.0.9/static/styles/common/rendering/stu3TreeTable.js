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
var TreeSettings = /** @class */ (function () {
    function TreeSettings() {
    }
    TreeSettings.ShowCommonResourceElements = "ShowCommonResourceElements";
    return TreeSettings;
}());
var Stu3TreeTable = /** @class */ (function () {
    function Stu3TreeTable(isRootCollapsible) {
        this.TreeFlavourCookie = "tree";
        this.TreeSettingsCookie = "tree-settings";
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
        TreeHelper.initPolyfills();
        this.parentContainerId = containerId;
        this.initEventHandlerDictionary();
        this.hasDetails = this.elementExists(".treetable-right-panel");
        this.getContext().querySelector(".treetable").setAttribute("tabindex", "0");
        this.contextQuerySelector = new CachedQuerySelector(this.getContext());
        var mode = this.getTreeRenderingMode();
        var settings = this.getTreeRenderingSettings();
        this.initSettingButtons(settings);
        if (this.hasFlavourButtons() === true) {
            var buttonElement = this.getContext().querySelectorAll("[data-mode='".concat(mode, "']"))[0];
            this.switchTreeMode(buttonElement, false);
        }
        else {
            this.renderTree(mode, settings);
        }
    };
    Stu3TreeTable.prototype.expandNode = function (currentNode, currentLevel, levelsToExpand) {
        var _this = this;
        if (currentLevel === levelsToExpand)
            return;
        var visibleElements = this.getVisibleChildren(currentNode.getAttribute("data-id"));
        visibleElements.forEach(function (node, index) {
            var isCollapsed = TreeHelper.hasClass(node, "collapsed");
            if (isCollapsed) {
                var button = node.querySelector(".vjoinexpandable");
                if (button == null) {
                    button = node.querySelector(".vjoinendexpandable");
                }
                if (button != null) {
                    button.click();
                }
            }
            _this.expandNode(node, (currentLevel + 1), levelsToExpand);
        });
    };
    Stu3TreeTable.prototype.hideTreeLevels = function (levelToStartHidingNodes) {
        if (levelToStartHidingNodes < 0)
            return; // Show all
        // Note that the tree is fully expanded at this point so we must hide nodes
        // deeper than levelToStartHidingNodes.
        var rootNode = this.getContext().querySelector("tr");
        this.hideNodes(rootNode, 1, levelToStartHidingNodes);
    };
    Stu3TreeTable.prototype.hideNodes = function (currentNode, currentLevel, levelToStartHidingNodes) {
        var nodes = this.getVisibleChildren(currentNode.getAttribute("data-id"));
        if (currentLevel >= levelToStartHidingNodes) {
            for (var i = 0; i < nodes.length; i++) {
                this.hideUnderlyingElements(nodes[i].dataset.id);
            }
        }
        else {
            for (var i = 0; i < nodes.length; i++) {
                this.hideNodes(nodes[i], currentLevel + 1, levelToStartHidingNodes);
            }
        }
    };
    Stu3TreeTable.prototype.renderTree = function (mode, settings) {
        this.cleanPreviousMode();
        var tree = this.getContext().querySelector(".treetable-wrapper");
        tree.className = "treetable-wrapper ".concat(mode);
        switch (mode) {
            case "snapshot":
                this.renderSnapshotMode(settings);
                break;
            case "diff":
                this.renderDiffMode(settings);
                break;
            case "hybrid":
                this.renderHybridMode(settings);
                break;
        }
        ;
        var levelToStartHidingNodes = parseInt(this.getContext().getAttribute("data-level"));
        this.indentTree(levelToStartHidingNodes);
        this.registerForEvents();
        this.hideTreeLevels(levelToStartHidingNodes);
    };
    Stu3TreeTable.prototype.renderSnapshotMode = function (settings) {
        var handlers = [this.hideStripedElement];
        if (!this.hasTreeRenderingSetting(settings, TreeSettings.ShowCommonResourceElements))
            handlers = handlers.concat(this.hideCommonElement);
        this.visitTree(handlers);
    };
    Stu3TreeTable.prototype.renderDiffMode = function (settings) {
        var handlers = [this.hideNonConstrainedElement];
        this.visitTree(handlers);
    };
    Stu3TreeTable.prototype.renderHybridMode = function (settings) {
        var handlers = [];
        if (!this.hasTreeRenderingSetting(settings, TreeSettings.ShowCommonResourceElements))
            handlers = handlers.concat(this.hideCommonElement);
        this.visitTree(handlers);
    };
    Stu3TreeTable.prototype.cleanPreviousMode = function () {
        var elements = this.contextQuerySelector.getAll(".treetable tr");
        for (var i = 0; i < elements.length; i++) {
            // Show element
            elements[i].style.display = "table-row";
            if (TreeHelper.hasClass(elements[i], "mode-hidden")) {
                TreeHelper.removeClass(elements[i], "mode-hidden");
            }
            // Clean indentation
            var tdElement = elements[i].getElementsByTagName('td')[0];
            if (tdElement == null)
                continue;
            var spansToClear = tdElement.querySelectorAll("span.base");
            for (var j = 0; j < spansToClear.length; j++) {
                tdElement.removeChild(spansToClear[j]);
            }
        }
    };
    Stu3TreeTable.prototype.visitTree = function (handlers) {
        if (handlers.length == 0)
            return;
        var root = this.getContext().querySelector(".treetable tr[data-id]:not([data-ParentId])");
        var childrenOfRoot = this.getChildren(root.dataset["id"]);
        this.visitElements(childrenOfRoot, handlers);
    };
    Stu3TreeTable.prototype.visitElements = function (elements, handlers) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            for (var j = 0; j < handlers.length; j++)
                handlers[j](element);
            var childElements = this.getChildren(element.dataset["id"]);
            if (childElements.length > 0)
                this.visitElements(childElements, handlers);
        }
    };
    Stu3TreeTable.prototype.hideStripedElement = function (element) {
        TreeHelper.hideElement(element, "striped", true);
    };
    Stu3TreeTable.prototype.hideNonConstrainedElement = function (element) {
        TreeHelper.hideElement(element, "constraints", false);
    };
    Stu3TreeTable.prototype.hideCommonElement = function (element) {
        TreeHelper.hideElement(element, "common", true);
    };
    Stu3TreeTable.prototype.getTreeRenderingMode = function () {
        var mode = null;
        if (this.hasFlavourButtons() === true)
            mode = Cookies.get(this.TreeFlavourCookie);
        if (mode == null) {
            var treetableWrapper = this.getContext().querySelector(".treetable-wrapper");
            var isDiff = TreeHelper.hasClass(treetableWrapper, "diff");
            var isSnapshot = TreeHelper.hasClass(treetableWrapper, "snapshot");
            if (isDiff)
                return "diff";
            if (isSnapshot)
                return "snapshot";
            return "hybrid";
        }
        return mode;
    };
    Stu3TreeTable.prototype.getTreeRenderingSettings = function () {
        if (this.hasFlavourButtons() === true) {
            var mode = Cookies.get(this.TreeSettingsCookie);
            if (mode != null && mode != "")
                return mode.split(",");
        }
        return [];
    };
    Stu3TreeTable.prototype.hasTreeRenderingSetting = function (settings, settingName) {
        return settings.filter(function (s) { return s == settingName; }).length > 0;
    };
    Stu3TreeTable.prototype.getSettingsCookieValue = function (settings) {
        if (settings.length == 0)
            return "";
        return settings.filter(function (s) { return s != ""; }).join();
    };
    Stu3TreeTable.prototype.shouldHideElement = function (element, mode) {
        if (mode === "hybrid") {
            return false;
        }
        return TreeHelper.hasClass(element, "mode-hidden");
    };
    Stu3TreeTable.prototype.addIndentation = function (children, depth, identationDictionary, levelToStartHidingNodes) {
        depth += 1;
        for (var i = 0; i < children.length; i++) {
            var localDepth = depth;
            var currentElementId = children[i].dataset.id;
            var tdElement = children[i].getElementsByTagName('td')[0];
            var currentElementChildren = this.getVisibleChildren(currentElementId);
            var hasChildren = currentElementChildren.length > 0;
            var isLast = i === children.length - 1;
            if (isLast) {
                identationDictionary[depth - 1] = TreeHelper.createSpan('base spacer');
            }
            else {
                identationDictionary[depth - 1] = TreeHelper.createSpan('base vline');
                ;
            }
            while (localDepth - 1 >= 1) {
                localDepth = localDepth - 1;
                if (localDepth === depth - 1) {
                    if (hasChildren) {
                        if (levelToStartHidingNodes >= 0 && depth - 1 >= levelToStartHidingNodes) {
                            if (isLast) {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoinendexpandable'), tdElement.childNodes[0]);
                            }
                            else {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoinexpandable'), tdElement.childNodes[0]);
                            }
                        }
                        else {
                            if (isLast) {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoinendcollapsible'), tdElement.childNodes[0]);
                            }
                            else {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoincollapsible'), tdElement.childNodes[0]);
                            }
                        }
                    }
                    else {
                        if (isLast) {
                            tdElement.insertBefore(TreeHelper.createSpan('base vjoinend'), tdElement.childNodes[0]);
                        }
                        else {
                            tdElement.insertBefore(TreeHelper.createSpan('base vjoin'), tdElement.childNodes[0]);
                        }
                    }
                }
                else if (identationDictionary[localDepth] !== undefined) {
                    tdElement.insertBefore(identationDictionary[localDepth].cloneNode(), tdElement.childNodes[0]);
                }
            }
            this.addIndentation(currentElementChildren, depth, identationDictionary, levelToStartHidingNodes);
        }
    };
    Stu3TreeTable.prototype.toggleActiveButton = function (element) {
        var currentlyActiveButton = this.getContext().querySelector(".treetable-buttons .tree-control .tree-button.active");
        TreeHelper.removeClass(currentlyActiveButton, "active");
        TreeHelper.addClass(element, "active");
    };
    Stu3TreeTable.prototype.toggleActive = function (element, isActive) {
        if (isActive)
            TreeHelper.removeClass(element, "active");
        else
            TreeHelper.addClass(element, "active");
    };
    Stu3TreeTable.prototype.toggleSettingButton = function (element) {
        var isActive = TreeHelper.hasClass(element, "active");
        this.toggleActive(element, isActive);
        return !isActive;
    };
    Stu3TreeTable.prototype.setSettingButton = function (element, setActive) {
        var isActive = TreeHelper.hasClass(element, "active");
        if (isActive != setActive)
            this.toggleActive(element, isActive);
    };
    Stu3TreeTable.prototype.initSettingButtons = function (settings) {
        var buttons = this.getContext().querySelectorAll(".treetable-buttons .tree-settings .tree-button");
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            var settingName = button.dataset["settings"];
            var setActive = this.hasTreeRenderingSetting(settings, settingName);
            this.setSettingButton(button, setActive);
        }
    };
    Stu3TreeTable.prototype.switchTreeMode = function (element, userClick) {
        if (this.hasFlavourButtons() === true) {
            var mode = element.dataset["mode"];
            var settings_1 = this.getTreeRenderingSettings();
            this.toggleActiveButton(element);
            this.updateTree(mode, settings_1);
            if (userClick)
                Cookies.set(this.TreeFlavourCookie, mode, 30);
        }
    };
    Stu3TreeTable.prototype.toggleTreeSettings = function (element, userClick) {
        if (this.hasFlavourButtons() === true) {
            var settingName = element.dataset["settings"];
            var mode = this.getTreeRenderingMode();
            var settings_2 = this.getTreeRenderingSettings().filter(function (s) { return s !== settingName; });
            var isSet = this.toggleSettingButton(element);
            if (isSet)
                settings_2 = settings_2.concat(settingName);
            this.updateTree(mode, settings_2);
            if (userClick)
                Cookies.set(this.TreeSettingsCookie, this.getSettingsCookieValue(settings_2), 30);
        }
    };
    Stu3TreeTable.prototype.updateTree = function (mode, settings) {
        var selectedNode = this.getContext().querySelector("tr.selected");
        this.renderTree(mode, settings);
        if (this.hasDetailsPinned === true) {
            var persistNode = selectedNode != undefined && selectedNode.checkVisibility();
            persistNode ? this.pinNode(selectedNode) : this.pinRootNode();
        }
        this.resizeRightPanel();
        this.updateSettingButtons(mode);
    };
    Stu3TreeTable.prototype.updateSettingButtons = function (mode) {
        $("#" + TreeSettings.ShowCommonResourceElements).prop("disabled", mode == "diff");
    };
    Stu3TreeTable.prototype.pinNode = function (node) {
        this.hasDetailsPinned = true;
        this.showDetails(node);
        var span = this.getContext().querySelector(".details-popup .pin-control");
        if (!TreeHelper.hasClass(span, "pinned")) {
            span.classList.remove("unpinned");
            span.classList.add("pinned");
        }
        this.setTreetableWrapperHeight();
        this.resizeRightPanel();
    };
    Stu3TreeTable.prototype.pinRootNode = function () {
        var root = this.getContext().querySelector(".treetable tr[data-id]:not([data-ParentId])");
        this.pinNode(root);
    };
    Stu3TreeTable.prototype.getContext = function () {
        return document.getElementById(this.parentContainerId);
    };
    Stu3TreeTable.prototype.markRow = function (row) {
        var selected = this.getContext().querySelector("tr.selected");
        if (selected)
            TreeHelper.removeClass(selected, "selected");
        if (selected != row)
            TreeHelper.addClass(row, "selected");
    };
    Stu3TreeTable.prototype.initEventHandlerDictionary = function () {
        var me = this;
        me.eventHandlerDictionary['vjoinexpandable'] = function () {
            var parentId = me.getParentElementId(this);
            me.showChildren(parentId, this, 'vjoincollapsible');
        };
        me.eventHandlerDictionary['vjoincollapsible'] = function () {
            var parentId = me.getParentElementId(this);
            me.hideChildren(parentId, this, 'vjoinexpandable');
        };
        me.eventHandlerDictionary['vjoinendexpandable'] = function () {
            var parentId = me.getParentElementId(this);
            me.showChildren(parentId, this, 'vjoinendcollapsible');
        };
        me.eventHandlerDictionary['vjoinendcollapsible'] = function () {
            var parentId = me.getParentElementId(this);
            me.hideChildren(parentId, this, 'vjoinendexpandable');
        };
        me.eventHandlerDictionary['selectRow'] = function (event) {
            if (TreeHelper.hasClass(event.target, 'vjoinexpandable') ||
                TreeHelper.hasClass(event.target, 'vjoincollapsible') ||
                TreeHelper.hasClass(event.target, 'vjoinendexpandable') ||
                TreeHelper.hasClass(event.target, 'vjoinendcollapsible')) {
                return;
            }
            var target = event.currentTarget != undefined ? event.currentTarget : event.target;
            me.markRow(target);
            if (me.hasDetails) {
                if (me.hasDetailsPinned &&
                    TreeHelper.hasClass(target, "detailsexpanded") === false) {
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
        me.eventHandlerDictionary['switchmode'] = function (event) {
            me.switchTreeMode(this, event.isTrusted);
        };
        me.eventHandlerDictionary['togglesettings'] = function (event) {
            me.toggleTreeSettings(this, event.isTrusted);
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
                case 40: // arrow down
                    event.preventDefault();
                    selectNextNode();
                    break;
                case 38: // arrow up
                    event.preventDefault();
                    selectPreviousNode();
                    break;
                case 32: // space
                case 13: // enter
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
    Stu3TreeTable.prototype.showChildren = function (parentId, element, newClassName) {
        var collapsibleElements = this.getVisibleChildren(parentId);
        var mode = this.getTreeRenderingMode();
        for (var i = 0; i < collapsibleElements.length; i++) {
            var currentElement = collapsibleElements[i];
            if (!this.shouldHideElement(currentElement, mode)) {
                var currentElementId = currentElement.dataset["id"];
                var selector = '[data-id="' + currentElementId + '"] td';
                var span = currentElement.querySelector(selector + " .vjoinendcollapsible, " + selector + ' .vjoincollapsible');
                if (span !== null) {
                    this.showChildren(currentElementId, null, null);
                }
                currentElement.style.display = 'table-row';
                if (TreeHelper.hasClass(currentElement, "detailsexpanded")) {
                    var detailsElement = this.getContext().querySelector(".details-popup");
                    detailsElement.style.display = "block";
                }
            }
        }
        if (element !== undefined && element !== null) {
            element.className = 'base ' + newClassName;
            TreeHelper.registerEventSingle(element, 'click', this.eventHandlerDictionary[newClassName]);
        }
        this.setRightPanelHeightSameAsLeftPanelHeight();
        this.recalculateDetailsPopupPosition();
    };
    Stu3TreeTable.prototype.getVisibleChildren = function (parentId) {
        var collapsibleElements = this.getChildren(parentId);
        var visibleElements = [];
        var increment = 0;
        for (var i = 0; i < collapsibleElements.length; i++) {
            if (!TreeHelper.hasClass(collapsibleElements[i], "mode-hidden")) {
                visibleElements[increment] = collapsibleElements[i];
                increment++;
            }
        }
        return visibleElements;
    };
    Stu3TreeTable.prototype.getChildren = function (parentId) {
        var parentSelector = '[data-ParentId="' + parentId + '"]';
        return this.contextQuerySelector.getAll(parentSelector);
    };
    Stu3TreeTable.prototype.getParentElementId = function (element) {
        var parent = element.parentElement.parentElement;
        var parentId = parent.dataset.id;
        return parentId;
    };
    Stu3TreeTable.prototype.hideChildren = function (parentId, element, newClassName) {
        if (element !== undefined) {
            this.hideUnderlyingElements(parentId);
            element.className = 'base ' + newClassName;
            TreeHelper.registerEventSingle(element, 'click', this.eventHandlerDictionary[newClassName]);
            this.setRightPanelHeightSameAsLeftPanelHeight();
            this.recalculateDetailsPopupPosition();
        }
    };
    Stu3TreeTable.prototype.hideUnderlyingElements = function (parentId) {
        var collapsibleElements = this.getVisibleChildren(parentId);
        for (var i = 0; i < collapsibleElements.length; i++) {
            var currentElement = collapsibleElements[i];
            if (TreeHelper.hasClass(currentElement, "detailsexpanded")) {
                var detailsElement = this.getContext().querySelector(".details-popup");
                detailsElement.style.display = "none";
            }
            var currentElementId = currentElement.dataset["id"];
            this.hideUnderlyingElements(currentElementId);
            currentElement.style.display = 'none';
        }
    };
    Stu3TreeTable.prototype.indentTree = function (levelToStartHidingNodes) {
        var selector = 'tr:not([data-parentId]):not(.mode-hidden)';
        var roots = this.contextQuerySelector.getAll(selector);
        for (var i = 0; i < roots.length; i++) {
            var depth = 1;
            var parent = roots[i];
            var parentId = parent.dataset["id"];
            var children = this.getVisibleChildren(parentId);
            var isParentLast = i === roots.length - 1;
            var identationDictionary = [];
            if (isParentLast) {
                identationDictionary[depth] = TreeHelper.createSpan('base spacer');
            }
            else {
                identationDictionary[depth] = TreeHelper.createSpan('base vline');
            }
            this.addIndentation(children, depth, identationDictionary, levelToStartHidingNodes);
        }
    };
    Stu3TreeTable.prototype.registerForEvents = function () {
        this.registerEvent('.vjoinexpandable', 'click', this.eventHandlerDictionary['vjoinexpandable']);
        this.registerEvent('.vjoincollapsible', 'click', this.eventHandlerDictionary['vjoincollapsible']);
        this.registerEvent('.vjoinendcollapsible', 'click', this.eventHandlerDictionary['vjoinendcollapsible']);
        this.registerEvent('.vjoinendexpandable', 'click', this.eventHandlerDictionary['vjoinendexpandable']);
        this.registerEvent('.treetable-buttons .tree-control .tree-button', 'click', this.eventHandlerDictionary['switchmode']);
        this.registerEvent('.treetable-buttons .tree-settings .tree-button', 'click', this.eventHandlerDictionary['togglesettings']);
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
            TreeHelper.registerEventSingle(elem, type, eventHandle);
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
        if (TreeHelper.hasClass(span, "pinned")) {
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
            TreeHelper.removeClass(expandedDetails, "detailsexpanded");
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
            TreeHelper.addClass(rowElement, "detailsexpanded");
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
        if (height > 0)
            treetableWrapper.style.height = height + "px";
    };
    Stu3TreeTable.prototype.getLastVisibleRowElement = function () {
        var lastVisibleRow;
        var rows = this.contextQuerySelector.getAll("table tr");
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
var InstanceTree = /** @class */ (function () {
    function InstanceTree() {
        this.eventHandlerDictionary = [];
        this.parentContainerId = "";
    }
    InstanceTree.prototype.init = function (containerId) {
        TreeHelper.initPolyfills();
        this.parentContainerId = containerId;
        this.initEventHandlerDictionary();
        this.getContext().querySelector(".treetable").setAttribute("tabindex", "0");
        this.contextQuerySelector = new CachedQuerySelector(this.getContext());
        var levelToStartHidingNodes = parseInt(this.getContext().getAttribute("data-level"));
        this.indentTree(levelToStartHidingNodes);
        this.registerForEvents();
        this.hideTreeLevels(levelToStartHidingNodes);
    };
    InstanceTree.prototype.hideTreeLevels = function (levelToStartHidingNodes) {
        if (levelToStartHidingNodes < 0)
            return; // Show all
        // Note that the tree is fully expanded at this point so we must hide nodes
        // deeper than levelToStartHidingNodes.
        var rootNode = this.getContext().querySelector("tr");
        this.hideNodes(rootNode, 1, levelToStartHidingNodes);
    };
    InstanceTree.prototype.hideNodes = function (currentNode, currentLevel, levelToStartHidingNodes) {
        var nodes = this.getChildNodes(currentNode.getAttribute("data-id"));
        if (currentLevel >= levelToStartHidingNodes) {
            for (var i = 0; i < nodes.length; i++) {
                this.hideUnderlyingElements(nodes[i].dataset.id);
            }
        }
        else {
            for (var i = 0; i < nodes.length; i++) {
                this.hideNodes(nodes[i], currentLevel + 1, levelToStartHidingNodes);
            }
        }
    };
    InstanceTree.prototype.expandNode = function (currentNode, currentLevel, levelsToExpand) {
        var _this = this;
        if (currentLevel === levelsToExpand)
            return;
        var nodes = this.getChildNodes(currentNode.getAttribute("data-id"));
        nodes.forEach(function (node, index) {
            var isCollapsed = TreeHelper.hasClass(node, "collapsed");
            if (isCollapsed) {
                var button = node.querySelector(".vjoinexpandable");
                if (button == null) {
                    button = node.querySelector(".vjoinendexpandable");
                }
                if (button != null) {
                    button.click();
                }
            }
            _this.expandNode(node, (currentLevel + 1), levelsToExpand);
        });
    };
    InstanceTree.prototype.getChildNodes = function (parentId) {
        var parentSelector = '[data-ParentId="' + parentId + '"]';
        return this.contextQuerySelector.getAll(parentSelector);
    };
    InstanceTree.prototype.getContext = function () {
        return document.getElementById(this.parentContainerId);
    };
    InstanceTree.prototype.markRow = function (row) {
        var selected = this.getContext().querySelector("tr.selected");
        if (selected)
            TreeHelper.removeClass(selected, "selected");
        if (selected != row)
            TreeHelper.addClass(row, "selected");
    };
    InstanceTree.prototype.initEventHandlerDictionary = function () {
        var me = this;
        me.eventHandlerDictionary['vjoinexpandable'] = function () {
            var parentId = me.getParentElementId(this);
            me.showChildren(parentId, this, 'vjoincollapsible');
        };
        me.eventHandlerDictionary['vjoincollapsible'] = function () {
            var parentId = me.getParentElementId(this);
            me.hideChildren(parentId, this, 'vjoinexpandable');
        };
        me.eventHandlerDictionary['vjoinendexpandable'] = function () {
            var parentId = me.getParentElementId(this);
            me.showChildren(parentId, this, 'vjoinendcollapsible');
        };
        me.eventHandlerDictionary['vjoinendcollapsible'] = function () {
            var parentId = me.getParentElementId(this);
            me.hideChildren(parentId, this, 'vjoinendexpandable');
        };
        me.eventHandlerDictionary['selectRow'] = function (event) {
            if (TreeHelper.hasClass(event.target, 'vjoinexpandable') ||
                TreeHelper.hasClass(event.target, 'vjoincollapsible') ||
                TreeHelper.hasClass(event.target, 'vjoinendexpandable') ||
                TreeHelper.hasClass(event.target, 'vjoinendcollapsible')) {
                return;
            }
            var target = event.currentTarget != undefined ? event.currentTarget : event.target;
            me.markRow(target);
        };
        me.eventHandlerDictionary['keydown'] = function (event) {
            if (event.target instanceof HTMLAnchorElement)
                return;
            switch (event.keyCode) {
                case 40: // arrow down
                    event.preventDefault();
                    selectNextNode();
                    break;
                case 38: // arrow up
                    event.preventDefault();
                    selectPreviousNode();
                    break;
                case 32: // space
                case 13: // enter
                    event.preventDefault();
                    toggleCurrentNode();
                    break;
            }
            function selectNextNode() {
                var currentNode = getCurrentNode();
                if (currentNode == undefined) {
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
    InstanceTree.prototype.showChildren = function (parentId, element, newClassName) {
        var collapsibleElements = this.getChildNodes(parentId);
        for (var i = 0; i < collapsibleElements.length; i++) {
            var currentElement = collapsibleElements[i];
            var currentElementId = currentElement.dataset["id"];
            var selector = '[data-id="' + currentElementId + '"] td';
            var span = currentElement.querySelector(selector + " .vjoinendcollapsible, " + selector + ' .vjoincollapsible');
            if (span !== null) {
                this.showChildren(currentElementId, null, null);
            }
            currentElement.style.display = 'table-row';
        }
        if (element !== undefined && element !== null) {
            element.className = 'base ' + newClassName;
            TreeHelper.registerEventSingle(element, 'click', this.eventHandlerDictionary[newClassName]);
        }
    };
    InstanceTree.prototype.getParentElementId = function (element) {
        var parent = element.parentElement.parentElement;
        var parentId = parent.dataset.id;
        return parentId;
    };
    InstanceTree.prototype.hideChildren = function (parentId, element, newClassName) {
        if (element !== undefined) {
            this.hideUnderlyingElements(parentId);
            element.className = 'base ' + newClassName;
            TreeHelper.registerEventSingle(element, 'click', this.eventHandlerDictionary[newClassName]);
        }
    };
    InstanceTree.prototype.hideUnderlyingElements = function (parentId) {
        var collapsibleElements = this.getChildNodes(parentId);
        for (var i = 0; i < collapsibleElements.length; i++) {
            var currentElement = collapsibleElements[i];
            var currentElementId = currentElement.dataset["id"];
            this.hideUnderlyingElements(currentElementId);
            currentElement.style.display = 'none';
        }
    };
    InstanceTree.prototype.indentTree = function (levelToStartHidingNodes) {
        var selector = 'tr:not([data-parentId]):not(.mode-hidden)';
        var roots = this.contextQuerySelector.getAll(selector);
        for (var i = 0; i < roots.length; i++) {
            var depth = 1;
            var parent = roots[i];
            var parentId = parent.dataset["id"];
            var children = this.getChildNodes(parentId);
            var isParentLast = i === roots.length - 1;
            var identationDictionary = [];
            if (isParentLast) {
                identationDictionary[depth] = TreeHelper.createSpan('base spacer');
            }
            else {
                identationDictionary[depth] = TreeHelper.createSpan('base vline');
            }
            this.addIndentation(children, depth, identationDictionary, levelToStartHidingNodes);
        }
    };
    InstanceTree.prototype.addIndentation = function (children, depth, identationDictionary, levelToStartHidingNodes) {
        depth += 1;
        for (var i = 0; i < children.length; i++) {
            var localDepth = depth;
            var currentElementId = children[i].dataset.id;
            var tdElement = children[i].getElementsByTagName('td')[0];
            var currentElementChildren = this.getChildNodes(currentElementId);
            var hasChildren = currentElementChildren.length > 0;
            var isLast = i === children.length - 1;
            if (isLast) {
                identationDictionary[depth - 1] = TreeHelper.createSpan('base spacer');
            }
            else {
                identationDictionary[depth - 1] = TreeHelper.createSpan('base vline');
                ;
            }
            while (localDepth - 1 >= 1) {
                localDepth = localDepth - 1;
                if (localDepth === depth - 1) {
                    if (hasChildren) {
                        if (levelToStartHidingNodes >= 0 && depth - 1 >= levelToStartHidingNodes) {
                            if (isLast) {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoinendexpandable'), tdElement.childNodes[0]);
                            }
                            else {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoinexpandable'), tdElement.childNodes[0]);
                            }
                        }
                        else {
                            if (isLast) {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoinendcollapsible'), tdElement.childNodes[0]);
                            }
                            else {
                                tdElement.insertBefore(TreeHelper.createSpan('base vjoincollapsible'), tdElement.childNodes[0]);
                            }
                        }
                    }
                    else {
                        if (isLast) {
                            tdElement.insertBefore(TreeHelper.createSpan('base vjoinend'), tdElement.childNodes[0]);
                        }
                        else {
                            tdElement.insertBefore(TreeHelper.createSpan('base vjoin'), tdElement.childNodes[0]);
                        }
                    }
                }
                else if (identationDictionary[localDepth] !== undefined) {
                    tdElement.insertBefore(identationDictionary[localDepth].cloneNode(), tdElement.childNodes[0]);
                }
            }
            this.addIndentation(currentElementChildren, depth, identationDictionary, levelToStartHidingNodes);
        }
    };
    InstanceTree.prototype.registerForEvents = function () {
        this.registerEvent('.vjoinexpandable', 'click', this.eventHandlerDictionary['vjoinexpandable']);
        this.registerEvent('.vjoincollapsible', 'click', this.eventHandlerDictionary['vjoincollapsible']);
        this.registerEvent('.vjoinendcollapsible', 'click', this.eventHandlerDictionary['vjoinendcollapsible']);
        this.registerEvent('.vjoinendexpandable', 'click', this.eventHandlerDictionary['vjoinendexpandable']);
        this.registerEvent('.treetable', 'keydown', this.eventHandlerDictionary['keydown']);
        this.registerEvent('.treetable tr', 'click', this.eventHandlerDictionary['selectRow']);
    };
    InstanceTree.prototype.registerEvent = function (selector, type, eventHandle) {
        var elems = this.getContext().querySelectorAll(selector);
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            TreeHelper.registerEventSingle(elem, type, eventHandle);
        }
    };
    return InstanceTree;
}());
// Be carefull when using the cached query selector class.
// You must be sure that that your selector references static (non changeable) elements!
var CachedQuerySelector = /** @class */ (function () {
    function CachedQuerySelector(context) {
        this.allCache = [];
        this.cache = [];
        this.context = context;
    }
    CachedQuerySelector.prototype.getAll = function (selector) {
        var selection = this.allCache[selector];
        if (selection)
            return selection;
        selection = this.context.querySelectorAll(selector);
        this.allCache[selector] = selection;
        return selection;
    };
    CachedQuerySelector.prototype.get = function (selector) {
        var selection = this.cache[selector];
        if (selection)
            return selection;
        selection = this.context.querySelector(selector);
        this.cache[selector] = selection;
        return selection;
    };
    return CachedQuerySelector;
}());
var TreeHelper;
(function (TreeHelper) {
    function registerEventSingle(element, type, eventHandle) {
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
    }
    TreeHelper.registerEventSingle = registerEventSingle;
    function convertClassArrayNamesToString(classNames) {
        var resultClass = classNames.join(" ");
        return resultClass;
    }
    TreeHelper.convertClassArrayNamesToString = convertClassArrayNamesToString;
    function getCurrentClassesAsArray(element) {
        var currentClass = element.getAttribute("class");
        if (currentClass === undefined || currentClass === null) {
            currentClass = "";
        }
        var classes = currentClass.split(" ");
        return classes;
    }
    TreeHelper.getCurrentClassesAsArray = getCurrentClassesAsArray;
    function removeClass(element, className) {
        var classNames = TreeHelper.getCurrentClassesAsArray(element);
        var indexOfClass = classNames.indexOf(className);
        classNames.splice(indexOfClass, 1);
        var newClassName = TreeHelper.convertClassArrayNamesToString(classNames);
        element.setAttribute("class", newClassName);
    }
    TreeHelper.removeClass = removeClass;
    function addClass(element, className) {
        var classNames = TreeHelper.getCurrentClassesAsArray(element);
        classNames.push(className);
        var newClass = TreeHelper.convertClassArrayNamesToString(classNames);
        element.setAttribute("class", newClass);
    }
    TreeHelper.addClass = addClass;
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    TreeHelper.hasClass = hasClass;
    function hideElement(element, cls, hasClass) {
        if (TreeHelper.hasClass(element, cls) == hasClass && element.style.display != "none") {
            element.style.display = "none";
            TreeHelper.addClass(element, "mode-hidden");
        }
    }
    TreeHelper.hideElement = hideElement;
    function createSpan(className) {
        var span = document.createElement('SPAN');
        span.className = className;
        return span;
    }
    TreeHelper.createSpan = createSpan;
    function initPolyfills() {
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
    }
    TreeHelper.initPolyfills = initPolyfills;
})(TreeHelper || (TreeHelper = {}));
