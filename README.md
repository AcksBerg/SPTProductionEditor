# SPT Production Editor

This web application allows users to edit and customize the `production.json` file used in SPT, providing a user-friendly interface to manage hideout production settings. Users can create, edit, or upload their own production lists, manage item requirements, and export the modified `production.json` for use in SPT.

## Features

- **Production Management**: Create new productions, edit existing ones, or delete them as needed.
- **Requirement Editing**: Modify production requirements such as area, item count, and level directly through the UI.
- **File Upload and Download**: Upload your current `production.json` for editing and export the updated list when finished.
- **Local Execution**: All changes are performed client-side, ensuring privacy and security for your data.

## Usage

### Online Version

Visit [http://sardine.one](http://sardine.one) to start editing your `production.json` online.

### Local Version

Requirements npm@9.2.0 and node.js@v18.19.1

1. Clone the repository:

   ```bash
   git clone https://github.com/AcksBerg/SPTProductionEditor.git
   cd SPTProductionEditor
   ```

2. npm install

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```
4. Open your browser and visit http://localhost:3000. (or shown in the console)


## License
This project is licensed under the MIT License. See the LICENSE file for details.