import 'dart:convert';
import 'dart:developer';
import 'package:area/dashboard/user_area/nodeArea.dart';
import 'package:flutter/material.dart';
import 'package:area/dashboard/global.dart';
import 'package:http/http.dart' as http;
import '../../my.dart';

class UserArea extends StatefulWidget {
  const UserArea({super.key});

  @override
  State<UserArea> createState() => UserAreaState();
}

class UserAreaState extends State<UserArea> {
  ValueNotifier<List<dynamic>> areas = ValueNotifier([]);
  ValueNotifier<int> d = ValueNotifier(0);

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: d,
      builder:(context, value, child) {
        return FutureBuilder<int>(
          future: getAllArea(),
          builder: (context, AsyncSnapshot<int> snapshot) {
            if (snapshot.hasData) {
              return Container(
                decoration: importDecorationBackgroundg("image/background.png"),
                child: Padding(
                  padding: const EdgeInsets.only(top: 40),
                  child: CustomScrollView(slivers: <Widget>[
                    SliverList(
                      delegate: SliverChildBuilderDelegate(
                      (context, index) => NodeArea(param: areas.value[index], d: d),
                      childCount: areas.value.length,
                      )
                    )
                  ]),
                ),
              );
            } else {
              return Container(
                decoration: importDecorationBackgroundg("image/background.png"),
                alignment: Alignment.center,
                child: const CircularProgressIndicator(),
              );
            }
          }
        );
      }
    );
  }

  Future<int> getAllArea() async {
    var url = 'http://${ipController.text}:8080/api/user/areas';
    try {
      var response = await http.get(Uri.parse(url), headers: {
        'authorization': "Bearer $token",
        'accept': 'application/json',
        'Content-Type': 'application/json',
      });
      if (response.statusCode == 200) {
        areas.value = json.decode(response.body)["areas"];
      }
    } catch(e) {
      return 0;
    }
    return 0;
  }
}
