'use strict';


// STEP 5: Allow dialog to close from escape key
var axsdialog = {

    overlay: document.createElement('div'),

    open: function (d) {
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


// Step 5 adds functionality to allow the dialog to close from the escape key
document.onkeydown = function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        axsdialog.close('tehDialog');
    }
};