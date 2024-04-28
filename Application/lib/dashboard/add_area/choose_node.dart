import 'package:area/dashboard/add_area/act_react_node/createPr.dart';
import 'package:area/dashboard/add_area/act_react_node/genJoke.dart';
import 'package:area/dashboard/add_area/act_react_node/nodeFourText.dart';
import 'package:area/dashboard/add_area/act_react_node/nodeOneText.dart';
import 'package:area/dashboard/add_area/act_react_node/nodeTextWithTime.dart';
import 'package:area/dashboard/add_area/act_react_node/nodeTwoText.dart';
import 'package:area/dashboard/add_area/name_container.dart';
import 'package:area/dashboard/add_area/act_react_node/renameBrch.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class ChooseNode extends StatefulWidget {
  ChooseNode(
      {super.key,
      required this.list,
      required this.name,
      required this.slcServ,
      required this.infos});

  ValueNotifier<Map> infos;
  final ValueNotifier<int> slcServ;
  final List<dynamic> list;
  final String name;
  @override
  State<ChooseNode> createState() => ChooseNodeState();
}

class ChooseNodeState extends State<ChooseNode> {
  ValueNotifier<String> slc = ValueNotifier("");
  Map<String, dynamic> nodes = {
    "send email": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "gmail.png"),
    "search user profil": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "get forks repo": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "get lastpush repo": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "get vue repo": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "check upload video": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "youtube.png"),
    "get current crypto price": (ValueNotifier<String> slc,
            ValueNotifier<Map> infos, String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "coincap.png"),
    "like video": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "youtube.png"),
    "report video": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "youtube.png"),
    "delete repo": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeOneText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "create repo": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeTwoText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "check if pr is merge": (ValueNotifier<String> slc,
            ValueNotifier<Map> infos, String name, List param) =>
        NodeTwoText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "comment video": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeTwoText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "youtube.png"),
    "get pornhub video url": (ValueNotifier<String> slc,
            ValueNotifier<Map> infos, String name, List param) =>
        NodeTextWithTime(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "pornhub.png"),
    "merge branche": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeFourText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "merge pr": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeFourText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "add event": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeFourText(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "google_calendar.png"),
    "get météo": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        NodeTextWithTime(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "weather.png"),
    "generate pokemons's stats": (ValueNotifier<String> slc,
            ValueNotifier<Map> infos, String name, List param) =>
        NodeTextWithTime(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "pokemon.png"),
    "generate joke": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        GenJoke(
            slc: slc, infos: infos, name: name, param: param, icon: "joke.png"),
    "generate guess joke": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        GenJoke(
            slc: slc, infos: infos, name: name, param: param, icon: "joke.png"),
    "create pr": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        CreatePr(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
    "rename branch": (ValueNotifier<String> slc, ValueNotifier<Map> infos,
            String name, List param) =>
        RenameBr(
            slc: slc,
            infos: infos,
            name: name,
            param: param,
            icon: "github.png"),
  };

  @override
  Widget build(context) {
    slc = ValueNotifier("");
    widget.infos.value = {};
    return Expanded(
        child: Card(
            color: const Color.fromARGB(0, 0, 0, 0),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(children: <Widget>[
                NameContainer(name: widget.name),
                const SizedBox(height: 4),
                Expanded(
                    child: CustomScrollView(slivers: <Widget>[
                  SliverList(
                      delegate: SliverChildBuilderDelegate(
                    (context, index) => whichNode(context, index),
                    childCount: widget.list[widget.slcServ.value].length,
                  ))
                ]))
              ]),
            )));
  }

  Widget? whichNode(
    BuildContext context,
    int index,
  ) {
    if (nodes.containsKey(widget.list[widget.slcServ.value][index]["name"])) {
      return ValueListenableBuilder(
          valueListenable: slc,
          builder: (context, value, child) {
            return nodes[widget.list[widget.slcServ.value][index]["name"]
                    .toString()](
                slc,
                widget.infos,
                widget.list[widget.slcServ.value][index]["name"],
                widget.list[widget.slcServ.value][index]["param"]);
          });
    }
    return createtmpnode(
        context, const Color.fromARGB(255, 255, 255, 255), index);
  }

  Widget createtmpnode(BuildContext context, Color clr, int index) {
    return Container(
        alignment: Alignment.center,
        decoration:
            BoxDecoration(color: clr, borderRadius: BorderRadius.circular(10)),
        height: 50,
        margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
        child: Text(
          widget.list[widget.slcServ.value][index]["name"].toString(),
          style: const TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
        ));
  }
}
