#!/usr/bin/env node

import { writeFileSync } from "fs";
import Analyzer from "../main/Analyzer";

function main() {
  printTitle();
  if (process.argv[1] === "init") {
    initialise();
  } else if (process.argv[1] === "--help" || process.argv[1] === "-h") {
    help();
  } else {
    new Analyzer(process.argv[1]).print();
  }
}

const initialConfig = `
ignore: # Ignore files or folders to prevent them being analyzed
# - files must be listed starting with a hyphen
# - ./example/file/path.ts

line_limits: # These are limits on the number of lines in a given block type
  class: 50 # Maximum number of lines in a class
  interface: 5 # Maximum number of lines in an interface
  enum: 8 # Maximum number of lines in an enum
  function: 8 # Maximum number of lines in a function
  loop: 5 # Maximum number of lines inside a loop
  switch: 6 # Maximum number of lines in a switch-block
  if: 5 # Maximum number of lines in an if-block

type_limits: # These are limits on the number of a given block type in a file
  class: 1 # Maximum number of classes in a given file
  interface: 1 # Maximum number of interfaces in a given file
  enum: 1 # Maximum number of enums in a given file
  function: 10 # Maximum number of functions in a given file
  loop: 3 # Maximum number of loops in a given file
  switch: 1 # Maximum number of switch-blocks in a given file
  if: 4 # Maximum number of if-blocks in a given file`.trim();

const configPath = "./.cleanscript.yml";

function initialise() {
  writeFileSync(configPath, initialConfig);
  console.log("A cleanscript config file has been added! (.cleanscript.yml)\n");
}

function printTitle() {
  const title = `
   ___ _                  __           _       _   
  / __\\ | ___  __ _ _ __ / _\\ ___ _ __(_)_ __ | |_ 
 / /  | |/ _ \\/ _' | '_ \\\\ \\ / __| '__| | '_ \\| __|
/ /___| |  __/ (_| | | | |\\ \\ (__| |  | | |_) | |_ 
\\____/|_|\\___|\\__,_|_| |_\\__/\\___|_|  |_| .__/ \\__|
                                        |_|        
  `;
  console.log(title);
}

function help() {
  const helpText = `

CleanScript is a tool that identifies aspects of TypeScript and JavaScript code that may prevent it from being readable and clean.
CleanScript can be used by running:

  cleanscript <path>

CleanScript will then analyze the TypeScript and JavaScript files at that path or within that directory (or matching that glob pattern). This Analysis will be subject to some predefined default values for block length and block total per file.

Greater customizability can be gained via a CleanScript config file. Generate a CleanScript config file using:

  cleanscript init

Then you can enter specific limits for different types of code block. You can also ignore files that require exceptional structure.


`;
  console.log(helpText);
}

main();
