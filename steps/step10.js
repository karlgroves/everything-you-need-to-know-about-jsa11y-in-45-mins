'use strict';

// STEP 10: Hide all the things
'use strict';

var axsdialog = {

    overlay: document.createElement('div'),

    open: function(d, w) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode,
            cButton = document.getElementById('close-button');

        var tehWrapper = document.getElementById(w);
            tehWrapper.setAttribute('aria-hidden', 'true');

        this.overlay.classList.add('axs_overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        tehDialog.classList.remove('axs_hidden');
        tehDialog.classList.add('axs_dialog_wrapper');

        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.setAttribute('role', 'dialog');
        tehDialog.setAttribute('aria-labelledby', 'dLabel');
        tehDialog.style.outline = 'none';
        cButton.focus();
    },

    close: function(d, n, w) {

        var tehDialog = document.getElementById(d),
            nextLocation = document.getElementById(n);
        this.overlay.remove();

        var tehWrapper = document.getElementById(w);
        tehWrapper.setAttribute('aria-hidden', 'false');

        tehDialog.classList.remove('axs_dialog_wrapper');
        tehDialog.classList.add('axs_hidden');

        nextLocation.focus();

    }

};

var dOpener = document.getElementById('sign-in');
dOpener.setAttribute('tabindex', '0');
dOpener.setAttribute('role', 'button');

dOpener.addEventListener('click', function() {
    axsdialog.open('tehDialog', 'wrap');
}, false);

dOpener.addEventListener('keydown', function(event) {

    var code = event.charCode || event.keyCode;
    if (event.type === 'keydown') {
        if (code === 32 || code === 13) {
            event.preventDefault();
            axsdialog.open('tehDialog');
        }
    }
}, false);

document.onkeydown = function(e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        axsdialog.close('tehDialog', 'sign-in', 'wrap');
    }
};



var closeButton = document.createElement('button');
closeButton.setAttribute('id', 'close-button');
closeButton.textContent = 'X';

var tehDialogHeader = document.getElementById('tehDialogHeader');
tehDialogHeader.appendChild(closeButton);

var closer = document.getElementById('close-button');

closer.setAttribute('role', 'button');
closer.setAttribute('aria-label', 'Close Dialog');

closer.addEventListener('click', function() {
    axsdialog.close('tehDialog', 'sign-in');
}, false);

closer.addEventListener('keydown', function(event) {

    var code = event.charCode || event.keyCode;
    if (event.type === 'keydown') {
        if (code === 32 || code === 13) {
            event.preventDefault();
            axsdialog.close('tehDialog', 'sign-in');
        }
    }
}, false);
