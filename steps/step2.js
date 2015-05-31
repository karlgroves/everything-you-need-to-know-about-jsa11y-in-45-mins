'use strict';

var dialog = {

    open: function (d) {
        var overlay = document.createElement('div'),
            tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode;

        overlay.setAttribute('id', 'overlay');
        dParent.insertBefore(overlay, tehDialog);
        tehDialog.style.display = 'block';
    },

    close: function () {
        this.overlay.remove();
        this.tehDialog.style.display = 'none';
    }

};

var dOpener = document.getElementById('sign-in');
dOpener.addEventListener('click', dialog.open('tehDialog'), false);
