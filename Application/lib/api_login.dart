import 'dart:developer';
import 'dart:convert';
import 'package:area/dashboard/dashboard.dart';
import 'package:area/github_sign.dart';
import 'package:area/dashboard/global.dart';
import 'package:area/main.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import 'my.dart';

Future<String> postRegister(BuildContext context, String username,
    String password, String email) async {
  var url = 'http://${ipController.text}:8080/api/auth/register';
  var body =
      json.encode({"username": username, "password": password, "email": email});

  log('Body: $body');

  var response = await http.post(
    Uri.parse(url),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  );
  if (response.statusCode == 200) {
    token = jsonDecode(response.body.toString())['access_token'];
    // ignore: use_build_context_synchronously
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => const DashBoard()));
  } else {
    log("error registerl");
  }
  return (response.body);
}

Future<String> postLogin(
    BuildContext context, String username, String password) async {
  var url = 'http://${ipController.text}:8080/api/auth/login';
  var body = json.encode({
    "email": username,
    "password": password,
  });

  log('Body: $body');

  var response = await http.post(
    Uri.parse(url),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  );
  if (response.statusCode == 200) {
    token = jsonDecode(response.body.toString())['access_token'];
    // ignore: use_build_context_synchronously
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => const DashBoard()));
  } else {
    log(response.body.toString());
  }
  return (response.body);
}

Future<String> postForgetpassword() async {
  var url = 'http://${ipController.text}:8080/api/auth/forget_password';
  var body = json.encode({
    "username": "nick",
    "password": "password",
    "email": "test12@gmail.com"
  });

  log('Body: $body');

  var response = await http.post(
    Uri.parse(url),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  );
  return (response.body);
}

Future<String> postLoginGoogle(BuildContext context) async {
  log("accesstoken =====$accesstoken");
  log("idTOKEN =====$idtoken");
  var url = 'http://${ipController.text}:8080/api/auth/google/callback';
  var body = json.encode({'id_token': idtoken, 'access_token': accesstoken});

  log('Body: $body');

  var response = await http.post(
    Uri.parse(url),
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  );
  if (response.statusCode == 200) {
    token = jsonDecode(response.body.toString())['access_token'];
    // ignore: use_build_context_synchronously
    log(response.body.toString());
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => const DashBoard()));
  } else {
    log("error request");
  }
  return (response.body);
}
