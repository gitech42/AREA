
import 'package:area/dashboard/add_area/act_react_node/utils.dart';
import 'package:area/my.dart';
import 'package:flutter/material.dart';

class NodeOneText extends  StatefulWidget {
  const NodeOneText({super.key, required this.slc, required this.infos, required this.name, required this.param, required this.icon});

  final String icon;
  final List param;
  final String name;
  final ValueNotifier<Map> infos;
  final ValueNotifier<String> slc;

  @override
  State<NodeOneText> createState() => NodeOneTextState();
}

class NodeOneTextState extends State<NodeOneText> {
  Color clr = const Color.fromARGB(255, 255, 255, 255);
  TextEditingController value = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (widget.slc.value == widget.name) {
      clr = const Color.fromARGB(65, 255, 255, 255);
    } else {
      clr = const Color.fromARGB(139, 255, 255, 255);
    }
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
      child: TextButton (
        onPressed: () {
          setState(() {
            widget.slc.value = widget.name;
            widget.infos.value["name"] = widget.name;
            widget.infos.value["param"] = [value];
          });
        },
        child: Container(
          decoration: BoxDecoration(color: clr, borderRadius: BorderRadius.circular(10)),
          height: 68,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: <Widget> [
                createNameNode(widget.name, widget.icon),
                Expanded (
                  child: Padding(
                    padding: const EdgeInsets.all(4.0),
                    child: Focus(
                      onFocusChange: (focused) {
                        setState(() {
                          widget.slc.value = widget.name;
                          widget.infos.value["name"] = widget.name;
                          widget.infos.value["param"]= [value];
                        });
                      },
                      child: createText(value, widget.param[0])
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

