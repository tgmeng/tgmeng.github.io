---
title: WTF CSS Conventions - 自嗨CSS规范
date: 2017-05-08 16:36:20
tags:
---

## 前言
为了学习BEM、NEC等…规范，同时结合自己的口味，自己嗨（抄袭）了这份CSS规范，用于个人项目。  
在使用中不断改进ing...

## 基础
### 语法  
	.[<namespace>-]<block>[-<element>][--<modifier>]
	

*`<namespace>`*：

1. 普通命名空间：严格遵守下面BEM规则约束
	- 布局（l）
	- 模块（m）
	- 原件（u）
	- 功能（f）
	- Javascript获取节点（j）
	- 自定义……

2. 特殊命名空间：有特殊属性，可定义额外规则
	- 状态（z）
	- 自定义……

### 命名规范
*`<block>`*、*`<element>`* 和 *`<modifier>`*，由拉丁字母、数字组成，使用小驼峰式命名法（lowerCamelCase）。

“\-”（dash）不表示连字符，用于以下分隔：

1. *`<namespace>`*、 *`<block>`* 和 *`<element>`* 之间使用 “\-”（dash）分隔；  
2. *`<block>`*/*`<element>`* 和 *`<modifier>`* 之间使用 “\-\-”（double dashes）分隔。

```css
/* block & element */
.blockName-elementName {}

/* block/element & modifier */
.blockName--modifierName {}
.blockName-elementName--modifierName {}
```

### 常用结构
```css
/* block */
.namespace-blockName {}
/* block-level modifier */
.namespace-blockName--modifierName {}
/* element */
.namespace-blockName-elementName {}
/* element-level modifier */
.namespace-blockName-elementName--modifierName {}
```

### 依赖、组合
啥依赖、组合？下面会用到。

**依赖**：

- 后代选取器，`.a .b {}`
- 子元素选择器，`.a>.b {}`

**组合**：

- 交集选择器，`.a.b {}`


## Block
有意义的独立实体。  
Block间可以嵌套、交互，但是语义上是相同的，没有优先级和层级。

### HTML：
```html
<div class="blockName"></div>
```

### CSS：

- 仅使用类名选择器
- 没有标签名或ID
- 不可依赖，组合其他 Blocks
- 不可依赖、组合其他 Elements

```css
/* ✔️ */
.blockName {}
.anotherBlockName {}

/* ❌ */
.blockOne .blockTwo {}
.blockName.blockName-elementName {}
.blockOne-elementName .blockTwo {}
```

## Element
Block的一部分，独立无意义。

### HTML：
```html
<div class="blockName">
    <div class="blockName-elementName"></div>
</div>
```

### CSS：

- 仅使用类名选择器
- 没有标签名或ID
- 不可依赖，组合其他 Blocks
- 不可依赖、组合其他 Elements

```css
/* ✔️ */
.blockName-elementName {}

/* ❌ */
div.blockName-elementName {}
.blockName-elementOne .blockName-elementTwo {}
.blockName-elementOne.blockName-elementTwo {}
/* 依赖 .blockName */
.blockName .blockName-elementName {}
```

## Modifier
Block和Element的修饰符，用于改变他们的外观、表现。  
**需要与原类组合使用**！

### HTML：
```html
<!-- ✔️ 与原类组合使用 -->
<div class="blockName blockName--modifierName"></div>

<!-- ❌ 独立使用 -->
<div class="blockName--modifierName"></div>
```

### CSS：
```css
/* 使用modifier的名字作为选择器 */
.blockName--modifierName {}

/* 使用多个modifier */
.blockName--modifier1.blockName--modifier2 {}

/* 修改基于 block-level modifier 的 element */
.blockName--modifierName .blockName-elementName {}
/* 修改基于多个 block-level modifier 的 element */
.blockName--modifier1.blockName--modifier2 .blockName-elementName {}

/* Element modifier */
.blockName-elementName--modifierName {}
```

## Namespace 
### 普通命名空间
严格遵守上面BEM规则定义。

#### 布局（l）
将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等……

```css
.l-header {}
.l-footer {}
.l-body {}
```

#### 模块（m）
通常是一个语义化、可重复使用的较大整体。

```css
.m-nav {}
.m-nav-item {}

.m-list {}
.m-list-item {}
```

#### 原件（u）
通常是一个不可再分的较为小巧的个体，通常被重复用于各种模块中。

```css
.u-button {}
.u-button--primary {}

.u-icon {}
.u-icon--close {}
```
#### 功能（f）
为方便一些常用样式的使用，将这些使用率较高的样式剥离出来，按需使用。  
通常这些选择器具有固定样式表现，比如清除浮动等！不可滥用！

```css
.f-db { display: block; }
.f-fl { float: left; }
.f-fr { float: right; }
```

#### Javascript获取节点（j）
专用于JS获取节点，请勿使用.j-定义样式。

```html
<ul>
	<li class="j-node"></li>
	<li class="j-node"></li>
	<li class="j-node"></li>
</ul>

<script>
	var node = docment.querySelectorAll('.j-node')
</script>
```

### 特殊命名空间
有特殊属性，可定义额外规则。

#### 状态（z）
为状态类样式加入前缀，统一标识，方便识别。  
**被修饰的BE转变为 伪.modifier（HTML规则类似，但CSS规则有区别）**！  
**必须在HTML和CSS中组合使用**！！

```html
/* ✔️ */
<div class="m-audio z-playing"></div>
<div class="m-audio m-audio--reverse z-playing"></div>

<!-- ❌ -->
<div class="z-playing"></div>
```

```css
/* ✔️ */
.m-audio.z-playing .m-audio-icon {}
.m-audio--reverse.z-playing .m-audio-icon {}
.u-button.z-disable {}

/* ❌ */
.z-playing .m-audio-icon {}
```

### 自定义
如果以上不能满足你的需求，可以另外定义一个或多个大类。  
根据自己的需求。  
**命名规则**：单个字母+"-"，即 .x- 的格式。  
当然可以按自己需求，选择该命名空间为普通或者特殊。

## 参考
以上规则参考、修改自如下规范：

- [分类方法 - CSS规范 - 规范 - NEC : 更好的CSS样式解决方案](http://nec.netease.com/standard/css-sort.html)
- [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
- [BEM — Block Element Modifier](http://getbem.com/naming/)
