import packageJson from '../../../package.json';
import * as bin from './index';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const email = async (args: string[]): Promise<string> => {
  window.open('0xgingi@0xgingi.com');

  return 'Opening mailto:0xgingi@0xgingi.com...';
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
export const matrix = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://element.onionsherpa.com');
  }, 1000);

  return `Opening Matrix HomeServer / Element Client `;
};

export const libreddit = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://reddit.0xgingi.com');
  }, 1000);

  return `Opening Libreddit - Privacy Respecting Reddit Frontend `;
};

export const invidious = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://invidious.0xgingi.com');
  }, 1000);

  return `Opening Invidious - Privacy Respecting YouTube Frontend `;
};

export const nitter = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://nitter.0xgingi.com');
  }, 1000);

  return `Opening nitter - Privacy Respecting Twitter Frontend `;
};

export const privacytools = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://privacytools.0xgingi.com');
  }, 1000);

  return `Opening Privacy Tools `;
};

export const encrypt = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://encrypt.0xgingi.com');
  }, 1000);

  return `Opening hat.sh instance - encrypt and decrypt files in your browser`;
};

