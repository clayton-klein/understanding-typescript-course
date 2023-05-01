# General course's notes:

⚠️ PS: Most of the notes/comments are in the `.ts` files themselves, here my intention was to add some comments that were not related to specifics files.

Many third party libraries are written in **"vanilla JS"** (lodash and jquery for example) and in theory we should be able to use them in TS without any problems, but we get errors, so in these cases we must install the "types" of these libraries to "translate" them to TS, we just need to google the name of the library we're using followed by **types** and we'll probably find a package to install it (the most popular ones have it). The extension of the "typed" files from the "@type/somelibrary" package will be **.d.ts** (the "d" stands for "declaration") and they don't have logic, only instructions about types for TS.

We can use the `declare` keyword to tell the TS compiler that there are **global variables declared in another file** or **functions/classes genereated by another file** that TS initially doesn't know about, but we as developers do and we can use them inside our code later without errors, for more details please check the documentation.

## TypeScript compiler and configuration:

- use `--watch` or `-w` at the end of the compilation command on the command line so TS will automatically recompile everytime there is a change (e.g: `tsc file.ts --watch`), the downside is that we can only "watch" one file at a time with this method.

- if we want to "watch" all the **.ts** files in a project, we should first use the command `tsc --init` in the project's directory (it will create a file called **tsconfig.json**) and then we use the command `tsc -w` (or --watch) without passing any specific file name.

- there are a ton of **tsc** (compiler) and **tsconfig** options we can use, check out the documentation for more information about them.

- the **sourceMap** option in the **tsconfig** file allows us to see the `.ts` files on the devtool's "source" tab after compilation, which simplifies the debugging process (this option is commented out by default).

- it's common to create directories like **src** and **dist** to organize our files in a project, we can configure TS to use them with the **rootDir** and **outDir** options in the **tsconfig** file and this way when we run the `tsc` command, the files in the **rootDir** (e.g., src) will be compiled and generated in the **outDir** (e.g., dist).

- we can remove the comments from our dist files by commenting in the **"removeComments"** option in the **tsconfig** file.

- by default TS generates JS files after compilation even if we have errors, we could stop it by commenting in the **"noEmitOnError"** option in the **tsconfig** file.

- you can comment in the options **noUnusedLocals, noUnusedParameters and noImplicitReturns** if you want TS to throw an error in case there are local (not global) variables or parameters that aren't being used or a function that can or cannot return something depending on a condition.

- there are some other notes at the end of the **tsconfig.json** file as well.
