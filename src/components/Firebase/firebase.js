import app from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import credentials from "../../constants/credentials.js"

class Firebase {
  constructor() {
    app.initializeApp(credentials);
    this.auth = app.auth();
    this.db = app.database();
  }

  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  signOut = () => 
    this.auth.signOut()

  resetPassword = email => 
    this.auth.sendPasswordResetEmail(email)

  changePassword = password =>
    this.auth.currentUser.updatePassword(password)

  users = path => this.db.ref('users/' + path);

  blobs = path => this.db.ref('blobs/' + path);

  
}

export default Firebase;