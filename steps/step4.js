'use strict';

// STEP 4: Shift focus to the new dialog
var axsdialog = {

    overlay: document.createElement('div'),

    open: function (d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        this.overlay.classList.add('axs_overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        tehDialog.classList.remove('axs_hidden');
        tehDialog.classList.add('axs_dialog_wrapper');

        // Step 4 adds this bit for shifting focus to the new dialog when it opens
        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.style.outline = 'none';
        tehDialog.focus();
    },

    close: function (d) {
        var tehDialog = document.getElementById(d);
        this.overlay.remove();

        tehDialog.classList.remove('axs_dialog_wrapper');
        tehDialog.classList.add('axs_hidden');
    }

};

var dOpener = document.getElementById('sign-in');

dOpener.addEventListener('click', function(){
        axsdialog.open('tehDialog');
    }, false
);
