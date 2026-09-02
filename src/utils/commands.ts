import { get } from 'svelte/store';
import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';
import { user } from '../stores/user';

type CommandHandler = (args: string[]) => Promise<string> | string;

interface Project {
  name: string;
  description: string;
  stack: string;
  status: string;
  url: string;
}

interface FileEntry {
  kind: 'file';
  content: () => string;
  rootOnly?: boolean;
}

interface DirectoryEntry {
  kind: 'dir';
  children: Record<string, VfsEntry>;
  rootOnly?: boolean;
}

type VfsEntry = FileEntry | DirectoryEntry;

const hostname = window.location.hostname || '0xgingi.xyz';
const githubUsername = '0xGingi';
let currentDirectory = '/home/guest';

const projects: Project[] = [
  {
    name: 'nanochat',
    description: 'A lightweight chat app.',
    stack: 'web',
    status: 'live',
    url: 'https://nanochat.app',
  },
  {
    name: 'pebble',
    description: 'Community NanoGPT project.',
    stack: 'typescript',
    status: 'active',
    url: 'https://github.com/nanogpt-community/pebble',
  },
  {
    name: 'longstories',
    description: 'AI-assisted long-form storytelling.',
    stack: 'ai/web',
    status: 'live',
    url: 'https://longstories.ai',
  },
  {
    name: 'peroxide',
    description: 'Personal open-source project.',
    stack: 'github',
    status: 'public',
    url: 'https://github.com/0xGingi/peroxide',
  },
  {
    name: 'audiobook-discord-rpc',
    description: 'Discord Rich Presence integration for Audiobookshelf.',
    stack: 'typescript',
    status: 'public',
    url: 'https://github.com/0xGingi/audiobookshelf-discord-rpc',
  },
  {
    name: 'eternals',
    description: 'Idle MMORPG.',
    stack: 'web',
    status: 'live',
    url: 'https://eternalsonline.com',
  },
  {
    name: 'moltly',
    description: 'A deployed web project.',
    stack: 'web',
    status: 'live',
    url: 'https://moltly.xyz/',
  },
];

const projectByName = new Map(projects.map((project) => [project.name, project]));

const projectTable = () => {
  const rows = projects.map((project) => [
    project.name,
    project.status,
    project.stack,
    project.description,
  ]);
  return formatTable(['name', 'status', 'stack', 'description'], rows);
};

const filesystem: DirectoryEntry = {
  kind: 'dir',
  children: {
    home: {
      kind: 'dir',
      children: {
        guest: {
          kind: 'dir',
          children: {
            'about.txt': {
              kind: 'file',
              content: () =>
                [
                  `${packageJson.author.name}`,
                  '',
                  'Terminal-style portfolio and project launcher.',
                  `Email: ${packageJson.author.email}`,
                  `GitHub: https://github.com/${githubUsername}`,
                ].join('\n'),
            },
            'projects.txt': {
              kind: 'file',
              content: () => projectTable(),
            },
            'contact.txt': {
              kind: 'file',
              content: () =>
                [`Email: ${packageJson.author.email}`, `Website: ${packageJson.author.url}`].join(
                  '\n',
                ),
            },
            projects: {
              kind: 'dir',
              children: Object.fromEntries(
                projects.map((project) => [
                  `${project.name}.md`,
                  {
                    kind: 'file',
                    content: () =>
                      [
                        `# ${project.name}`,
                        '',
                        project.description,
                        `Status: ${project.status}`,
                        `Stack: ${project.stack}`,
                        `URL: ${project.url}`,
                        '',
                        `Try: open ${project.name}`,
                      ].join('\n'),
                  } satisfies FileEntry,
                ]),
              ),
            },
          },
        },
      },
    },
    root: {
      kind: 'dir',
      rootOnly: true,
      children: {
        'note.txt': {
          kind: 'file',
          rootOnly: true,
          content: () =>
            [
              'Access granted.',
              'The obvious flag is noisy. The quiet one lives next to this note.',
              'Try: cat /root/flag.txt',
            ].join('\n'),
        },
        'flag.txt': {
          kind: 'file',
          rootOnly: true,
          content: () => 'flag{terminal_has_layers}',
        },
      },
    },
  },
};

const commandGroups: Record<string, string[]> = {
  system: ['banner', 'clear', 'date', 'echo', 'exit', 'hostname', 'pwd', 'whoami'],
  filesystem: ['cat', 'cd', 'ls'],
  portfolio: ['email', 'github', 'neofetch', 'open', 'projects', 'repo'],
  network: ['curl', 'weather'],
  customization: ['theme'],
  hidden: ['su', 'sudo', 'flag'],
};

const normalizePath = (path: string) => {
  const parts: string[] = [];

  for (const part of path.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') {
      parts.pop();
      continue;
    }
    parts.push(part);
  }

  return `/${parts.join('/')}`;
};

const resolvePath = (path = '.') => {
  if (path.startsWith('/')) return normalizePath(path);
  return normalizePath(`${currentDirectory}/${path}`);
};

const canRead = (entry: VfsEntry) => !entry.rootOnly || get(user) === 'root';

const getEntry = (path: string): VfsEntry | undefined => {
  if (path === '/') return filesystem;

  let entry: VfsEntry = filesystem;
  for (const part of path.split('/').filter(Boolean)) {
    if (entry.kind !== 'dir') return undefined;
    entry = entry.children[part];
    if (!entry) return undefined;
  }

  return entry;
};

const openUrl = (url: string) => {
  window.open(url, '_blank');
};

const openProject = (project: Project) => {
  setTimeout(() => openUrl(project.url), 500);
  return `Opening ${project.name}: ${project.url}`;
};

function formatTable(headers: string[], rows: string[][]) {
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...rows.map((row) => row[index].length)),
  );
  const renderRow = (row: string[]) =>
    row.map((cell, index) => cell.padEnd(widths[index])).join('  ');

  return [renderRow(headers), renderRow(widths.map((width) => '-'.repeat(width))), ...rows.map(renderRow)].join(
    '\n',
  );
}

const helpText = () =>
  [
    'Available commands:',
    '',
    ...Object.entries(commandGroups).map(
      ([group, names]) => `${group.padEnd(13)} ${names.join(', ')}`,
    ),
    '',
    'Try: projects, cat about.txt, ls projects, neofetch, github stats',
  ].join('\n');

const themeUsage = `Usage: theme [args]

[args]
  ls                  list all available themes
  set [theme]         set theme

[examples]
  theme ls
  theme set gruvboxdark`;

const githubUsage = `Usage: github [args]

[args]
  open                open GitHub profile
  stats               show public profile stats
  repos               show recently updated public repos

[examples]
  github stats
  github repos`;

const fetchGithubRepos = async () => {
  const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=8`,
  );

  if (!response.ok) {
    throw new Error(`GitHub responded with ${response.status}`);
  }

  return response.json() as Promise<
    Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      updated_at: string;
    }>
  >;
};

export const commands: Record<string, CommandHandler> = {
  help: () => helpText(),
  hostname: () => hostname,
  su: (args: string[]) => {
    if (args[0] !== 'root') {
      return 'Usage: su root';
    }

    const password = prompt('Password:');
    if (password === 'root') {
      user.set('root');
      currentDirectory = '/root';
      return 'Successfully switched to root.';
    }

    return 'Sorry, try again.';
  },
  whoami: (args?: string[]) => {
    if (args && args.length > 0) {
      return `whoami: expected no arguments, but got ${args.length}`;
    }

    return get(user);
  },
  date: () => new Date().toLocaleString(),
  echo: (args: string[]) => args.join(' '),
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `Permission denied: unable to run the command '${args[0] ?? ''}' as root.`;
  },
  theme: (args: string[]) => {
    if (args.length === 0) {
      return themeUsage;
    }

    switch (args[0]) {
      case 'ls': {
        const result = themes.map((t) => t.name.toLowerCase()).join(', ');
        return `${result}\n\nPreview themes: ${packageJson.repository.url}/tree/master/docs/themes`;
      }

      case 'set': {
        if (args.length !== 2) {
          return themeUsage;
        }

        const selectedTheme = args[1].toLowerCase();
        const selected = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!selected) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(selected);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return themeUsage;
      }
    }
  },
  repo: () => {
    openUrl(packageJson.repository.url);

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
  exit: () => 'Please close the tab to exit.',
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
  projects: (args: string[]) => {
    if (args.length === 0 || args[0] === 'ls') {
      return `${projectTable()}\n\nTry: projects show nanochat, open nanochat`;
    }

    if (args[0] === 'show') {
      const project = projectByName.get(args[1]);
      if (!project) {
        return `Project '${args[1] ?? ''}' not found. Try 'projects ls'.`;
      }

      return [
        project.name,
        '',
        project.description,
        `Status: ${project.status}`,
        `Stack: ${project.stack}`,
        `URL: ${project.url}`,
      ].join('\n');
    }

    return 'Usage: projects [ls|show project]';
  },
  open: (args: string[]) => {
    const project = projectByName.get(args[0]);

    if (!project) {
      return `Usage: open [project]\nProjects: ${projects.map((p) => p.name).join(', ')}`;
    }

    return openProject(project);
  },
  pwd: () => currentDirectory,
  ls: (args: string[]) => {
    const path = resolvePath(args[0]);
    const entry = getEntry(path);

    if (!entry) {
      return `ls: cannot access '${args[0] ?? path}': No such file or directory`;
    }

    if (!canRead(entry)) {
      return `ls: cannot open directory '${path}': Permission denied`;
    }

    if (entry.kind === 'file') {
      return path.split('/').pop() ?? path;
    }

    return Object.entries(entry.children)
      .filter(([, child]) => canRead(child))
      .map(([name, child]) => (child.kind === 'dir' ? `${name}/` : name))
      .join('  ');
  },
  cd: (args: string[]) => {
    const path = resolvePath(args[0] ?? '/home/guest');
    const entry = getEntry(path);

    if (!entry) {
      return `cd: no such file or directory: ${args[0] ?? path}`;
    }

    if (entry.kind !== 'dir') {
      return `cd: not a directory: ${args[0]}`;
    }

    if (!canRead(entry)) {
      return `cd: permission denied: ${path}`;
    }

    currentDirectory = path;
    return '';
  },
  cat: (args: string[]) => {
    if (!args[0]) {
      return 'Usage: cat [file]';
    }

    const path = resolvePath(args[0]);
    const entry = getEntry(path);

    if (!entry) {
      return `cat: ${args[0]}: No such file or directory`;
    }

    if (!canRead(entry)) {
      return `cat: ${args[0]}: Permission denied`;
    }

    if (entry.kind !== 'file') {
      return `cat: ${args[0]}: Is a directory`;
    }

    return entry.content();
  },
  neofetch: () => {
    const activeTheme = get(theme);
    return [
      '   0x000000      0xGingi@terminal',
      '   0x47494e      ----------------',
      '   0x474900      OS: web terminal',
      '   0x544552      Host: ' + hostname,
      '   0x4d494e      User: ' + get(user),
      '   0x414c00      Shell: svelte',
      '                 Theme: ' + activeTheme.name,
      `                  Projects: ${projects.length}`,
      `                  Repo: ${packageJson.repository.url}`,
      `                  Email: ${packageJson.author.email}`,
    ].join('\n');
  },
  github: async (args: string[]): Promise<string> => {
    const action = args[0] ?? 'open';

    if (action === 'open') {
      setTimeout(() => openUrl(`https://github.com/${githubUsername}`), 500);
      return 'Opening GitHub profile...';
    }

    if (action === 'stats') {
      try {
        const [profileResponse, repos] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetchGithubRepos(),
        ]);

        if (!profileResponse.ok) {
          throw new Error(`GitHub responded with ${profileResponse.status}`);
        }

        const profile = (await profileResponse.json()) as {
          public_repos: number;
          followers: number;
          following: number;
          html_url: string;
        };
        const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);

        return [
          `${githubUsername} on GitHub`,
          `Profile: ${profile.html_url}`,
          `Public repos: ${profile.public_repos}`,
          `Followers: ${profile.followers}`,
          `Following: ${profile.following}`,
          `Stars on recent repos: ${stars}`,
          '',
          'Recently updated:',
          ...repos.slice(0, 5).map((repo) => `- ${repo.name} (${repo.language ?? 'unknown'})`),
        ].join('\n');
      } catch (error) {
        return `github stats: ${error}`;
      }
    }

    if (action === 'repos' || action === 'recent') {
      try {
        const repos = await fetchGithubRepos();
        return formatTable(
          ['repo', 'lang', 'stars', 'updated'],
          repos.map((repo) => [
            repo.name,
            repo.language ?? '-',
            String(repo.stargazers_count),
            new Date(repo.updated_at).toLocaleDateString(),
          ]),
        );
      } catch (error) {
        return `github repos: ${error}`;
      }
    }

    return githubUsage;
  },
  flag: async (): Promise<string> => {
    if (get(user) === 'root') {
      setTimeout(() => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000);
      return 'You found the loud flag. Try: ls /root';
    }

    return 'Permission denied.';
  },
  nanochat: async (): Promise<string> => openProject(projectByName.get('nanochat')!),
  pebble: async (): Promise<string> => openProject(projectByName.get('pebble')!),
  longstories: async (): Promise<string> => openProject(projectByName.get('longstories')!),
  peroxide: async (): Promise<string> => openProject(projectByName.get('peroxide')!),
  'audiobook-discord-rpc': async (): Promise<string> =>
    openProject(projectByName.get('audiobook-discord-rpc')!),
  eternals: async (): Promise<string> => openProject(projectByName.get('eternals')!),
  moltly: async (): Promise<string> => openProject(projectByName.get('moltly')!),
};
