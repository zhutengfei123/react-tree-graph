import React from 'react';
import TreeGraph from '../components/TreeGraph';

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
