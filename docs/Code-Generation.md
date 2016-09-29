# Code Generation

Jenny will allow you to use templates and a database to generate files that will aid in saving 
precious development time.

## Usage

To create the initial configuration file needed by Jenny:

```bash
jenny init
```

Once the jenny.config.json exists, a database must be added.  This will add the database and
connection information to the configuration.  It will also scan each table and enter the 
corresponding information for each table and column.  This schema information allows developers to
utilize this functionality while the project is not connected to the database.

To add another database, regardless of type, simply run this command again.

```bash
jenny database --add "connection string"
```

If the schema has been modified, a check can be run to ensure the database configuration is up 
to date.  Note - this will not change any custom configurations added.

```bash
jenny database --refresh [databaseName]
```

A database configuration is needed.  If there is a least one database configured, the first database will
be used and all templates will be used

```bash
jenny generate
```

Or a template can be specified

```bash
jenny generate --template:[templateName]
```

The system needs to know what templates to use and once a database has been configured and 
the desired templates installed, you can create project items.  If you only pass the 
database name, all tables will be used against all templates.  This may not be desireable 
and may be time consuming.

```bash
jenny generate --database:[databaseName]
```

If you know the template(s) that you want to run against the database, you can execute:

```bash
jenny generate --database:[databaseName] --templates:[templateName], [templateName]
```

If you want to run template(s) against a certain table, you can execute:

```bash
jenny generate --database:[databaseName] --tables:[tableName], [tableName] --templates:[templateName], [templateName]
```