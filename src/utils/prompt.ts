import chalk from 'chalk';
import prompts from 'prompts';

/**
 * Get User Input
 * @param  {prompts.PromptType} type
 * @param  {string} name
 * @param  {string} message
 * @param  {Choices[]} choices?
 */
export default async function prompt(
  type: prompts.PromptType,
  name: string,
  message: string,
  choices?: Choices[],
  validate?: (value: string) => boolean | string
) {
  return prompts({
    type: type,
    name: name,
    message: message,
    choices: choices,
    onState: (object) => (object.aborted ? Aborted() : null),
    validate: validate ? (value) => validate(value) : undefined
  });
}

export interface Choices {
  /** Text to show */
  title: string;
  /** Value to return */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

/**
 * Show Abort Message
 */
function Aborted() {
  console.clear();
  console.log(chalk.red('--- Aborted ---'));
  console.log(chalk.green('--- Exiting ---'));
  process.exit();
}
