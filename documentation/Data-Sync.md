# Data Sync

Syncing relies on configuration.  To create the configuration file jenny.sync.config.json:

```javascript
jenny sync --init
```

In order to begin, the database creation scripts must be created. Be sure to modify the templates
to ensure that the scripts are to your standards and create all the objects you need.  As well as
ensure that the configuration is complete to ensure the naming convention and the folder structure
is as desired.  This will create the baseline for all script changes going forward - version 1.  Be
sure to include templates for each object type in the database.

This will also create the version table in the database used to monitor the current version.

```javascript
jenny sync --script
```

To clean the database to be without any objects execute

```javascript
jenny sync --clean
```

To get the database to the latest version.  If the database is empty, the version table will be created.

```javascript
jenny sync
```

If you want the database to get to a certain version, you merely call sync and the version number
that is desired.  You can only get to a version above the current version.  If you need to get to a 
lower version, first clean then sync.

```javascript
jenny sync 3
```

When changes have been made, the change scripts need to be created and the version will be generated.
This will automatically create the next version of the database.  Ensure that you are ready to version.

```javascript
jenny sync --save
```

If the previous change was in error, you can rollback the configuration changes and version.  The 
files will be deleted as well.

```javascript
jenny sync --rollback
```

If you want the current version of the database.

```javascript
jenny sync --version
```