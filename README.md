# Jenny
## Summary
This is a tool that helps in generating project items from templates, getting data 
into the database and 

## Functionality

Jenny has four primmary functions:

1. Creating code snippet.  This is the simpliest form and requires minimal configuration.

    These code templates are just short cuts to get a file started.  These can be used to aid 
    in ensuring a certain coding convention is followed, or just to save time.

2. Creating project files from templates and database tables.  This requires more configuration
but provides the most assistance.

    These files can be any type, C#, Javascript, Typescript, SQL, etc.

3. Populating database tables with test data.

    How this data is populated is defined in the configuration file.  The data that gets created 
    either goes straight into the database, is saved to a file - for use later, or both.  The 
    files that are generated are typically used for the developer build process.

4. Running SQL scripts to keep the database version and code version in sync for the developer.

    This not only keeps the separate code bases in sync, but helps a developer get the latest 
    version of the database schema and data.  This great for QA as a build can ensure that 
    certain data can be added to ensure the QA tests match the data.