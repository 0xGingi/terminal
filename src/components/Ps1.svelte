<script>
  import { user } from '../stores/user';
  import { theme } from '../stores/theme';
  import { commands } from '../utils/commands';
  let hostname = window.location.hostname;
</script>

<h1 class="font-bold flex">
  <span style={`color: ${$theme.yellow};`}>{$user}</span>
  <span style={`color: ${$theme.white}`}>@</span>
  <span style={`color: ${$theme.green}`}>{hostname}</span>
  <span style={`color: ${$theme.white}`}>:~$</span>
</h1>
