#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import chalk from "chalk";

const packages = {
  "Web Framework": ["express@latest", "fastify@latest"],
  "ORM / Database Client": [
    "prisma@latest",
    "mongoose@latest",
    "sequelize@latest",
    "typeorm@latest",
    "knex@latest",
  ],
  "Database (NoSQL)": ["mongodb@latest"],
  Authentication: [
    "passport@latest",
    "jsonwebtoken@latest",
    "jose@latest",
    "argon2@latest",
  ],
  Caching: ["ioredis@latest", "node-cache@latest"],
  Logging: ["winston@latest", "pino@latest"],
  Testing: ["jest@latest", "mocha@latest", "chai@latest"],
  Security: ["helmet@latest", "rate-limiter@latest"],
  "Input Validation": ["joi@latest", "zod@latest", "class-validator@latest"],
  WebSockets: ["socket.io@latest", "ws@latest"],
  "Task Scheduling": ["node-cron@latest"],
  Utilities: [
    "lodash@latest",
    "axios@latest",
    "dotenv@latest",
    "nodemon@latest",
  ],
};

inquirer
  .prompt([
    {
      type: "checkbox",
      name: "selectedPackages",
      message: "Select backend packages to install:",
      choices: Object.entries(packages).flatMap(([category, items]) => [
        new inquirer.Separator(chalk.cyan.bold(`\n${category}`)),
        ...items.map((item) => ({
          name: chalk.yellow(item),
          value: item,
        })),
      ]),
      pageSize: 15,
      loop: false,
    },
  ])
  .then((answers) => {
    const dependencies = answers.selectedPackages;
    if (!dependencies || dependencies.length === 0) {
      console.log(chalk.red("No packages selected. Exiting."));
      return;
    }
    console.log(
      chalk.yellowBright(`\nInstalling ${dependencies.length} packages...`)
    );
    try {
      execSync(`npm install --save ${dependencies.join(" ")}`, {
        stdio: "inherit",
      });
      console.log(chalk.green.bold("\nSetup complete!"));
    } catch (error) {
      console.error(chalk.red.bold("\nError during package installation:"));
      console.error(
        chalk.red(
          "Installation failed. Please check the output above for details."
        )
      );
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(
        chalk.red("Error: Prompt couldn't be rendered in this environment.")
      );
    } else if (error.message.includes("User force closed the prompt")) {
      console.log(chalk.yellow("\nOperation cancelled by user."));
    } else {
      console.error(chalk.red("An unexpected error occurred:"), error);
    }
  });
