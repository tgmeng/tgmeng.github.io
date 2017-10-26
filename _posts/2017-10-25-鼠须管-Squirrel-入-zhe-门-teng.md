---
title: 鼠须管(Squirrel) 入(zhe)门(teng)
date: 2017-10-25 16:30:00
tags:
- 折腾
- 流水帐

---

## 头
之前一直在使用「搜狗输入法」，依靠她强大的词库，日常用拼音打字挺方便、流畅的。  
但是，作为一个「MacVim」使用者，经常会在中文、英文输入中迷失自我。

**栗子**：

1. 在「Normal 模式」时，经常出现你以为是英文输入却是中文输入的情况。然后输入了一大堆动作想操作文本，结果变成了搜狗拼音输入界面。
2. 「Insert 模式」输入中文后，切换回「Normal 模式」，这时还要费时费力确定下目前是否中文输入。

日常使用中经常碰到这些情况，心里默念 艹艹艹 * 10000 😡💢。  
于是 Google 寻求下有无解决方案，于是接触到了「鼠须管」。

这里记录下折腾过程和碰到的问题，方便日后回首。

## 中州韵输入法引擎（Rime）和 鼠须管（Squirrel）
开始以为他们是两个输入法，鼠须管修改自Rime这样的关系。
看了资料，原来 Rime 是输入法引擎，鼠须管是 Mac OS 客户端。

## 安装
开始使用Brew安装的版本，折腾中出了点问题，以为是鼠须管版本太旧，于是自己用源码编译了一个新版本。  
目前一直用着编译的版本。

### Brew
```shell
brew install squirrel
```
### Manual
参考「[INSTALL.md](https://github.com/rime/squirrel/blob/master/INSTALL.md) 」中的步骤即可，基本畅通无阻。

期间遇到个小问题，`xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance `。

1. 安装 Xcode
2. `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`， 
**或者 Xcode Beta** `sudo xcode-select -s /Applications/Xcode-Beta.app/Contents/Developer`

## 配置
### 认识 Rime
「[wiki](https://github.com/rime/home/wiki)」上有很多资料，推荐先看这篇导引「[UserGuide](https://github.com/rime/home/wiki/UserGuide)」。

PS：目前我也只看了 「認識 La Rime」、「下載與安裝」、「定製指南」（略读）、「輸入方案設計書」（开头）:P


### 用户资料夹
**位置**：~/Library/Rime

个性化设置要自己编写yaml文件。（不清楚YAML，可看一下[阮一峰的「YAML 语言教程」](http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt)）  
不建议直接修改 〔全局设定〕default.yaml、〔发行版設定〕squirrel.yaml、〔预设输入方案副本〕 <方案表示>.schema.yaml 等。因为软件后续升级有可能会覆盖文件，导致内容丢失。

应该自己新建 xxx.custom.yaml 文件实现自己配置，如 default.custom.yaml、squirrel.custom.yaml等，注意要用 utf-8（无bom）编码。

详细说明可以看「[Rime中的數據文件分佈及作用](https://github.com/rime/home/wiki/RimeWithSchemata#rime-中的數據文件分佈及作用)」。

### 我的简单配置
以下是我非常非常简单的配置，都来自 Rime 作者「佛振」的 [gist](https://gist.github.com/lotem)，上面有很多例子可以参考。

```yaml
# default.custom.yaml
# 启用的 schema

patch:
  schema_list:
    - schema: luna_pinyin          # 朙月拼音
    - schema: luna_pinyin_simp     # 朙月拼音 简化字模式
    - schema: luna_pinyin_tw       # 朙月拼音 臺灣正體模式
    - schema: emoji                # emoji表情
    - schema: terra_pinyin         # 地球拼音 dì qiú pīn yīn
    - schema: bopomofo             # 注音
    - schema: bopomofo_tw          # 注音 臺灣正體模式
```

```yaml
# luna_pinyin_simp.custom.yaml
# 朙月拼音 简化字模式添加 Emoji 表情支持
# 输入“`”然后即可进行Emoji输入

patch:
  engine/translators:
    - punct_translator
    - r10n_translator
    - reverse_lookup_translator
  recognizer/patterns/reverse_lookup: "`[a-z]*$"
  schema/dependencies:
    - emoji
  # 以下选项emoji会出现在候选列表里汉字的前面
  # abc_segmentor/extra_tags:
  #   - reverse_lookup
  reverse_lookup:
    dictionary: emoji
    enable_completion: false
    prefix: "`"
    tips: 〔表情〕
```

```yaml
# squirrel.custom.yaml
# 鼠须管界面配置

patch:
# us_keyboard_layout: true      # 鍵盤選項：應用美式鍵盤佈局
# show_notifications_when: growl_is_running  # 狀態通知，默認裝有Growl時顯示，也可設爲全開（always）全關（never）
  style/horizontal: true        # 候選窗横向顯示
# style/inline_preedit: false   # 非內嵌編碼行
# style/font_face: "儷黑 Pro"    # 我喜歡的字體名稱
# style/font_point: 21          # 字號
# style/corner_radius: 10       # 窗口圓角半徑
# style/border_height: 0        # 窗口邊界高度，大於圓角半徑才有效果
# style/border_width: 0         # 窗口邊界寬度，大於圓角半徑才有效果
# style/color_scheme: luna      # 選擇配色方案

# 註：預設的配色方案及代碼（指定爲 style/color_scheme ）
#   碧水 - aqua
#   青天 - azure
#   明月 - luna
#   墨池 - ink
#   孤寺 - lost_temple
#   暗堂 - dark_temple
#   星際我爭霸 - starcraft
#   谷歌 - google
```

配置编写后，「重新部署」鼠须管即可。

### Sync
**位置**：~/Library/Rime/Sync

一开始不清楚这个文件夹的功能，后来发现是「同步用户数据」用的文件夹，请参考「[同步用戶資料](https://github.com/rime/home/wiki/UserGuide#同步用戶資料)」。

## 折腾的问题
### 日志
折腾期间，出现了一些错误导致输入法异常。  
那么，去哪看日志呢？

```shell
# Rime 各种日志都放在这里
cd $TMPDIR
ls | grep rime
```

### 【東風破】brise
「[【東風破】brise](https://github.com/rime/brise)」是 Rime 的 schema 仓库。  
安装并重新部署后，发现朙月拼音打字整个乱了。  
目前还不知道什么问题，放弃了。（因为使用自己编译后的版本 + 独立下载 schema 后，可以正常使用，便不想折腾了。

**PS：当时使用 Brew 安装的版本。**

### 方案安装不成功
一开始启用「地球拼音」和「注音」方案，切换到相应输入法发现没有效果？  
查看错误日志，发现有一堆关于 prism 文件和 bin 文件的错误。貌似没有成功生成相应「棱镜」和「固态字典」。  
于是，我删除了整个用户资料夹，重新部署。再从 GitHub 上单独下载相应输入方案放入，重新部署。  
然后居然成功了……怀疑是原来的 xxx.schema.yaml文件有问题？

**PS：这里使用自己编译的版本。**

### user.yaml
删除后貌似不会默认生成？导致无法保存输入状态，同时错误日志出现一堆很多相关错误。  
用户资料夹，新建一个空白user.yaml，重新部署下。

```shell
cd ~/Library/Rime
touch user.yaml
```

## 尾

### 状态问题，解决！
默认地，在MacVim中切换回「Normal」模式，鼠须管会自动进入英文输入模式。  
太爽啦！！再也不用头疼输入模式的问题了，安心“耕田”。  

同时，
> 在指定的應用程序中，改變輸入法的初始轉換狀態。如在  
> - 終端 Terminal / iTerm  
> - 代碼編輯器 MacVim  
> - 快速啓動工具 QuickSilver / Alfred 等程序裏很少需要輸入中文，於是鼠鬚管在這些程序裏默認不開啓中文輸入。

其他资料，参考「[在特定程序裏關閉中文輸入](https://github.com/rime/home/wiki/CustomizationGuide#在特定程序裏關閉中文輸入)」.

### NICE 的输入法
虽然没有「搜狗拼音输入法」强大的词库，但是日常使用中已经满足需求。  
加上简洁的界面和流畅的输入体验，简直爱不释手。  
感谢**「[佛振（lotem）](https://github.com/lotem)」**带给我们如此优秀的输入法！赶紧 Star！
