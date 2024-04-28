import 'dart:convert';
import 'dart:developer';
import 'package:area/dashboard/global.dart';
import 'package:area/main.dart';
import 'package:area/my.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
// ignore: depend_on_referenced_packages
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';


class Setting extends StatefulWidget {
  const Setting({super.key});
  @override
  State<Setting> createState() => SettingState();
}

class SettingState extends State<Setting> {
  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      decoration: importDecorationBackgroundg("image/background.png"),
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: TextButton(
                onPressed: () async {
                  var url = 'http://${ipController.text}:8080/api/auth/logout';
                  try {
                    var response = await http.post(
                      Uri.parse(url),
                      headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                      }
                    );
                    if (response.statusCode == 200) {
                      token = "";
                      emailController = TextEditingController();
                      usernameController = TextEditingController();
                      passwordController = TextEditingController();
                      Navigator.push(context, MaterialPageRoute(builder: (context) => const MyHomePage()));
                    }
                  } catch (e) {
                    return;
                  }
                },
                child: Container(
                  decoration: BoxDecoration(color:  const Color.fromARGB(139, 255, 255, 255),borderRadius: BorderRadius.circular(10)),
                  child: const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text('Log Out',
                      style: TextStyle(fontSize: 40, color: Colors.black),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Row(
            children: [
              IconButton(
                alignment: Alignment.center,
                onPressed: () async {
                  var url = 'http://${ipController.text}:8080/api/user/area/pornhub';
                  try {
                    var response = await http.get(
                      Uri.parse(url),
                      headers: {
                        'authorization': "bearer $token",
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                      }
                    );
                    if (response.statusCode == 200) {
                      Map myUrl = json.decode(response.body);
                      if (!await launchUrl(Uri.parse(myUrl["name"]))) {
                        throw 'Could not launch $myUrl["name"]';
                      }
                    }
                  } catch (e) {
                    return;
                  }
                },
                icon: const Icon(FontAwesomeIcons.smileWink),
              ),
            ],
          ),
        ],
      ),
    );
  }

}