import packageJson from '../../../package.json';
import * as bin from './index';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.\n\n\n\nCheck Out the 'monero' command!`;
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

Type 'help' to see list of available commands\nCheck Out The 'monero' command!`;
};
export const monero = async (args: string[]): Promise<string> => {
  return `Check Out My Monero Services!\nPublic Monero RPC: monero.0xgingi.com:18081\nMonero Blockchain Explorer: https://explorer.0xgingi.com\nMonero P2Pool Stats: https://p2pool.0xgingi.com`;
};
export const monero_explorer = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://explorer.0xgingi.com');
  }, 1000);

  return `https://explorer.0xgingi.com`;
};
export const p2pool_stats = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://p2pool.0xgingi.com');
  }, 1000);

  return `https://p2pool.0xgingi.com`;
};
