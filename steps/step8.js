'use strict';

// STEP 8: Add role(s) and labels
// * Close button
// * Dialog
// * Change focus to 1st focusable item (the close button)
var axsdialog = {

    overlay: document.createElement('div'),

    open: function(d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode,

            // new variable for the close button
            cButton = document.getElementById('close-button');

        this.overlay.classList.add('axs_overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        tehDialog.classList.remove('axs_hidden');
        tehDialog.classList.add('axs_dialog_wrapper');

        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.style.outline = 'none';

        // Step 8 adds role and label to the dialog and gives focus to the close button
        tehDialog.setAttribute('role', 'dialog');
        tehDialog.setAttribute('aria-labelledby', 'dLabel');
        cButton.focus();
    },

    close: function(d) {
        var tehDialog = document.getElementById(d);
        this.overlay.remove();

        tehDialog.classList.remove('axs_dialog_wrapper');
        tehDialog.classList.add('axs_hidden');
    }

};

var dOpener = document.getElementById('sign-in');
dOpener.setAttribute('tabindex', '0');

// Step 8 adds role to the opener button
dOpener.setAttribute('role', 'button');

dOpener.addEventListener('click', function() {
    axsdialog.open('tehDialog');
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
        axsdialog.close('tehDialog');
    }
};


var closeButton = document.createElement('button');
closeButton.setAttribute('id', 'close-button');
closeButton.textContent = 'X';

var tehDialogHeader = document.getElementById('tehDialogHeader');
tehDialogHeader.appendChild(closeButton);

var closer = document.getElementById('close-button');

// Step 8 adds a proper label to the close button
closer.setAttribute('aria-label', 'Close Dialog');

closer.addEventListener('click', function() {
    axsdialog.close('tehDialog');
}, false);

closer.addEventListener('keydown', function(event) {

    var code = event.charCode || event.keyCode;
    if (event.type === 'keydown') {
        if (code === 32 || code === 13) {
            event.preventDefault();
            axsdialog.close('tehDialog');
        }
    }
}, false);
