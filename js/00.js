var robot;
function init() {//初始化
    var $ = go.GraphObject.make;  // 创建gojs画布
    function nodeStyle() {
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
                "toolManager.mouseWheelBehavior":go.ToolManager.WheelNone,
                "undoManager.isEnabled": true,
                "dragSelectingTool.isEnabled" : true,
            });
    // 定义水库节点的模板
    myDiagram.nodeTemplateMap.add("Reservoir",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
                        fill: "lightgray",
                        opacity:0.5,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:5,
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
                        fill: "lightgray",
                        opacity:0.5,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:5,
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
                        fill: "lightgray",
                        opacity:0.5,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:5,
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
                        fill: "lightgray",
                        opacity:0.5,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.Picture,{
                        // fromLinkable: true, toLinkable: true, cursor: "pointer",portId: "",
                        margin:5,
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
    // 节点类子流域模板
    myDiagram.nodeTemplateMap.add("Boundary",
        $(go.Node, "Vertical", nodeStyle(),
            $(go.Panel,"Auto",
                $(go.Shape, "Rectangle",
                    {
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
                        fill: "lightblue" ,
                    },
                    { portId: "", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer" }),
                $(go.TextBlock, "子单元",  // the label text
                    {
                        editable:true,
                        margin:6,
                        width:55,
                        height:55,
                        opacity:1,
                    },
                    new go.Binding("text","name").makeTwoWay(),),
                )
        )
    )

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
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u722a\u54b1\u6c9f\u4e00\u7ea7\u6c34\u7535\u7ad9","key":-29,"loc":"-429.6666259765625 568.3333740234375"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u722a\u54b1\u6c9f\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-30,"loc":"-427 720.9999694824219"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u722a\u54b1\u6c9f\u4e09\u7ea7\u6c34\u7535\u7ad9","key":-31,"loc":"-426.333251953125 854.9999694824219"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u591a\u62c9\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-32,"loc":"-686.3333129882812 713.6666564941406"},
                {"category":"HydropowerStation","text":"\u6c34\u7535\u7ad9","source":"img/HydropowerStation.png","name":"\u78e8\u6c9f\u4e8c\u7ea7\u6c34\u7535\u7ad9","key":-33,"loc":"-682.9999694824219 954.3333740234375"},
                {"category":"Boundary","text":"\u754c","source":"img/Boundary.png","key":-34,"loc":"-740.3332977294922 565.4227050781246","name":"\u722a\u54b1\u6c9f\u4e00\u7ea7\u6c34\u7535\u7ad9\u4e0a\u6e38\u4ea7\u6c47\u6d41\u533a\u95f4"},
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
                {"from":-31,"to":-26,"name":"\u722a\u54b1\u6c9f"},
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

    function nodeClicked(e, obj) {
        var evt = e.copy();
        var nodeOrLink = obj.part;
        var type = evt.clickCount === 2 ? "Double-Clicked: " : "Clicked: ";
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
            document.getElementById("menuStation").style.display = "block";
            document.getElementById("menu2").style.display = "none";
            document.getElementById("menu3").style.display = "none";
        }
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
                    opacity:0.5,
                },
                new go.Binding("stroke", "color")),
            $(go.Shape, {
                toArrow: "Standard", //箭头
                scale: 2, //箭头放大倍数
                fill: "#57CFE3", //箭头填充色
                stroke: null,
                opacity:0.4,
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
    robot = new Robot(myDiagram);  // defined in Robot.js
    myPalette =//左侧模板栏
        $(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
            {
                nodeTemplateMap: myDiagram.nodeTemplateMap,  // 同myDiagram共用一种node节点模板
                model: new go.GraphLinksModel([  // 初始化Palette面板里的内容
                    { category: "Reservoir", text: "水库",source:"img/Reservoir.png", name:"水库" },
                    { category: "RainfallStation", text: "雨量站", source:"img/RainfallStation.png", name:"雨量站" },
                    { category: "HydrologicalStation", text: "水文站", source:"img/HydrologicalStation.png", name:"水文站" },
                    { category: "HydropowerStation", text: "水电站", source:"img/HydropowerStation.png", name:"水电站" },
                    { category: "Boundary", text: "子单元", source:"img/Boundary.png", name:"子单元" },
                ])
            });

    myDiagram.addDiagramListener("BackgroundSingleClicked", function(e) {
        document.getElementById("nodeDetail").style.display = "none";
    })

}

function deleteSelection() {
    robot.keyDown("Del");
    robot.keyUp("Del");
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

var obox = document.getElementById("box");
var odown = document.getElementById("down");
var oli = document.querySelectorAll("li");
console.log(oli);
var timer;
//当点击obox时，呈现出下拉列表的内容，给个延时效果
obox.onclick = function(){
    clearInterval(timer);
    timer = setInterval(function(){
        odown.style.display = "block";
    },30)
    ///选中列表中的某一项并将其呈现在box中,隐藏下拉列表
    for(var i=0;i<oli.length;i++){
        oli[i].n = i;
        oli[i].onclick = function(){
            obox.innerHTML = this.innerHTML;
            odown.style.display = "none";
            clearInterval(timer);
        }
    }
}
function showlist1(){
    document.getElementById("nodeDetail").style.display = "none";
    document.getElementById("Info").style.display = "none";
    document.getElementById("list1").style.display = "block";
}