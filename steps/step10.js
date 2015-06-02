'use strict';

var dialog = {

    overlay: document.createElement('div'),

    focusable: 'a[href], area, button, select, textarea, *[tabindex="0"], input:not([type="hidden"])',

    hideEm: function (d) {

        var couldFocus = document.querySelectorAll(this.focusable),
            cLength = couldFocus.length,
            dChildren = document.querySelectorAll('#' + d + ' *'),
            dLength = dChildren.length;

        for(var x = 0; x < dLength; x++){
            dChildren[x].classList.add('in-dialog');
        }

        for (var i = 0; i < cLength; ++i) {

            if (couldFocus[i].style.display !== 'none' && (!couldFocus[i].classList.contains('in-dialog'))) {
                couldFocus[i].setAttribute('tabindex', '-1');
                couldFocus[i].setAttribute('aria-hidden', 'true');
                couldFocus[i].classList.add('hidden-by-modal');
            }
        }
    },

    unHideEm: function () {
        var toUnHide = document.querySelectorAll('.hidden-by-modal'),
            tLength = toUnHide.length;

        for (var i = 0; i < tLength; ++i) {
            toUnHide[i].setAttribute('tabindex', '0');
            toUnHide[i].setAttribute('aria-hidden', 'false');
            toUnHide[i].classList.remove('hidden-by-modal');
        }
    },

    open: function (d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode,
            cButton = document.getElementById('close-button');

        this.overlay.setAttribute('id', 'overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        this.hideEm(d);

        tehDialog.style.display = 'block';
        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.setAttribute('role', 'dialog');
        tehDialog.setAttribute('aria-labelledby', 'dLabel');
        tehDialog.style.outline = 'none';

        cButton.focus();
    },

    close: function (d, n) {
        var tehDialog = document.getElementById(d),
            nextLocation = document.getElementById(n);

        this.unHideEm();
        this.overlay.remove();
        tehDialog.style.display = 'none';
        nextLocation.focus();

    }

};

var dOpener = document.getElementById('sign-in');

dOpener.setAttribute('role', 'button');

dOpener.addEventListener('click', function () {
        dialog.open('tehDialog');
    }, false
);

dOpener.addEventListener('keydown', function (event) {

        var code = event.charCode || event.keyCode;
        if (event.type === 'keydown') {
            if (code === 32 || code === 13) {
                event.preventDefault();
                dialog.open('tehDialog');
            }
        }
    }, false
);


document.onkeydown = function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        dialog.close('tehDialog', 'sign-in');
    }
};


var closer = document.getElementById('close-button');

closer.setAttribute('role', 'button');
closer.setAttribute('aria-label', 'Close Dialog');

closer.addEventListener('click', function () {
        dialog.close('tehDialog', 'sign-in');
    }, false
);

closer.addEventListener('keydown', function (event) {

        var code = event.charCode || event.keyCode;
        if (event.type === 'keydown') {
            if (code === 32 || code === 13) {
                event.preventDefault();
                dialog.close('tehDialog', 'sign-in');
            }
        }
    }, false
);

