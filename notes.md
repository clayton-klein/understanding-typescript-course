# TypeScript compiler and configuration:

- use `--watch` or `-w` at the end of the compilation command on the command line so TS will automatically recompile everytime there is a change (e.g: `tsc file.ts --watch`), the downside is that we can only "watch" one file at a time with this method.

- if we want to "watch" all the **.ts** files in a project, we should first use the command `tsc --init` in the project's directory (it will create a file called **tsconfig.json**) and then we use the command `tsc -w` (or --watch) without passing any specific file name.

- there are a ton of **tsc** (compiler) and **tsconfig** options we can use, check out the documentation for more information about them.

- the **sourceMap** option in the **tsconfig** file allows us to see the `.ts` files on the devtool's "source" tab after compilation, which simplifies the debugging process (this option is commented out by default). 

- it's common to create directories like **src** and **dist** to organize our files in a project, we can configure TS to use them with the **rootDir** and **outDir** options in the **tsconfig** file and this way when we run the `tsc` command, the files in the **rootDir** (e.g., src) will be compiled and generated in the **outDir** (e.g., dist).

- we can remove the comments from our dist files by commenting in the **"removeComments"** option in the **tsconfig** file.

- there are some other notes at the end of the **tsconfig.json** file as well.