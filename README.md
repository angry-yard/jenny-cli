[![Build Status](https://travis-ci.org/angry-yard/jenny-cli.svg?branch=master)](https://travis-ci.org/angry-yard/jenny-cli)
[![npm version](https://badge.fury.io/js/jenny-cli.svg)](https://badge.fury.io/js/jenny-cli)
## Summary
This is a tool that helps in generating project items from templates, getting data 
into the database and syncing (versioning) database schema with scripts. All this done in a team
environment, sharing across multiple developers and projects.  Which makes it easier for standing up
a development environment, testing and deployment.

_This is an early alpha_

**If you have any issues, questions, ideas - [email me](mailto:ryan@angry-yard.com)**

## Functionality

Jenny has four primary functions:

+ [Code Generation](https://github.com/angry-yard/jenny-cli/wiki/Code-Generation)
    + Creating project files from templates and database tables.  This requires more configuration
    but provides the most assistance.
    + This process will aid in creating all the scaffolding needed to create and stand up any type
    of application.  What type of application, is merely dependent on the templates being used.
    + These templates can be any type, C#, Javascript, Typescript, SQL, etc.
+ [Code snippet](https://github.com/angry-yard/jenny-cli/wiki/Code-Templates)
    + This is the simplest form and requires minimal configuration.
    + These code templates are just short cuts to get a file started.  These can be used to aid 
    in ensuring a certain coding convention is followed, or just to save time.
    + Because the template is created by Node from the command line, it is not dependent on either
    an OS or an IDE.
+ [Data Generation](https://github.com/angry-yard/jenny-cli/wiki/Data-Generation)
    + This will populate the database with human data types.
    + How this data is populated is defined in the configuration file.  The data that gets created 
    either goes straight into the database, is saved to a file - for use later, or both.  The 
    files that are generated are typically used for the developer build process.
    + Seed data files that are created can be used with Data Sync to ensure the database is 
    populated with specific data.
+ [Data Sync](https://github.com/angry-yard/jenny-cli/wiki/Data-Sync)
    + Running SQL scripts to keep the database version and code version in sync for the developer.
    + This not only keeps the separate code bases in sync, but helps a developer get the latest 
    version of the database schema and data.  This great for QA as a build can ensure that 
    certain data can be added to ensure the QA tests match the data.
    
## Current State
    
Right now only one function has been written:

```bash
jenny generate
```

This function will be replaced to reflect the concepts on the [Code Generation](https://github.com/angry-yard/jenny-cli/wiki/Code-Generation) in the wiki.