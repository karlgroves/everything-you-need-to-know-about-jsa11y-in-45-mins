'use strict';

var axsdialog = {

    /**
     *  Function to "hide" everything outside the dialog from Screen Readers
     */
    hideEm: function () {

        for (var x = 0; x < this.dLength; x++) {
            this.dialogChildren[x].classList.add('in_axs_dialog');
        }

        for (var i = 0; i < this.cLength; ++i) {

            if (this.couldFocus[i].style.display !== 'none' && (!this.couldFocus[i].classList.contains('in_axs_dialog'))) {
                this.couldFocus[i].setAttribute('tabindex', '-1');
                this.couldFocus[i].setAttribute('aria-hidden', 'true');
                this.couldFocus[i].classList.add('axs_hidden_by_modal');
            }
        }
    },

    /**
     * Function to "unhide" the things hidden by the function above.
     */
    unHideEm: function () {
        var toUnHide = document.querySelectorAll('.axs_hidden_by_modal'),
            tLength = toUnHide.length;

        for (var i = 0; i < tLength; ++i) {
            toUnHide[i].setAttribute('tabindex', '0');
            toUnHide[i].setAttribute('aria-hidden', 'false');
            toUnHide[i].classList.remove('axs_hidden_by_modal');
        }
    },

    /**
     *
     * @param focusTo (Optional) ID of element to shift focus to when dialog is opened. Defaults to first actionable item
     */
    open: function (focusTo) {

        this.overlay = document.createElement('div');
        this.overlay.setAttribute('class', 'axs_overlay');

        this.dialogParent.insertBefore(this.overlay, this.theDialog);

        this.hideEm();

        this.theDialog.classList.remove('axs_hidden');
        this.theDialog.classList.add('axs_dialog_wrapper');
        this.theDialog.setAttribute('tabindex', '-1');
        this.theDialog.setAttribute('role', this.role);
        this.theDialog.setAttribute('aria-labelledby', 'dLabel');

        // sanity check, make sure that if 'focusTo' isn't set
        // we set this to the first actionable item in the dialog
        if (typeof focusTo === 'undefined') {
            document.querySelector('#' + this.dialogElement + ' ' + this.focusable).focus();
        }
        else {
            document.getElementById(focusTo).focus();
        }
    },

    /**
     *
     * @param next (Optional) ID of the next item that needs to get focus after dialog closes. Defaults to the control that opened the dialog
     */
    close: function (next) {

        // sanity check, make sure that if 'next' isn't set
        // we just send the user back to the control that invoked the dialog
        if (typeof next === 'undefined') {
            next = this.opener;
        }

        this.unHideEm();
        this.overlay.remove();
        this.theDialog.classList.add('axs_hidden');
        document.getElementById(next).focus();
    },


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
