import packageJson from '../../../package.json';
import * as bin from './index';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return 'guest';
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const email = async (args: string[]): Promise<string> => {
  window.open('0xgingi@0xgingi.com');

  return 'Opening mailto:0xgingi@0xgingi.com...';
};

export const sudo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, 1000);

  return `Permission denied: unable to run the command '${args[0]}' as root.`;
};

export const repo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://github.com/0xGingi/terminal', '_blank');
  }, 1000);
  return 'Opening repository...';
};

export const banner = (args?: string[]): string => {
  return `
  
░█████╗░██╗░░██╗░██████╗░██╗███╗░░██╗░██████╗░██╗
██╔══██╗╚██╗██╔╝██╔════╝░██║████╗░██║██╔════╝░██║
██║░░██║░╚███╔╝░██║░░██╗░██║██╔██╗██║██║░░██╗░██║
██║░░██║░██╔██╗░██║░░╚██╗██║██║╚████║██║░░╚██╗██║
╚█████╔╝██╔╝╚██╗╚██████╔╝██║██║░╚███║╚██████╔╝██║
░╚════╝░╚═╝░░╚═╝░╚═════╝░╚═╝╚═╝░░╚══╝░╚═════╝░╚═╝ v${packageJson.version}

Type 'help' to see list of available commands`;
};
export const hackthebox = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://app.hackthebox.com/users/641801');
  }, 1000);

  return `Opening my HTB Profile`;
};
export const onion = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('http://gingiwwd4tl3qedfnzielwdlnghnzztd4qiedvub54j4bj7rtz4u43yd.onion/');
  }, 1000);

  return `Opening Terminal Onion Link`;
};
export const searxng = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://search.0xgingi.com');
  }, 1000);

  return `Opening My SearxNG Instance. Use Engine Token 'unlockall' to use Google & Brave. Fuck Bots. `;
};
export const searxngtor = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('http://searxyqdegtqksicnwpxa24ipnb2ylmp6iutnnwtazbhup4dit4eeyqd.onion/');
  }, 1000);

  return `Opening My SearxNG Instance Tor Hidden Service. Use Engine Token 'unlockall' to use Google & Brave. Fuck Bots. `;
};
export const dns = async (args: string[]): Promise<string> => {
  return 'Adblock DNS:\n\nIPv4: 5.161.193.201 \n DoH: https://dns.0xgingi.com/dns-query \n DoT: dns.0xgingi.com';

};