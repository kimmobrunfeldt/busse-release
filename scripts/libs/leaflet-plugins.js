// Expose icon element with getter
L.Marker.include({
    getIcon: function() {
        return this._icon;
    }
});

// Icon which takes a dom element instead of html string
L.ElementIcon = L.Icon.extend({
    options: {
        iconSize: [12, 12], // also can be set through CSS
        /*
        iconAnchor: (Point)
        popupAnchor: (Point)
        html: (String)
        bgPos: (Point)
        */
        className: 'leaflet-element-icon',
        element: false
    },

    createIcon: function (oldIcon) {
        var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
            options = this.options;

        var element = options.element;
        if (element) {
            var isArray = Object.prototype.toString.call(element) === '[object Array]';
            if (isArray) {
                for (var i = 0; i < element; ++i) {
                    div.appendChild(element[i]);
                }
            } else {
                div.appendChild(element);
            }
        }

        if (options.bgPos) {
            div.style.backgroundPosition = (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
        }
        this._setIconStyles(div, 'icon');

        return div;
    },

    createShadow: function () {
        return null;
    }
});

L.elementIcon = function (options) {
    return new L.ElementIcon(options);
};
