# A Name Generator

Generate random names directly from your terminal.

## Installation
`$ npm i -g grabname`

## Usage

`$ grabname [count] [--type | -t]`

*(Order of arguments and options does **NOT** matter)*

For example, running `$ grabname 10 -f` generates 10 female firstnames.

## Current Support

For now, `grabname` only supports firstnames and female and male names (you might also encounter unisex names within both).

## Docs

### Arguments

`[count]`

A number specifying the number of names to generate. If ommitted, only one name is generated.

### Options

#### Name Types

Name types are exclusive of each other. That is, only **one** option can be specified.

**NOTE:** To generate random names from all options, do not specify any option.

`[--female | -f]` — Generates a female name.

`[--male | -m]` — Generates a male name.

#### General

If any of those is specified, all other arguments/options are ignored. `--help` takes precedence over `--version`.

`--help` — Shows help menu.

`--version` — Shows the command's version number.