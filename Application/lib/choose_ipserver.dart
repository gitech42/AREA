import 'package:area/my.dart';
import 'package:flutter/material.dart';
import 'main.dart';

class ChooseIpPage extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: "ip page",
        home: Container(
          decoration: importDecorationBackgroundg("image/login_bg.png"),
          child: Scaffold(
            backgroundColor: Colors.transparent,
            appBar: createAppbar("Choose Ip", context),
            body: Stack(children: <Widget>[
              Center(
                child: Stack(children: <Widget>[
                  const Positioned(
                    right: 20,
                    top: 10,
                    child: Icon(Icons.verified_user_outlined,
                        size: 36.0, color: Color.fromARGB(255, 8, 8, 8)),
                  ),
                  SizedBox(
                      width: 300,
                      height: 100,
                      child: TextField(
                        controller: ipController,
                        focusNode: FocusNode(),
                        decoration: const InputDecoration(
                            hintText: 'Ip',
                            enabledBorder: OutlineInputBorder(
                                borderSide:
                                    BorderSide(width: 3, color: Colors.grey))),
                      )),
                ]),
              ),
              Align(
                //mainAxisSize: MainAxisSize.max,
                ////mainAxisAlignment: MainAxisAlignment.end,
                //children: <Widget>[
                alignment: FractionalOffset.bottomCenter,
                child: TextButton(
                  onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const MyHomePageState())),
                  child: const Text(
                    "Valid",
                    style: TextStyle(fontWeight: FontWeight.w300),
                  ),
                ),
              ),
            ]),
          ),
        ));
  }
}
