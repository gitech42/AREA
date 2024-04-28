import 'package:area/api_login.dart';
import 'package:area/choose_ipserver.dart';
import 'package:area/forget_password.dart';
import 'package:area/login-google_firebase.dart';
import 'package:area/my.dart';
import 'package:area/redirect_github.dart';
import 'package:flutter/services.dart';
import 'package:flutter_signin_button/button_list.dart';
import 'package:flutter_signin_button/button_view.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';

Size size = WidgetsBinding.instance.window.physicalSize /
    WidgetsBinding.instance.window.devicePixelRatio;

///This method is used to set padding/margin (for the left and Right side) & width of the screen or widget according to the Viewport width.
double getHorizontalSize(double px) {
  return px * (size.width / 360);
}

///This method is used to set padding/margin (for the top and bottom side) & height of the screen or widget according to the Viewport height.
double getVerticalSize(double px) {
  num statusBar =
      MediaQueryData.fromWindow(WidgetsBinding.instance.window).viewPadding.top;
  num screenHeight = size.height - statusBar;
  return px * (screenHeight / 640.0);
}

///This method is used to set text font size according to Viewport
double getFontSize(double px) {
  var height = getVerticalSize(px);
  var width = getHorizontalSize(px);
  if (height < width) {
    return height.toInt().toDouble();
  } else {
    return width.toInt().toDouble();
  }
}

///This method is used to set smallest px in image height and width
double getSize(double px) {
  var height = getVerticalSize(px);
  var width = getHorizontalSize(px);
  if (height < width) {
    return height.toInt().toDouble();
  } else {
    return width.toInt().toDouble();
  }
}

///This method is used to set padding responsively
EdgeInsetsGeometry getPadding({
  double? all,
  double? left,
  double? top,
  double? right,
  double? bottom,
}) {
  if (all != null) {
    left = all;
    top = all;
    right = all;
    bottom = all;
  }
  return EdgeInsets.only(
    left: getHorizontalSize(
      left ?? 0,
    ),
    top: getVerticalSize(
      top ?? 0,
    ),
    right: getHorizontalSize(
      right ?? 0,
    ),
    bottom: getVerticalSize(
      bottom ?? 0,
    ),
  );
}

Align alignementMarging(double left, double top, double right, double bottom) {
  return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        margin: getMargin(
          left: left,
          top: top,
          right: right,
          bottom: bottom,
        ),
      ));
}

TextField createTextfield(
    TextAlign textAlign, String text, TextEditingController controller) {
  return TextField(
      controller: controller,
      focusNode: FocusNode(),
      textAlign: textAlign,
      decoration: InputDecoration(
          hintText: text,
          enabledBorder: const OutlineInputBorder(
              borderSide: BorderSide(width: 3, color: Colors.grey))));
}

///This method is used to set margin responsively
EdgeInsetsGeometry getMargin({
  double? all,
  double? left,
  double? top,
  double? right,
  double? bottom,
}) {
  if (all != null) {
    left = all;
    top = all;
    right = all;
    bottom = all;
  }
  return EdgeInsets.only(
    left: getHorizontalSize(
      left ?? 0,
    ),
    top: getVerticalSize(
      top ?? 0,
    ),
    right: getHorizontalSize(
      right ?? 0,
    ),
    bottom: getVerticalSize(
      bottom ?? 0,
    ),
  );
}

//²launchUrl(String url) async {
//²  if (await canLaunchUrl(Uri.parse(url))) {
//²    await launchUrl(url);
//²  }
//²}

//GoogleSignIn _googleSignIn = GoogleSignIn(
//  scopes: [
//    'barkallah.bi@gmail.com',
//    'https://www.googleapis.com/auth/contacts.readonly',
//  ],
//);

//Future<void> _handleSignIn() async {
//  try {
//    await _googleSignIn.signIn();
//  } catch (error) {
//    print(error);
//  }
//}

var idtoken = "";
var accesstoken = "";

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) => ChangeNotifierProvider(
      create: (context) => GoogleSignInProvider(),
      child: const MaterialApp(
        home: MyHomePage(),
        debugShowCheckedModeBanner: false,
      ));
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  @override
  State<MyHomePage> createState() => ChooseIpPage();
}

class MyHomePageState extends StatelessWidget {
  const MyHomePageState({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'login_page',
        home: Container(
            decoration: importDecorationBackgroundg("image/login_bg.png"),
            child: Scaffold(
              backgroundColor: Colors.transparent,
              appBar: AppBar(
                elevation: 0,
                backgroundColor: Colors.transparent,
                title: const Text('Area'),
                centerTitle: true,
              ),
              resizeToAvoidBottomInset: false,
              body: Column(
                  mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Container(
                        padding: const EdgeInsets.all(20),
                        child: Column(
                          children: [
                            Stack(children: <Widget>[
                              const Positioned(
                                  right: 20.0,
                                  top: 10,
                                  child: Icon(
                                      Icons.supervised_user_circle_outlined,
                                      size: 36.0,
                                      color: Color.fromARGB(255, 8, 8, 8))),
                              createTextfield(TextAlign.start, "Username",
                                  usernameController)
                            ]),
                            //Padding(
                            //  padding: EdgeInsets.all(20),
                            //),
                            //SliverFillRemaining(),
                            alignementMarging(30, 0, 30, 25),
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
                                                width: 3,
                                                color: Colors.grey)))),
                              ],
                            ),
                            TextButton(
                              onPressed: () => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          const ForgetPasswordScreen())),
                              child: const Text(
                                "Forget Password ?",
                                style: TextStyle(fontWeight: FontWeight.w300),
                              ),
                            ),
                            //Align(
                            //    alignment: Alignment.bottomCenter,
                            //    child: Container(
                            //      margin: getMargin(
                            //        left: 30,
                            //        right: 30,
                            //        bottom: 40,
                            //      ),
                            //    )),
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
                                  onPressed: () => postLogin(
                                      context,
                                      usernameController.text,
                                      passwordController.text),
                                  child: const Text(
                                    "Login",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 25),
                                  ),
                                ),
                              ),
                            ),
                            alignementMarging(0, 15, 0, 0),
                            Center(
                              child: Container(
                                height: 50,
                                width: 300,
                                child: SignInButton(
                                  Buttons.GoogleDark,
                                  onPressed: () {
                                    final provider =
                                        Provider.of<GoogleSignInProvider>(
                                            context,
                                            listen: false);
                                    provider.googleLogin(context);
                                  },
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(50)),
                                ),
                              ),
                            ),
                            //Align(
                            //    alignment: Alignment.bottomCenter,
                            //    child: Container(
                            //      margin: getMargin(
                            //        left: 30,
                            //        right: 30,
                            //      ),
                            //    )),
                            alignementMarging(0, 15, 0, 0),
                            Center(
                              child: Container(
                                height: 50,
                                width: 300,
                                child: SignInButton(
                                  Buttons.GitHub,
                                  onPressed: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                const RedirectGithub()));
                                    //GoogleSignIn().signIn();
                                    //GoogleSignInProvider().googleLogin();
                                  },
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(50)),
                                ),
                              ),
                            ),
                            Center(
                                child: TextButton(
                              onPressed: () => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => const MyPage())),
                              child: const Text("Not memeber ? Register now",
                                  style: TextStyle(
                                      fontWeight: FontWeight.w600,
                                      fontStyle: FontStyle.italic)),
                            )),
                          ],
                        )),
                  ]),
            )));
  }
}
