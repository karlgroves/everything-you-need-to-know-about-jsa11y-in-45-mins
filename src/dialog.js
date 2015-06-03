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
     * @param focusTo
     */
    open: function (focusTo) {

        var dFocus;

        // sanity check, make sure that if 'n' isn't set
        // we set this to the closer
        if (typeof focusTo === 'undefined') {
            //this.dCloser.focus();

            console.log(this.closer);

            dFocus = document.getElementById(this.closer);

            console.log(dFocus);


            dFocus.focus();

            console.log(document.activeElement);
        }
        else {
            dFocus = document.getElementById(focusTo);
            dFocus.focus();
        }
        this.overlay = document.createElement('div');
        this.overlay.setAttribute('id', 'overlay');

        this.dParent.insertBefore(this.overlay, this.theDialog);

        this.hideEm();

        this.theDialog.style.display = 'block';
        this.theDialog.setAttribute('tabindex', '-1');
        this.theDialog.setAttribute('role', 'dialog');
        this.theDialog.setAttribute('aria-labelledby', 'dLabel');
        this.theDialog.style.outline = 'none';
    },

    /**
     *
     * @param n
     */
    close: function (n) {

        // sanity check, make sure that if 'n' isn't set
        // we just send the user back to the control that invoked the dialog
        if (typeof n === 'undefined') {
            n = this.opener;
        }

        var nextLocation = document.getElementById(n);

        this.unHideEm();
        this.overlay.remove();
        this.theDialog.style.display = 'none';
        nextLocation.focus();
    },


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

        // if the dialog is open allow the escape key to close it.
        document.onkeydown = function (e) {
            // ESCAPE key pressed
            //if (this.theDialog.style.display === 'block') {
            if (e.keyCode === 27) {
                dialog.close();
            }
            //}
        };


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