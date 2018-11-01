'use strict';

var axsdialog = {

    overlay: document.createElement('div'),

    open: function(d, w) {
        var tehDialog = document.getElementById(d),
            dParent = tehDialog.parentNode,
            cButton = document.getElementById('close-button');

        var tehWrapper = document.getElementById(w);
        tehWrapper.setAttribute('aria-hidden', 'true');

        this.overlay.classList.add('axs_overlay');
        dParent.insertBefore(this.overlay, tehDialog);

        tehDialog.classList.remove('axs_hidden');
        tehDialog.classList.add('axs_dialog_wrapper');

        tehDialog.setAttribute('tabindex', '-1');
        tehDialog.setAttribute('role', 'dialog');
        tehDialog.setAttribute('aria-labelledby', 'dLabel');
        tehDialog.style.outline = 'none';
        cButton.focus();
    },

    close: function(d, n, w) {

        var tehDialog = document.getElementById(d),
            nextLocation = document.getElementById(n);
        this.overlay.remove();

        var tehWrapper = document.getElementById(w);
        tehWrapper.setAttribute('aria-hidden', 'false');

        tehDialog.classList.remove('axs_dialog_wrapper');
        tehDialog.classList.add('axs_hidden');

        nextLocation.focus();

    }


    /**
     *
     * @param opts object containing options to be used by other dialog functions
     */
    init: function (opts) {

        this.focusable = 'a[href], area[href], button, select, textarea, *[tabindex="0"], input:not([type="hidden"])';

        this.role = opts.role;

        // String: ID of the element that opened the dialog
        this.opener = opts.opener;

        // String: ID of the close control
        this.closer = opts.closer;

        // String: ID of the dialog container
        this.dialogElement = opts.dialogElement;

        // explicit reference to the opener element
        this.dialogOpener = document.getElementById(this.opener);

        // explicit reference to the closing element
        this.dialogCloser = document.getElementById(this.closer);

        // explicit reference to the dialog
        this.theDialog = document.getElementById(this.dialogElement);

        this.theDialog.classList.add('axs_hidden');

        // explicit reference to the dialog's parent node
        this.dialogParent = this.theDialog.parentNode;

        // nodelist of the items on the page that can get focus
        this.couldFocus = document.querySelectorAll(this.focusable);

        this.cLength = this.couldFocus.length;

        // nodelist of the dialog wrapper's child elements
        this.dialogChildren = document.querySelectorAll('#' + this.dialogElement + ' *');

        this.dLength = this.dialogChildren.length;

        this.dialogOpener.addEventListener('click', function () {
                axsdialog.open();
            }, false
        );

        this.dialogOpener.addEventListener('keydown', function (event) {
                var code = event.charCode || event.keyCode;
                if (event.type === 'keydown') {
                    if (code === 32 || code === 13) {
                        event.preventDefault();
                        axsdialog.open();
                    }
                }
            }, false
        );

        this.dialogCloser.setAttribute('role', 'button');
        this.dialogCloser.setAttribute('aria-label', 'Close Dialog');

        this.dialogCloser.addEventListener('click', function () {
                axsdialog.close();
            }, false
        );

        this.dialogCloser.addEventListener('keydown', function (event) {
                var code = event.charCode || event.keyCode;
                if (event.type === 'keydown') {
                    if (code === 32 || code === 13) {
                        event.preventDefault();
                        axsdialog.close();
                    }
                }
            }, false
        );


        // if the dialog is open allow the escape key to close it.
        document.onkeydown = function (event) {
            if (!axsdialog.theDialog.classList.contains('axs_hidden')) {
                if (event.keyCode === 27) {
                    axsdialog.close();
                }
            }
        };
    }

};
