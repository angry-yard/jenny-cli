# Code Templates

Code templates are the files that are used to scaffold an application with working code.  
The difference between templates and snippets is that templates create working code and 
require minimal code if any whereas snippets are code shells and provide no functionality.

## Usage

To add templates to the system, you can add templates easily.  You can query the 
template database with

```bash
jenny template --search [templateName]
```

To install a template, execute:

```bash
jenny template --install [templateName]
```

If the project has been newly create and the templates have not been loaded, they can be
refreshed.  All templates that are referenced in the project will be downloaded.

```bash
jenny template --init
```

## Template Packges

Although templates can be packaged and always downloaded as a single file, developers may find
 it more beneficial to group templates into a package.  For example, a package could be called 
Angular.NET and there could be templates for the entire stack, from Entity Framework to client side 
Javascript.  This concept would allow someone to download a front-end package, like Angular, a 
data access layer package, like Entity Framework and then a Rest Api package.

Determining how to make this seemless is the difficult concept.  This can be achieved by giving 
each package the ability to change just a bit.  For example, Angular might use a Rest API or a Xml 
based API - these differences are passed as parameters during creation.  Additionally the package 
could be specifically labeled and created for a certain technology hook.