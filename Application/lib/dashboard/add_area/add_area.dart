import 'dart:convert';
import 'dart:developer';
import 'package:area/dashboard/add_area/act_react_node/utils.dart';
import 'package:http/http.dart' as http;
import 'package:area/dashboard/add_area/choose_node.dart';
import 'package:area/dashboard/add_area/choose_service.dart';
import 'package:flutter/material.dart';
import 'package:area/dashboard/global.dart';
// ignore: depend_on_referenced_packages
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../my.dart';

class AddArea extends StatefulWidget {
  const AddArea({super.key});
  @override
  State<AddArea> createState() => AddAreaState();
}

class AddAreaState extends State<AddArea> {
  List<dynamic> listAct = [];
  List<dynamic> listReact = [];
  List<String> listServ = [];
  ValueNotifier<int> slcServAct = ValueNotifier(0);
  ValueNotifier<int> slcServRea = ValueNotifier(0);
  ValueNotifier<Map> action = ValueNotifier({});
  ValueNotifier<Map> reaction = ValueNotifier({});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<int> (
      future: getAllInfo(),
      builder: (context, AsyncSnapshot<int> snapshot) {
        if (snapshot.hasData) {
          return Container(
            alignment: Alignment.center,
            decoration: importDecorationBackgroundg("image/background.png"),
            padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 10),
            child: Column(
              children: <Widget> [
                ValueListenableBuilder(
                  valueListenable: slcServAct,
                  builder: (context, value, child) {
                    return ChooseService(slcServ: slcServAct, listServ: listServ);
                  }
                ),
                ValueListenableBuilder(
                  valueListenable: slcServAct,
                  builder: (context, value, child){
                    return ChooseNode(
                      list: listAct,
                      name: "Actions",
                      slcServ: slcServAct,
                      infos: action,
                    );
                  }
                ),
                ValueListenableBuilder(
                  valueListenable: slcServRea,
                  builder: (context, value, child) {
                    return ChooseService(slcServ: slcServRea, listServ: listServ);
                  }
                ),
                ValueListenableBuilder(
                  valueListenable: slcServRea,
                  builder: (context, value, child) {
                    return ChooseNode(
                      list: listReact,
                      name: "Reactions",
                      slcServ: slcServRea,
                      infos: reaction,
                    );
                  }
                ),
                addButton(context),
              ],
            )
          );
        } else {
          return Container (
            decoration: importDecorationBackgroundg("image/background.png"),
            alignment: Alignment.center,
            child: const CircularProgressIndicator(),
          );
        }
      }
    );
  }

  Future<int> getAllInfo() async {
    int i = 0;
    var url = 'http://${ipController.text}:8080/api/service';
    try {
      var response = await http.get(
        Uri.parse(url),
        headers: {
          'authorization': "bearer $token",
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      );
      if (response.statusCode != 200) {
        listAct = [[]];
        listReact = [[]];
        return 0;
      }
      Map service = json.decode(response.body);
      listServ = [];
      listAct = [];
      listReact = [];
      while (i < service["services"].length) {
        listServ.add(service["services"][i]["file"]);
        listAct.add(service["services"][i]["actions"]);
        listReact.add(service["services"][i]["reactions"]);
        i += 1;
      }
    } catch (e) {
      return 0;
    }
    return 0;
  }

  Future<int> postArea() async {
    if (action.value["name"] != null && action.value["param"] != null
    && reaction.value["name"] != null && reaction.value["param"] != null) {
      action.value["param"] = convertText(action.value["param"]);
      reaction.value["param"] = convertText(reaction.value["param"]);
      log(action.value.toString());
      log(reaction.value.toString());
      var response = await http.post(
        Uri.parse('http://${ipController.text}:8080/api/user/area'),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer $token"
        },
        body: jsonEncode({ 'area': {
          'action': action.value,
          'reaction': reaction.value,
        }})
      );
      return response.statusCode;
    } else {
      return 401;
    }
  }

  Widget addButton(context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
      child: TextButton(
        onPressed: () {
          Future<int> rt = postArea();
          rt.then((data) {
            if (data == 200) {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  backgroundColor: const Color.fromARGB(230, 255, 255, 255),
                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20.0))),
                  title: const Text("Create Area ?"),
                  content: const Text("Succes"),
                  actions: [
                    TextButton(
                      onPressed: () {
                        slcServAct.value = 1;
                        slcServAct.value = 0;
                        slcServRea.value = 1;
                        slcServRea.value = 0;
                        return Navigator.pop(context, 'ok');
                      },
                      child: const Text("ok", style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)))
                    ),
                  ],
                )
              );
            } else {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  backgroundColor: const Color.fromARGB(230, 255, 255, 255),
                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20.0))),
                  title: const Text("Create Area ?"),
                  content: Text("error $data"),
                  actions: [
                    TextButton(
                      onPressed: () {
                        return Navigator.pop(context, 'ok');
                      },
                      child: const Text("ok", style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)))
                    ),
                  ],
                )
              );
            }
          });
        },
        child: Container(
          alignment: Alignment.center,
          decoration: BoxDecoration(color:  const Color.fromARGB(139, 255, 255, 255),borderRadius: BorderRadius.circular(10)),
          height: 50,
          child: const Icon(FontAwesomeIcons.plus, color: Colors.black,)
        )
      ),
    );
  }
}