'use strict';

// STEP 6 add accessible keydown on Sign In button
var axsdialog = {

    overlay: document.createElement('div'),

    open: function(d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        this.overlay.setAttribute('id', 'overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        tehDialog.classList.remove('axs_hidden');
        tehDialog.classList.add('axs_dialog_wrapper');

        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.style.outline = 'none';
        tehDialog.focus();
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

dOpener.addEventListener('click', function() {
    axsdialog.open('tehDialog');
}, false);

// Step 6 adds the accessible keydown on Sign In button
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
