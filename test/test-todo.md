1. It should have `class="axs_hidden"` on page load
2. It should have `style.display.hide`
3. Dialog children should have `in_axs_dialog` class
4. When the `#sign-in` button is clicked:
    1. The `axs_hidden` class should go away from the dialog wrapper
    2. Nothing in the dialog should have `aria-hidden`
    3. Actionable items outside the dialog should have `aria-hidden=true`
    4. Actionable items outside the dialog should have `tabindex=-1`
    5. Actionable items outside the dialog should have class `axs_hidden_by_modal`
    6. The dialog itself must have class `axs_dialog_wrapper`
    7. The dialog must have `dialog` role
    8. The dialog must have `aria-labelledby` value of "dLabel"
    9. The overlay should appear. It should have class of `axs_overlay`
    10. Focus should shift to the close button
6. When the Escape key is clicked/ When the close button is clicked
    1. The `axs_hidden` class should be added back to dialog
    2. The overlay div should be removed
    3. Focus should be shifted back to the `#sign-in` button
    4. No elements should have class `axs_hidden_by_modal`