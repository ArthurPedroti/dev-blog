---
title: Setup Homebrew + Fish + Starship + NVM (Mac)
description: A step-by-step about how install and config Homebrew + Fish +
  Starship + NVM on Mac
date: 2023-03-29 02:22:49
image: assets/img/setup-homebrew-fish-starship-nvm-mac-.png
category: mac
background: "#df4382 "
---
## Introduction

These days I needed to configure my new Mac and I tried to use Fish as my default shell, I suffered a little to discover the details and how to make everything works together, so I wrote this tutorial to help any other folks who are on this same journey.

## Brew install

If you are on first use of your Mac, update your mac to the last version (don't update may cause issues on your Homebrew installation, updating solved it for me). Or you can type any command like “git”, not to install git, but to Mac automatically install command line developer tools, this is will ensure you can properly install homebrew.

Run this command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Please make sure that once it’s done, run the two lines of codes that appear at the end of the installation, to add homebrew to your path. Because if you don’t, the brew command won’t work.

docs: [Homebrew — The Missing Package Manager for macOS (or Linux)](https://brew.sh/)

## Fish install

Install fish with brew and add the brew path to fish:

```
brew install fish 
fish
fish_add_path /opt/homebrew/bin
```

You need to run these last commands to add the homebrew path on fish, otherwise, the brew command won’t work on your fish terminal.

### Changing the default terminal

You can access fish by typing "fish", or setting it as your default terminal.
To set it as default, you need to check where is located the bin of your fish shell, to do that, run the command:

```bash
which fish
# output
# /opt/homebrew/bin/fish
```

This location can change depending on the user, mac, etc. So, it's important to check what's your output.
Now you have to access the list of shells and add the location of your fish shell:

```bash
sudo nano /etc/shells
```

Add the path to the end of the file:

![The last line of the file with the path on terminal](assets/img/a-step-by-step-about-how-install-and-config-homebrew-fish-starship-nvm-on-mac.png "Terminal")

You can use this command to do that too (check the paths):

```bash
echo /opt/homebrew/bin/fish | sudo tee -a /etc/shells
```

Now run the following command to change the default shell to fish:

```bash
chsh -s /opt/homebrew/bin/fish
```

> **Important note:** Check if you don't do anything wrong so far, because if you run the command to change the shell, and if you have any warning messages, open another terminal without closing this one you just ran the command, and test if it's everything ok. If we have a problem, run the command substituting the path to /bin/bash or your previous bash and consulting better the fish docs to understand the problem.

docs: [Introduction — fish-shell 3.6.1 documentation (fishshell.com)](https://fishshell.com/docs/current/)

## Install Starship

Starship is a customizable prompt for different shells, if you don’t want this feature you can skip this step.

Install:

```bash
brew install starship
```

Add this line to the end of your file:

```bash
# ~/.config/fish/config.fish

starship init fish | source
```

docs: [Starship](https://starship.rs/guide/#%F0%9F%9A%80-installation)

## Install Fisher

Fisher is a plugin manager for Fish, and we will use the handler easier with all our plugins, the NVM plugins, and configs too.

Run the following command to install:

```bash
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

## Using NVM through a plugin (nvm.fish)

This is a plugin to quickly install NVM and use it without any forward configurations:

```bash
fisher install jorgebucaran/nvm.fish
```

But to do some other nvm default configs, you will need to check the docs, for example, to set the default node version when you open a shell, we need to configure it with this command:

```bash
set --universal nvm_default_version v18.4.0
```

## Using the NVM default installation

The other option is to install the NVM as your default installation:

Run the cURL or Wget command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Then you will need to install a plugin called Bass.

## Install Bass

Bass is a plugin for fish that allows you to use utilities written for Bash in the fish shell (that we will need to run the NVM):

```bash
fisher install edc/bass
```

Add this configuration to your `config.fish` file:

```bash
# ~/.config/fish/config.fish

function nvm
   bass source $HOME/.nvm/nvm.sh --no-use ';' nvm $argv
end
```

Check if the path is correct of your NVM installation

Now you can run NVM as if it were a normal installation.

## Conclusion

This is a brief tutorial to help you with some tips and a step-by-step to make it easier when we need to configure these tools. I wish it will be helpful to you.

If you have any questions or suggestions, don't hesitate to comment below, until next time.😉