import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';
import { user } from '../stores/user';

const hostname = window.location.hostname;
let currentUser = 'guest';

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  hostname: () => hostname,
  su: (args: string[]) => {
    if (args[0] === 'root') {
      const password = prompt('Password:');
      if (password === 'root') {
        user.set('root');
        return 'Successfully switched to root.';
      } else {
        return 'Sorry, try again.';
      }
    } else {
      return 'Usage: su root';
    }
  },
  whoami: (args?: string[]) => {
    if (args && args.length > 0) {
      return 'whoami: expected no arguments, but got ' + args.length;
    }
    return currentUser;
  },
  date: () => new Date().toLocaleString(),
  echo: (args: string[]) => args.join(' '),
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  repo: () => {
    window.open(packageJson.repository.url, '_blank');

    return 'Opening repository...';
  },
  clear: () => {
    history.set([]);

    return '';
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening mailto:${packageJson.author.email}...`;
  },
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATu`);

    return weather.text();
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `
░█████╗░██╗░░██╗░██████╗░██╗███╗░░██╗░██████╗░██╗
██╔══██╗╚██╗██╔╝██╔════╝░██║████╗░██║██╔════╝░██║
██║░░██║░╚███╔╝░██║░░██╗░██║██╔██╗██║██║░░██╗░██║
██║░░██║░██╔██╗░██║░░╚██╗██║██║╚████║██║░░╚██╗██║
╚█████╔╝██╔╝╚██╗╚██████╔╝██║██║░╚███║╚██████╔╝██║
░╚════╝░╚═╝░░╚═╝░╚═════╝░╚═╝╚═╝░░╚══╝░╚═════╝░╚═╝ v${packageJson.version}

Type 'help' to see list of available commands
`,
eternals: async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://wiki.eternalsonline.com/');
  }, 1000);
  return `Opening Eternals Online - The Global Discord MMORPG!`;
},
docker: async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://hub.docker.com/u/0xgingi');
  }, 1000);
  return `Opening My Docker Profile!`;
},
github: async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://github.com/0xGingi/');
  }, 1000);
  return `Opening My Github Profile!`;
},
flag: async (args: string[]): Promise<string> => {
  let currentUser;
  user.subscribe(value => currentUser = value);

  if (currentUser === 'root') {
    setTimeout(function () {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }, 1000);
    return `You found me!`
    } else {
    return 'Permission denied.';
  }
},
trustynotes: async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://trustynotes.app/');
  }, 1000);
  return `Opening trustynotes!`;
},
};
