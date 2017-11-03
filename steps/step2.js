'use strict';

// STEP 2: Create the functionality to append the overlay, open the dialog, and close the dialog
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
