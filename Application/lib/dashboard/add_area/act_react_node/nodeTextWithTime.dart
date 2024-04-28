import 'package:area/dashboard/add_area/act_react_node/utils.dart';
import 'package:area/my.dart';
import 'package:flutter/material.dart';

class NodeTextWithTime extends StatefulWidget {
  const NodeTextWithTime(
      {super.key,
      required this.slc,
      required this.infos,
      required this.name,
      required this.param,
      required this.icon});

  final String icon;
  final List param;
  final String name;
  final ValueNotifier<Map> infos;
  final ValueNotifier<String> slc;

  @override
  State<NodeTextWithTime> createState() => NodeTextWithTimeState();
}

class NodeTextWithTimeState extends State<NodeTextWithTime> {
  Color clr = const Color.fromARGB(255, 255, 255, 255);
  String tmp = '10min';
  TextEditingController value = TextEditingController();
  Map<String, int> min = {
    '1min': 60000,
    '10min': 60000,
    '1hour': 3600000,
    '1day': 5184000000000,
  };
  var items = [
    '1min',
    '10min',
    '1hour',
    '1day',
  ];

  @override
  Widget build(BuildContext context) {
    if (widget.slc.value == widget.name) {
      clr = const Color.fromARGB(65, 255, 255, 255);
    } else {
      clr = const Color.fromARGB(139, 255, 255, 255);
    }
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
      child: TextButton(
        onPressed: () {
          setState(() {
            widget.slc.value = widget.name;
            widget.infos.value["name"] = widget.name;
            widget.infos.value["param"] = [min[tmp], value];
          });
        },
        child: Container(
          decoration: BoxDecoration(
              color: clr, borderRadius: BorderRadius.circular(10)),
          height: 80,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Padding(
              padding: const EdgeInsets.all(4.0),
              child: Row(
                children: <Widget>[
                  createNameNode(widget.name, widget.icon),
                  Expanded(
                    child: Column(
                      children: [
                        Expanded(
                          child: Focus(
                            onFocusChange: (focused) {
                              setState(() {
                                widget.slc.value = widget.name;
                                widget.infos.value["name"] = widget.name;
                                widget.infos.value["param"] = [min[tmp], value];
                              });
                            },
                            child: createText(value, widget.param[2])
                          ),
                        ),
                        Expanded(
                          child: DropdownButton(
                            value: tmp,
                            style: const TextStyle(
                                color: Color.fromARGB(255, 0, 0, 0)),
                            dropdownColor: clr,
                            icon: const Icon(Icons.keyboard_arrow_down),
                            items: items.map((items) {
                              return DropdownMenuItem(
                                  value: items, child: Text(items));
                            }).toList(),
                            onChanged: (dynamic newValue) {
                              setState(() {
                                widget.slc.value = widget.name;
                                widget.infos.value["name"] = widget.name;
                                tmp = newValue;
                                widget.infos.value["param"] = [min[tmp], value];
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
