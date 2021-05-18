import { Client, Guild, Role } from 'discord.js';

import { config } from '../index';
import prompt from '../utils/prompt';

module.exports = {
  info: {
    name: 'Give Role',
    description: 'Give yourself a role',
    input: ['Role']
  },
  run: async function (client: Client, server: Guild) {
    if (!server.me?.hasPermission('MANAGE_ROLES')) {
      console.clear();
      return console.log("Don't have permissions to manage roles");
    }
    const roles = server.roles.cache.map((role) => ({
      title: role.name,
      value: role
    }));
    const selectedrole = <Role>(await prompt('select', 'role', 'Select Role', roles)).role;
    const you = await server.members.fetch(config.OWNER);
    if (you.roles.cache.has(selectedrole.id)) return console.log('You already have that role');
    try {
      await you.roles.add(selectedrole);
    } catch (err) {
      return console.log(err.message ? err.message : err);
    }
  }
};
