#!/usr/bin/env node
const sleep = require("sleep");
const commander = require("commander");
const ora = require("ora");
const inquirer = require("inquirer");
const chalk = require("chalk");
const symbols = require("log-symbols");
// const config = require("./package.json");

const aiTalk = humanAsk =>
  humanAsk
    .replace("吗", "")
    .replace("?", "！")
    .replace("？", "！");

const aiAnswer = humanAsk => {
  const spinner = ora({
    color: "red",
    text: "thinking..."
  });
  spinner.start();
  sleep.sleep(1);
  spinner.succeed();
  console.log(symbols.success, "Ai answer:", chalk.green(aiTalk(humanAsk)));
};

const humanAsk = () => {
  inquirer
    .prompt([
      {
        name: "humanAskContent",
        message: "Human ask:"
      }
    ])
    .then(({ humanAskContent }) => {
      aiAnswer(humanAskContent);
      return humanAsk();
    });
};
commander
  .command("start")
  .action(() => {
    console.log("Ai say:", chalk.green("hello human"));
    humanAsk();
  });
commander.parse(process.argv);
