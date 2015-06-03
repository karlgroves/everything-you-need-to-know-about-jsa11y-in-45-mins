'use strict';

var dialog = {

    /**
     *  Function to "hide" everything outside the dialog from Screen Readers
     */
    hideEm: function () {

        for (var x = 0; x < this.dLength; x++) {
            this.dChildren[x].classList.add('in-dialog');
        }

        for (var i = 0; i < this.cLength; ++i) {

            if (this.couldFocus[i].style.display !== 'none' && (!this.couldFocus[i].classList.contains('in-dialog'))) {
                this.couldFocus[i].setAttribute('tabindex', '-1');
                this.couldFocus[i].setAttribute('aria-hidden', 'true');
                this.couldFocus[i].classList.add('hidden-by-modal');
            }
        }
    },

    /**
     * Function to "unhide" the things hidden by the function above.
     */
    unHideEm: function () {
        var toUnHide = document.querySelectorAll('.hidden-by-modal'),
            tLength = toUnHide.length;

        for (var i = 0; i < tLength; ++i) {
            toUnHide[i].setAttribute('tabindex', '0');
            toUnHide[i].setAttribute('aria-hidden', 'false');
            toUnHide[i].classList.remove('hidden-by-modal');
        }
    },

    /**
     *
     * @param focusTo (Optional) ID of element to shift focus to when dialog is opened. Defaults to first actionable item
     */
    open: function (focusTo) {

        var dFocus;

        this.overlay = document.createElement('div');
        this.overlay.setAttribute('id', 'overlay');

        this.dParent.insertBefore(this.overlay, this.theDialog);

        this.hideEm();

        this.theDialog.style.display = 'block';
        this.theDialog.setAttribute('tabindex', '-1');
        this.theDialog.setAttribute('role', 'dialog');
        this.theDialog.setAttribute('aria-labelledby', 'dLabel');
        this.theDialog.style.outline = 'none';


        // sanity check, make sure that if 'focusTo' isn't set
        // we set this to the first actionable item in the dialog
        if (typeof focusTo === 'undefined') {
            dFocus = document.querySelector('#' + this.dElement + ' ' + this.focusable);
            dFocus.focus();
        }
        else {
            dFocus = document.getElementById(focusTo);
            dFocus.focus();
        }
    },

    /**
     *
     * @param next (Optiona) ID of the next item that needs to get focus after dialog closes. Defaults to the control that opened the dialog
     */
    close: function (next) {

        // sanity check, make sure that if 'next' isn't set
        // we just send the user back to the control that invoked the dialog
        if (typeof next === 'undefined') {
            next = this.opener;
        }

        var nextLocation = document.getElementById(next);

        this.unHideEm();
        this.overlay.remove();
        this.theDialog.style.display = 'none';
        nextLocation.focus();
    },


    /**
     *
     * @param opts object containing options to be used by other dialog functions
     */
    init: function (opts) {

        this.focusable = 'a[href], area, button, select, textarea, *[tabindex="0"], input:not([type="hidden"])';

        // String: ID of the element that opened the dialog
        this.opener = opts.opener;

        // String: ID of the close control
        this.closer = opts.closer;

        // String: ID of the dialog container
        this.dElement = opts.dElement;

        // explicit reference to the opener element
        this.dOpener = document.getElementById(this.opener);

        // explicit reference to the closing element
        this.dCloser = document.getElementById(this.closer);

        // explicit reference to the dialog
        this.theDialog = document.getElementById(this.dElement);

        // explicit reference to the dialog's parent node
        this.dParent = this.theDialog.parentNode;

        // nodelist of the items on the page that can get focus
        this.couldFocus = document.querySelectorAll(this.focusable);

        this.cLength = this.couldFocus.length;

        // nodelist of the dialog wrapper's child elements
        this.dChildren = document.querySelectorAll('#' + this.dElement + ' *');

        this.dLength = this.dChildren.length;

        // Do some stuff to the control that opens the dialog.
        // @TODO only do this if the item isn't a button
        this.dOpener.setAttribute('role', 'button');

        this.dOpener.addEventListener('click', function () {
                dialog.open();
            }, false
        );

        this.dOpener.addEventListener('keydown', function (event) {
                var code = event.charCode || event.keyCode;
                if (event.type === 'keydown') {
                    if (code === 32 || code === 13) {
                        event.preventDefault();
                        dialog.open();
                    }
                }
            }, false
        );

        this.dCloser.setAttribute('role', 'button');
        this.dCloser.setAttribute('aria-label', 'Close Dialog');

        this.dCloser.addEventListener('click', function () {
                dialog.close();
            }, false
        );

        this.dCloser.addEventListener('keydown', function (event) {
                var code = event.charCode || event.keyCode;
                if (event.type === 'keydown') {
                    if (code === 32 || code === 13) {
                        event.preventDefault();
                        dialog.close();
                    }
                }
            }, false
        );

    },

};