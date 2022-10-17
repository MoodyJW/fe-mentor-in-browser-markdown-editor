# mobile

- mobile [x]
  - [x] component structure
  - [x] global styles
  - [x] sidenav
    - [x] new file
      - [x] send null data to content area
      - [x] styles
    - [x] current files
      - [x] retrieve from service
      - [x] styles
    - [x] toggle theme
      - [x] styles
      - [x] functionality
    - [x] styles
  - [x] header
    - [x] menu toggle
      - [x] styles
      - [x] functionality
    - [x] file name
      - [x] styles
      - [x] renaming functionality
    - [x] delete
      - [x] styles
      - [x] service to remove
      - [x] disable delete when no files
      - [x] tooltip when disabled
    - [x] save
      - [x] styles
      - [x] service to save
      - [x] disable save when no input value
    - [x] styles
  - [x] preview bar
    - [x] toggle
      - [x] trigger content area preview/edit
    - [x] styles
  - [x] content
    - [x] styles
    - [x] save preview too and just swap display
  - [x] delete modal
    - [x] styles
    - [x] confirm button
  - [x] services
    - [x] file creation/retrieval
      - [x] welcome file created for every new user
      - [x] most recently created file is default
      - [x] create new file
      - [x] save file
    - [x] user creation/retrieval
      - [x] user token created using firebase id generator and saved to local storage as `inBrowserMarkdownId`
      - [x] if the token exists, users files will be loaded from firebase
  - [x] markdown logic
    - [x] showdown to convert markdown to html

# tablet

- [x] tablet
  - [x] global styles
  - [x] sidenav
    - [x] new file
      - [x] styles
    - [x] current files
      - [x] styles
    - [x] toggle theme
      - [x] styles
    - [x] styles
  - [x] header
    - [x] menu toggle
      - [x] styles
    - [x] file name
      - [x] styles
    - [x] delete
      - [x] styles
    - [x] save
      - [x] styles
    - [x] styles
  - [x] preview bar
    - [x] styles
  - [x] content
    - [x] styles
  - [x] delete modal
    - [x] styles

# desktop

- [x] desktop
  - [x] tablet
  - [x] global styles
  - [x] sidenav
    - [x] new file
      - [x] styles
    - [x] current files
      - [x] styles
    - [x] toggle theme
      - [x] styles
    - [x] styles
  - [x] header
    - [x] menu toggle
      - [x] styles
    - [x] file name
      - [x] styles
    - [x] delete
      - [x] styles
    - [x] save
      - [x] styles
    - [x] styles
  - [x] preview bar
    - [x] styles
  - [x] content
    - [x] styles
  - [x] delete modal
    - [x] styles

# clean up

- [ ] finish readme
- [ ] figure out firebase config for deployment
- [ ] deploy to gh pages

# bugs/refactor

- [x] improve file name generation to avoid duplicate file names _fixed by changing to random words/number for files_
  - [x] if user deletes files out of order the file name can be repeated
- [ ] consider resize service/directive
- [x] the doc name resets to null on resize???

# improvement ideas

- [ ] buttons to perform style changes like italics, bold, etc
- [ ] snackbar notifications for actions
- [ ] add actual user creation/auth
- [ ] save most recent deleted so user can undo or maybe add timer for undo
- [x] either auto save on file switch or prompt for saving
- [ ] could add search, sorting, etc for file list
- [ ] write some tests...
