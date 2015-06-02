'use strict';

var dialog = {

    overlay: document.createElement('div'),

    open: function (d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode,
            cButton = document.getElementById('close-button');

        this.overlay.setAttribute('id', 'overlay');
        dParent.insertBefore(this.overlay, tehDialog);
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

