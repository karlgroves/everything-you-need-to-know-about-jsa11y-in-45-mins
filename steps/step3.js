'use strict';

// STEP 3: Add ability to open the dialog from the Sign In Button
var axsdialog = {

    overlay: document.createElement('div'),

    open: function(d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        this.overlay.classList.add('axs_overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        tehDialog.classList.remove('axs_hidden');
        tehDialog.classList.add('axs_dialog_wrapper');
    },

    close: function(d) {
        var tehDialog = document.getElementById(d);
        this.overlay.remove();

        tehDialog.classList.remove('axs_dialog_wrapper');
        tehDialog.classList.add('axs_hidden');
    }

};

// Step 3 adds this:
var dOpener = document.getElementById('sign-in');

dOpener.addEventListener('click', function() {
    axsdialog.open('tehDialog');
}, false);
