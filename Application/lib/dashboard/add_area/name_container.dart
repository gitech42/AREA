import 'package:flutter/material.dart';

class NameContainer extends StatelessWidget{
  const NameContainer({super.key, required this.name});

  final String name;

  @override
  Widget build(context) {
    return Align(
      alignment: Alignment.topLeft,
      child: Container(
        decoration: BoxDecoration(color: const Color.fromARGB(0, 255, 255, 255),borderRadius: BorderRadius.circular(5)),
        child: Padding(
          padding: const EdgeInsets.all(2.0),
          child: Text(name,
            style: const TextStyle(
              fontSize: 16,
              color: Color.fromARGB(255, 0, 0, 0)
            ),
          ),
        ),
      ),
    );
  }
}