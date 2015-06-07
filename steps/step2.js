'use strict';

var axsdialog = {

    overlay: document.createElement('div'),

    open: function (d) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        this.overlay.classList.add('axs_overlay');
        dParent.insertBefore(this.overlay, tehDialog);
        tehDialog.style.display = 'block';
    },

    close: function (d) {
        var tehDialog = document.getElementById(d);
        this.overlay.remove();
        tehDialog.style.display = 'none';
    }

};

