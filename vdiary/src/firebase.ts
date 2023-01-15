//firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
	// firebase 설정과 관련된 개인 정보
	apiKey: 'AIzaSyCbhfLfXyuKJkIB_LDCY-W3zxdIJs9EcaQ',
	authDomain: 'react-chat-587da.firebaseapp.com',
	databaseURL: 'https://react-chat-587da-default-rtdb.firebaseio.com',
	projectId: 'react-chat-587da',
	storageBucket: 'react-chat-587da.appspot.com',
	messagingSenderId: '35233671735',
	appId: '1:35233671735:web:4163b291ded4369e62adb2',
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };
