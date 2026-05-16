// Name: Katifetch
// ID: katifetch
// Description: Shows detailed system and hardware information in Katifetch style.

class KatifetchExtension {
  getInfo() {
    return {
      id: 'katifetch',
      name: 'Katifetch',
      color1: '#5c2d91', 
      color2: '#4a2475',
      blocks: [
        {
          opcode: 'printKatifetch',
          blockType: Scratch.BlockType.COMMAND,
          text: 'print Katifetch info'
        },
        {
          opcode: 'getKatifetchFull',
          blockType: Scratch.BlockType.REPORTER,
          text: 'full Katifetch'
        },
        {
          opcode: 'getStat',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Katifetch [STAT]',
          arguments: {
            STAT: {
              type: Scratch.ArgumentType.STRING,
              menu: 'statsMenu',
              defaultValue: 'os'
            }
          }
        }
      ],
      menus: {
        statsMenu: {
          acceptReporters: true,
          items: [
            { text: 'Operating System', value: 'os' },
            { text: 'Browser', value: 'browser' },
            { text: 'CPU Cores', value: 'cores' },
            { text: 'Memory (RAM)', value: 'ram' },
            { text: 'GPU / Graphics', value: 'gpu' },
            { text: 'Resolution', value: 'resolution' },
            { text: 'Timezone', value: 'timezone' },
            { text: 'Language', value: 'language' },
            { text: 'Network Status', value: 'online' }
          ]
        }
      }
    };
  }

  _getSystemData() {
    const ua = navigator.userAgent;
    
    // OS Detection
    let os = "Linux / Niche OS";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    if (ua.indexOf("Mac") !== -1) os = "macOS";
    if (ua.indexOf("X11") !== -1 || ua.indexOf("Linux") !== -1) os = "Linux";
    if (ua.indexOf("Android") !== -1) os = "Android";
    if (ua.indexOf("iPod") !== -1 || ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) os = "iOS";

    // Browser Detection
    let browser = "Unknown";
    if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
    if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
    if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Safari";

    // GPU Detection
    let gpu = "Unknown GPU";
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          gpu = gpu.replace(/ANGLE \([^)]+\) /i, '');
        }
      }
    } catch (e) {}

    return {
      os: os,
      browser: browser,
      cores: navigator.hardwareConcurrency || "N/A",
      ram: navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "N/A",
      gpu: gpu,
      resolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
      language: navigator.language || "en",
      online: navigator.onLine ? "Online" : "Offline"
    };
  }

  printKatifetch(args, util) {
    const output = this.getKatifetchFull();
    if (util && util.target) {
      util.target.setSay('say', output);
    }
  }

  getKatifetchFull() {
    const data = this._getSystemData();
    return `
user@katifetch
---------------
OS: ${data.os}
Browser: ${data.browser}
Cores: ${data.cores}
RAM: ${data.ram}
GPU: ${data.gpu}
Resolution: ${data.resolution}
Timezone: ${data.timezone}
Lang: ${data.language}
Status: ${data.online}
    `.trim();
  }

  getStat(args) {
    const data = this._getSystemData();
    return data[args.STAT] || '';
  }
}

Scratch.extensions.register(new KatifetchExtension());