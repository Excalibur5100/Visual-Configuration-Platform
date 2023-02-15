var robot;  // this global variable will hold an instance of the Robot class for myDiagram
function init() {//初始化
    // if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // 创建gojs画布

    function nodeStyle() {//node节点的默认统一设置
        return [
            // 将节点位置信息 Node.location 同节点模型数据中 "loc" 属性绑定：
            // 节点位置信息从 节点模型 "loc" 属性获取, 并由静态方法 Point.parse 解析.
            // 如果节点位置改变了, 会自动更新节点模型中"loc"属性, 并由 Point.stringify 方法转化为字符串
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),//坐标双向绑定
            new go.Binding("id"),
            {
                locationSpot: go.Spot.Center,// 节点位置 Node.location 定位在节点的中心
                contextClick: nodeClicked,
                click: nodeClicked,
                doubleClick: nodeClicked,
                selectionObjectName:"ICON",
                contextMenu:
                    $("ContextMenu",//直接设定的默认右键菜单
                        $("ContextMenuButton",
                            $(go.TextBlock, "匹配数据"),
                            { click: propertySave }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "基本信息"),
                            { click: info }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "模型管理"),
                            { click: showlist1 }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "模型计算"),
                            { click: test }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "删除"),
                            { click: menuDelete }),
                    ),

            },
        ];
    }

    myDiagram =
        $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
            {
                // "toolManager.mouseWheelBehavior":go.ToolManager.WheelZoom,
                "undoManager.isEnabled": true,
                "dragSelectingTool.isEnabled" : true,
            }
            );


    // 定义水库节点的模板
    myDiagram.nodeTemplateMap.add("Reservoir",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "水库",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 定义雨量站节点的模板
    myDiagram.nodeTemplateMap.add("RainfallStation",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "雨量站",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 定义水文站节点的模板
    myDiagram.nodeTemplateMap.add("HydrologicalStation",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "水文站",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 定义水电站节点的模板
    myDiagram.nodeTemplateMap.add("HydropowerStation",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "水电站",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 定义气象站节点的模板
    myDiagram.nodeTemplateMap.add("WeatherStation",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "气象站",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 节点类子流域模板
    myDiagram.nodeTemplateMap.add("Boundary",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        geometryString: "M663.5,288.5c0,7.333,0,14.667,0,22 M861,288.5c0,7.333,0,14.667,0,22 M900,288.5c0,7.333,0,14.667,0,22 M939.5,288.5\n" +
                            "\tc0,7.333,0,14.667,0,22 M940.5,375.5c0,7.333,0,14.667,0,22 M792.5,602c-7.333,0-14.667,0-22,0 M595.5,343c-7.333,0-14.667,0-22,0\n" +
                            "\t M585,418.5c0,7.333,0,14.667,0,22 M871.5,602c-7.333,0-14.667,0-22,0 M585,505.5c0,7.333,0,14.667,0,22 M595.5,299\n" +
                            "\tc-7.333,0-14.667,0-22,0 M585,332.5c0,7.333,0,14.667,0,22 M940.5,332.5c0,7.333,0,14.667,0,22 M635.5,299c-7.333,0-14.667,0-22,0\n" +
                            "\t M585,591.5c0,7.333,0,14.667,0,22 M624,591.5c0,7.333,0,14.667,0,22 M939.5,591.5c0,7.333,0,14.667,0,22 M595.5,429\n" +
                            "\tc-7.333,0-14.667,0-22,0 M663.5,591.5c0,7.333,0,14.667,0,22 M703,591.5c0,7.333,0,14.667,0,22 M792.5,299c-7.333,0-14.667,0-22,0\n" +
                            "\t M940.5,418.5c0,7.333,0,14.667,0,22 M595.5,386c-7.333,0-14.667,0-22,0 M832.5,299c-7.333,0-14.667,0-22,0 M871.5,299\n" +
                            "\tc-7.333,0-14.667,0-22,0 M742.5,591.5c0,7.333,0,14.667,0,22 M782,591.5c0,7.333,0,14.667,0,22 M821,288.5c0,7.333,0,14.667,0,22\n" +
                            "\t M821,591.5c0,7.333,0,14.667,0,22 M861,591.5c0,7.333,0,14.667,0,22 M585,288.5c0,7.333,0,14.667,0,22 M624,288.5\n" +
                            "\tc0,7.333,0,14.667,0,22 M585,375.5c0,7.333,0,14.667,0,22 M703,288.5c0,7.333,0,14.667,0,22 M742.5,288.5c0,7.333,0,14.667,0,22\n" +
                            "\t M782,288.5c0,7.333,0,14.667,0,22 M900,591.5c0,7.333,0,14.667,0,22 M595.5,472c-7.333,0-14.667,0-22,0 M585,461.5\n" +
                            "\tc0,7.333,0,14.667,0,22 M940.5,461.5c0,7.333,0,14.667,0,22 M595.5,516c-7.333,0-14.667,0-22,0 M940.5,505.5c0,7.333,0,14.667,0,22\n" +
                            "\t M595.5,559c-7.333,0-14.667,0-22,0 M585,548.5c0,7.333,0,14.667,0,22 M940.5,548.5c0,7.333,0,14.667,0,22 M832.5,602\n" +
                            "\tc-7.333,0-14.667,0-22,0 M595.5,602c-7.333,0-14.667,0-22,0 M635.5,602c-7.333,0-14.667,0-22,0 M951.5,429c-7.333,0-14.667,0-22,0\n" +
                            "\t M951.5,343c-7.333,0-14.667,0-22,0 M674.5,299c-7.333,0-14.667,0-22,0 M753.5,299c-7.333,0-14.667,0-22,0 M951.5,386\n" +
                            "\tc-7.333,0-14.667,0-22,0 M950.5,299c-7.333,0-14.667,0-22,0 M753.5,602c-7.333,0-14.667,0-22,0 M951.5,559c-7.333,0-14.667,0-22,0\n" +
                            "\t M950.5,602c-7.333,0-14.667,0-22,0 M951.5,516c-7.333,0-14.667,0-22,0 M951.5,472c-7.333,0-14.667,0-22,0 M674.5,602\n" +
                            "\tc-7.333,0-14.667,0-22,0 M713.5,299c-7,0-14,0-21,0 M910.5,299c-7,0-14,0-21,0 M713.5,602c-7,0-14,0-21,0 M910.5,602c-7,0-14,0-21,0",
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.TextBlock, "子流域单元",  // the label text
                    {
                        editable:true,
                        margin:6,
                        width:55,
                        height:55,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),

            ),

        )
    );

    //防灾对象节点模板
    myDiagram.nodeTemplateMap.add("DPObject",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:100,
                        height:100,
                    },
                    new go.Binding("source")
                ),
            ),
            $(go.Panel, "Auto",
                $(go.TextBlock, "防灾对象",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );

    //断面节点-竖 模板
    myDiagram.nodeTemplateMap.add("CrossSectionV",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        width:10,
                        height:60,
                        name:"ICON",
                        fill: "yellow",
                        opacity:0.5,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        width:7,
                        height:57,
                        opacity:0.5,
                    },
                    new go.Binding("source")
                ),
            ),
            $(go.Panel, "Auto",
                $(go.TextBlock, "河道断面(竖)",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    //断面节点-横 模板
    myDiagram.nodeTemplateMap.add("CrossSectionL",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        width:60,
                        height:10,
                        name:"ICON",
                        fill: "yellow",
                        opacity:0.5,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        width:57,
                        height:7,
                        opacity:0.5,
                    },
                    new go.Binding("source")
                ),
            ),
            $(go.Panel, "Auto",
                $(go.TextBlock, "河道断面(横)",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    //文本标签模板
    myDiagram.nodeTemplateMap.add("Text",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                        minSize: new go.Size(125, 32),
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.TextBlock, "文本框",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                        font: "bold 16pt serif",
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 定义滑坡危险点模板
    myDiagram.nodeTemplateMap.add("LandslidePoint",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "滑坡危险点",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );
    // 定义桥模板
    myDiagram.nodeTemplateMap.add("Bridge",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        name:"ICON",
                        fill: "white",
                        opacity:0.05,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:2,
                        width:50,
                        height:50,
                    },
                    new go.Binding("source")
                ),
            ),

            $(go.Panel, "Auto",
                $(go.TextBlock, "桥",  // the label text
                    {
                        editable:true,
                        margin: 2,
                        opacity:1,
                    },
                    // editing the text automatically updates the model data
                    new go.Binding("text","name").makeTwoWay(),
                ),
            ),
        )
    );


    myDiagram.model = go.Model.fromJson(//初始化显示的模型
        { "class": "GraphLinksModel",
            "nodeDataArray": [
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u4ee3\u53e4\u5bfa\u6c34\u7535\u7ad9","key":-4,"loc":"-115.333251953125 -286.6666717529297"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-5,"loc":"-284 -298.00001525878906","name":"\u4ee3\u53e4\u5bfa\u6c34\u7535\u7ad9\u4ee5\u4e0a\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u533a\u74e6\u56db\u7ea7\u6c34\u7535\u7ad9","key":-3,"loc":"-114.5 -149.63879699707024"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-6,"loc":"44 -267.3333282470703","name":"\u9ed1\u6c34\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-7,"loc":"-467.33331298828125 -203.33334350585938","name":"\u5934\u6c9f\u575d\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u6eaa\u85cf\u6c34\u7535\u7ad9","key":-8,"loc":"-388.6666564941406 -92.6666259765625"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-9,"loc":"-576.6666412353516 -147.3333282470703","name":"\u6eaa\u85cf\u6c34\u7535\u7ad9\u4e0a\u6e38\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"(\u5c0f)\u7acb\u8282\u6c34\u7535\u7ad9","key":-10,"loc":"-115.33331298828125 -2.000030517578125"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-11,"loc":"-239.33334350585938 -15.33331298828125","name":"\u9664\u74e6\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-12,"loc":"38.6666259765625 -120.66665649414062","name":"\u5927\u7acb\u8282\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u5927\u5bb9\u7acb\u8282\u6c34\u7535\u7ad9","key":-13,"loc":"-116.33331298828125 128"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u559c\u513f\u6c9f\u6c34\u7535\u7ad9","key":-14,"loc":"-116.8255844116211 492.57724914550784"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u6cb9\u623f\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-15,"loc":"-319.6666564941406 201.00006103515625"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u5361\u623f\u5b50\u6c34\u7535\u7ad9","key":-16,"loc":"-509.66668701171875 75.66668701171875"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-17,"loc":"-728 -0.33331298828125","name":"\u5361\u623f\u5b50\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u5927\u5c7f\u5c11\u4e0b\u4e00\u7ea7\u6c34\u7535\u7ad9","key":-18,"loc":"-633.3333435058594 175.66668701171875"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u5361\u5b50\u6865\u6c34\u7535\u7ad9","key":-19,"loc":"-876.6666717529297 173.66665649414062"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-20,"loc":"-875.9999847412109 21.666671752929688","name":"\u5361\u5b50\u6865\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-21,"loc":"-304.66656494140625 485.66668701171875","name":"\u62c9\u5c15\u6c9f\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-22,"loc":"54.33332824707031 305.3333435058594","name":"\u54d1\u5df4\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-23,"loc":"358.33349609375 485.0000305175781","name":"\u6770\u8fea\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-24,"loc":"249.6669921875 415.0000915527344","name":"\u9999\u693f\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-25,"loc":"-4.9999847412109375 220.0000762939453","name":"\u82b1\u5e74\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-27,"loc":"130.33326721191406 595.3333282470703","name":"\u9ed1\u5cea\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u9501\u513f\u5934\u6c34\u7535\u7ad9","key":-26,"loc":"-120.33331298828125 1037.6666259765625"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u51c9\u98ce\u58f3\u6c34\u7535\u7ad9","key":-28,"loc":"-117 691"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u74dc\u54b1\u6c9f\u4e00\u7ea7\u6c34\u7535\u7ad9","key":-29,"loc":"-429.6666259765625 568.3333740234375"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u74dc\u54b1\u6c9f\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-30,"loc":"-427 720.9999694824219"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u74dc\u54b1\u6c9f\u4e09\u7ea7\u6c34\u7535\u7ad9","key":-31,"loc":"-426.333251953125 854.9999694824219"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u591a\u62c9\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-32,"loc":"-686.3333129882812 713.6666564941406"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u78e8\u6c9f\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-33,"loc":"-682.9999694824219 954.3333740234375"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-34,"loc":"-740.3332977294922 565.4227050781246","name":"\u74dc\u54b1\u6c9f\u4e00\u7ea7\u6c34\u7535\u7ad9\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-35,"loc":"-866.3333129882812 712.756048583984","name":"\u591a\u62c9\u4e8c\u7ea7\u6c34\u7535\u7ad9\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-36,"loc":"-871.6666717529297 819.6666870117188","name":"\u5e99\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-37,"loc":"197.3333740234375 730.6666870117188","name":"\u6b66\u90fd\u5173\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u864e\u5bb6\u5d16\u6c34\u7535\u7ad9","key":-38,"loc":"-118.6666259765625 1380.9999389648438"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u5357\u5c7f\u6c34\u7535\u7ad9","key":-39,"loc":"-118.6666259765625 1526.0000610351562"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u4e24\u6cb3\u53e3\u6c34\u7535\u7ad9","key":-40,"loc":"-117.333251953125 1662.6666870117188"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-41,"loc":"-545.8333435058594 1465.4227661132809","name":"\u5357\u5c7f\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"HydrologicalStation","text":"\u6c34\u6587\u7ad9","source":"img/HydrologicalStation.png","name":"\u821f\u66f2\u6c34\u6587\u7ad9","key":-42,"loc":"-121.33331298828125 1219"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-43,"loc":"28.6668701171875 1240","name":"\u5be8\u5b50\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-44,"loc":"278.000244140625 1226.6666564941406","name":"\u4e09\u773c\u5c7f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-45,"loc":"-510 1249.3333435058594","name":"\u6cb3\u5357\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-46,"loc":"333.3333740234375 1500.0000305175781","name":"\u7f57\u5bb6\u5cea\u4ea7\u6c47\u6d41\u533a\u95f4"}
            ],
            "linkDataArray": [
                {"from":-5,"to":-4,"name":""},
                {"from":-4,"to":-3,"name":""},
                {"from":-6,"to":-3,"name":"\u9ed1\u6c34\u6c9f"},
                {"from":-7,"to":-3,"name":"\u5934\u6c9f\u575d"},
                {"from":-8,"to":-3,"name":""},
                {"from":-9,"to":-8,"name":""},
                {"from":-3,"to":-10,"name":""},
                {"from":-11,"to":-3,"name":"\u9664\u74e6\u6c9f"},
                {"from":-12,"to":-10,"name":"\u5927\u7acb\u8282\u6c9f"},
                {"from":-10,"to":-13,"name":""},
                {"from":-13,"to":-14,"name":""},
                {"from":-15,"to":-14,"name":"\u5927\u5cea\u6c9f\n"},
                {"from":-17,"to":-16,"name":""},
                {"from":-16,"to":-15,"name":""},
                {"from":-18,"to":-15,"name":""},
                {"from":-19,"to":-18,"name":""},
                {"from":-20,"to":-19,"name":""},
                {"from":-21,"to":-14,"name":"\u62c9\u5c15\u6c9f"},
                {"from":-25,"to":-14,"name":"\u82b1\u5e74\u6c9f"},
                {"from":-22,"to":-14,"name":"\u54d1\u5df4\u6c9f"},
                {"from":-24,"to":-14,"name":"\u9999\u693f\u6c9f"},
                {"from":-23,"to":-14,"name":"\u6770\u8fea\u6c9f"},
                {"from":-27,"to":-14,"name":"\u9ed1\u5cea\u6c9f"},
                {"from":-14,"to":-28,"name":""},
                {"from":-30,"to":-31,"name":""},
                {"from":-29,"to":-30,"name":""},
                {"from":-34,"to":-29,"name":""},
                {"from":-31,"to":-26,"name":"\u74dc\u54b1\u6c9f"},
                {"from":-32,"to":-33,"name":""},
                {"from":-33,"to":-26,"name":"\u5927\u5ce1\u6c9f"},
                {"from":-35,"to":-32,"name":""},
                {"from":-36,"to":-26,"name":"\u5e99\u6c9f"},
                {"from":-28,"to":-26,"name":""},
                {"from":-37,"to":-26,"name":"\u6b66\u90fd\u5173\u6c9f"},
                {"from":-38,"to":-39,"name":""},
                {"from":-39,"to":-40,"name":""},
                {"from":-41,"to":-39,"name":"\u5357\u5c7f\u6c9f"},
                {"from":-26,"to":-42,"name":""},
                {"from":-42,"to":-38,"name":""},
                {"from":-45,"to":-38,"name":"\u6cb3\u5357\u6c9f"},
                {"from":-43,"to":-38,"name":"\u5be8\u5b50\u6c9f"},
                {"from":-46,"to":-38,"name":"\u7f57\u5bb6\u5cea"},
                {"from":-44,"to":-38,"name":"\u4e09\u773c\u5c7f"}
            ]}
    );

    function nodeClicked(e, obj) {  // 由单双击处理程序实施
        var evt = e.copy();
        var nodeOrLink = obj.part;
        var type = evt.clickCount === 2 ? "Double-Clicked: " : "Clicked: ";
        // var msg =  nodeOrLink.data.id + ". ";
        // document.getElementById("myStatus").textContent = msg;

        document.getElementById("Info").style.display = "none";
        document.getElementById("list1").style.display = "none";
        document.getElementById("nodeDetail").style.display = "block";
        document.getElementById("menuStation").style.display = "block";
        document.getElementById("showId").value = "";
        document.getElementById("showFrom").value = "";
        document.getElementById("showTo").value = "";
        document.getElementById("menu2").style.display = "block";
        document.getElementById("menu3").style.display = "block";

        if(nodeOrLink.data.id){//判断并获取id
            document.getElementById("showId").value = nodeOrLink.data.id;
        }else {
            document.getElementById("showId").placeholder="待输入";
        }

        if(nodeOrLink instanceof go.Link){//连线
            document.getElementById("menuStation").style.display = "none";
            if(nodeOrLink.fromNode.id){//获取id
                document.getElementById("showFrom").value = nodeOrLink.fromNode.id;
            }else {
                document.getElementById("showFrom").placeholder="待上游对象输入";
            }

            if(nodeOrLink.toNode.id){//获取id
                document.getElementById("showTo").value = nodeOrLink.toNode.id;
            }else {
                document.getElementById("showTo").placeholder="待下游对象输入";
            }
        }else if(nodeOrLink instanceof go.Node){//节点
            // document.getElementById("showFrom").value = nodeOrLink.findNodesInto().id;
            // document.getElementById("showTo").value = nodeOrLink.findNodesOutOf().id;
            document.getElementById("menuStation").style.display = "block";
            document.getElementById("menu2").style.display = "none";
            document.getElementById("menu3").style.display = "none";
        }
        // document.getElementById("showFrom").value = node.fromNode.id;
        // document.getElementById("showTo").value = node.toNode.id;

    }

    myDiagram.groupTemplate =
        $(go.Group, "Vertical",
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Auto",
                $(go.Shape, "Rectangle",  // 围绕着占位符Placeholder
                    { parameter1: 14,
                        fill: "rgba(128,128,128,0.33)"
                    },
                    ),
                $(go.Placeholder,    //占位符,表示所有构件的面积，
                    { padding: 5})  // 添加内边距
            ),
            $(go.TextBlock,         // group title
                {
                    alignment: go.Spot.Right,
                    font: "Bold 12pt Sans-Serif" ,
                    editable:true,
                },
                new go.Binding("text", "name"),
            )
        );

    myDiagram.linkTemplate =//连线模板
        $(go.Link,
            {
                routing: go.Link.AvoidsNodes,// 连线绕开节点
                contextClick: nodeClicked,
                click: nodeClicked,
                doubleClick: nodeClicked,
                contextMenu:
                    $("ContextMenu",//直接设定的默认右键菜单
                        $("ContextMenuButton",
                            $(go.TextBlock, "匹配数据"),
                            { click: propertySave }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "基本信息"),
                            { click: info }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "模型管理"),
                            { click: showlist1 }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "模型计算"),
                            { click: test }),
                        $("ContextMenuButton",
                            $(go.TextBlock, "删除"),
                            { click: menuDelete }),
                    ),

            },

            $(go.Shape, {
                    strokeWidth: 5, //节点连线宽度
                    stroke: "#57CFE3", //节点连线颜色
                    opacity:0.45,
                },
                new go.Binding("stroke", "color")),
            $(go.Shape, {
                toArrow: "Standard", //箭头
                scale: 2, //箭头放大倍数
                fill: "#57CFE3", //箭头填充色
                stroke: null,
                opacity:0.45,
            }),
            new go.Binding("id"),//控制台警告

            $(go.TextBlock, "未命名",  // the label text
                {
                    editable:true,
                    segmentOffset: new go.Point(0, -12),
                },
                // editing the text automatically updates the model data
                new go.Binding("text","name").makeTwoWay(),
            ),
        );

    //添加简单连线模板，简易表示所属关系
    myDiagram.linkTemplateMap.add("Link1",
        $(go.Link,
            {

            },
            $(go.Shape, {//线体的外观
                    // strokeWidth: 5, //节点连线宽度
                    // stroke: "#57CFE3", //节点连线颜色
                    opacity:0.45,
                },
                new go.Binding("stroke", "color")),
            $(go.Shape, {//箭头外观
                toArrow: "Standard", //箭头
                // scale: 2, //箭头放大倍数
                // fill: "#57CFE3", //箭头填充色
                stroke: null,
                opacity:0.45,
            }),

        )
    )

    // a shared Robot that can be used by all commands for this one Diagram
    robot = new Robot(myDiagram);  // defined in Robot.js
    // initialize the Palette that is on the left side of the page

    myPalette =//左侧模板栏
        $(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
            {
                nodeTemplateMap: myDiagram.nodeTemplateMap,  // 同myDiagram共用一种node节点模板
                model: new go.GraphLinksModel([  // 初始化Palette面板里的内容
                    { category: "Reservoir", text: "水库",source:"img/Reservoir.png", name:"水库" },
                    { category: "RainfallStation", text: "雨量站", source:"img/RainfallStation.png", name:"雨量站" },
                    { category: "HydrologicalStation", text: "水文站", source:"img/HydrologicalStation.png", name:"水文站" },
                    { category: "HydropowerStation", text: "水电站", source:"img/HydropowerStation.png", name:"水电站" },
                    { category: "WeatherStation", text: "气象站", source:"img/WeatherStation.svg", name:"气象站" },
                    { category: "Boundary", text: "子流域单元", source:"img/Boundary.png", name:"子流域单元" },
                    { category: "DPObject", text: "防灾对象", source:"img/DPObject.svg", name:"防灾对象" },
                    { category: "CrossSectionV", text: "河道断面(竖)", source:"img/CrossSection.png", name:"河道断面(竖)" },
                    { category: "CrossSectionL", text: "河道断面(横)", source:"img/CrossSection.png", name:"河道断面(横)" },
                    { category: "Text", text: "文本框", source:"img/CrossSection.png", name:"文本框" },
                    { category: "LandslidePoint", text: "滑坡危险点", source:"img/LandslidePoint.svg", name:"滑坡危险点" },
                    { category: "Bridge", text: "桥", source:"img/Bridge.svg", name:"桥" },
                ])
            });

    myDiagram.addDiagramListener("BackgroundSingleClicked", function(e) {
        document.getElementById("nodeDetail").style.display = "none";
    })

    myOverview =
        $(go.Overview, "myOverviewDiv",  // the HTML DIV element for the Overview
            {
                observed: myDiagram,
                contentAlignment: go.Spot.Center,
                'box.resizable': true,
            });

}

function deleteSelection() {
    // 模拟按Delete按键
    robot.keyDown("Del");
    robot.keyUp("Del");
    // Alternatively you could invoke the Delete command directly:
    // myDiagram.commandHandler.deleteSelection();
}
if(window.init) {init();}


function menuDelete(){//删除选中
    if (myDiagram.commandHandler.canDeleteSelection()) {
        myDiagram.commandHandler.deleteSelection();
        return;
    }
}

function propertySave() {//对应数据匹配

    var node=myDiagram.selection.first();//获取选中节点或连线
    if(node instanceof go.Node){//尝试获取修改属性
        var id=document.getElementById("showId").value;
        myDiagram.model.setDataProperty(node.data, "id", id);
    }else if(node instanceof go.Link){//获取选中的连线
        // var from=document.getElementById("showFrom").value;
        // var to=document.getElementById("showTo").value;
        id = document.getElementById("showId").value;
        myDiagram.model.setDataProperty(node.data, "id", id);
    }
}


function info(){//基本信息功能
    var obj=myDiagram.selection.first();

    document.getElementById("infoName").value=obj.data.name;

    if(obj instanceof go.Link){//连线
        var elements1,elements2,elements3

        document.getElementById("nodeDetail").style.display = "none"
        document.getElementById("Info").style.display = "block"

        elements1 = document.getElementsByClassName("infoRiver");
        Array.prototype.forEach.call(elements1, function (element) {
            element.style.display = "block";
        });
        elements2 = document.getElementsByClassName("infoStation");
        Array.prototype.forEach.call(elements2, function (element) {
            element.style.display = "none";
        });
        elements3 = document.getElementsByClassName("infoBasin");
        Array.prototype.forEach.call(elements3, function (element) {
            element.style.display = "none";
        });

        document.getElementById("infoId").value=document.getElementById("showId").value;

        var checked = $("input[name='inputObjType']:checked").val();
        if(checked==="1"){
            document.getElementById("infoType").value="河流";
        }else if(checked==="2"){
            document.getElementById("infoType").value="测站";
        }else if(checked==="3"){
            document.getElementById("infoType").value="子流域";
        }

    }
    else if(obj instanceof go.Node){//节点
        document.getElementById("nodeDetail").style.display = "none"
        document.getElementById("Info").style.display = "block"

        elements1 = document.getElementsByClassName("infoRiver");
        Array.prototype.forEach.call(elements1, function (element) {
            element.style.display = "none";
        });
        elements2 = document.getElementsByClassName("infoStation");
        Array.prototype.forEach.call(elements2, function (element) {
            element.style.display = "block";
        });
        elements3 = document.getElementsByClassName("infoBasin");
        Array.prototype.forEach.call(elements3, function (element) {
            element.style.display = "none";
        });

        document.getElementById("infoId").value=document.getElementById("showId").value;
        checked = $("input[name='inputObjType']:checked").val();
        if(checked==="1"){
            document.getElementById("infoType").value="河流";
        }else if(checked==="2"){
            document.getElementById("infoType").value="测站";
        }else if(checked==="3"){
            document.getElementById("infoType").value="子流域";
        }
    }

}
function test(){
    window.alert("敬请期待")
}

function coming(){

}

function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}
function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}


function showlist1(){
    document.getElementById("nodeDetail").style.display = "none";
    document.getElementById("Info").style.display = "none";
    document.getElementById("list1").style.display = "block";
}

function topoGraphBTN(obj) {
    let id = obj.id;
    if (id === "topoGraphBTN1") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u4ee3\u53e4\u5bfa\u6c34\u7535\u7ad9\",\"key\":-4,\"loc\":\"-115.333251953125 -286.6666717529297\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-5,\"loc\":\"-284 -298.00001525878906\",\"name\":\"\u4ee3\u53e4\u5bfa\u6c34\u7535\u7ad9\u4ee5\u4e0a\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u533a\u74e6\u56db\u7ea7\u6c34\u7535\u7ad9\",\"key\":-3,\"loc\":\"-114.5 -149.63879699707024\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-6,\"loc\":\"44 -267.3333282470703\",\"name\":\"\u9ed1\u6c34\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-7,\"loc\":\"-467.33331298828125 -203.33334350585938\",\"name\":\"\u5934\u6c9f\u575d\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u6eaa\u85cf\u6c34\u7535\u7ad9\",\"key\":-8,\"loc\":\"-388.6666564941406 -92.6666259765625\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-9,\"loc\":\"-576.6666412353516 -147.3333282470703\",\"name\":\"\u6eaa\u85cf\u6c34\u7535\u7ad9\u4e0a\u6e38\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"(\u5c0f)\u7acb\u8282\u6c34\u7535\u7ad9\",\"key\":-10,\"loc\":\"-115.33331298828125 -2.000030517578125\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-11,\"loc\":\"-239.33334350585938 -15.33331298828125\",\"name\":\"\u9664\u74e6\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-12,\"loc\":\"38.6666259765625 -120.66665649414062\",\"name\":\"\u5927\u7acb\u8282\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5927\u5bb9\u7acb\u8282\u6c34\u7535\u7ad9\",\"key\":-13,\"loc\":\"-116.33331298828125 128\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u559c\u513f\u6c9f\u6c34\u7535\u7ad9\",\"key\":-14,\"loc\":\"-116.8255844116211 492.57724914550784\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u6cb9\u623f\u4e8c\u7ea7\u6c34\u7535\u7ad9\",\"key\":-15,\"loc\":\"-319.6666564941406 201.00006103515625\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5361\u623f\u5b50\u6c34\u7535\u7ad9\",\"key\":-16,\"loc\":\"-509.66668701171875 75.66668701171875\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-17,\"loc\":\"-728 -0.33331298828125\",\"name\":\"\u5361\u623f\u5b50\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5927\u5c7f\u5c11\u4e0b\u4e00\u7ea7\u6c34\u7535\u7ad9\",\"key\":-18,\"loc\":\"-633.3333435058594 175.66668701171875\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5361\u5b50\u6865\u6c34\u7535\u7ad9\",\"key\":-19,\"loc\":\"-876.6666717529297 173.66665649414062\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-20,\"loc\":\"-875.9999847412109 21.666671752929688\",\"name\":\"\u5361\u5b50\u6865\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-21,\"loc\":\"-304.66656494140625 485.66668701171875\",\"name\":\"\u62c9\u5c15\u6c9f\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-22,\"loc\":\"54.33332824707031 305.3333435058594\",\"name\":\"\u54d1\u5df4\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-23,\"loc\":\"358.33349609375 485.0000305175781\",\"name\":\"\u6770\u8fea\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-24,\"loc\":\"249.6669921875 415.0000915527344\",\"name\":\"\u9999\u693f\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-25,\"loc\":\"-4.9999847412109375 220.0000762939453\",\"name\":\"\u82b1\u5e74\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-27,\"loc\":\"130.33326721191406 595.3333282470703\",\"name\":\"\u9ed1\u5cea\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u9501\u513f\u5934\u6c34\u7535\u7ad9\",\"key\":-26,\"loc\":\"-120.33331298828125 1037.6666259765625\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u51c9\u98ce\u58f3\u6c34\u7535\u7ad9\",\"key\":-28,\"loc\":\"-117 691\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u74dc\u54b1\u6c9f\u4e00\u7ea7\u6c34\u7535\u7ad9\",\"key\":-29,\"loc\":\"-429.6666259765625 568.3333740234375\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u74dc\u54b1\u6c9f\u4e8c\u7ea7\u6c34\u7535\u7ad9\",\"key\":-30,\"loc\":\"-427 720.9999694824219\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u74dc\u54b1\u6c9f\u4e09\u7ea7\u6c34\u7535\u7ad9\",\"key\":-31,\"loc\":\"-426.333251953125 854.9999694824219\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u591a\u62c9\u4e8c\u7ea7\u6c34\u7535\u7ad9\",\"key\":-32,\"loc\":\"-686.3333129882812 713.6666564941406\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u78e8\u6c9f\u4e8c\u7ea7\u6c34\u7535\u7ad9\",\"key\":-33,\"loc\":\"-682.9999694824219 954.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-34,\"loc\":\"-740.3332977294922 565.4227050781246\",\"name\":\"\u74dc\u54b1\u6c9f\u4e00\u7ea7\u6c34\u7535\u7ad9\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-35,\"loc\":\"-866.3333129882812 712.756048583984\",\"name\":\"\u591a\u62c9\u4e8c\u7ea7\u6c34\u7535\u7ad9\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-36,\"loc\":\"-871.6666717529297 819.6666870117188\",\"name\":\"\u5e99\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-37,\"loc\":\"197.3333740234375 730.6666870117188\",\"name\":\"\u6b66\u90fd\u5173\u5c71\u6d2a\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u864e\u5bb6\u5d16\u6c34\u7535\u7ad9\",\"key\":-38,\"loc\":\"-118.6666259765625 1380.9999389648438\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5357\u5c7f\u6c34\u7535\u7ad9\",\"key\":-39,\"loc\":\"-118.6666259765625 1526.0000610351562\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u4e24\u6cb3\u53e3\u6c34\u7535\u7ad9\",\"key\":-40,\"loc\":\"-117.333251953125 1662.6666870117188\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-41,\"loc\":\"-545.8333435058594 1465.4227661132809\",\"name\":\"\u5357\u5c7f\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"HydrologicalStation\",\"text\":\"\u6c34\u6587\u7ad9\",\"source\":\"img/HydrologicalStation.png\",\"name\":\"\u821f\u66f2\u6c34\u6587\u7ad9\",\"key\":-42,\"loc\":\"-121.33331298828125 1219\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-43,\"loc\":\"28.6668701171875 1240\",\"name\":\"\u5be8\u5b50\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-44,\"loc\":\"278.000244140625 1226.6666564941406\",\"name\":\"\u4e09\u773c\u5c7f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-45,\"loc\":\"-510 1249.3333435058594\",\"name\":\"\u6cb3\u5357\u6c9f\u4ea7\u6c47\u6d41\u533a\u95f4\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u754c\",\"source\":\"img/Boundary.png\",\"key\":-46,\"loc\":\"333.3333740234375 1500.0000305175781\",\"name\":\"\u7f57\u5bb6\u5cea\u4ea7\u6c47\u6d41\u533a\u95f4\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-5,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-4,\"to\":-3,\"name\":\"\"},\n" +
            "{\"from\":-6,\"to\":-3,\"name\":\"\u9ed1\u6c34\u6c9f\"},\n" +
            "{\"from\":-7,\"to\":-3,\"name\":\"\u5934\u6c9f\u575d\"},\n" +
            "{\"from\":-8,\"to\":-3,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-3,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-3,\"name\":\"\u9664\u74e6\u6c9f\"},\n" +
            "{\"from\":-12,\"to\":-10,\"name\":\"\u5927\u7acb\u8282\u6c9f\"},\n" +
            "{\"from\":-10,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-13,\"to\":-14,\"name\":\"\"},\n" +
            "{\"from\":-15,\"to\":-14,\"name\":\"\u5927\u5cea\u6c9f\\n\"},\n" +
            "{\"from\":-17,\"to\":-16,\"name\":\"\"},\n" +
            "{\"from\":-16,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-18,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-19,\"to\":-18,\"name\":\"\"},\n" +
            "{\"from\":-20,\"to\":-19,\"name\":\"\"},\n" +
            "{\"from\":-21,\"to\":-14,\"name\":\"\u62c9\u5c15\u6c9f\"},\n" +
            "{\"from\":-25,\"to\":-14,\"name\":\"\u82b1\u5e74\u6c9f\"},\n" +
            "{\"from\":-22,\"to\":-14,\"name\":\"\u54d1\u5df4\u6c9f\"},\n" +
            "{\"from\":-24,\"to\":-14,\"name\":\"\u9999\u693f\u6c9f\"},\n" +
            "{\"from\":-23,\"to\":-14,\"name\":\"\u6770\u8fea\u6c9f\"},\n" +
            "{\"from\":-27,\"to\":-14,\"name\":\"\u9ed1\u5cea\u6c9f\"},\n" +
            "{\"from\":-14,\"to\":-28,\"name\":\"\"},\n" +
            "{\"from\":-30,\"to\":-31,\"name\":\"\"},\n" +
            "{\"from\":-29,\"to\":-30,\"name\":\"\"},\n" +
            "{\"from\":-34,\"to\":-29,\"name\":\"\"},\n" +
            "{\"from\":-31,\"to\":-26,\"name\":\"\u74dc\u54b1\u6c9f\"},\n" +
            "{\"from\":-32,\"to\":-33,\"name\":\"\"},\n" +
            "{\"from\":-33,\"to\":-26,\"name\":\"\u5927\u5ce1\u6c9f\"},\n" +
            "{\"from\":-35,\"to\":-32,\"name\":\"\"},\n" +
            "{\"from\":-36,\"to\":-26,\"name\":\"\u5e99\u6c9f\"},\n" +
            "{\"from\":-28,\"to\":-26,\"name\":\"\"},\n" +
            "{\"from\":-37,\"to\":-26,\"name\":\"\u6b66\u90fd\u5173\u6c9f\"},\n" +
            "{\"from\":-38,\"to\":-39,\"name\":\"\"},\n" +
            "{\"from\":-39,\"to\":-40,\"name\":\"\"},\n" +
            "{\"from\":-41,\"to\":-39,\"name\":\"\u5357\u5c7f\u6c9f\"},\n" +
            "{\"from\":-26,\"to\":-42,\"name\":\"\"},\n" +
            "{\"from\":-42,\"to\":-38,\"name\":\"\"},\n" +
            "{\"from\":-45,\"to\":-38,\"name\":\"\u6cb3\u5357\u6c9f\"},\n" +
            "{\"from\":-43,\"to\":-38,\"name\":\"\u5be8\u5b50\u6c9f\"},\n" +
            "{\"from\":-46,\"to\":-38,\"name\":\"\u7f57\u5bb6\u5cea\"},\n" +
            "{\"from\":-44,\"to\":-38,\"name\":\"\u4e09\u773c\u5c7f\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }else if (id === "topoGraphBTN2") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u4ee3\u53e4\u5bfa\u6c34\u7535\u7ad9\",\"key\":-4,\"loc\":\"-425.00006103515625 -792.0000076293945\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+600\",\"key\":-9,\"loc\":\"-425 -645.9999694824219\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9ed1\u6c34\u6c9f\u5c0f\u6d41\u57df\",\"key\":-6,\"loc\":\"-291.9998779296875 -655.6666564941406\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9664\u74e6\u6c9f\u5c0f\u6d41\u57df\",\"key\":-5,\"loc\":\"-553.3143546557201 -549.4227127075196\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+7800\",\"key\":-7,\"loc\":\"-425.82184150002536 -539.9999694824219\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u5df4\u85cf\u6751\",\"key\":-8,\"loc\":\"-293.9998779296875 -405.333251953125\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+9800\",\"key\":-10,\"loc\":\"-425.9999694824219 -406.33331298828125\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5927\u7acb\u8282\u6c9f\u5c0f\u6d41\u57df\",\"key\":-11,\"loc\":\"-289.2792683611076 -160.75602569580076\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+12200\",\"key\":-12,\"loc\":\"-429.3334045410156 -150.66656494140625\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5927\u7acb\u8282\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-13,\"loc\":\"-568.7178982230535 -189.59589900082284\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5317\u5c71\u6ed1\u5761\u6c9f\u5c0f\u6d41\u57df\",\"key\":-14,\"loc\":\"-301.66668701171875 56.666748046875\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+15600\",\"key\":-15,\"loc\":\"-428.4735794760993 66.8376446958564\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5927\u5cea\u6c9f\u5c0f\u6d41\u57df\",\"key\":-16,\"loc\":\"-549.4752884604743 178.33343505859375\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+16200\",\"key\":-17,\"loc\":\"-425.6666259765625 187.33331298828125\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u7acb\u8282\u9547\",\"key\":-18,\"loc\":\"-284.66656494140625 187.66683959960938\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u82b1\u5e74\u6c9f\u5c0f\u6d41\u57df\",\"key\":-20,\"loc\":\"-312.4626541831303 294.75629272460935\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+18000\",\"key\":-21,\"loc\":\"-426.16650390625 304.35650116829567\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u54d1\u5df4\u6c9f\u5c0f\u6d41\u57df\",\"key\":-22,\"loc\":\"-311.00006103515625 387.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u62c9\u5c15\u6c9f\uff08\u7acb\u62c9\u6bb5\uff09\u5c0f\u6d41\u57df\",\"key\":-23,\"loc\":\"-556.7000610351563 385.066830444336\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+19000\",\"key\":-24,\"loc\":\"-428.01678463363896 397.9645139695583\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u6770\u8fea\u6c9f\u5c0f\u6d41\u57df\",\"key\":-25,\"loc\":\"-304.33331298828125 645.9999694824219\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+22800\",\"key\":-26,\"loc\":\"-430.16656494140625 655.8356226519925\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9999\u693f\u6c9f\u5c0f\u6d41\u57df\",\"key\":-27,\"loc\":\"-306.9998779296875 732.6665954589844\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+26800\",\"key\":-28,\"loc\":\"-428.99993896484375 741.6666564941406\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9ed1\u5cea\u6c9f\u5c0f\u6d41\u57df\",\"key\":-29,\"loc\":\"-240.20264729099472 875.3334045410157\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u61a8\u73ed\u62c9\u5c15\u6c9f\u5c0f\u6d41\u57df\",\"key\":-31,\"loc\":\"-531.6666870117188 877.3335571289062\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+30200\",\"key\":-30,\"loc\":\"-426.40010375976556 885.7333831787109\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u9ed1\u5cea\u6c9f\",\"key\":-33,\"loc\":\"-285.33331298828125 993.0000305175781\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u51c9\u98ce\u58f3\",\"key\":-34,\"loc\":\"-260.33331298828125 1252.3334350585938\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+38200\",\"key\":-35,\"loc\":\"-429.33319091796875 1251.666748046875\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u821f\u66f2\u65b0\u57ce\u533a\",\"key\":-37,\"loc\":\"-270.06660156250007 1730.0668197631835\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+44400\",\"key\":-38,\"loc\":\"-430.9333984374998 1729.299948120117\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u74dc\u54b1\u6c9f\u5c0f\u6d41\u57df\",\"key\":-39,\"loc\":\"-543.0333740234377 1460.33338470459\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+42600\",\"key\":-40,\"loc\":\"-429.00006103515625 1470.333445739746\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u821f\u66f2\u65b0\u57ce\u533a\u4e00\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-41,\"loc\":\"-598.2000000000004 1544.6334197998046\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u821f\u66f2\u65b0\u57ce\u533a\u4e09\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-42,\"loc\":\"-668.3710371835729 1718.022841644287\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u821f\u66f2\u65b0\u57ce\u533a\u56db\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-43,\"loc\":\"-644.5378737314244 1795.822921752929\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u821f\u66f2\u65b0\u57ce\u533a\u4e8c\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-44,\"loc\":\"-642.2667266845701 1625.2000160217287\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u6b66\u90fd\u5173\u6c9f\u5c0f\u6d41\u57df\",\"key\":-45,\"loc\":\"-293.66668701171875 1886.9999694824219\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+47800\",\"key\":-46,\"loc\":\"-432.2999786376953 1896.7000518798827\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5927\u5ce1\u6c9f\u5c0f\u6d41\u57df\",\"key\":-47,\"loc\":\"-568.2042342050572 1984.6667175292969\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+48800\",\"key\":-48,\"loc\":\"-431.333251953125 1995.0000305175781\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5e99\u6c9f\u5c0f\u6d41\u57df\",\"key\":-49,\"loc\":\"-573.6666870117188 2092.666748046875\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+52000\",\"key\":-50,\"loc\":\"-431 2103.0000610351562\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u9501\u513f\u5934\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-51,\"loc\":\"-428.9998779296875 2217.333251953125\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5be8\u5b50\u6c9f\u5c0f\u6d41\u57df\",\"key\":-52,\"loc\":\"-298.830322265625 2456.089483642578\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+56800\",\"key\":-53,\"loc\":\"-431.33343505859375 2464.0000610351562\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u4e09\u773c\u5cea\u5c0f\u6d41\u57df\",\"key\":-54,\"loc\":\"-232 2572.000030517578\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u821f\u66f2\u8001\u57ce\u533a\",\"key\":-56,\"loc\":\"-638.5069014413856 2639.0333038330077\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+58000\",\"key\":-57,\"loc\":\"-431.5401717050572 2638.7560791015626\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u7f57\u5bb6\u5cea\u5c0f\u6d41\u57df\",\"key\":-58,\"loc\":\"-283.7335205078125 2765.600018310547\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+58800\",\"key\":-55,\"loc\":\"-431.3333740234375 2876\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u6cb3\u5357\u6c9f\u5c0f\u6d41\u57df\",\"key\":-59,\"loc\":\"-571.86669921875 2866.4000556945803\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"5\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-60,\"loc\":\"-575.9999389648438 3048.6666870117188\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"4\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-61,\"loc\":\"-576.9999389648438 2950\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+60800\",\"key\":-62,\"loc\":\"-431.36664428710935 2959.666748046875\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+61800\",\"key\":-63,\"loc\":\"-432.20685871677597 3059.0000610351562\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"1\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-64,\"loc\":\"-285.87324055271347 3248.3333740234375\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+63200\",\"key\":-65,\"loc\":\"-433.5378523691197 3257.666748046875\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"3\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-67,\"loc\":\"-585.8333770751954 3418.1333129882814\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+65200\",\"key\":-68,\"loc\":\"-436.5746877178191 3427.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+66400\",\"key\":-69,\"loc\":\"-436.8413350566865 3529.0000610351562\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5357\u5cea\u6c9f\u5c0f\u6d41\u57df\",\"key\":-70,\"loc\":\"-586.6079823955536 3519.400042724609\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u5357\u5cea\u6751\",\"key\":-71,\"loc\":\"-282.5745656475067 3529\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5357\u5cea\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-72,\"loc\":\"-437.6206502704621 3931.1244990234372\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"2\u53f7\u6c9f\u5c0f\u6d41\u57df\",\"key\":-73,\"loc\":\"-283.83233642578125 4285.489810595704\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+70000\",\"key\":-74,\"loc\":\"-437.99993896484375 4293.4004795410165\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u4e24\u6cb3\u53e3\",\"key\":-76,\"loc\":\"-590.6665649414062 4546.000152587891\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+74600\",\"key\":-77,\"loc\":\"-437 4546.333404541016\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5cb7\u6c5f\u6d41\u57df\",\"key\":-78,\"loc\":\"-290.8334167480467 4537.600048828125\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u77f3\u95e8\u576a\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-79,\"loc\":\"-437.3333740234375 4676.333404541016\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+44000\",\"key\":-80,\"loc\":\"-429.55006103515643 1555.7833595275886\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+44200\",\"key\":-81,\"loc\":\"-430.88337402343757 1633.2833740234382\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+45000\",\"key\":-82,\"loc\":\"-431.5166015625001 1802.6166870117197\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5927\u7acb\u8282\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-83,\"loc\":\"-428 -274\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u559c\u513f\u6c9f\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-84,\"loc\":\"-429.33331298828125 513.3334045410156\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+14800\",\"key\":-85,\"loc\":\"-428.99993896484375 -30.666748046875\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+11800\",\"key\":-86,\"loc\":\"-426 -331.6666259765625\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+12000\",\"key\":-87,\"loc\":\"-428.6665954589844 -212.33331298828125\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+19800\",\"key\":-88,\"loc\":\"-428.6666259765625 459.3333435058594\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+20000\",\"key\":-89,\"loc\":\"-429.666748046875 572.3333740234375\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u559c\u513f\u6c9f\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-90,\"loc\":\"-591.0199216416391 989.4374897261373\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+32000\",\"key\":-91,\"loc\":\"-431 989.3334197998047\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u51c9\u98ce\u58f3\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-92,\"loc\":\"-430.33331298828125 1134.3333129882812\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+33800\",\"key\":-93,\"loc\":\"-431 1081.6666717529297\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+34000\",\"key\":-94,\"loc\":\"-430.33331298828125 1192.3333740234375\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u51c9\u98ce\u58f3\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-95,\"loc\":\"-562.9999694824219 1355.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+39200\",\"key\":-96,\"loc\":\"-428.9987487792969 1356.2431083679203\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+53600\",\"key\":-97,\"loc\":\"-432 2162.3333435058594\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+53800\",\"key\":-98,\"loc\":\"-430.8329860801814 2277.834067489579\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u9501\u513f\u5934\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-99,\"loc\":\"-530.3333129882812 2358.3333435058594\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+56400\",\"key\":-100,\"loc\":\"-429.4997341270564 2358.5006934661415\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u864e\u5bb6\u5d16\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-101,\"loc\":\"-432 3117\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+62000\",\"key\":-102,\"loc\":\"-433.6666259765625 3177\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u864e\u5bb6\u5d16\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-103,\"loc\":\"-590.9999389648438 3127\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+64200\",\"key\":-104,\"loc\":\"-434.33331298828125 3349.0000610351562\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+66600\",\"key\":-105,\"loc\":\"-436.62058923530583 3877.7911249999997\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+66800\",\"key\":-106,\"loc\":\"-437.9540242938996 3993.124468505859\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u5357\u5cea\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-107,\"loc\":\"-553.7636741431961 4058.977976183361\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+67600\",\"key\":-108,\"loc\":\"-437.33331298828125 4059.7337620117187\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u4e24\u6cb3\u53e3\u6c34\u7535\u7ad9\u5927\u575d\",\"key\":-109,\"loc\":\"-436.33331298828125 4172.067075\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+68000\",\"key\":-110,\"loc\":\"-435.33331298828125 4115.067105517578\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+68200\",\"key\":-111,\"loc\":\"-438 4232.40041850586\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u4e24\u6cb3\u53e3\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-112,\"loc\":\"-578.3022342896109 4404.853423358127\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+71600\",\"key\":-113,\"loc\":\"-437.0056687120609 4405.488925585938\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+77000\",\"key\":-114,\"loc\":\"-437.572619272868 4738.42279663086\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+76800\",\"key\":-115,\"loc\":\"-437.57158167521175 4615.845623779298\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u77f3\u95e8\u576a\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-116,\"loc\":\"-562.7380355918731 4821.124007514765\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+78400\",\"key\":-117,\"loc\":\"-438.3333740234375 4880.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u767d\u9f99\u6c5f\u4e0a\u6e38\u6d41\u57df\",\"key\":-118,\"loc\":\"-651.3871008585188 -800.756086730957\"},\n" +
            "{\"category\":\"LandslidePoint\",\"text\":\"\u6ed1\u5761\u5371\u9669\u70b9\",\"source\":\"img/LandslidePoint.svg\",\"name\":\"\u6c5f\u9876\u5d16\u6ed1\u5761\u5371\u9669\u70b9\",\"key\":-119,\"loc\":\"-317.59078853686276 3877.545415630736\"},\n" +
            "{\"category\":\"Bridge\",\"text\":\"\u6865\",\"source\":\"img/Bridge.svg\",\"name\":\"\u5357\u5cea\u5927\u6865\",\"key\":-120,\"loc\":\"-331 3712.3333644866943\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-4,\"to\":-9,\"name\":\"\"},\n" +
            "{\"from\":-6,\"to\":-9,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-12,\"name\":\"\"},\n" +
            "{\"from\":-14,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-15,\"to\":-17,\"name\":\"\"},\n" +
            "{\"from\":-16,\"to\":-17,\"name\":\"\"},\n" +
            "{\"from\":-20,\"to\":-21,\"name\":\"\"},\n" +
            "{\"from\":-23,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-22,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-21,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-25,\"to\":-26,\"name\":\"\"},\n" +
            "{\"from\":-27,\"to\":-28,\"name\":\"\"},\n" +
            "{\"from\":-26,\"to\":-28,\"name\":\"\"},\n" +
            "{\"from\":-29,\"to\":-30,\"name\":\"\"},\n" +
            "{\"from\":-31,\"to\":-30,\"name\":\"\"},\n" +
            "{\"from\":-28,\"to\":-30,\"name\":\"\"},\n" +
            "{\"from\":-39,\"to\":-40,\"name\":\"\"},\n" +
            "{\"from\":-42,\"to\":-38,\"name\":\"\"},\n" +
            "{\"from\":-45,\"to\":-46,\"name\":\"\"},\n" +
            "{\"from\":-47,\"to\":-48,\"name\":\"\"},\n" +
            "{\"from\":-46,\"to\":-48,\"name\":\"\"},\n" +
            "{\"from\":-49,\"to\":-50,\"name\":\"\"},\n" +
            "{\"from\":-48,\"to\":-50,\"name\":\"\"},\n" +
            "{\"from\":-52,\"to\":-53,\"name\":\"\"},\n" +
            "{\"from\":-54,\"to\":-57,\"name\":\"\"},\n" +
            "{\"from\":-53,\"to\":-57,\"name\":\"\"},\n" +
            "{\"from\":-58,\"to\":-57,\"name\":\"\"},\n" +
            "{\"from\":-57,\"to\":-55,\"name\":\"\"},\n" +
            "{\"from\":-59,\"to\":-55,\"name\":\"\"},\n" +
            "{\"from\":-55,\"to\":-62,\"name\":\"\"},\n" +
            "{\"from\":-62,\"to\":-63,\"name\":\"\"},\n" +
            "{\"from\":-60,\"to\":-63,\"name\":\"\"},\n" +
            "{\"from\":-61,\"to\":-62,\"name\":\"\"},\n" +
            "{\"from\":-64,\"to\":-65,\"name\":\"\"},\n" +
            "{\"from\":-67,\"to\":-68,\"name\":\"\"},\n" +
            "{\"from\":-70,\"to\":-69,\"name\":\"\"},\n" +
            "{\"from\":-68,\"to\":-69,\"name\":\"\"},\n" +
            "{\"from\":-73,\"to\":-74,\"name\":\"\"},\n" +
            "{\"from\":-78,\"to\":-77,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-30,\"to\":-33,\"name\":\"\"},\n" +
            "{\"from\":-35,\"to\":-34,\"name\":\"\"},\n" +
            "{\"from\":-38,\"to\":-37,\"name\":\"\"},\n" +
            "{\"from\":-57,\"to\":-56,\"name\":\"\"},\n" +
            "{\"from\":-69,\"to\":-71,\"name\":\"\"},\n" +
            "{\"from\":-77,\"to\":-76,\"name\":\"\"},\n" +
            "{\"from\":-40,\"to\":-80,\"name\":\"\"},\n" +
            "{\"from\":-80,\"to\":-81,\"name\":\"\"},\n" +
            "{\"from\":-81,\"to\":-38,\"name\":\"\"},\n" +
            "{\"from\":-41,\"to\":-80,\"name\":\"\"},\n" +
            "{\"from\":-44,\"to\":-81,\"name\":\"\"},\n" +
            "{\"from\":-43,\"to\":-82,\"name\":\"\"},\n" +
            "{\"from\":-38,\"to\":-82,\"name\":\"\"},\n" +
            "{\"from\":-82,\"to\":-46,\"name\":\"\"},\n" +
            "{\"from\":-83,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-13,\"to\":-85,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-85,\"name\":\"\"},\n" +
            "{\"from\":-85,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-86,\"name\":\"\"},\n" +
            "{\"from\":-86,\"to\":-83,\"name\":\"\"},\n" +
            "{\"from\":-83,\"to\":-87,\"name\":\"\"},\n" +
            "{\"from\":-87,\"to\":-12,\"name\":\"\"},\n" +
            "{\"from\":-17,\"to\":-18,\"name\":\"\"},\n" +
            "{\"from\":-17,\"to\":-21,\"name\":\"\"},\n" +
            "{\"from\":-24,\"to\":-88,\"name\":\"\"},\n" +
            "{\"from\":-88,\"to\":-84,\"name\":\"\"},\n" +
            "{\"from\":-84,\"to\":-89,\"name\":\"\"},\n" +
            "{\"from\":-84,\"to\":-90,\"name\":\"\"},\n" +
            "{\"from\":-89,\"to\":-26,\"name\":\"\"},\n" +
            "{\"from\":-30,\"to\":-91,\"name\":\"\"},\n" +
            "{\"from\":-90,\"to\":-91,\"name\":\"\"},\n" +
            "{\"from\":-94,\"to\":-35,\"name\":\"\"},\n" +
            "{\"from\":-92,\"to\":-94,\"name\":\"\"},\n" +
            "{\"from\":-91,\"to\":-93,\"name\":\"\"},\n" +
            "{\"from\":-93,\"to\":-92,\"name\":\"\"},\n" +
            "{\"from\":-35,\"to\":-96,\"name\":\"\"},\n" +
            "{\"from\":-96,\"to\":-40,\"name\":\"\"},\n" +
            "{\"from\":-92,\"to\":-95,\"name\":\"\"},\n" +
            "{\"from\":-95,\"to\":-96,\"name\":\"\"},\n" +
            "{\"from\":-50,\"to\":-97,\"name\":\"\"},\n" +
            "{\"from\":-97,\"to\":-51,\"name\":\"\"},\n" +
            "{\"from\":-51,\"to\":-98,\"name\":\"\"},\n" +
            "{\"from\":-51,\"to\":-99,\"name\":\"\"},\n" +
            "{\"from\":-98,\"to\":-100,\"name\":\"\"},\n" +
            "{\"from\":-100,\"to\":-53,\"name\":\"\"},\n" +
            "{\"from\":-99,\"to\":-100,\"name\":\"\"},\n" +
            "{\"from\":-63,\"to\":-101,\"name\":\"\"},\n" +
            "{\"from\":-101,\"to\":-102,\"name\":\"\"},\n" +
            "{\"from\":-102,\"to\":-65,\"name\":\"\"},\n" +
            "{\"from\":-65,\"to\":-104,\"name\":\"\"},\n" +
            "{\"from\":-104,\"to\":-68,\"name\":\"\"},\n" +
            "{\"from\":-101,\"to\":-103,\"name\":\"\"},\n" +
            "{\"from\":-103,\"to\":-104,\"name\":\"\"},\n" +
            "{\"from\":-69,\"to\":-105,\"name\":\"\"},\n" +
            "{\"from\":-105,\"to\":-72,\"name\":\"\"},\n" +
            "{\"from\":-72,\"to\":-106,\"name\":\"\"},\n" +
            "{\"from\":-72,\"to\":-107,\"name\":\"\"},\n" +
            "{\"from\":-106,\"to\":-108,\"name\":\"\"},\n" +
            "{\"from\":-107,\"to\":-108,\"name\":\"\"},\n" +
            "{\"from\":-110,\"to\":-109,\"name\":\"\"},\n" +
            "{\"from\":-108,\"to\":-110,\"name\":\"\"},\n" +
            "{\"from\":-109,\"to\":-111,\"name\":\"\"},\n" +
            "{\"from\":-111,\"to\":-74,\"name\":\"\"},\n" +
            "{\"from\":-74,\"to\":-113,\"name\":\"\"},\n" +
            "{\"from\":-113,\"to\":-77,\"name\":\"\"},\n" +
            "{\"from\":-109,\"to\":-112,\"name\":\"\"},\n" +
            "{\"from\":-112,\"to\":-113,\"name\":\"\"},\n" +
            "{\"from\":-77,\"to\":-115,\"name\":\"\"},\n" +
            "{\"from\":-115,\"to\":-79,\"name\":\"\"},\n" +
            "{\"from\":-79,\"to\":-114,\"name\":\"\"},\n" +
            "{\"from\":-114,\"to\":-117,\"name\":\"\"},\n" +
            "{\"from\":-79,\"to\":-116,\"name\":\"\"},\n" +
            "{\"from\":-116,\"to\":-117,\"name\":\"\"},\n" +
            "{\"from\":-118,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-119,\"to\":-105,\"name\":\"\"},\n" +
            "{\"from\":-69,\"to\":-120,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_1") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u5df4\u85cf\u6751\",\"key\":-7,\"loc\":\"94.3332290649414 24\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+8000\",\"key\":-9,\"loc\":\"-73.5000228881836 -111.57721862792971\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+11800\",\"key\":-4,\"loc\":\"-69.66668701171875 307.00006103515625\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+9800\",\"key\":-5,\"loc\":\"-72.3333740234375 25\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5df4\u85cf\u4e00\u53f7\u5c0f\u6d41\u57df\",\"key\":-8,\"loc\":\"233.66664505004883 151.08975830078123\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+10000\",\"key\":-10,\"loc\":\"-71.33331298828125 160.66668701171875\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u5df4\u85cf\u6751\u4e0a\u6e38\",\"key\":-11,\"loc\":\"-73.66650390625 -227.00001525878906\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-9,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-8,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-8,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-9,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_2") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u7acb\u8282\u9547\",\"key\":-10,\"loc\":\"46.588050842285156 527.6666145324707\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+14400\",\"key\":-9,\"loc\":\"-150.66668701171875 246\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+17600\",\"key\":-4,\"loc\":\"-150.3333740234375 690.0000610351562\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+16200\",\"key\":-5,\"loc\":\"-151.6666259765625 527.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5317\u5c71\u6ed1\u5761\u6c9f\u4e00\u53f7\u5c0f\u6d41\u57df\",\"key\":-7,\"loc\":\"47.33349609375 342.6666259765625\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5927\u5cea\u6c9f\u4e8c\u53f7\u5c0f\u6d41\u57df\",\"key\":-8,\"loc\":\"-295.99993896484375 518\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+15600\",\"key\":-11,\"loc\":\"-149.91182708740234 352.089453125\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u7acb\u8282\u9547\u4e0a\u6e38\",\"key\":-12,\"loc\":\"-150.45588302612305 129.21139068603514\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-9,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-8,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-9,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_3") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u9ed1\u5cea\u6c9f\",\"key\":-13,\"loc\":\"68.3333740234375 786.0000305175781\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+27800\",\"key\":-9,\"loc\":\"-185.66650390625 436\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+31800\",\"key\":-4,\"loc\":\"-188.99993896484375 921.9999389648438\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+30200\",\"key\":-5,\"loc\":\"-186.33331298828125 699.3333129882812\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9ed1\u5cea\u6c9f\u4e8c\u53f7\u5c0f\u6d41\u57df\",\"key\":-7,\"loc\":\"69.333251953125 643.3333435058594\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9ed1\u5cea\u6c9f\u4e09\u53f7\u5c0f\u6d41\u57df\",\"key\":-8,\"loc\":\"-327.3333740234375 688.6666564941406\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u9ed1\u5cea\u6c9f\u4e00\u53f7\u5c0f\u6d41\u57df\",\"key\":-10,\"loc\":\"14.166748046875 505.544711303711\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+29200\",\"key\":-11,\"loc\":\"-185.833251953125 516.2113372802735\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u9ed1\u5cea\u6c9f\u4e0a\u6e38\",\"key\":-12,\"loc\":\"-185.83331298828125 315.21135253906255\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-5,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-8,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-9,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_4") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u51c9\u98ce\u58f3\u4e09\u53f7\u6c9f\",\"key\":-22,\"loc\":\"23.3331298828125 925\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u51c9\u98ce\u58f3\u4e00\u53f7\u6c9f\",\"key\":-21,\"loc\":\"33.33331298828125 802.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u51c9\u98ce\u58f3\u56db\u53f7\u6c9f\",\"key\":-20,\"loc\":\"-316.6666564941406 1321.9999389648438\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u51c9\u98ce\u58f3\u4e8c\u53f7\u6c9f\",\"key\":-19,\"loc\":\"-345.7484359741211 701.4227584838866\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u51c9\u98ce\u58f3\",\"key\":-18,\"loc\":\"22.666748046875 1068.3334045410156\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+36800\",\"key\":-9,\"loc\":\"-170.99993896484375 712.0000076293945\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+39400\",\"key\":-8,\"loc\":\"-172.33331298828125 1332.0000610351562\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+38200\",\"key\":-10,\"loc\":\"-171.99993896484375 1068.3332824707031\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+37000\",\"key\":-11,\"loc\":\"-171.3333740234375 813\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+37800\",\"key\":-12,\"loc\":\"-171.66014099121094 936.089483642578\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u51c9\u98ce\u58f3\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-4,\"loc\":\"-315.6666259765625 1176.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+39200\",\"key\":-13,\"loc\":\"-171.6666259765625 1176.3333435058594\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+35200\",\"key\":-14,\"loc\":\"-168.6666259765625 640.3333282470703\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+42000\",\"key\":-15,\"loc\":\"-171.6666259765625 1409.3334350585938\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u51c9\u98ce\u58f3\u4e0a\u6e38\",\"key\":-16,\"loc\":\"-168.6666259765625 509.3333282470703\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-10,\"to\":-18,\"name\":\"\"},\n" +
            "{\"from\":-21,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-19,\"to\":-9,\"name\":\"\"},\n" +
            "{\"from\":-22,\"to\":-12,\"name\":\"\"},\n" +
            "{\"from\":-20,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-4,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-12,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-10,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-13,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-22,\"to\":-18,\"name\":\"\"},\n" +
            "{\"from\":-14,\"to\":-9,\"name\":\"\"},\n" +
            "{\"from\":-8,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-16,\"to\":-14,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_5") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"Boundary\",\"text\":\"子流域单元\",\"source\":\"img/Boundary.png\",\"name\":\"新城区四号沟\",\"key\":-30,\"loc\":\"-306.3334045410156 1632.3334045410156\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"子流域单元\",\"source\":\"img/Boundary.png\",\"name\":\"新城区三号沟\",\"key\":-29,\"loc\":\"-247.66668701171875 1486.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"子流域单元\",\"source\":\"img/Boundary.png\",\"name\":\"新城区二号沟\",\"key\":-28,\"loc\":\"-247.00027465820312 1342.333251953125\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"子流域单元\",\"source\":\"img/Boundary.png\",\"name\":\"新城区一号沟\",\"key\":-27,\"loc\":\"-307.6666259765625 1230.3333129882812\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"子流域单元\",\"source\":\"img/Boundary.png\",\"name\":\"瓜咱沟二号沟\",\"key\":-26,\"loc\":\"100.3333740234375 1041.6666564941406\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"子流域单元\",\"source\":\"img/Boundary.png\",\"name\":\"瓜咱沟一号沟\",\"key\":-25,\"loc\":\"-361.6666259765625 1057.0000305175781\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"防灾对象\",\"source\":\"img/DPObject.svg\",\"name\":\"舟曲新城区\",\"key\":-24,\"loc\":\"-764.6664123535156 1431.6665954589844\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+44400\",\"key\":-9,\"loc\":\"-109.3333740234375 1493.9999389648438\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+42200\",\"key\":-10,\"loc\":\"-105.33331298828125 955.9999694824219\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+47600\",\"key\":-11,\"loc\":\"-112 1718.6666259765625\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+43400\",\"key\":-12,\"loc\":\"-108.6666259765625 1163.3333435058594\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+42800\",\"key\":-13,\"loc\":\"-106.6666259765625 1052\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+44000\",\"key\":-14,\"loc\":\"-106 1240.3333435058594\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+44200\",\"key\":-15,\"loc\":\"-107.99993896484375 1351.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"河道断面(横)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+45000\",\"key\":-16,\"loc\":\"-110.99993896484375 1642.3333740234375\"},\n" +
            "{\"category\":\"Text\",\"text\":\"文本框\",\"source\":\"img/CrossSection.png\",\"name\":\"白龙江干流舟曲新城区上游\",\"key\":-17,\"loc\":\"-105.33333587646484 850.3333206176758\"},\n" +
            "{\"category\":\"WeatherStation\",\"text\":\"气象站\",\"source\":\"img/WeatherStation.svg\",\"name\":\"舟曲峰迭国家气象观测站\",\"key\":-5,\"loc\":\"216.3333740234375 1052.000015258789\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"水电站\",\"source\":\"img/HydropowerStation.png\",\"name\":\"瓜咱沟一级水电站\",\"key\":-4,\"loc\":\"-766.3333129882812 1065.3333129882812\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"水电站\",\"source\":\"img/HydropowerStation.png\",\"name\":\"瓜咱沟二级水电站\",\"key\":-19,\"loc\":\"-628.9999084472656 1066.0000305175781\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"水电站\",\"source\":\"img/HydropowerStation.png\",\"name\":\"瓜咱沟三级水电站\",\"key\":-20,\"loc\":\"-478.9999694824219 1066.0000305175781\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-25,\"to\":-12,\"name\":\"\"},\n" +
            "{\"from\":-26,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-27,\"to\":-14,\"name\":\"\"},\n" +
            "{\"from\":-29,\"to\":-9,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-28,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-30,\"to\":-16,\"name\":\"\"},\n" +
            "{\"from\":-29,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-30,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-28,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-27,\"to\":-24,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-13,\"name\":\"\"},\n" +
            "{\"from\":-13,\"to\":-12,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-14,\"name\":\"\"},\n" +
            "{\"from\":-14,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-15,\"to\":-9,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-16,\"name\":\"\"},\n" +
            "{\"from\":-16,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-17,\"to\":-10,\"name\":\"\"},\n" +
            "{\"category\":\"Link1\",\"from\":-5,\"to\":-26,\"name\":\"\"},\n" +
            "{\"from\":-4,\"to\":-19,\"name\":\"\"},\n" +
            "{\"from\":-19,\"to\":-20,\"name\":\"\"},\n" +
            "{\"category\":\"Link1\",\"from\":-20,\"to\":-25,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_6") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u821f\u66f2\u8001\u57ce\u533a\",\"key\":-31,\"loc\":\"132.00006103515625 1915.0001831054688\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+54800\",\"key\":-9,\"loc\":\"-168.66668701171875 1546.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+58000\",\"key\":-4,\"loc\":\"-167.33331298828125 1914.0000305175781\"},\n" +
            "{\"category\":\"HydropowerStation\",\"text\":\"\u6c34\u7535\u7ad9\",\"source\":\"img/HydropowerStation.png\",\"name\":\"\u9501\u513f\u5934\u6c34\u7535\u7ad9\u5382\u623f\",\"key\":-7,\"loc\":\"-359 1642.0000305175781\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+56400\",\"key\":-8,\"loc\":\"-168.16558837890625 1642.6666870117188\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5be8\u5b50\u6c9f\",\"key\":-10,\"loc\":\"38.3333740234375 1696.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+56800\",\"key\":-11,\"loc\":\"-168.33331298828125 1708.6666870117188\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u4e09\u773c\u5cea\",\"key\":-12,\"loc\":\"39.0001220703125 1793.3332824707031\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u7f57\u5bb6\u5cea\",\"key\":-13,\"loc\":\"53 2018.6668090820312\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+58800\",\"key\":-14,\"loc\":\"-167 2155.3333740234375\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+60600\",\"key\":-15,\"loc\":\"-166.3333740234375 2261.9999389648438\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u6cb3\u5357\u6751\",\"key\":-16,\"loc\":\"67 2145.6666870117188\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u821f\u66f2\u8001\u57ce\u533a\u4e0a\u6e38\",\"key\":-17,\"loc\":\"-168.74996948242188 1444.6666641235352\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-7,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-13,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-4,\"to\":-31,\"name\":\"\"},\n" +
            "{\"from\":-16,\"to\":-14,\"name\":\"\"},\n" +
            "{\"from\":-16,\"to\":-31,\"name\":\"\"},\n" +
            "{\"from\":-13,\"to\":-31,\"name\":\"\"},\n" +
            "{\"from\":-12,\"to\":-31,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-31,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-8,\"to\":-11,\"name\":\"\"},\n" +
            "{\"from\":-11,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-4,\"to\":-14,\"name\":\"\"},\n" +
            "{\"from\":-14,\"to\":-15,\"name\":\"\"},\n" +
            "{\"from\":-17,\"to\":-9,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_7") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5357\u5cea\u4e8c\u53f7\u5c0f\u6d41\u57df\",\"key\":-36,\"loc\":\"-467.3333740234375 2239.3333740234375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5357\u5cea\u4e00\u53f7\u5c0f\u6d41\u57df\",\"key\":-35,\"loc\":\"-467.3333740234375 1939.9999694824219\"},\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u5357\u5cea\u6751\",\"key\":-34,\"loc\":\"-565.0000610351562 2088.3335571289062\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+65000\",\"key\":-9,\"loc\":\"-228.66668701171875 1918.3333282470703\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+66400\",\"key\":-7,\"loc\":\"-229.33331298828125 2089\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+67400\",\"key\":-8,\"loc\":\"-229.99993896484375 2371\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u5357\u5cea\u6751\u4e0a\u6e38\",\"key\":-10,\"loc\":\"-228.6666259765625 1771.6666717529297\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-35,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-36,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-34,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-7,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-8,\"name\":\"\"},\n" +
            "{\"from\":-36,\"to\":-34,\"name\":\"\"},\n" +
            "{\"from\":-35,\"to\":-34,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-9,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN_8") {
        document.getElementById("mySavedModel").value = "{ \"class\": \"GraphLinksModel\",\n" +
            "  \"nodeDataArray\": [\n" +
            "{\"category\":\"DPObject\",\"text\":\"\u9632\u707e\u5bf9\u8c61\",\"source\":\"img/DPObject.svg\",\"name\":\"\u4e24\u6cb3\u53e3\",\"key\":-39,\"loc\":\"37.33331298828125 2502.0000915527344\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+73400\",\"key\":-9,\"loc\":\"-163.6666259765625 2304.6666870117188\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+78400\",\"key\":-4,\"loc\":\"-166.33331298828125 2635.3333740234375\"},\n" +
            "{\"category\":\"CrossSectionL\",\"text\":\"\u6cb3\u9053\u65ad\u9762(\u6a2a)\",\"source\":\"img/CrossSection.png\",\"name\":\"BLJ+74600\",\"key\":-5,\"loc\":\"-165.3333740234375 2452.711474609375\"},\n" +
            "{\"category\":\"Boundary\",\"text\":\"\u5b50\u6d41\u57df\u5355\u5143\",\"source\":\"img/Boundary.png\",\"name\":\"\u5cb7\u6c5f\u6d41\u57df\",\"key\":-7,\"loc\":\"37.3333740234375 2282.044787597656\"},\n" +
            "{\"category\":\"Text\",\"text\":\"\u6587\u672c\u6846\",\"source\":\"img/CrossSection.png\",\"name\":\"\u767d\u9f99\u6c5f\u5e72\u6d41\u4e24\u6cb3\u53e3\u4e0a\u6e38\",\"key\":-10,\"loc\":\"-163.48490142822266 2142.3333435058594\"}\n" +
            "],\n" +
            "  \"linkDataArray\": [\n" +
            "{\"from\":-7,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-39,\"name\":\"\"},\n" +
            "{\"from\":-9,\"to\":-5,\"name\":\"\"},\n" +
            "{\"from\":-5,\"to\":-4,\"name\":\"\"},\n" +
            "{\"from\":-7,\"to\":-39,\"name\":\"\"},\n" +
            "{\"from\":-10,\"to\":-9,\"name\":\"\"}\n" +
            "]}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
    else if (id === "topoGraphBTN0") {
        document.getElementById("mySavedModel").value = "{" +
            "\n\n" +
            "}";
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    }
}