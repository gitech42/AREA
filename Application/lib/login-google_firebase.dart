import 'package:area/api_login.dart';
import 'package:area/main.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:firebase_auth/firebase_auth.dart';

class GoogleSignInProvider extends ChangeNotifier {
  final googleSignIn = GoogleSignIn();

  GoogleSignInAccount? _user;
  GoogleSignInAccount get user => _user!;
  Future googleLogin(BuildContext context) async {
    final googleUser = await GoogleSignIn(scopes: [
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.channel-memberships.creator",
      "https://www.googleapis.com/auth/youtube.force-ssl",
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtubepartner",
      "https://www.googleapis.com/auth/youtubepartner-channel-audit",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ]).signIn();
    if (googleUser == null) return;
    _user = googleUser;
    final googleAuth = await googleUser.authentication;
    final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);
    idtoken = credential.idToken.toString();
    accesstoken = credential.accessToken.toString();

    await FirebaseAuth.instance.signInWithCredential(credential);
    notifyListeners();
    // ignore: use_build_context_synchronously
    postLoginGoogle(context);
  }
}
