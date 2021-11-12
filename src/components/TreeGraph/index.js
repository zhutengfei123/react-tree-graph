import './index.less';
import React, { useEffect, useState, useRef } from 'react';
import { Graph, Menu, Tooltip, TreeGraph } from '@antv/g6';
import { Spin, Button } from 'antd';
import Icon, {
  FullscreenExitOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  CompressOutlined
  // SaveOutlined,
} from '@ant-design/icons';
import successIcon from './images/success.svg';
import errorIcon from './images/error.svg';
import runningIcon from './images/running.svg';
import warningIcon from './images/warning.svg';
import tipsIcon from './images/tips.svg';
import questionIcon from './images/question.svg';
import tableIcon from './images/table.svg';
import databaseIcon from './images/database.svg';
import fieldIcon from './images/field.svg';
import PropTypes from 'prop-types';

let timer = null;
let graph = null;
let size = 1.0;

const TreeGraphMain = (props) => {
  const {
    graphHeight = 500,
    dataType = 3,
    dir = 'LR',
    data = [],
    loading = false,
    showLogoIcon = false,
    showStateIcon = false,
    descKey = 'quotas',
    descItemKey = 'name',
    descItemValue = 'value',
    nodeNameKey = 'keyword',
    nodeIdKey = 'id',
    nodePosKey = 'position',
    menuKey = 'key',
    menuValue = 'name',
    nodeType = 'modelRect',
    nodeSize = [150, 32],
    parentId = null,
    parentIdKey = 'parent',
    modes = ['drag-canvas', 'drag-node', 'zoom-canvas', 'click-select'],
    clickMenu = (item) => {
      console.warn('点击了右键菜单', item);
    },
    clickNode = (item) => {
      console.warn('点击了节点', item);
    },
    refresh = () => {
      console.warn('刷新画布');
    },
    nodeDragendNode = (item) => {
      console.warn('画布节点拖拽结束', item);
    },
    saveNodesPos = (item) => {
      console.warn('保存画布信息', item);
    },
    menuList = [
      { key: '1', name: '新增节点' },
      { key: '2', name: '编辑节点' },
      { key: '3', name: '删除节点' }
    ],
    typeObj = {
      0: { name: '数据库节点', img: databaseIcon },
      1: { name: '表节点', img: tableIcon },
      2: { name: '字段节点', img: fieldIcon }
    },
    stateObj = {
      0: { name: '成功', img: successIcon },
      1: { name: '失败', img: errorIcon },
      2: { name: '运行中', img: runningIcon },
      3: { name: '警告', img: warningIcon },
      4: { name: '提示', img: tipsIcon },
      5: { name: '疑问', img: questionIcon }
    }
  } = props;

  const treeGraphRef = useRef();
  const [graphLoading, setGraphLoading] = useState(false);
  const [isFullScreen, setIsFllScreen] = useState(false);

  const graphFitView = () => {
    const width = graph.get('width');
    const height = graph.get('height');
    const group = graph.get('group');
    group.resetMatrix();
    const bbox = group.getCanvasBBox();

    if (bbox.width === 0 || bbox.height === 0) return;
    const viewCenter = {
      x: width / 2,
      y: height / 2
    };

    const groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
  };

  // 将普通列表转换为树结构的列表
  const listToTreeList = (list, parent = null) => {
    let obj = {};
    list.forEach((item) => {
      item[nodeIdKey] = `${item[nodeIdKey]}`;
      item.children = [];
      obj[item[nodeIdKey]] = item;
    });
    return list.filter((item) => {
      if (item[parentIdKey] !== parent) {
        obj[item[parentIdKey]].children.push(item);
        return false;
      }
      return true;
    });
  };

  // 将普通列表转换为节点结构的列表
  const listToNodes = (list) => {
    const nodes = [];
    const edges = [];
    list.forEach((item) => {
      item[nodeIdKey] = `${item[nodeIdKey]}`;
      item[parentIdKey] = `${item[parentIdKey]}`;
      let nodePos = item[nodePosKey];
      if (nodePos) {
        if (Object.prototype.toString.call(nodePos) === '[object String]') {
          nodePos = JSON.parse(nodePos);
        }
        item.x = nodePos.x;
        item.y = nodePos.y;
      }
      nodes.push(item);
      if (item[parentIdKey] !== `${parentId}`) {
        edges.push({
          source: item[parentIdKey],
          target: item[nodeIdKey]
        });
      }
    });
    return { nodes, edges };
  };

  const init = () => {
    if (graph) {
      treeGraphRef.current.innerHTML = '';
    }
    if (!data) {
      return;
    }
    const dataIsType = Object.prototype.toString.call(data);
    if (dataIsType === '[object Object]') {
      const { nodes = [], edges = [] } = data;
      if (!nodes.length || !edges.length) {
        return;
      }
    }
    if (dataIsType === '[object Array]') {
      if (!data.length) {
        return;
      }
    }
    const container = treeGraphRef.current;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    // 节点右键菜单
    const contextMenu = new Menu({
      getContent: () => {
        let str = '<div class="graph-menu">';
        menuList.forEach((item) => {
          str += `<div key=${item[menuKey]} class="graph-menu-item">${item[menuValue]}</div>`;
        });
        str += '</div>';
        return str;
      },
      handleMenuClick: (target, item) => {
        const key = target.getAttribute('key');
        const obj = item.getModel();
        if (dataType === 4) {
          const { x, y } = graph.getCanvasByPoint(obj.x, obj.y);
          obj.x = x;
          obj.y = y;
        }
        clickMenu({ key, item: obj });
      },
      // 需要加上父级容器的 padding-left 16 与自身偏移量 10
      offsetX: 16,
      // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
      offsetY: 0,
      // 在哪些类型的元素上响应
      itemTypes: ['node']
    });

    // 节点鼠标移入提示
    const tooltip = new Tooltip({
      offsetX: 10,
      offsetY: 10,
      itemTypes: ['node'],
      getContent: (e) => {
        const item = e.item.getModel();
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        let str = `<div class="tooltip-item-box"><p class="tooltip-item tooltip-title">${item[nodeNameKey]}</p>`;
        if (!Array.isArray(item[descKey])) {
          str += item[descKey] ? `<p class="tooltip-item">${item[descKey]}</p>` : '';
        } else {
          item[descKey].forEach((item) => {
            str += `<p class="tooltip-item">${item[descItemKey]}：${item[descItemValue] || '暂无'
              }</p>`;
          });
        }
        str += '</div>';
        outDiv.innerHTML = str;
        return outDiv;
      }
    });

    // 自定义边-动态运行
    // registerEdge(
    //   'line-dash',
    //   {
    //     afterDraw (cfg, group) {
    //       // get the first shape in the group, it is the edge's path here=
    //       const shape = group.get('children')[0];
    //       let index = 0;
    //       // Define the animation
    //       shape.animate(
    //         () => {
    //           index++;
    //           if (index > 9) {
    //             index = 0;
    //           }
    //           const res = {
    //             lineDash: [4, 2, 1, 2],
    //             lineDashOffset: -index,
    //           };
    //           // returns the modified configurations here, lineDash and lineDashOffset here
    //           return res;
    //         },
    //         {
    //           repeat: true, // whether executes the animation repeatly
    //           duration: 3000, // the duration for executing once
    //         },
    //       );
    //     },
    //   },
    //   'cubic-horizontal', // extend the built-in edge 'cubic'
    // );

    let MyGraph = null;
    let layoutType = null;
    let layoutDir = null;
    let graphData = data;
    // 4种数据格式
    if ([1, 4].includes(dataType)) {
      MyGraph = Graph;
      layoutType = 'dagre';
      layoutDir = 'rankDir';
      if (dataType === 4) {
        graphData = listToNodes(data);
        layoutType = null;
        layoutDir = null;
      }
    }
    if ([2, 3].includes(dataType)) {
      MyGraph = TreeGraph;
      layoutType = 'compactBox';
      layoutDir = 'direction';
      if (dataType === 3) {
        graphData = listToTreeList(data, parentId)[0];
      }
    }
    const option = {
      container: 'treeGraph',
      width,
      height,
      fitCenter: dataType !== 4,
      animate: true,
      plugins: [contextMenu, tooltip],
      layout: {
        type: layoutType,
        [layoutDir]: dir,
        getId: (node) => node[nodeIdKey],
        getVGap: () => 20,
        getHGap: () => 100
      },
      defaultNode: {
        type: nodeType,
        size: nodeSize,
        style: {
          radius: 5,
          stroke: '#69c0ff',
          fill: '#ffffff',
          lineWidth: 1,
          fillOpacity: 1
        },
        labelCfg: {
          position: 'right',
          style: {
            fill: '#595959',
            fontSize: 14,
            cursor: 'pointer'
          },
          offset: 12
        },
        preRect: {
          show: true,
          width: 4,
          fill: '#40a9ff',
          radius: 2
        },
        linkPoints: {
          top: false,
          right: false,
          bottom: false,
          left: false,
          size: 10,
          lineWidth: 1,
          fill: '#72CC4A',
          stroke: '#72CC4A'
        }
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          endArrow: true
        }
      },
      modes: {
        default: modes
      },
      nodeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 1.5
        },
        selected: {
          stroke: '#1890ff',
          fill: '#e6f7ff'
        }
      }
    };
    if (dataType === 4) {
      option.layout = null;
    }
    graph = new MyGraph(option);

    graph.node((node) => {
      const cfg = {
        id: node[nodeIdKey],
        label: node[nodeNameKey],
        style: {
          cursor: 'pointer'
        },
        logoIcon: {
          show: showLogoIcon,
          x: 0,
          y: 0,
          img: typeObj[node.nodeType || 0].img,
          width: 16,
          height: 16,
          offset: -8
        },
        stateIcon: {
          show: showStateIcon,
          x: 0,
          y: 0,
          img: stateObj[node.status || 0].img,
          width: 16,
          height: 16,
          offset: -5
        }
      };
      return cfg;
    });

    // 自定义边
    // graph.edge(edge => {
    //   let cfg = edge
    //   cfg = {
    //     id: edge.id,
    //     type: 'line-dash',
    //     style: {
    //       endArrow: true,
    //       stroke: '#1890ff'
    //     },
    //   };
    //   return cfg
    // })

    graph.on('node:mouseenter', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    });

    graph.on('node:mouseleave', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    });

    graph.on('node:dragend', (evt) => {
      const { item } = evt;
      nodeDragendNode(item.getModel());
    });

    graph.on('node:click', (evt) => {
      const { item } = evt;
      clickNode(item.getModel());
    });

    graph.data(graphData);
    graph.render();

    if (typeof window !== 'undefined') {
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
    }

    if (dataType !== 4) {
      graphFitView();
    }
  };

  const zoomOut = () => {
    size = graph.getZoom();
    size += 0.1;
    const val = size.toFixed(2) - 0;
    graph.zoomTo(val);
  };

  const zoomIn = () => {
    size = graph.getZoom();
    size -= 0.1;
    const val = size.toFixed(2) - 0;
    graph.zoomTo(val);
  };

  const resize = (flag) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      const container = treeGraphRef.current;
      if (!graph || graph.get('destroyed')) return;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      graph.changeSize(width, height);
      if (!flag) {
        graphFitView();
      }
    }, 500);
  };

  const handleRefresh = () => {
    graph.clear();
    refresh();
  };

  const handleSaveNodesPos = () => {
    const { nodes } = graph.save();
    nodes.forEach((item) => {
      const { x, y } = graph.getCanvasByPoint(item.x, item.y);
      item.x = x;
      item.y = y;
    });
    saveNodesPos(nodes);
  };

  useEffect(() => {
    setGraphLoading(loading);
  }, [loading]);

  useEffect(() => {
    init();
  }, [data]);

  return (
    <div className={`tree-graph ${isFullScreen && 'tree-full-screen'}`} style={{ height: graphHeight }}>
      <div className="graph-btns">
        <ZoomInOutlined title="放大" className="graph-btns-item" onClick={zoomOut} />
        <ZoomOutOutlined title="缩小" className="graph-btns-item" onClick={zoomIn} />
        <CompressOutlined title="自适应" className="graph-btns-item" onClick={() => resize()} />
        <ReloadOutlined title="刷新" className="graph-btns-item" onClick={handleRefresh} />
        <Icon
          title={isFullScreen ? '非全屏' : '全屏'}
          component={isFullScreen ? FullscreenExitOutlined : FullscreenOutlined}
          className="graph-btns-item"
          onClick={() => {
            setIsFllScreen(!isFullScreen);
            resize(true);
          }}
        />
        {/* <SaveOutlined
          style={{ color: '#1890ff' }}
          title="保存"
          className="graph-btns-item save-btn"
          onClick={handleSaveNodesPos}
        /> */}
      </div>
      {dataType === 4 && (
        <Button className="save-dag-btn" type="primary" onClick={handleSaveNodesPos}>
          保存画布
        </Button>
      )}
      <Spin spinning={graphLoading}>
        <div ref={treeGraphRef} id="treeGraph" />
      </Spin>
    </div>
  );
};

TreeGraphMain.propTypes = {
  menuList: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  graphHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dataType: PropTypes.number,
  dir: PropTypes.string,
  loading: PropTypes.bool,
  showLogoIcon: PropTypes.bool,
  showStateIcon: PropTypes.bool,
  descKey: PropTypes.string,
  descItemKey: PropTypes.string,
  descItemValue: PropTypes.string,
  nodeNameKey: PropTypes.string,
  nodeIdKey: PropTypes.string,
  menuKey: PropTypes.string,
  menuValue: PropTypes.string,
  nodeType: PropTypes.string,
  nodeSize: PropTypes.array,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parentIdKey: PropTypes.string,
  modes: PropTypes.array,
  clickMenu: PropTypes.func,
  clickNode: PropTypes.func,
  refresh: PropTypes.func,
  nodeDragendNode: PropTypes.func,
  saveNodesPos: PropTypes.func
}

export default TreeGraphMain;
