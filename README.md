# Katifetch-turbowarp

Custom TurboWarp extension for Katifetch system information.

## How to use in TurboWarp

To load this extension into your TurboWarp project, follow these simple steps:

1. Open [TurboWarp](https://turbowarp.org/editor) or open the app of Turbowarp desktop.
2. Click on the **Add Extension** button (the `+` icon at the bottom-left corner).
3. Select the **Custom Extension** card (the green one).
4. Choose the **URL** tab and paste the following link:
   ```text
   https://raw.githack.com/ximimoments/Katifetch-turbowarp/refs/heads/main/Katifetch.js
      ```
5. Click **Load**.

## Available Blocks

This extension adds a new category called Katifetch with the following blocks:

* `print Katifetch info` (Command block): Makes the current sprite say the full system report directly in a speech bubble.

* `full Katifetch` (Reporter block): Returns the complete string formatted with all system data (without ASCII art).

* `Katifetch [STAT]` (Reporter block): Returns a specific system metric via a dropdown menu.

Tracked Information:

* 🐧 Operating System

* 🌐 Browser & Language

* 🧠 CPU Cores & RAM

* 🎮 GPU / Graphics Card

* 🖥️ Screen Resolution

* 🌍 Timezone & Network Status
