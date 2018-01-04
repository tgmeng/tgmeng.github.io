---
title: 使用 Hammerspoon 操作窗口和鼠标
date: 2018-01-02 14:22:25
tags:
---

## 是否觉得以下问题很蛋疼？
1. 改变窗口布局、大小：触控板，拖拉拖拉拖……
2. 多工作区间移动窗口：触控板拖动应用配合键盘切换空间，或者使用「Mission Control」拖动
3. 多屏幕
    3.1 鼠标想换另一个屏幕上，拖拖拖……
    3.2 窗口想放另一个屏幕上，拖拖拖……
    
## 曾经的方案
之前一直在使用 「[SizeUp][]」  配合 「[CatchMouse][]」 解决这些问题。
SizeUp 挺好用的，但免费版本老弹 License 有点烦。
CatchMouse 只能移动鼠标到屏幕中心，不能记录位置。切换窗口之后还要拖拖拖，让人凌乱。
后来，找到了 Hammerspoon，完美替代上面两者。

**PS**：当然，还有很多类似软件 「[Moom][]」 和 「[Divvy][]」 等等……这里就不说了。

## Hammerspoon？
「[Hammerspoon][]」是 OS X 下的一个强大自动化工具。  
可以使用「[Lua][]」脚本语言控制系操作系统：应用、窗口、鼠标……等等……

### 下载 & 安装 & 配置
[下载最新版本](https://github.com/Hammerspoon/hammerspoon/releases/latest)，然后拖到 `/Applications` 下。  
安装完后，还需要创建  `~/.hammerspoon/init.lua` 存放脚本。

### 基础
**不会 Lua？**No problem！  
参（copy）考（paste）别人配置，直接上手干！
当然，如果想稍微学习下 Lua，可以阅读「[Learn X in Y minutes](https://learnxinyminutes.com/docs/lua/)」。
要编写自己的脚本，官方「[Hammerspoon API][]」会是你的好朋友。

### 我的配置
配置靠偷，东拼西凑……
**[这个模拟 SizeUp 的配置](https://gist.github.com/josephholsten/1e17c7418d9d8ec0e783)**非常好，可以从这个配置开始修改、拓展。

#### 代码
地址：https://github.com/tgmeng/dotfiles/blob/master/hammerspoon/.hammerspoon/init.lua
由于代码太长，就不贴出来了 :P。

**PS：脚本变更，记得「Reload Config」！！！**


#### 快捷键 & 功能
```
按键：
⌃：ctrl
⌥：alt
⇧：shift
⌘：cmd

窗口布局：
⌃⌥⌘ + H：屏幕左半边，高度占满
⌃⌥⌘ + L：屏幕右半边，高度占满
⌃⌥⌘ + K：屏幕上半边，宽度占满
⌃⌥⌘ + J：屏幕下半边，宽度占满
⌃⌥⌘ + M：全屏
⌃⌥⌘ + C：屏幕中间，宽高为屏幕一半
⌃⌥⌘ + /：还原上次位置、大小

屏幕间移动窗口：
⌃⌥ + X：移动到下一个屏幕
⌃⌥ + Z：移动到上一个屏幕

工作空间之间移动窗口：
⌃⌘ + X ：移动到下一个空间
⌃⌘ + Z ：移动到上一个空间
⌃⇧⌘ + X：移动到下一个空间，同时切换工作空间
⌃⇧⌘ + Z：移动到上一个空间，同时切换工作空间

屏幕间移动鼠标：
⌃ + 1：移动到下一个屏幕
⌃ + 2：移动到下一个屏幕

*PS：屏幕间切换鼠标时，会记录当前鼠标位置；切换回来时复原。
*PS2：标红鼠标位置，方便找到鼠标。
```

## 关于工作空间
由于 Apple 未提供官方的 API，所以 Hammerspoon 中没有相关接口。
需要使用非官方工作空间接口拓展模块「[hs._asm.undocumented.spaces][]」。

**下载安装**：
```shell
$ git clone https://github.com/asmagill/hs._asm.undocumented.spaces spaces
$ cd spaces
$ make install
```

其他详细说明，可以参考模块的 [README.md](https://github.com/asmagill/hs._asm.undocumented.spaces/blob/master/README.md)。

## 最后
当然 Hammerspoon 能干的不只有这些，管理窗口只是一小点实践成果。
没有做不到，只有想不到！畅游官方「[Hammerspoon API][]」，你没准会涌现很多灵感~

[Hammerspoon]: http://www.hammerspoon.org/
[Hammerspoon API]: http://www.hammerspoon.org/docs/index.html
[Lua]: http://www.lua.org/
[SizeUp]: http://www.irradiatedsoftware.com/sizeup/
[CatchMouse]: https://github.com/round/CatchMouse/
[Moom]: https://manytricks.com/moom/
[Divvy]: http://mizage.com/divvy/
[hs._asm.undocumented.spaces]: https://github.com/asmagill/hs._asm.undocumented.spaces
