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
export const searxng = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://search.0xgingi.com');
  }, 1000);

  return `Opening My SearxNG Instance. Use Engine Token 'iusearchbtw' to use Google & Brave. Fuck Bots. `;
};
export const privacytools = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://privacytools.0xgingi.com');
  }, 1000);

  return `Opening Privacy Tools `;
};

export const brave_proxy = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://brave.0xgingi.com');
  }, 1000);

  return `Opening Brave Proxy, a search proxy for brave search`;
};

export const vaultwarden = async (args?: string[]): Promise<string> => {
	setTimeout(function () {
		window.open('https://vault.0xgingi.com');
	}, 1000);

	return `Opening Vaultwarden Instance`;
};
