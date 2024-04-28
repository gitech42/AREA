import 'dart:convert';
import 'dart:developer';
import 'package:area/dashboard/global.dart';
import 'package:area/my.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class NodeArea extends StatefulWidget {
  const NodeArea({super.key, required this.param, required this.d});

  final ValueNotifier<int> d;
  final Map param;

  @override
  State<NodeArea> createState() => NodeAreaState();
}

class NodeAreaState extends State<NodeArea> {

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 5.0),
      child: Container(
        alignment: Alignment.center,
        decoration: BoxDecoration(color: const Color.fromARGB(82, 0, 0, 0), borderRadius: BorderRadius.circular(10)),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Row(
                      children: [
                        SizedBox(
                          height: 20,
                          width: 20,
                          child: FittedBox(
                            fit: BoxFit.fill,
                            child: Image.network('http://${ipController.text}:8080/image/${widget.param["Service_action"]["file"]}')//add your image url if its from network if not change it to image.asset
                          ),
                        ),
                        const Icon(Icons.arrow_right),
                        Text(widget.param["action"]["name"]),
                        const Icon(Icons.arrow_right),
                        Expanded(
                          child: Text(
                            widget.param["param_action"].toString(),
                            style: const TextStyle(fontSize: 12),
                            overflow: TextOverflow.fade,
                            softWrap: false
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: () async {
                      var url = 'http://${ipController.text}:8080/api/user/area/${widget.param["id"]}';
                      log(widget.param["id"]);
                      try {
                        await http.delete(
                          Uri.parse(url),
                          headers: {
                            'authorization': "bearer $token",
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                          }
                        );
                      } catch (e) {
                        return;
                      }
                      widget.d.value += 1;
                    },
                    icon: const Icon(Icons.delete_forever),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Row(
                      children: [
                        SizedBox(
                          height: 20,
                          width: 20,
                          child: FittedBox(
                            fit: BoxFit.fill,
                            child: Image.network('http://${ipController.text}:8080/image/${widget.param["Service_reaction"]["file"]}')//add your image url if its from network if not change it to image.asset
                          ),
                        ),
                        const Icon(Icons.arrow_right),
                        Text(widget.param["reaction"]["name"]),
                        const Icon(Icons.arrow_right),
                        Expanded(
                          child: Text(
                            widget.param["param_reaction"].toString(),
                            style: const TextStyle(fontSize: 12),
                            overflow: TextOverflow.fade,
                            softWrap: false
                          ),
                        ),
                      ],
                    ),
                  ),
                  Align(
                    alignment: Alignment.topRight,
                    child: Switch(
                      value: widget.param["active"],
                      activeColor: Colors.purple,
                      onChanged: (bool value) async {
                        setState(() {
                          widget.param["active"] = value;
                        });
                        var url = 'http://${ipController.text}:8080/api/user/area/${widget.param["id"]}';
                        log(widget.param["active"].toString());
                        try {
                          await http.put(
                            Uri.parse(url),
                            headers: {
                              'authorization': "bearer $token",
                              'accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: json.encode({"activate": widget.param["active"]}),
                          );
                        } catch (e) {
                          return;
                        }
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}