export default new (class Markdown {
  /**
   * Make Text bold
   * @param {string|number} text
   * @returns {string} bold text
   */
  bold(text: string | number): string {
    return `**${text}**`;
  }
  /**
   * Make Text italic
   * @param {string|number} text
   * @returns {string} italic text
   */
  italic(text: string | number): string {
    return `*${text}*`;
  }
  /**
   * Underline text
   * @param {string|number} text
   * @returns {string} underlined text
   */
  underline(text: string | number): string {
    return `__${text}__`;
  }
  /**
   * Strikethrough text
   * @param {string|number} text
   * @returns {string} strikethrough text
   */
  strikethrough(text: string | number): string {
    return `~~${text}~~`;
  }
  /**
   * Put text in codeblock
   * @param {string|number} text
   * @returns {string} Text in Codeblock
   */
  codeblock(text: string | number): string {
    return '`' + text + '`';
  }
  /**
   * Put text in syntaxhighlighted codeblock
   * @param {string|number} text
   * * @param {string} lang Syntax Highlighting Language
   * @returns {string} Text in Code
   */
  code(text: string | number, lang: string): string {
    return '```' + lang + '\n' + text + '\n' + '```';
  }
  /**
   * Put text in quotes
   * @param {string|number} text
   * @returns {string} Text in Quotes
   */
  quote(text: string | number): string {
    return `> ${text}`;
  }
  /**
   * Put text in multiline quotes
   * @param {string|number} text
   * @returns {string} Text in Multiline Quotes
   */
  multiquote(text: string | number): string {
    return `>>> ${text}`;
  }
})();
