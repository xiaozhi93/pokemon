 ## PC端设计
 ### 表单数据约定
 ```
 "formDesc": {
    "key_11": {
      "type": "text",
      "label": "静态文本11",
      "default": "我是一段静态文本hahahahhaha",
      "tip": ""
    },
    "key_21": {
      "type": "input",
      "label": "单行输入框22",
      "default": "111",
      "tip": "士大夫但是"
    },
    "key_3": {
      "type": "upload",
      "label": "上传",
      "default": ""
    },
    "key_4": {
      "type": "image",
      "label": "轮播图",
      "default": []
    },
    "key_5": {
      "type": "image",
      "label": "图片展示",
      "default": "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    }
  }
 ```
 ### 表单校验规则约定
```
"rules": {
    "key_11": [
      {
        "required": true,
        "message": "请输入静态文本11"
      }
    ],
    "key_21": [
      {
        "required": true,
        "message": "请输入单行输入框22"
      }
    ]
  }
```
### 排版布局
### 移动端设备模拟及代码生成
### 相关插件
- vuedraggable
- lodash.clonedeep
- iview
## 移动端数据驱动
### 排版布局
### 数据驱动表单（难点）
### 表单检验
### 相关插件
  - cube，mint或其他移动端组件库
## PC端数据驱动