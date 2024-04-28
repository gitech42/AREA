
import 'package:area/dashboard/add_area/act_react_node/utils.dart';
import 'package:area/my.dart';
import 'package:flutter/material.dart';

class CreatePr extends  StatefulWidget {
  const CreatePr({super.key, required this.slc, required this.infos, required this.name, required this.param, required this.icon});

  final String icon;
  final List param;
  final String name;
  final ValueNotifier<Map> infos;
  final ValueNotifier<String> slc;

  @override
  State<CreatePr> createState() => CreatePrState();
}

class CreatePrState extends State<CreatePr> {
  Color clr = const Color.fromARGB(255, 255, 255, 255);
  TextEditingController value = TextEditingController();
  TextEditingController valu = TextEditingController();
  TextEditingController val = TextEditingController();
  TextEditingController va = TextEditingController();
  TextEditingController v = TextEditingController();

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
            widget.infos.value["param"] = [value, valu, val, va, v];
          });
        },
        child: Container(
          decoration: BoxDecoration(color: clr, borderRadius: BorderRadius.circular(10)),
          height: 120,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                Expanded(
                  child: Row(
                    children: <Widget> [
                      createNameNode(widget.name, widget.icon),
                      Expanded (
                        child: Column(
                          children: [
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: Focus(
                                  onFocusChange: (focused) {
                                    setState(() {
                                      widget.slc.value = widget.name;
                                      widget.infos.value["name"] = widget.name;
                                      widget.infos.value["param"]= [value, valu, val, va, v];
                                    });
                                  },
                                  child: createText(value, widget.param[0])
                                ),
                              ),
                            ),
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: Focus(
                                  onFocusChange: (focused) {
                                    setState(() {
                                      widget.slc.value = widget.name;
                                      widget.infos.value["name"] = widget.name;
                                      widget.infos.value["param"]= [value, valu, val, va, v];
                                    });
                                  },
                                  child: createText(valu, widget.param[2])
                                ),
                              ),
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(4.0),
                          child: Focus(
                            onFocusChange: (focused) {
                              setState(() {
                                widget.slc.value = widget.name;
                                widget.infos.value["name"] = widget.name;
                                widget.infos.value["param"]= [value, valu, val, va, v];
                              });
                            },
                            child: createText(val, widget.param[4])
                          ),
                        ),
                      ),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(4.0),
                          child: Focus(
                            onFocusChange: (focused) {
                              setState(() {
                                widget.slc.value = widget.name;
                                widget.infos.value["name"] = widget.name;
                                widget.infos.value["param"]= [value, valu, val, va, v];
                              });
                            },
                            child: createText(va, widget.param[6])
                          ),
                        ),
                      ),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(4.0),
                          child: Focus(
                            onFocusChange: (focused) {
                              setState(() {
                                widget.slc.value = widget.name;
                                widget.infos.value["name"] = widget.name;
                                widget.infos.value["param"]= [value, valu, val, va, v];
                              });
                            },
                            child: createText(v, widget.param[8])
                          ),
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
    );
  }
}

