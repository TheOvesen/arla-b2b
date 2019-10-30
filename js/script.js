// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBaRZn2mEnn5aZX7CDMP1l7pZSXCiBx_lE",
  authDomain: "b2b-arla.firebaseapp.com",
  databaseURL: "https://b2b-arla.firebaseio.com",
  projectId: "b2b-arla",
  storageBucket: "b2b-arla.appspot.com",
  messagingSenderId: "47390102460",
  appId: "1:47390102460:web:053f1db9a914116c2b91b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let docRef = db.collection("farmers").doc("jens");

// Pull data from Firebase; live update currently not needed
docRef.get().then(function(doc) {
  if (doc.exists) {
    console.log("Document data:", doc.data());
    loadChart(doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});

// CHART

function loadChart(farmer) {
  let ctx = document.getElementById('data_chart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["Diesel", "Electricity", "Digestion", "Feed Consumption", "CO2 in total"],
      datasets: [{
        label: 'kg CO2 per kg milk',
        data: [
          farmer["diesel-co2"]*100,
          farmer["elec-co2"]*100,
          farmer["digest-co2"]*100,
          farmer["feed-co2"]*100,
          farmer["total-co2"]/100
        ],
        backgroundColor: "#ffcc32",
        borderColor: '#d7e100',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
