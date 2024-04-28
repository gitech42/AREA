import 'package:area/github_sign.dart';
import 'package:flutter/material.dart';

import 'main.dart';
import 'my.dart';

class RedirectGithub extends StatelessWidget {
  const RedirectGithub({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: "register page",
        home: Container(
            decoration: importDecorationBackgroundg("image/login_bg.png"),
            child: Scaffold(
                resizeToAvoidBottomInset: false,
                backgroundColor: Colors.transparent,
                body: Column(
                  //mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    alignementMarging(30, 195, 0, 10),
                    const Text(
                      "To connect with Github: \n\n\n 1) Allow the connection with your device \n 2) Go back to the application and log in",
                      textWidthBasis: TextWidthBasis.parent,
                      style: TextStyle(fontSize: 16, color: Colors.blueGrey),
                    ),
                    alignementMarging(30, 20, 0, 0),
                    TextField(
                        controller: emailToSendGit,
                        focusNode: FocusNode(),
                        decoration: const InputDecoration(
                            hintText: 'email to send your github code',
                            enabledBorder: OutlineInputBorder(
                                borderSide:
                                    BorderSide(width: 3, color: Colors.grey)))),
                    Container(
                        padding: const EdgeInsets.all(90),
                        child: Container(
                          width: 300,
                          decoration: const BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(30)),
                            gradient: LinearGradient(
                              colors: [
                                Color.fromARGB(255, 221, 110, 217),
                                Color.fromARGB(255, 194, 67, 137),
                                Color.fromARGB(242, 236, 93, 9)
                              ],
                            ),
                          ),
                          child: TextButton(
                            onPressed: (() => githubLoginDevice(context)),
                            child: const Text(
                              "Authorize your device",
                            ),
                          ),
                        )),
                    Stack(
                        //padding: const EdgeInsets.all(90),
                        children: <Widget>[
                          Container(
                            width: 300,
                            decoration: const BoxDecoration(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              gradient: LinearGradient(
                                colors: [
                                  Color.fromARGB(255, 221, 110, 217),
                                  Color.fromARGB(255, 194, 67, 137),
                                  Color.fromARGB(242, 236, 93, 9)
                                ],
                              ),
                            ),
                            child: TextButton(
                              onPressed: () => githubToken(context),
                              child: const Text(
                                "Go to your Dashboard",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                          const Positioned(
                              right: 20.0,
                              top: 5,
                              child: Icon(Icons.login_sharp,
                                  size: 36.0, color: Colors.white)),
                        ]),
                    //alignementMarging(0, 15, 0, 10),
                  ],
                ))));
  }
}
