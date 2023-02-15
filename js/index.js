window.onload = function() {
    var $ = go.GraphObject.make;    // 创建画布

    var myDiagram =
        $(go.Diagram, "myDiagramDiv",   // 必须与Div元素的id属性一致
        {
            initialContentAlignment: go.Spot.Center, // 居中显示内容
            "undoManager.isEnabled": true, // 启用Ctrl-Z和Ctrl-Y撤销重做功能
            allowDrop: true,  // 是否允许从Palette面板拖入元素
            scrollsPageOnFocus: false   // 图选中时页面不会滚动
        });

    // 当图有改动时，在页面标题后加*，且启动保存按钮
    myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("SaveButton");
        if (button) {
            button.disabled = !myDiagram.isModified;
        }
        
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });

    // 双击
    myDiagram.addDiagramListener("ObjectDoubleClicked", function(e) {
        console.log(e)
    });

    // 设置节点位置风格，并与模型"loc"属性绑定，该方法会在初始化各种节点模板时使用
    function nodeStyle() {
        return [
            // 将节点位置信息 Node.location 同节点模型数据中 "loc" 属性绑定：
            // 节点位置信息从 节点模型 "loc" 属性获取, 并由静态方法 Point.parse 解析.
            // 如果节点位置改变了, 会自动更新节点模型中"loc"属性, 并由 Point.stringify 方法转化为字符串
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                // 节点位置 Node.location 定位在节点的中心
                locationSpot: go.Spot.Center
            }
        ];
    }
  
    // 定义水库节点的模板
    myDiagram.nodeTemplateMap.add("Reservoir",
        $(go.Node, "Table", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Picture, { source: "img/Reservoir.png",  margin: 0, width: 80, height: 80,}),
            ),
        )
    );
  
    // 定义雨量站节点的模板
    myDiagram.nodeTemplateMap.add("RainfallStation",
        $(go.Node, "Table", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Picture, { source: "img/RainfallStation.png",  margin: 0, width: 80, height: 80,}),
            ),
        )
    );
  
    // 定义水文站节点的模板
    myDiagram.nodeTemplateMap.add("HydrologicalStation",
        $(go.Node, "Table", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Picture, { source: "img/HydrologicalStation.png",  margin: 0, width: 80, height: 80,}),
            ),
        )
    );

    // 定义水电站节点的模板
    myDiagram.nodeTemplateMap.add("HydropowerStation",
        $(go.Node, "Table", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Picture, { source: "img/HydropowerStation.png",  margin: 0, width: 80, height: 80,}),
            ),
        )
    );
    // 在图形页面的左边初始化图例Palette面板
    myPalette =
    $(go.Palette, "myPaletteDiv",  // 必须同HTML中Div元素id一致
        {
        scrollsPageOnFocus: false,  // 图选中时页面不会滚动
        nodeTemplateMap: myDiagram.nodeTemplateMap,  // 同myDiagram公用一种node节点模板
        model: new go.GraphLinksModel([  // 初始化Palette面板里的内容
            { category: "Reservoir", text: "水库" },
            { category: "RainfallStation", text: "雨量站" },
            { category: "HydrologicalStation", text: "水文站" },
            { category: "HydropowerStation", text: "水电站" },
        ])
    });
    
    // 初始化模型范例
    myDiagram.model = go.Model.fromJson(
        { "class": "go.GraphLinksModel",
        "nodeDataArray": [ 
      {"category":"RainfallStation", "text":"雨量站", "key":-2, "loc":"-10 -129"},
      {"category":"HydrologicalStation", "text":"水文站", "key":-3, "loc":"-71 -27"},
      {"category":"Reservoir", "text":"水库", "key":-1, "loc":"79 -21"},
      {"category":"HydropowerStation", "text":"水电站", "key":-4, "loc":"-63 131"}
       ],
        "linkDataArray": []}
    );
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
  
    // 将go模型以JSon格式保存在文本框内
    document.getElementById("saveButton").addEventListener("click", function() {
        document.getElementById("mySavedModel").value = myDiagram.model.toJson();
        myDiagram.isModified = false;
    });

    // 读取文本框内JSon格式的内容，并转化为gojs模型
    document.getElementById("loadButton").addEventListener("click", function() {
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    });

    // 在新窗口中将图形转化为SVG，并分页打印
    document.getElementById("printButton").addEventListener("click", function() {
        var svgWindow = window.open();
        if (!svgWindow) return;  // 创建新窗口失败
        var printSize = new go.Size(700, 960);
        var bnds = myDiagram.documentBounds;
        var x = bnds.x;
        var y = bnds.y;
        while (y < bnds.bottom) {
        while (x < bnds.right) {
            var svg = myDiagram.makeSVG({ scale: 1.0, position: new go.Point(x, y), size: printSize });
            svgWindow.document.body.appendChild(svg);
            x += printSize.width;
        }
        x = bnds.x;
        y += printSize.height;
        }
        setTimeout(function() { svgWindow.print(); }, 1);
    });

} // windows.onload


