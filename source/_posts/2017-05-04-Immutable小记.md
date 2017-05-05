---
title: Immutable小记
date: 2017-05-04 10:22:46
tags:
---

## React
React.js使用了virtual dom，通过diff修改dom，实现高效的dom更新。
但是有一个问题，当state更新时，如果数据没变，也会去做virtual dom的diff，这就埋下了性能隐患。

### PureRenderMixin（React.PureComponent）
上面的问题可以通过使用 [PureRenderMixin]（[React.PureComponent]）解决。
```javascript
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}
```
该mixin实现了 [shouldComponentUpdate] 的细节进行优化。

### PureRender的问题
它只是“浅比较”对象，如果是复杂的对象结构，那就出现了问题。
比如这样的结构：
```json
{
	"state": {
		“some”: {
			"time": 123456,
			"thing": "gg fly",
		}
	}
}
```

如果直接修改对象上的属性
```javascript
const some = this.state.some;
some.time = +new Date();
this.setState({ some });
```
则组件不会进行重新渲染

由于直接修改some上的time的值，但some仍然指向同一个对象。
经过PureRenderMixin的优化判断，不执行重新渲染，造成“卡死”的情况。

针对上面这种情况：
1. 使用forceUpdate()更新；
2. 使用不可变对象。

## Immutable
### mutable修改：
这里就是上面问题的关键，只是更改了对象上的属性，而没有更改引用。
```javascript
const x = {
	name: 'old name'
};
// 这里 x, y 指向同一个对象
const y = x;
y.name = 'new name';
console.log(x.name); // 'new name'
console.log(y.name); // 'new name'
console.log(x === y); // true
```

如何Immutable地修改呢？

### 深拷贝：
```javascript
const x = {
	name: 'old name'
};
// x, y 不指向同一个对象
const y = JSON.parse(JSON.stringify(x));
y.name = 'new name';
console.log(x.name); // 'old name'
console.log(y.name); // 'new name'
console.log(x === y); // false
```
深拷贝效率特别低，强烈不推荐。

### Object.assign拷贝
按照修改路径，使用 [Object.assign] 拷贝对象，构造新对象。
```javascript
const x = {
	name: 'old name'
};
// x, y 不指向同一个对象
const y = Object.assign({}, x);
y.name = 'new name';
console.log(x.name); // 'old name'
console.log(y.name); // 'new name'
console.log(x === y); // false
```
这样就简单解决了问题，而且效率也比较高。

数组可以使用 [Array.prototype.slice] 进行拷贝。

### Object.assign拷贝的麻烦
如果对象再“深”一些：
```json
{
	"state": {
		“some”: {
			"time": {
				"good": 123456,
				"bad": 78910,
			},
			"thing": "gg fly",
		}
	}
}
```

那我们可能要一遍遍拷贝对象：
```javascript
const some = this.state.some;
const neoSome = Object.assign({}, some, {
	"time": Object.assign({}, some.time, {
		"good": +new Date()
	})
});
this.setState({ some: neoSome });
```

为了简化操作 或 加强相关功能，我们可以使用不可变相关的库。

### Immutable库
Facebook出品的 [Immutable.js]，比较复杂、重，真.重型解药
[Immutability Helpers]，提供了方便编写的语法糖
[object-path-immutable]，简单、轻便。

项目中我们使用的是 object-path-immutable 配合 [Array.prototype.slice] & [Object.assign]

## object-path-immutable
### 使用
官方简单例子：
```javascript
var obj = {
  a: {
    b: 'c',
    c: ['d', 'f']
  }
};

//set a deep property
var newObj = immutable.set(obj, 'a.b', 'f');
//returns
//var obj = {
//  a: {
//    b: 'f',
//    c: ['d', 'f']
//  }
//}

//obj !== newObj
//obj.a !== newObj.a
//obj.b !== newObj.b

//However:
//obj.c === newObj.c
```

链式操作：
```javascript
//Chaining mode. value() at the end of the chain is used to retrieve the resulting object
var newObj = immutable(obj).set('a.b', 'f').del('a.c.0').value();

var neoState = immutable(obj);
// ⚠️ 注意
// 链式操作步骤如果分开，要把操作返回的新状态“串起来”
// 否则会断链

// ❌ 这样就“断链“了
neoState.set('a.b', 'f');
neoState.del('a.c.0');

// ✅ 下面是正确的 
neoState = neoState.set('a.b', 'f');
neoState = neoState.del('a.c.0');

var newObj = neoState.value();
```

其他API，可查看文档按情况使用。

## 参考： 
* [facebook immutable.js 意义何在，使用场景？](https://www.zhihu.com/question/28016223/answer/50292748)
* [PureRenderMixin]（[React.PureComponent]）& [shouldComponentUpdate]
* [Immutable.js]
* [Immutability Helpers]
* [object-path-immutable]

[shouldComponentUpdate]: https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
[PureRenderMixin]: https://link.zhihu.com/?target=http%3A//facebook.github.io/react/docs/pure-render-mixin.html
 [React.PureComponent]: https://facebook.github.io/react/docs/react-api.html#react.purecomponent
[Object.assign]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[Array.prototype.slice]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[object-path-immutable]: https://github.com/mariocasciaro/object-path-immutable
[Immutability Helpers]: https://facebook.github.io/react/docs/update.html
[Immutable.js]: http://facebook.github.io/immutable-js/
