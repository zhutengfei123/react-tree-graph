# 关系图组件

## 描述

基于react、antd、antv/g6封装的关系图组件

## 效果

![demo.png](https://i.loli.net/2021/11/11/qu5gsKZVYRHkU7f.png)

## 安装

```
npm i @dzc/tree-graph --save
```

## 使用

```jsx
import React from 'react';
import TreeGraph from '@dzc/tree-graph';

export default () => {

  const treeData = {
    nodes: [
      {
        id: "1",
        status: 1,
        nodeType: 0,
        dataType: "alps",
        name: "alps_file1",
        conf: "我是根节点"
      },
      {
        id: "2",
        status: 2,
        nodeType: 1,
        dataType: "alps",
        name: "alps_file2",
        conf: []
      },
      {
        id: "3",
        status: 3,
        nodeType: 0,
        dataType: "alps",
        name: "alps_file3",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf"
          },
          {
            label: "dot",
            value: "pai_graph.dot"
          },
          {
            label: "init",
            value: "init.rc"
          }
        ]
      },
      {
        id: "4",
        status: 4,
        nodeType: 2,
        dataType: "sql",
        name: "sql_file1",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf"
          },
          {
            label: "dot",
            value: "pai_graph.dot"
          },
          {
            label: "init",
            value: "init.rc"
          }
        ]
      },
      {
        id: "5",
        status: 5,
        nodeType: 1,
        dataType: "sql",
        name: "sql_file2",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf"
          },
          {
            label: "dot",
            value: "pai_graph.dot"
          },
          {
            label: "init",
            value: "init.rc"
          }
        ]
      },
      {
        id: "6",
        status: 2,
        nodeType: 0,
        dataType: "feature_etl",
        name: "feature_etl_1",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf"
          },
          {
            label: "dot",
            value: "pai_graph.dot"
          },
          {
            label: "init",
            value: "init.rc"
          }
        ]
      },
      {
        id: "7",
        status: 3,
        nodeType: 1,
        dataType: "feature_etl",
        name: "feature_etl_1",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf"
          },
          {
            label: "dot",
            value: "pai_graph.dot"
          },
          {
            label: "init",
            value: "init.rc"
          }
        ]
      },
      {
        id: "8",
        status: 0,
        nodeType: 2,
        dataType: "feature_extractor",
        name: "feature_extractor",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf"
          },
          {
            label: "dot",
            value: "pai_graph.dot"
          },
          {
            label: "init",
            value: "init.rc"
          }
        ]
      }
    ],
    edges: [
      {
        source: "1",
        target: "2"
      },
      {
        source: "1",
        target: "3"
      },
      {
        source: "2",
        target: "4"
      },
      {
        source: "3",
        target: "4"
      },
      {
        source: "4",
        target: "5"
      },
      {
        source: "5",
        target: "6"
      },
      {
        source: "6",
        target: "7"
      },
      {
        source: "6",
        target: "8"
      }
    ]
  };

  const treeGraphProps = {
    graphHeight: "100%",
    dataType: 1,
    dir: "LR",
    loading: false,
    showLogoIcon: true,
    showStateIcon: true,
    descKey: "conf",
    descItemKey: "label",
    nodePosKey: 'position',
    descItemValue: "value",
    nodeNameKey: "name",
    nodeIdKey: "id",
    menuKey: "key",
    menuValue: "name",
    nodeType: "modelRect",
    nodeSize: [150, 32],
    parentId: null,
    parentIdKey: 'parent',
    modes: ["drag-canvas", "drag-node", "zoom-canvas", "click-select"],
    clickMenu: (item) => {
      console.warn("点击了右键菜单", item);
    },
    clickNode: (item) => {
      console.warn("点击了节点", item);
    },
    refresh: () => {
      console.warn("刷新了页面");
    },
    nodeDragendNode: (item) => {
      console.warn('画布节点拖拽结束', item);
    },
    saveNodesPos: (item) => {
      console.warn('保存画布信息', item);
    },
    menuList: [
      { key: "1", name: "新增节点" },
      { key: "2", name: "探索节点" },
      { key: "3", name: "编辑节点" }
    ],
    data: treeData
  };

  return <TreeGraph {...treeGraphProps} />;
};

```

## 节点属性

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| dataType | 数据格式类型 | number | 1 | 1（包含节点列表、连线列表两部分）<br>2（带有 children 的树形结构）<br>3（一维数组，根据 parent 查找父级）<br>4（支持1、3数据格式类型的数据，节点需要根据坐标x，y渲染）|
| dir | 布局方向 | string | 'LR' | 'LR'（从左往右）<br> 'RL'（从右往左）<br>'TB'（从上往下）<br>'BT'（从下往上）<br>'H'（根节点在中间，水平对称布局）<br>'V'（根节点在中间，垂直对称布局） |
| data | 数据 | array &#124; object | [] &#124; {} | - |
| loading | 画布加载效果 | boolean | false | ture &#124; false |
| parentId | 根节点 id，仅在 dataType 为 3 时生效 | any | null | - |
| parentIdKey | 父节点字段名 | string | 'parent' | - |
| nodePosKey | 节点位置字段名 | object | 'position' | position: {x: number, y: number} |
| desKey | 节点描述字段名 | string | 'desc' | - |
| desItemKey | 节点描述字段名 | string | 'name' | - |
| desItemValue | 节点描述字段名 | string | 'value' | - |
| nodeNameKey | 节点名称字段名 | string | 'name' | - |
| nodeIdKey | 节点 id 字段名 | string | 'id' | - |
| nodeType | 节点形状类型 | string | 'modelRect' | 如'circle'、'rect'、'ellipse'等，具体请参考：<https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/defaultNode> |
| nodeSize | 节点大小，设置节点的宽、高 | array | [150, 32] | - |
| modes | 画布行为模式，比如是否支持拖拽画布、拖拽节点、缩放画布、选中节点 | array | ['drag-canvas', 'drag-node', 'zoom-canvas', 'click-select'] | - |
| menuList | 右键菜单列表 | array | [] | - |
| menuKey | 右键菜单字段名 | string | 'key' | - |
| menuValue | 右键菜单字段名 | string | 'name' | - |
| showLogoIcon | 是否显示节点类型 icon | boolean | false | ture &#124; false |
| showStateIcon | 是否显示节点状态 icon | boolean | false | ture &#124; false |
| typeObj | 节点类型集合 | object | - | - |
| stateObj | 节点状态类型集合 | object | - | - |
| clickMenu | 右键菜单点击事件 | function(item) | - | - |
| clickNode | 节点点击事件 | function(item) | - | - |
| nodeDragendNode | 画布节点拖拽结束事件 | function(item) | - | - |
| saveNodesPos | 保存画布中所有节点位置事件 | function(item) | - | - |
| refresh | 重新请求接口，刷新画布 | function(item) | - | - |

## 节点状态

```
status = 0，成功
status = 1，失败
status = 2，运行中
status = 3，警告
status = 4，提示
status = 5，疑问
```

## 更新日志

```
2.0.0 组件发布
```

## 数据格式类型

```
// dataType = 1，包含节点列表、连线列表两部分
{
    nodes: [
        {
          id: '1',
          status: 1,
          nodeType: 0,
          dataType: 'alps',
          name: 'alps_file1',
          conf: '我是根节点',
        },
        {
          id: '2',
          status: 2,
          nodeType: 1,
          dataType: 'alps',
          name: 'alps_file2',
          conf: [],
        },
        {
          id: '3',
          status: 3,
          nodeType: 0,
          dataType: 'alps',
          name: 'alps_file3',
          conf: [
            {
              label: 'conf',
              value: 'pai_graph.conf',
            },
            {
              label: 'dot',
              value: 'pai_graph.dot',
            },
            {
              label: 'init',
              value: 'init.rc',
            },
          ],
        },
        {
          id: '4',
          status: 4,
          nodeType: 2,
          dataType: 'sql',
          name: 'sql_file1',
          conf: [
            {
              label: 'conf',
              value: 'pai_graph.conf',
            },
            {
              label: 'dot',
              value: 'pai_graph.dot',
            },
            {
              label: 'init',
              value: 'init.rc',
            },
          ],
        },
        {
          id: '5',
          status: 5,
          nodeType: 1,
          dataType: 'sql',
          name: 'sql_file2',
          conf: [
            {
              label: 'conf',
              value: 'pai_graph.conf',
            },
            {
              label: 'dot',
              value: 'pai_graph.dot',
            },
            {
              label: 'init',
              value: 'init.rc',
            },
          ],
        },
        {
          id: '6',
          status: 2,
          nodeType: 0,
          dataType: 'feature_etl',
          name: 'feature_etl_1',
          conf: [
            {
              label: 'conf',
              value: 'pai_graph.conf',
            },
            {
              label: 'dot',
              value: 'pai_graph.dot',
            },
            {
              label: 'init',
              value: 'init.rc',
            },
          ],
        },
        {
          id: '7',
          status: 3,
          nodeType: 1,
          dataType: 'feature_etl',
          name: 'feature_etl_1',
          conf: [
            {
              label: 'conf',
              value: 'pai_graph.conf',
            },
            {
              label: 'dot',
              value: 'pai_graph.dot',
            },
            {
              label: 'init',
              value: 'init.rc',
            },
          ],
        },
        {
          id: '8',
          status: 0,
          nodeType: 2,
          dataType: 'feature_extractor',
          name: 'feature_extractor',
          conf: [
            {
              label: 'conf',
              value: 'pai_graph.conf',
            },
            {
              label: 'dot',
              value: 'pai_graph.dot',
            },
            {
              label: 'init',
              value: 'init.rc',
            },
          ],
        },
        ],
    edges: [
        {
          source: '1',
          target: '2',
        },
        {
          source: '1',
          target: '3',
        },
        {
          source: '2',
          target: '4',
        },
        {
          source: '3',
          target: '4',
        },
        {
          source: '4',
          target: '5',
        },
        {
          source: '5',
          target: '6',
        },
        {
          source: '6',
          target: '7',
        },
        {
          source: '6',
          target: '8',
        },
    ],
}
```

```
// dataType = 2，带有children的树形结构
{
  id: '200000004',
  tooltip: 'Thing',
  label: '事物',
  description: null,
  descriptionZh: null,
  depth: 3,
  subTypeCount: 9,
  status: 0,
  children: [
    {
      id: '500000061',
      tooltip: 'Person',
      label: '自然人',
      description: null,
      descriptionZh: null,
      depth: 1,
      subTypeCount: 1,
      status: 0,
      children: [
        {
          id: '707000085',
          tooltip: 'FilmPerson',
          label: '电影人',
          description: null,
          descriptionZh: null,
          depth: 5,
          subTypeCount: 3,
          status: 1,
          children: [
            {
              id: '707000090',
              tooltip: 'FilmDirector',
              label: '电影导演',
              description: null,
              descriptionZh: null,
              depth: 0,
              subTypeCount: 0,
              status: 1,
              children: [],
            },
            {
              id: '707000091',
              tooltip: 'FilmWriter',
              label: '电影编剧',
              description: null,
              descriptionZh: null,
              depth: 4,
              subTypeCount: 0,
              status: 1,
              children: [],
            },
            {
              id: '707000092',
              tooltip: 'FilmStar',
              label: '电影主演',
              description: null,
              descriptionZh: null,
              depth: 4,
              subTypeCount: 0,
              status: 1,
              children: [],
            },
          ],
        },
        {
          id: '707000086',
          tooltip: 'MusicPerson',
          label: '音乐人',
          description: null,
          descriptionZh: null,
          depth: 17,
          subTypeCount: 2,
          status: 1,
          children: [],
        },
      ],
    },
    {
      id: '200000005',
      tooltip: 'Music',
      label: '音乐',
      description: null,
      descriptionZh: null,
      depth: 3,
      subTypeCount: 2,
      status: 1,
      children: [],
    },
    {
      id: '707000128',
      tooltip: 'Film',
      label: '电影',
      description: null,
      descriptionZh: null,
      depth: 4,
      subTypeCount: 0,
      status: 1,
      children: [
        {
          id: '7070032328',
          tooltip: 'Comedy',
          label: '喜剧',
          description: null,
          descriptionZh: null,
          depth: 4,
          operation: 'C',
          subTypeCount: 0,
          status: 1,
          children: [],
        },
      ],
    },
    {
      id: '707000095',
      tooltip: 'FilmGenre',
      label: '电影类别',
      description: null,
      descriptionZh: null,
      depth: 4,
      subTypeCount: 0,
      status: 1,
      children: [],
    },
    {
      id: '702000021',
      tooltip: 'Organization',
      label: '机构',
      description: null,
      descriptionZh: null,
      depth: 47,
      subTypeCount: 1,
      status: 0,
      children: [
        {
          id: '500000063',
          tooltip: 'Company',
          label: '公司',
          description: null,
          descriptionZh: null,
          depth: 4,
          subTypeCount: 2,
          status: 1,
          children: [
            {
              id: '707000093',
              tooltip: 'FilmCompany',
              label: '电影公司',
              description: null,
              descriptionZh: null,
              depth: 4,
              subTypeCount: 0,
              status: 1,
              children: [],
            },
            {
              id: '707000094',
              tooltip: 'MusicCompany',
              label: '音乐公司',
              description: null,
              descriptionZh: null,
              depth: 2,
              subTypeCount: 0,
              status: 1,
              children: [],
            },
          ],
        },
      ],
    },
  ],
}
```

```
// dataType = 3，一维数组，根据parent查找父级
[
    {
        "id":400,
        "createdAt":"2021-10-26 14:29:18",
        "updatedAt":"2021-10-26 14:29:18",
        "appName":"拼多多",
        "keyword":"拼多多",
        "level":1,
        "parent":307,
        "version":"moye",
        "quotaId":1885,
        "quotaPathId":1886,
        "specifiedQuotaId":1884,
        "linkKeyWord":"拼多多",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"1.4048%"
            },
            {
                "name":"关键词链路占比",
                "value":"1.4048%"
            },
            {
                "name":"关键词全局占比",
                "value":"100.0%"
            }
        ]
    },
    {
        "id":420,
        "createdAt":"2021-10-26 17:17:10",
        "updatedAt":"2021-10-26 17:18:42",
        "appName":"拼多多",
        "keyword":"服装",
        "level":2,
        "parent":400,
        "version":"moye",
        "quotaId":1969,
        "quotaPathId":1970,
        "specifiedQuotaId":1960,
        "linkKeyWord":"拼多多 服装",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"0.8117%"
            },
            {
                "name":"关键词链路占比",
                "value":"0.8117%"
            },
            {
                "name":"关键词全局占比",
                "value":"0.0113%"
            }
        ]
    },
    {
        "id":421,
        "createdAt":"2021-10-26 17:17:45",
        "updatedAt":"2021-10-26 17:17:45",
        "appName":"菜鸟驿站",
        "keyword":"菜鸟驿站",
        "level":1,
        "parent":307,
        "version":"moye",
        "quotaId":1964,
        "quotaPathId":1965,
        "specifiedQuotaId":1963,
        "linkKeyWord":"菜鸟驿站",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"4.4052%"
            },
            {
                "name":"关键词链路占比",
                "value":"4.4052%"
            },
            {
                "name":"关键词全局占比",
                "value":"100.0%"
            }
        ]
    },
    {
        "id":423,
        "createdAt":"2021-10-27 09:33:35",
        "updatedAt":"2021-10-27 09:33:35",
        "appName":"工商银行",
        "keyword":"工商银行",
        "level":1,
        "parent":307,
        "version":"moye",
        "quotaId":1972,
        "quotaPathId":1973,
        "specifiedQuotaId":1971,
        "linkKeyWord":"工商银行",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"2.6727%"
            },
            {
                "name":"关键词链路占比",
                "value":"2.6727%"
            },
            {
                "name":"关键词全局占比",
                "value":"100.0%"
            }
        ]
    },
    {
        "id":429,
        "createdAt":"2021-10-28 10:59:36",
        "updatedAt":"2021-10-28 11:01:01",
        "appName":"拼多多",
        "keyword":"优惠",
        "level":2,
        "parent":400,
        "version":"moye",
        "quotaId":1999,
        "quotaPathId":2001,
        "specifiedQuotaId":1991,
        "linkKeyWord":"拼多多 优惠",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"14.603%"
            },
            {
                "name":"关键词链路占比",
                "value":"14.603%"
            },
            {
                "name":"关键词全局占比",
                "value":"0.2043%"
            }
        ]
    },
    {
        "id":430,
        "createdAt":"2021-10-28 11:53:51",
        "updatedAt":"2021-10-28 11:56:46",
        "appName":"拼多多",
        "keyword":"看过",
        "level":3,
        "parent":420,
        "version":"moye",
        "quotaId":2008,
        "quotaPathId":2009,
        "specifiedQuotaId":2002,
        "linkKeyWord":"拼多多 服装 看过",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"0.0922%"
            },
            {
                "name":"关键词链路占比",
                "value":"11.368%"
            },
            {
                "name":"关键词全局占比",
                "value":"0.1096%"
            }
        ]
    },
    {
        "id":431,
        "createdAt":"2021-10-28 11:56:39",
        "updatedAt":"2021-10-28 11:56:47",
        "appName":"拼多多",
        "keyword":"阈值",
        "level":4,
        "parent":430,
        "version":"moye",
        "quotaId":2010,
        "quotaPathId":2011,
        "specifiedQuotaId":2005,
        "linkKeyWord":"拼多多 服装 看过 阈值",
        "extNewestNode":true,
        "quotas":[
            {
                "name":"关键词签名占比",
                "value":"0.0911%"
            },
            {
                "name":"关键词链路占比",
                "value":"98.890%"
            },
            {
                "name":"关键词全局占比",
                "value":"0.8271%"
            }
        ]
    },
    {
        "id":307,
        "createdAt":null,
        "updatedAt":null,
        "appName":"moye",
        "keyword":"moye",
        "level":0,
        "parent":null,
        "version":"moye",
        "quotaId":null,
        "quotaPathId":null,
        "specifiedQuotaId":null,
        "linkKeyWord":null,
        "extNewestNode":true,
        "quotas":[]
    }
]
```

```
// dataType = 4，根据节点坐标渲染节点
{
    "data":[
        {
            "id":86,
            "createdAt":"2021-11-08 17:17:11",
            "updatedAt":"2021-11-09 14:23:28",
            "appName":"test_moye",
            "keyword":"菜鸟驿站",
            "level":1,
            "parent":85,
            "version":"test_moye",
            "quotaId":179,
            "quotaPathId":180,
            "specifiedQuotaId":178,
            "linkKeyWord":"null 菜鸟驿站",
            "extNewestNode":true,
            "nodeFeature":"{\"x\":\"367.76435790285575\",\"y\":\"830.1433120677996\"}",
            "quotas":[
                {
                    "name":"关键词签名占比",
                    "value":"0.0%",
                    "molecule":null,
                    "denominator":null
                },
                {
                    "name":"关键词链路占比",
                    "value":"0.0%",
                    "molecule":null,
                    "denominator":null
                },
                {
                    "name":"关键词全局占比",
                    "value":"100.0%",
                    "molecule":null,
                    "denominator":null
                }
            ]
        },
        {
            "id":87,
            "createdAt":"2021-11-08 17:17:21",
            "updatedAt":"2021-11-09 14:23:28",
            "appName":"test_moye",
            "keyword":"银行",
            "level":2,
            "parent":86,
            "version":"test_moye",
            "quotaId":182,
            "quotaPathId":183,
            "specifiedQuotaId":181,
            "linkKeyWord":"null 菜鸟驿站 银行",
            "extNewestNode":true,
            "nodeFeature":"{\"x\":\"683.1804008081278\",\"y\":\"625.4075051115944\"}",
            "quotas":[
                {
                    "name":"关键词签名占比",
                    "value":"0.0%",
                    "molecule":null,
                    "denominator":null
                },
                {
                    "name":"关键词链路占比",
                    "value":"0.0%",
                    "molecule":null,
                    "denominator":null
                },
                {
                    "name":"关键词全局占比",
                    "value":"0.0%",
                    "molecule":null,
                    "denominator":null
                }
            ]
        },
        {
            "id":85,
            "createdAt":null,
            "updatedAt":null,
            "appName":"test_moye",
            "keyword":null,
            "level":0,
            "parent":null,
            "version":"test_moye",
            "quotaId":null,
            "quotaPathId":null,
            "specifiedQuotaId":null,
            "linkKeyWord":null,
            "extNewestNode":true,
            "nodeFeature":"{\"x\":200,\"y\":250}",
            "quotas":[

            ]
        }
    ],
    "code":"200",
    "msg":"ok"
}
```

## 温馨提示

```
如需支持更多自定义效果，请联系作者逐步完善
开发者：诺克
微信：15858194070
```

## 鼓励和支持

开发不易，开源不易。如果这篇经验对您有所帮助，请多给我一些鼓励和支持，谢谢！。

<img src="https://i.loli.net/2021/11/12/IgrFyOTfE5AkWpu.jpg" width="300"/><img src="https://i.loli.net/2021/11/12/AMhSpxZX19d5CIq.jpg" width="300"/>
