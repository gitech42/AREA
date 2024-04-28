import 'package:area/my.dart';
import 'package:flutter/material.dart';

Widget createText(TextEditingController control, String lab) {
  return TextField (
    controller: control,
    style: const TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
    decoration: InputDecoration(
      disabledBorder: const OutlineInputBorder(borderSide: BorderSide(color: Color.fromARGB(255, 0, 0, 0))),
      focusedBorder: const OutlineInputBorder(borderSide: BorderSide(color: Color.fromARGB(255, 0, 0, 0))),
      enabledBorder: const OutlineInputBorder(borderSide: BorderSide(color: Color.fromARGB(255, 0, 0, 0))),
      border: const OutlineInputBorder(borderSide: BorderSide(color: Color.fromARGB(255, 0, 0, 0))),
      labelText: lab,
      labelStyle: const TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
    ),
  );
}

Widget createNameNode(String name, String icon) {
  return Column(
    children: [
      Padding(
        padding: const EdgeInsets.only(top: 4.0, bottom: 2.0, left: 4.0, right: 4.0),
        child: Text(name, style: const TextStyle(color: Color.fromARGB(255, 0, 0, 0))),
      ),
      Padding(
        padding: const EdgeInsets.only(top: 2.0, bottom: 4.0, left: 4.0, right: 4.0),
        child: SizedBox(
          height: 20,
          width: 20,
          child: FittedBox(
            fit: BoxFit.fill,
            child: Image.network('http://${ipController.text}:8080/image/$icon')//add your image url if its from network if not change it to image.asset
          ),
        ),
      ),
    ],
  );
}

List convertText(List param)
{
  List newParam = [];

  for (int i = 0; i < param.length; i += 1) {
    if (param[i].runtimeType == TextEditingController) {
      newParam.add(param[i].text);
    } else {
      newParam.add(param[i]);
    }
  }
  return newParam;
}