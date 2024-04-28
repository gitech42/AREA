import 'package:area/main.dart';
import 'package:flutter/material.dart';
import 'my.dart';

class ForgetPasswordScreen extends StatelessWidget {
  const ForgetPasswordScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "forget_passwordscreen",
      home: Container(
        decoration: importDecorationBackgroundg("image/login_bg.png"),
        child: Scaffold(
          resizeToAvoidBottomInset: false,
          backgroundColor: Colors.transparent,
          appBar: createAppbar("Help", context),
          body: Column(children: [
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                margin: getMargin(
                  left: 30,
                  top: 205,
                  right: 30,
                  bottom: 55,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    const Text(
                      "A new password will be emailed to you.",
                      textWidthBasis: TextWidthBasis.parent,
                      style: TextStyle(fontSize: 20, color: Colors.grey),
                    ),
                    alignementMarging(30, 35, 0, 10),
                    Stack(
                      children: <Widget>[
                        const Positioned(
                            right: 20.0,
                            top: 10,
                            child: Icon(
                              Icons.email_sharp,
                              size: 36.0,
                              color: Color.fromARGB(255, 8, 8, 8),
                            )),
                        createTextfield(
                            TextAlign.start, "Email", emailController),
                      ],
                    ),
                    alignementMarging(30, 60, 0, 10),
                    Center(
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
                          onPressed: () => Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      const MyHomePageState())),
                          child: const Text("Send code"),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )
          ]),
        ),
      ),
    );
  }
}
