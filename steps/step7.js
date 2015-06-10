'use strict';

// STEP 7: add a Close button; make close button do the close business
//         For this step (and all that come after) you need to add this to
//         the dialog header:  <button id="close-button">X</button>
var axsdialog = {

    overlay: document.createElement('div'),

    open: function (d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        this.overlay.classList.add('axs_overlay');
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
dOpener.addEventListener('click', function () {
        axsdialog.open('tehDialog');
    }, false
);

dOpener.addEventListener('keydown', function (event) {

        var code = event.charCode || event.keyCode;
        if (event.type === 'keydown') {
            if (code === 32 || code === 13) {
                event.preventDefault();
                axsdialog.open('tehDialog');
            }
        }
    }, false
);


document.onkeydown = function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        axsdialog.close('tehDialog');
    }
};



// Step 7: add a Close button; make close button do the close business
var closer = document.getElementById('close-button');
closer.addEventListener('click', function () {
        axsdialog.close('tehDialog');
    }, false
);

closer.addEventListener('keydown', function (event) {

        var code = event.charCode || event.keyCode;
        if (event.type === 'keydown') {
            if (code === 32 || code === 13) {
                event.preventDefault();
                axsdialog.close('tehDialog');
            }
        }
    }, false
);

