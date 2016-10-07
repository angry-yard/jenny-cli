#0.4.0 10/07/2016
The application was significantly changed.  The database objects and SQL Server were taken out and converted
to their own modules, providing sharing and extensibility.

The application structure was changed to accomodate a build folder for deployment to NPM, so only necessary
files were pushed.  Also a typings definition file was created.

All Javascript files were removed from the repository.

Added more command line functionality, but have yet to implement all features.

#0.3.0 09/30/2016
Upgraded application to use Typescript 2.  With that the dependency on typings was removed and the Typescript
definitions were deleted and npm was used.

Moved command line arguments to use Commander. This will be added more command line functionality easier
and more flexible.

There were a few errors fixed and updates added to the documentation. 

#0.0.1 09/28/2016
Initial commit of project.  The initial functionality is being tested as there are only a few templates
and still a lot of functionality to add.

With this release only one function off jenny works and it does not match the documentation.