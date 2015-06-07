'use strict';

var axsdialog = {

    overlay: document.createElement('div'),

    open: function (d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        this.overlay.setAttribute('id', 'overlay');
        dParent.insertBefore(this.overlay, tehDialog);
        tehDialog.style.display = 'block';
        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.style.outline = 'none';
        tehDialog.focus();
    },

    close: function (d) {
        var tehDialog = document.getElementById(d);
        this.overlay.remove();
        tehDialog.style.display = 'none';
    }

};

var dOpener = document.getElementById('sign-in');
dOpener.addEventListener('click', function(){
        axsdialog.open('tehDialog');
    }, false
);


document.onkeydown = function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        axsdialog.close('tehDialog');
    }
};