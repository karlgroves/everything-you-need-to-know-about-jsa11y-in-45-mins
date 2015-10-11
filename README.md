#READ ME

> *Watch the talk*: https://youtu.be/baR9OvL4g7w (F2E Summit 2015)

## Goal
Use the creation of a dialog to demonstrate a number of core accessibility principles like
* keyboard accessibility
* focus management
* ARIA roles
* ARIA properties

The choice of a dialog for this example is due to the way in which this involves a number of user experience concerns not often considered by developers.

## Steps

### Project Scaffolding

* Create .bowerrc file
* Create .editorconfig file
* Create .gitattributes file
* Create .gitignore file
* Create .jshintrc file
* Create bower.json file
* Create package.json file
* Create Gruntfile

### Install Deps

Run `npm install && bower install`

### Develop

#### Base
* Create Web Page, CSS, and Script for the base of the demo.

#### Step 1
* Create our dialog object with an open method and a close method

#### Step 2
* Create the functionality to append the overlay, open the dialog, and close the dialog

#### Step 3
* Add ability to open the dialog from the Sign In Button

#### Step 4
* Shift focus to the new dialog

#### Step 5
* Allow dialog to close from escape key

#### Step 6
* add accessible keydown on Sign In button

#### Step 7
* add a Close button; make close button do the close business

#### Step 8
* Add role(s) and labels
  * Close button
  * Dialog
* Change focus to 1st focusable item (the close button)

#### Step 9
* Explicitly set next logical element for focus

#### Step 10
* Hide all the things
