# Data Management
## Usage

You can export data from the database using a template.  Basically instead of using the metadata, used
with code generation, you are using the data to create scripts used to database and object creation.

```bash
jenny data --export --template [TemplateName] --out [FileName]
```

You can also specify certain tables to export.  If the out option is omitted, it will save the file
to the scripts folder.  There is a default template for exporting data, so the template option is not
required either.

```bash
jenny data --export --tables Table1, Table2
```

Records can be added to the database as well.  The number of records can be controlled and the generated
script can be saved.

```bash
jenny data --generate --tables Table1, Table2 --out [FileName]
```

If the tables options is omitted data will be created for all tables where all columns with a
data generator defined.  If a column does not have a data generator defined but allows nulls, then
the field will have a null value.

The file does not need to be saved either.  This example also omits the out option.

```bash
jenny data --generate
```