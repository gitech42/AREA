import 'package:area/api_login.dart';
import 'package:flutter/material.dart';
import 'main.dart';

BoxDecoration importDecorationBackgroundg(String background) {
  return BoxDecoration(
      image: DecorationImage(image: AssetImage(background), fit: BoxFit.fill));
}

AppBar createAppbar(String titre, BuildContext context) {
  return AppBar(
    elevation: 0,
    automaticallyImplyLeading: false,
    leading: IconButton(
      icon: const Icon(Icons.arrow_back, color: Colors.white),
      onPressed: () => Navigator.of(context).pop(),
    ),
    backgroundColor: Colors.transparent,
    title: Text(titre),
    centerTitle: true,
  );
}

TextEditingController emailController = TextEditingController();
TextEditingController usernameController =
    TextEditingController(text: "testbilel@gmail.com");
TextEditingController passwordController = TextEditingController(text: "test");
TextEditingController ipController = TextEditingController(text: "172.20.10.2");
TextEditingController emailToSendGit = TextEditingController();

class MyPage extends StatelessWidget {
  const MyPage({super.key});

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
            appBar: createAppbar("Register", context),
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
                        mainAxisSize: MainAxisSize.max,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Stack(children: <Widget>[
                            const Positioned(
                                right: 20.0,
                                top: 10,
                                child: Icon(
                                    Icons.supervised_user_circle_outlined,
                                    size: 36.0,
                                    color: Color.fromARGB(255, 8, 8, 8))),
                            createTextfield(
                                TextAlign.start, "Username", usernameController)
                          ]),
                          alignementMarging(30, 25, 30, 15),
                          Stack(
                            children: <Widget>[
                              const Positioned(
                                  right: 20.0,
                                  top: 10,
                                  child: Icon(Icons.lock_outline_sharp,
                                      size: 36.0,
                                      color: Color.fromARGB(255, 8, 8, 8))),
                              TextField(
                                  obscureText: true,
                                  controller: passwordController,
                                  focusNode: FocusNode(),
                                  decoration: const InputDecoration(
                                      hintText: 'password',
                                      enabledBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                              width: 3, color: Colors.grey)))),
                            ],
                          ),
                          alignementMarging(30, 25, 30, 15),
                          Stack(
                            children: <Widget>[
                              const Positioned(
                                  right: 20.0,
                                  top: 10,
                                  child: Icon(Icons.email_outlined,
                                      size: 36.0,
                                      color: Color.fromARGB(255, 8, 8, 8))),
                              TextField(
                                  controller: emailController,
                                  focusNode: FocusNode(),
                                  decoration: const InputDecoration(
                                      hintText: 'email',
                                      enabledBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                              width: 3, color: Colors.grey)))),
                            ],
                          ),
                          alignementMarging(30, 25, 0, 10),
                          Center(
                            child: Container(
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
                                onPressed: () => postRegister(
                                    context,
                                    usernameController.text,
                                    passwordController.text,
                                    emailController.text),
                                /*Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => MyHomePage())*/
                                child: const Text("Login"),
                              ),
                            ),
                          ),
                        ],
                      )))
            ]),
          )),
    );
  }
}
