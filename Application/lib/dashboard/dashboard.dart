import 'package:area/dashboard/add_area/add_area.dart';
import 'package:area/dashboard/setting.dart';
import 'package:area/dashboard/user_area/user_area.dart';
import 'package:flutter/material.dart';

class DashBoard extends StatelessWidget {
  const DashBoard({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MyStatefulWidget(),
    );
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({super.key});

  @override
  State<MyStatefulWidget> createState() => MyStatefulWidgetState();
}

class MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _curIndex = 0;

  static const List<Widget> _bodyList = <Widget>[
    UserArea(),
    AddArea(),
    Setting()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.orange,
      body: _bodyList.elementAt(_curIndex),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 196, 5, 174),
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20)
            )
          ),
        child: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.storage),
              label: "",
              backgroundColor: Colors.transparent,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.queue),
              label: "",
              backgroundColor: Colors.transparent,

            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: "",
              backgroundColor: Colors.transparent,
            ),
          ],
          selectedItemColor: const Color.fromARGB(255, 255, 246, 246),
          unselectedItemColor: const Color.fromARGB(255, 0, 0, 0),
          backgroundColor: Colors.transparent,
          showUnselectedLabels: false,
          currentIndex: _curIndex,
          onTap: _onItemTapped,
        ),
      )
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      _curIndex = index;
    });
  }
}
