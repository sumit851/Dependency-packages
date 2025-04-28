# Backend Setup CLI

A simple command-line tool to quickly install common Node.js backend development dependencies.

## Installation

Install the CLI globally using npm:

```bash
npm install -g quick-backend-deps
```

## Usage

Run the command in the terminal within your project directory:

```bash
backend-setup
```

This will present you with a list of common backend packages grouped by category. Use the arrow keys to navigate, the spacebar to select/deselect packages, and Enter to confirm your selection.

The selected packages will then be installed as dependencies in your project's `package.json`.

## Features

- Interactive checklist for selecting packages.
- Packages grouped by common categories (Web Frameworks, ORMs, Authentication, etc.).
- Installs selected packages using `npm`.

## Contributing

[Optional: Add guidelines if you want others to contribute - e.g., link to contribution guidelines, how to report bugs]

## License

[Specify your license, e.g., ISC or MIT]
