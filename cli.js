#!/usr/bin/env node

const colors = require('colors')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs')

const optNames = [
	'f', 'female',
	'm', 'male'
]

const conflict = (opt, alias) => {
	optNames.filter(type =>
		type != alias &&
		type != opt
	)
}

const createOpt = (opt, alias) => {
	return {
		alias,
		boolean: true,
		desc: `Generates a ${opt} name.`,
		conflicts: conflict(alias, opt)
	}
}

const argv = yargs(hideBin(process.argv))
	.options({
		female: createOpt('female', 'f'),
		male: createOpt('male', 'm')
	})
	.check(argv => {
		if (argv._.length > 1) throw new Error('Only one argument allowed.')

		if (argv._.length && typeof argv._[0] != 'number') {
			throw new Error('Argument must be a number (number of names to generate).')
		}

		else if (Object.keys(argv).length > 4) throw new Error('Only one option allowed.')

		else return true
	})
	.strictOptions()
	.usage('fakename [count] [--type | -t]')
	.parse()
//


// FUNCS
const rdmItem = arr => arr[Math.floor(Math.random() * arr.length)]

// VARS
const size = Object.keys(argv).length
const count = argv._[0] || 1
const outNames = []

// CHECK FOR OPTS
let list

if (size == 2) {		// If no opts,
	const filenames = fs.readdirSync(__dirname + '/lists', 'utf8')

	list = []

	for (const filename of filenames) {
		list = list.concat(JSON.parse(fs.readFileSync(__dirname + `/lists/${filename}`, 'utf8').trim()))
	}
}

else if (size > 2 && size % 2 == 0) {	// If opts,
	const type = Object.keys(argv).filter(key =>
		key != '_' &&
		key != '$0' &&
		key.length != 1
	).toString()

	list = JSON.parse(fs.readFileSync(__dirname + `/lists/${type}.json`, 'utf8').trim())
}

else throw new Error('Something went wrong.')

// SET NAMES
for (let i = 1; i <= count; i++) {
	let name = rdmItem(list)
	while (outNames.includes(name)) {
		name = rdmItem(list)
	}
	outNames.push(name)
}

// console.log(argv)
console.log(outNames.join('\n').blue)