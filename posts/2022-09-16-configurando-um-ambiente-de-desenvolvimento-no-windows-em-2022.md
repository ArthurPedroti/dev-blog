---
title: Configurando um ambiente de desenvolvimento no Windows em 2022
description: Um passo a passo atualizado para instalação do WSL2 e suas configurações
date: 2022-09-16 03:07:45
image: assets/img/maxwell-nelson-taiug8cpkaq-unsplash-768x512.jpg
category: misc
background: "#7AAB13"
---
## Introdução

As vezes entra um integrante novo para a equipe, ou você formata seu computador, compra um novo, e tem que instalar e reconfigurar tudo do zero, tem que ir atrás de um monte de tutorial, cada um para uma coisa etc. Nesse artigo eu compilo toda a configuração inicial do meu ambiente de desenvolvimento do Windows com WSL, varias outras ferramentas importantes, e outras dicas no final.

## Considerações iniciais

Ao longo do tempo, algumas das ferramentas citadas aqui tem suas atualizações, e devido a isso, tentarei sempre colocar o link direto da documentação de cada passo, para que seja fácil a consulta, caso algum detalhe tenha sido alterado.

## 1º Passo - Chocolatey

Primeiramente vamos estar instalando o Chocolatey, um gerenciador de pacotes para o Windows, para isso, abra o PS (PowerShell) como administrador e rode o seguinte comando:

```jsx
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

[Chocolatey Software | Installing Chocolatey](https://chocolatey.org/install)

## 2º Passo - Vscode

Nesse caso, você pode escolher tanto baixar o instalador do vscode, como utilizar o próprio chocolatey para fazer a instalação:

```jsx
choco install vscode
```

[Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)

Caso você queira algumas configurações prontas, abra o vscode e pressione `Ctrl+p` , digite “user settings” e selecione a opção abaixo:

![User Settings vscode](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/080ce143-5723-488a-b9dd-3d155ebf30d7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T180918Z&X-Amz-Expires=86400&X-Amz-Signature=a0d1d2879d6063055f9147c35de805d83107bc5d54d96ed53c571390037f3c7d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "User Settings vscode")

Agora copie e cole as configurações do link abaixo:

[vscode-settings.json (github.com)](https://gist.github.com/ArthurPedroti/ed8104e5d68166c0148a28060f39c281)

Se quiser algumas dicas de extensões, seguem as que eu mais utilizo:

* Auto Rename Tag
* Dracula Oficial (tema vscode)
* Material Icon Theme
* Color Highlight
* EditorConfig
* Eslint
* Git Graph
* GitLens
* Import Cost
* Prettier

## 3º Passo - WSL

Abra o PS como administrador e rode o comando:

```jsx
wsl --install -d Ubuntu
```

Após a instalação, reinicie seu computador.

Por padrão, a instalação já vai instalar o Ubuntu na sua máquina, e ao reiniciar o computador, ele vai abrir o Ubuntu e pedir para que você digite o nome de usuário que você irá utilizar no seu Ubuntu.

![Login Ubuntu](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8da7ae5e-ce18-4215-bf70-a5bf3e00b75f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181020Z&X-Amz-Expires=86400&X-Amz-Signature=a159dad795b14bfc026ddb6cb63343f6826f5947b985c24e921c8c338fdb5933&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "Login Ubuntu")

Depois ele vai pedir para que você coloque a senha, se você digitar a senha e não aparecer nada, fique tranquilo, o Ubuntu é assim mesmo, não vai aparecer que você está digitando a senha, nem aparece aqueles “*” que estamos acostumados, é só digitar a senha e apertar Enter.

Essa versão do Ubuntu que é instalada junto com a instalação do WSL, é sempre a LTS, mas você pode estar acessando a loja (Microsoft Store) para conferir, ou até para utilizar uma outra versão, caso você preferir.

E por padrão, já está vindo também na versão WSL2, que a versão mais otimizada e atualizada do WSL.

[Instalar o WSL | Microsoft Docs](https://docs.microsoft.com/pt-br/windows/wsl/install)

## 4ª Passo - Windows Terminal

Entre na Microsoft Store, e instale o “Windows Terminal”, logo após, abra o Windows Terminal, acesse as configurações e mude o perfil padrão para o Ubuntu e o terminal padrão para o Windows Terminal, assim ao abrir o seu terminal, já vai abrir direto no Ubuntu:

![Configurações Windows Terminal](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bf175479-ec9b-4c18-b097-80fae3703cbc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181047Z&X-Amz-Expires=86400&X-Amz-Signature=17405ae20c9de8eb3fb6d07aa60295a3bf54e8c6e7a26a9ed1514adfcb3400b4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "Configurações Windows Terminal")

## 5º Ajustando o diretorio inicial

Caso ao iniciar o seu terminal no ubuntu, o diretório inicial não for o “~”, que é o diretório padrão do seu usuário, siga os passo abaixo. Porém atualmente o terminal já está vindo configurado dessa forma previamente.

Abra novamente o terminal e rode o comando “cd” para navegar até o diretório inicial, após isso rode o comando:

```jsx
explorer.exe .
```

Irá abrir um explorer do windows, copie o endereço desse diretório:

![Caminho explorer Windows](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bb74c60b-d7a8-490f-b068-ca0e6b3b5e48/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181123Z&X-Amz-Expires=86400&X-Amz-Signature=b22dd9e34438f70d57950d1ab3fe3161530dba1d336c846e2aac17d076572be8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "Caminho explorer Windows")

Acesse novamente as configurações do terminal, selecione o Ubuntu no menu esquerdo, e copie o endereço que você acabou de copiar no campo de “Diretório inicial”:

![Configurações Windows Terminal](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8290902c-0b95-4226-ade2-f275eb22f2da/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181147Z&X-Amz-Expires=86400&X-Amz-Signature=d1ad99d63dc57678f79c63937d86132e7e9e16307ba7bbb5c8ea5af55b18ba93&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "Configurações Windows Terminal")

Agora, ao abrir o terminal, já abrirá direto na home do seu usuário.

## 6ª Passo - Alterando o tema do Windows Terminal

Se você não liga para o tema do seu terminal, pode pular essa etapa.

Para mudar o tema basta acessar as Configurações > Esquema de cores, e selecionar o melhor tema que você deseja, se quiser usar um diferente, clique em “Abrir o arquivo JSON”, no final do menu esquerdo, e adicione o tema no array de schemes da seguinte maneira(para o tema Drácula):

Segue o link para copiar: [Dark theme for Windows Terminal and 275+ apps — Dracula (draculatheme.com)](https://draculatheme.com/windows-terminal)

![Tema Drácula](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/deb2e2a5-2465-4022-98f1-8e259d19e431/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181203Z&X-Amz-Expires=86400&X-Amz-Signature=81056b22184a734fc7b99850980f546bb03921ddd49d6a363c58054f018cd633&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "Tema Drácula")

Agora, vamos colocar o tema em cada terminal manualmente, pelo próprio JSON ainda, pois pela interface de configuração normalmente não funciona, então altere o array “list” da seguinte maneira:

![Configuração Scheme Windows Terminal](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8473673f-4166-4132-8518-52f1aa82a898/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181223Z&X-Amz-Expires=86400&X-Amz-Signature=df210ef02ddd63e8a693d538240f1494b0db46df6271da75fc2f7ff01f9a0972&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "Configuração Scheme Windows Terminal")

Pronto, agora todos os seus terminais já estão com o tema de acordo.

## 7º - Extensão do WSL do VScode

Vamos instalar a extensão do WSL no VScode. Para isso basta ir à sessão de extensões do VScode, digitar “WSL”, e instalar a extensão.

Com isso, vamos conseguir abrir os projetos no nosso ubuntu pelo nosso VScode normalmente, usando o atalho “code .” dentro do diretório que queremos abrir.

## 8º - Instalando o Zsh e Oh My Zsh

O zsh é um shell melhorado, e vamos utilizá-lo juntamente com o Oh My Zsh, que é um framework para adicionar ainda mais funcionalidades a esse terminal.

Para instalar o Zsh, basta apenas executar o comando:

```jsx
sudo apt install zsh
```

E agora o comando para instalação do Oh My Zsh:

```jsx
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Logo após ele irá perguntar se você deseja alterar o shell padrão, e pode confirmar a alteração.

[Oh My Zsh - a delightful & open source framework for Zsh](https://ohmyz.sh/#install)

## 9º - Instalando a fonte FiraCode

Se você gosta da fonte atual, também pode pular essa etapa.

Essa é uma fonte que eu gosto pessoalmente, pois tem algumas ligatures que eu acho legal e que eu já estou acostumado. Caso queira conferir como ela é:

<https://github.com/tonsky/FiraCode>

Vamos instalar usando o chocolatey, então abra o PS e exetute o comando:

```jsx
choco install firacode
```

Existem também várias instruções caso você queira configurar no Windows Terminal, no vscode, etc:

[Home · tonsky/FiraCode Wiki (github.com)](https://github.com/tonsky/FiraCode/wiki)

## 10º - Tema Oh My Zsh

Se você gosta do tema padrão do Oh My Zsh, pule esta etapa.

Estarei instalando o meu tema de preferência, o **Spaceship**, mas você pode estar instalando o de sua preferência, para isso, vamos clonar o repositório do github na nossa home:

```jsx
git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1
```

Criar um link simbólico:

```jsx
ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

E alterar uma das configurações do nosso arquivo **.zshrc**, localizado na nossa home, da seguinte forma:

```jsx
// .zshrc
ZSH_THEME="spaceship"
```

Esse tema mostra várias informações no terminal, mas eu prefiro fazer algumas alterações para visualizar somente as informações que eu julgo necessário, para isso, é só ir até o final do seu arquivo **.zshrc** e adicionar as seguinte linhas, conforme as suas preferencias:

- - -

```jsx
### Spaceship theme configs
SPACESHIP_PROMPT_ORDER=(
  user          # Username section
  dir           # Current directory section
  host          # Hostname section
  git           # Git section (git_branch + git_status)
  hg            # Mercurial section (hg_branch  + hg_status)
  exec_time     # Execution time
  line_sep      # Line break
  jobs          # Background jobs indicator
  exit_code     # Exit code section
  char          # Prompt character
)
SPACESHIP_USER_SHOW=always
SPACESHIP_PROMPT_ADD_NEWLINE=false
SPACESHIP_CHAR_SYMBOL="❯"
SPACESHIP_CHAR_SUFFIX=" "
```

Agora reinicie o terminal para aplicar as configurações.

[Getting Started - Spaceship (spaceship-prompt.sh)](https://spaceship-prompt.sh/getting-started/)

## 11º - Plugins do Zsh

Agora iremos adicionar alguns plugins para facilitar a nossa vida ao utilizar o terminal, e para isso, primeiramente vamos instalar o **Zinit**, \*\*\*\*que facilita na instalação e remoção desses plugins:

```jsx
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

Ele ira perguntar se você deseja instalar alguns plugins padrões, pode aceitar e continuar  a instalação.

Agora, vamos abrir o .zshrc novamente e depois da última linha adicionaremos as seguintes linhas:

```jsx
### Plugins zinit

zinit light zdharma-continuum/fast-syntax-highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
```

Reinicie o terminal e ele irá instalar automaticamente os plugins.

<https://github.com/zdharma-continuum/fast-syntax-highlighting>

<https://github.com/zsh-users/zsh-autosuggestions>

<https://github.com/zsh-users/zsh-completions>

[zdharma-continuum/zinit: 🌻 Flexible and fast ZSH plugin manager (github.com)](https://github.com/zdharma-continuum/zinit#install)

## 12º - Configurando uma chave SSH para o seu Github

Para não ter que ficar muitas e muitas vezes autenticando o seu github para acessar determinados repositórios, iremos criar e configurar uma chave SSH, para isso rode o comando (com o seu e-mail):

```jsx
ssh-keygen -t ed25519 -C "arthurpedroti@gmail.com"
```

Ele vai te fazer algumas perguntas, pode deixar todas em branco e dar Enter.

Esse comando irá criar uma pasta chamada **.ssh** na nossa home, e dentro dessa pasta estará armazenado as nossas chaves SSH.

Agora precisamos adicionar essa chave ao nosso agent, para que ele já use ela por padrão nas autenticações.

O bash não possui esse agent iniciado por padrão, mas podemos utilizar um plugin padrão do Zsh para iniciar sempre o terminal com esse agent, para isso, vamos acessar o arquivo **.zshrc** e alterar a linhas dos plugins da seguinte forma:

```jsx
plugins=(git ssh-agent)
```

Se não quiser reiniciar o terminal o tempo todo, use o comando abaixo para recarregar as configurações:

```jsx
source .zshrc
```

E pronto, nossa identidade já foi adicionada ao ssh-agent.

Agora precisamos adicionar a nossa chave pública ao nosso Github, para que ele possa nos autenticar por ela, e para isso vamos acessar a pasta .ssh, mostrar a nossa chave, e copiar ela:

```jsx
cd .ssh
more id_ed25519.pub
```

Copie todo o valor que aparecer, acesse as configurações do seu Github, entre em “SSH and GPG keys”, e depois em “New SSH Key”

![SSH and GPG Keys Github](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6993c28c-b648-43d7-a000-6a05cdc0f372/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220916T181309Z&X-Amz-Expires=86400&X-Amz-Signature=2c77524ab20b34abbc73a6e06ac992fb54cb3ad7447447a77dc1cfe083edddd9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject "SSH and GPG Keys Github")

De um nome para você identificar a chave, cole a key, e depois salve.

Pronto, agora seu zsh já ira te autenticar no Github automaticamente, e você pode usar essa mesma chave pública para vários outros serviços semelhantes.

[Generating a new SSH key and adding it to the ssh-agent - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## 13º - Criando aliases

Atalhos no terminal são sempre úteis, e para isso, para apenas abrir o arquivo .zshrc, ir até o final, e criar alguns aliases, como os exemplos abaixo:

```jsx
### Aliases
alias www="cd ~/www"
alias personal="cd ~/personal"
```

## 14º - Instalando o NVM

Caso você não use node, pode pular essa etapa.

Caso você use o node, a melhor forma para instalar o node é utilizar o NVM, que permite instalar e gerenciar várias versões do node de maneira muito mais fácil.

Agora, vamos utilizar um plugin do zsh para instalar o nvm, siga as instruções do passo em que já instalamos alguns plugins, e adicione a seguinte linha ao seu \*\*\*\*.zshrc:

```jsx
zinit light lukechilds/zsh-nvm
```

Após reiniciar o terminal, execute o seguinte comando para instalar a versão LTS do node:

```jsx
nvm install --lts
```

E pronto, agora a versão LTS do node já esta instalada e configurada como padrão no seu terminal.

Para saber um pouco mais sobre o NVM, acesse o post abaixo:

[Varias versões do Node.js em apenas um ambiente | Arthur Pedroti](https://dev.arthurpedroti.com.br/varias-versoes-do-node-js-em-apenas-um-ambiente/)

<https://github.com/lukechilds/zsh-nvm>

<https://github.com/nvm-sh/nvm>

## 15º - Instalando o Yarn

Caso você não use o Yarn, pode pular essa etapa.

Para instalar o Yarn, basta apenas rodar o comando:

```jsx
npm install --global yarn
```

## 16º - Instalando o Docker

Para finalizar, vamos instalar o Docker, e para isso, acesse o site abaixo, clique em download, e faça a instalação normal para o próprio o Windows:

[Home - Docker](https://www.docker.com/)

O Docker agora já vem por padrão rodando no WSL2 no windows, então não precisamos fazer nenhuma configuração adicional.

Para mais informações sobre como utilizar o Docker e instalar bancos de dados através dele, acesse o post abaixo:

[Criando containers e bancos de dados no Docker | Arthur Pedroti](https://dev.arthurpedroti.com.br/criando-containers-e-bancos-de-dados-no-docker/)

## 17º - Ferramentas extras (não necessariamente ligadas a programação)

Essas são algumas ferramentas que eu utilizo no meu Windows diariamente e quebram um bom galho:

Manutenção, acesso e edição de banco de dados:

[DBeaver Community | Free Universal Database Tool](https://dbeaver.io/)

Teste de APIs:

[The API Design Platform and API Client - Insomnia](https://insomnia.rest/)

Desenho de arquiteturas de banco de dados e outros:

<https://www.draw.io/>

UI e UX:

<https://www.figma.com/>

Wireframes e desenhos para apresentações:

[Whimsical - Work Better, Faster, Together](https://whimsical.com/)

Anotações e rascunhos:

<https://www.notion.so/>

Tirar print é algo simples, mas com o lightshot você pode selecionar exatamente a área que você deseja, desenhar umas setinhas e ainda alguns textos se quiser, ou seja, para documentação ou mostrar algo para as pessoas, é incrível e agiliza demais o seu dia a dia:

[Lightshot — ferramenta para captura de tela para Mac & Win (prntscr.com)](https://app.prntscr.com/pt-br/)

Descompactar e compactar arquivos:

[Download WinRAR Latest Version (win-rar.com)](https://www.win-rar.com/predownload.html?&L=9)

As vezes você precisa acessar o seu PC de longe, e para isso eu utilizo o Anydesk, com algumas configurações você nem precisa “aceitar” você mesmo para acessar o computador, e é totalmente free:

[Software de desktop remoto para Windows – AnyDesk](https://anydesk.com/pt/downloads/windows)

Gravação de telas e GIFs, podendo escolher facilmente a área e a janela, software simples, leve e grátis:

[ShareX - The best free and open source screenshot tool for Windows (getsharex.com)](https://getsharex.com/)

## Conclusão

Esse é o passo a passo que eu utilizo toda vez que eu formato o meu computador ou tenho que ajudar alguém a configurar o seu ambiente de desenvolvimento do zero, e pra mim, hoje é uma das documentações mais úteis que eu já fiz, por que é sempre extremamente chato e cheio de detalhes essas configurações, então me poupa um bom tempo.

Vou tentar formatar meu PC pelo menos uma vez por ano e ir atualizando esse post da melhor maneira possível. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui embaixo, até a próxima.😉