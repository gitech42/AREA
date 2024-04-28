
import 'dart:developer';

import 'package:area/dashboard/add_area/name_container.dart';
import 'package:area/my.dart';
import 'package:flutter/material.dart';


class ChooseService extends StatefulWidget {
  const ChooseService({super.key, required this.slcServ, required this.listServ});

  final List<String> listServ;
  final ValueNotifier<int> slcServ;
  @override
  State<ChooseService> createState() => ChooseServiceState();

}

class ChooseServiceState extends State<ChooseService> {

  @override
  Widget build(context) {
    return Card(
      color: const Color.fromARGB(0, 158, 158, 158),
      child: Column (
        children: <Widget> [
          const Padding(
            padding: EdgeInsets.only(left: 8.0, right: 8.0, top: 8.0, bottom: 2.0),
            child: NameContainer(name: "Services"),
          ),
          Container (
            height: 60,
            alignment: Alignment.center,
            child: CustomScrollView(
              scrollDirection: Axis.horizontal,
              slivers: <Widget> [
                SliverList(
                  delegate: SliverChildBuilderDelegate (
                    (context, index) => whichServiceNode(context, index),
                    childCount: widget.listServ.length,
                  )
                )
              ]
            )
          )
        ]
      )
    );
  }

  Widget whichServiceNode(BuildContext context, int index) {
    if (widget.slcServ.value == index) {
        return createServiceNode(context, index, const Color.fromARGB(116, 47, 47, 47), widget.listServ[index]);
    } else {
        return createServiceNode(context, index, const Color.fromARGB(0, 100, 100, 100), widget.listServ[index]);
    }
  }

  Widget createServiceNode(BuildContext context, int index, Color clr, String icon) {
    return TextButton(
      onPressed: () {
        widget.slcServ.value = index;
      },
      child: Container(
        decoration: BoxDecoration(color: clr,borderRadius: BorderRadius.circular(10)),
        height: 35,
        width: 35,
        margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
        child: Padding(
          padding: const EdgeInsets.all(4.0),
          child: SizedBox(
              child: FittedBox(
                  fit: BoxFit.fill,
                  child: Image.network('http://${ipController.text}:8080/image/$icon')//add your image url if its from network if not change it to image.asset
              )
          ),
        ),
      ),
    );
  }
}