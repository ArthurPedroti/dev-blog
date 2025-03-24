---
title: How mount a shared folder from your NAS on your Linux Server
description: Setup and commands to mount your shared network folders
date: 2024-02-28 10:55:42
image: assets/img/blake-connally-b3l0g6hlxr8-unsplash-768x512.jpg
category: misc
background: "#7AAB13"
---
### Introduction

We often shared folders and files in our company through a NAS or other files server and we need to access these files from diferent locations, on a desktop is very easy to mount and access these files, but on a server there may be a little more details that we will see on this article.

## Install cifs-utils

Ensure that the **`cifs-utils`** package is installed on your Ubuntu server. You can install it using the following command:

```bash
sudo apt-get update
sudo apt-get install cifs-utils
```

## Create a directory for mounting:

Create a local directory on your server where you want to mount the NAS folder. For example:

```bash
sudo mkdir /shared/nas_mount
```

## Get your user id and group

You will need your user's UID (User ID) and GID (Group ID). You can get that by using the **`id`** command in the terminal.

```jsx
id
```

## Mount the NAS folder:

Use the **`mount`** command to mount the NAS folder. The syntax is as follows:

```bash
sudo mount -t cifs //<NAS-IP-Address>/<Share-Name> /shared/nas_mount -o username=<Your-NAS-Username>,password=<Your-NAS-Password>,uid=<Your-Linux-Username>,gid=<Your-Linux-Group>
```

Replace the placeholders **`<NAS-IP-Address>`**, **`<Share-Name>`**, **`<Your-NAS-Username>`**, **`<Your-NAS-Password>`**, **`<Your-Linux-Username>`**, and **`<Your-Linux-Group>`** with your actual NAS information and Linux user/group details.

Example:

```bash
sudo mount -t cifs //192.168.1.2/myshare /shared/nas_mount -o username=myuser,password=mypassword,uid=myuser,gid=mygroup
```

Note: If your password contains special characters, you may need to escape them using a backslash (\).

## Verify the mount:

Check the contents of the mounted folder to ensure that the NAS files are accessible on your server:

```bash
ls /mnt/nas_mount
```

## Automount on boot (optional):

If you want the NAS folder has to be mounted automatically on system boot, you can add an entry to the **`/etc/fstab`** file. Open the file with a text editor:

```bash
sudo nano /etc/fstab
```

Add a line at the end of the file like this:

```
//<NAS-IP-Address>/<Share-Name> /mnt/nas_mount cifs username=<Your-NAS-Username>,password=<Your-NAS-Password>,uid=<Your-Linux-Username>,gid=<Your-Linux-Group> 0 0
```

Save the file and exit. After this, the NAS folder should be automatically mounted when the server boots up.

### Conclusion

Remember to replace placeholder values with your actual NAS and system information. Be careful with storing passwords in scripts or configuration files for security reasons. Consider using credentials stored in a more secure way if needed.

If you have any doubts or suggestions to enhance these examples, please feel free to comment below. Until next time!