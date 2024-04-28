import 'dart:async';
import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import 'my.dart';
import 'dashboard/dashboard.dart';
import 'dashboard/global.dart';

var user_code = "";
var device_code = "";

Future githubLoginDevice(BuildContext context) async {
  var url =
      'https://github.com/login/device/code?client_id=75e49e581966d6506fea&scope=user%20repo%20delete_repo';
  var response =
      await http.post(Uri.parse(url), headers: {'Accept': 'application/json'});
  var link = "";
  if (response.statusCode == 200) {
    //log(response.body.toString());
    link = response.body.toString();
    device_code = jsonDecode(link)['device_code'];
    user_code = jsonDecode(link)['user_code'];
    log(user_code);
    log(device_code);
    url = 'http://${ipController.text}:8080/api/auth/github/code';
    var body = json.encode({
      "email": emailToSendGit.text,
      "code": user_code,
    });

    log('Body: $body');

    var response2 = await http.post(
      Uri.parse(url),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    );
    if (response2.statusCode == 200) {
      if (await canLaunchUrl(Uri.parse("https://github.com/login/device"))) {
        launchUrl(Uri.parse("https://github.com/login/device"),
            mode: LaunchMode.externalApplication);
      } else {
        throw "Could not launch $link";
      }
    }
  }
  //  await launchUrl(Uri.parse(link));
  //} else
  //  throw "Could not launch $link";
}

Future githubToken(BuildContext context) async {
  var access_token = "";
  var url =
      "https://github.com/login/oauth/access_token?client_id=75e49e581966d6506fea&device_code=$device_code&grant_type=urn:ietf:params:oauth:grant-type:device_code";
  var response =
      await http.post(Uri.parse(url), headers: {'Accept': 'application/json'});
  if (response.statusCode == 200) {
    access_token = jsonDecode(response.body.toString())['access_token'];
    log(access_token);
    sendToken(context, access_token);
  }
}

Future sendToken(BuildContext context, String access_token) async {
  var url = "http://${ipController.text}:8080/api/auth/github/token";
  var body = jsonEncode({'token': access_token});
  var response = await http.post(
    Uri.parse(url),
    body: body,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  );

  if (response.statusCode == 200) {
    log(response.body.toString());
    token = jsonDecode(response.body.toString())['access_token'];
    // ignore: use_build_context_synchronously
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => const DashBoard()));
  } else {
    log(response.body.toString());
  }
}
